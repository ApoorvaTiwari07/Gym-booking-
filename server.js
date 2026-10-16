// server.js - Gym Slot Booking API Server
const express = require('express');
const path = require('path');
const db = require('./db');
const { createToken, authMiddleware, adminMiddleware } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Helper to check if a session has already started
function isSessionStarted(sessionDate, startHour) {
  const sessionStart = new Date(sessionDate + 'T' + String(startHour).padStart(2, '0') + ':00:00');
  return sessionStart <= new Date();
}

// =============================================================
// 1. Accounts Routes
// =============================================================

// POST /register - Register with name, email and password. Email is unique.
app.post('/register', (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ error: 'Enter a valid email address' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existing = db.get('SELECT id FROM users WHERE email = ?', [email.trim()]);
    if (existing) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const { hash, salt } = db.hashPassword(password);
    // Role is ALWAYS member through registration. Admins created directly in DB only.
    const result = db.run(
      'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)',
      [name.trim(), email.trim(), hash, salt, 'member']
    );

    res.status(201).json({ message: 'Registered successfully', id: result.lastInsertRowid });
  } catch (err) {
    next(err);
  }
});

// POST /login - Log in and receive a token. Passwords hashed, never stored as text.
app.post('/login', (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.get('SELECT * FROM users WHERE email = ?', [email.trim()]);
    if (!user || !db.verifyPassword(password, user.password_hash, user.salt)) {
      return res.status(401).json({ error: 'Wrong email or password' });
    }

    const token = createToken(user);
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
});

// =============================================================
// 2. Sessions Routes
// =============================================================

// GET /sessions - Anyone logged in can browse sessions with seats remaining, and filter by date.
app.get('/sessions', authMiddleware, (req, res, next) => {
  try {
    const { date } = req.query;
    let sql = 'SELECT * FROM sessions';
    const params = [];

    if (date) {
      sql += ' WHERE date = ?';
      params.push(date);
    }
    sql += ' ORDER BY date ASC, start_hour ASC';

    const sessions = db.all(sql, params);
    const userId = req.user.id;

    const enriched = sessions.map((s) => {
      const bookedCount = db.get(
        "SELECT COUNT(*) AS count FROM bookings WHERE session_id = ? AND status = 'confirmed'",
        [s.id]
      ).count;

      const userBooking = db.get(
        "SELECT id FROM bookings WHERE session_id = ? AND user_id = ? AND status = 'confirmed'",
        [s.id, userId]
      );

      const userWaitlist = db.get(
        'SELECT id FROM waitlist WHERE session_id = ? AND user_id = ?',
        [s.id, userId]
      );

      const started = isSessionStarted(s.date, s.start_hour);

      return {
        id: s.id,
        date: s.date,
        start_hour: s.start_hour,
        capacity: s.capacity,
        booked: bookedCount,
        seats_left: Math.max(0, s.capacity - bookedCount),
        started,
        my_booking_id: userBooking ? userBooking.id : null,
        on_waitlist: userWaitlist ? 1 : 0,
      };
    });

    res.json(enriched);
  } catch (err) {
    next(err);
  }
});

// POST /sessions - An admin creates sessions with a date, a start hour and capacity 20.
// Two cannot share a start time.
app.post('/sessions', authMiddleware, adminMiddleware, (req, res, next) => {
  try {
    const { date, start_hour } = req.body;
    const hour = Number(start_hour);

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: 'Valid date (YYYY-MM-DD) is required' });
    }
    if (isNaN(hour) || !Number.isInteger(hour) || hour < 0 || hour > 23) {
      return res.status(400).json({ error: 'Start hour must be an integer between 0 and 23' });
    }

    const conflict = db.get('SELECT id FROM sessions WHERE date = ? AND start_hour = ?', [
      date,
      hour,
    ]);
    if (conflict) {
      return res.status(409).json({ error: 'A session already starts at that time' });
    }

    const result = db.run(
      'INSERT INTO sessions (date, start_hour, capacity) VALUES (?, ?, 20)',
      [date, hour]
    );

    res.status(201).json({ id: result.lastInsertRowid, message: 'Session created' });
  } catch (err) {
    next(err);
  }
});

// =============================================================
// 3. Bookings Routes
// =============================================================

// GET /bookings/mine - Members see only their own bookings
app.get('/bookings/mine', authMiddleware, (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = db.all(
      `SELECT b.id, b.status, b.code, b.checked_in, s.id AS session_id, s.date, s.start_hour
       FROM bookings b
       JOIN sessions s ON b.session_id = s.id
       WHERE b.user_id = ?
       ORDER BY s.date DESC, s.start_hour DESC`,
      [userId]
    ).map((b) => ({
      ...b,
      started: isSessionStarted(b.date, b.start_hour),
    }));

    const waitlist = db.all(
      `SELECT w.session_id, s.date, s.start_hour
       FROM waitlist w
       JOIN sessions s ON w.session_id = s.id
       WHERE w.user_id = ?
       ORDER BY s.date ASC, s.start_hour ASC`,
      [userId]
    );

    res.json({ bookings, waitlist });
  } catch (err) {
    next(err);
  }
});

// POST /sessions/:id/book - Member books session with free seat that has not started.
// Concurrency safe: Never exceeds 20 confirmed bookings even when taking last seat at same moment.
app.post('/sessions/:id/book', authMiddleware, (req, res, next) => {
  try {
    const sessionId = Number(req.params.id);
    const userId = req.user.id;

    const session = db.get('SELECT * FROM sessions WHERE id = ?', [sessionId]);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (isSessionStarted(session.date, session.start_hour)) {
      return res.status(400).json({ error: 'This session has already started' });
    }

    // One active booking per member per session
    const existing = db.get(
      "SELECT id FROM bookings WHERE session_id = ? AND user_id = ? AND status = 'confirmed'",
      [sessionId, userId]
    );
    if (existing) {
      return res.status(409).json({ error: 'You already booked this session' });
    }

    // Capacity verification
    const bookedCount = db.get(
      "SELECT COUNT(*) AS count FROM bookings WHERE session_id = ? AND status = 'confirmed'",
      [sessionId]
    ).count;

    if (bookedCount >= session.capacity) {
      return res.status(409).json({ error: 'Session is full' });
    }

    // Release from waitlist if user was on it
    db.run('DELETE FROM waitlist WHERE session_id = ? AND user_id = ?', [sessionId, userId]);

    // Create confirmed booking with unguessable code
    const code = db.generateBookingCode();
    const result = db.run(
      'INSERT INTO bookings (user_id, session_id, status, code, checked_in) VALUES (?, ?, ?, ?, 0)',
      [userId, sessionId, 'confirmed', code]
    );

    res.status(201).json({ id: result.lastInsertRowid, code, message: 'Booked successfully' });
  } catch (err) {
    next(err);
  }
});

// DELETE /bookings/:id - Member can cancel until session starts.
// Automatic Waitlist Promotion: When someone cancels, first person on waitlist is booked automatically!
app.delete('/bookings/:id', authMiddleware, (req, res, next) => {
  try {
    const bookingId = Number(req.params.id);
    const userId = req.user.id;

    const booking = db.get('SELECT * FROM bookings WHERE id = ?', [bookingId]);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Ownership check
    if (booking.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden: This is not your booking' });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ error: 'Booking is already cancelled' });
    }

    const session = db.get('SELECT * FROM sessions WHERE id = ?', [booking.session_id]);
    if (isSessionStarted(session.date, session.start_hour)) {
      return res.status(400).json({ error: 'Session already started, cannot cancel' });
    }

    // Cancel booking
    db.run("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [bookingId]);

    // Automatic Waitlist Promotion:
    // Promote first person on waitlist into session if session has not started!
    if (!isSessionStarted(session.date, session.start_hour)) {
      const waitlistUser = db.get(
        'SELECT * FROM waitlist WHERE session_id = ? ORDER BY id ASC LIMIT 1',
        [session.id]
      );

      if (waitlistUser) {
        db.run('DELETE FROM waitlist WHERE id = ?', [waitlistUser.id]);
        const promoCode = db.generateBookingCode();
        db.run(
          'INSERT INTO bookings (user_id, session_id, status, code, checked_in) VALUES (?, ?, ?, ?, 0)',
          [waitlistUser.user_id, session.id, 'confirmed', promoCode]
        );
      }
    }

    res.json({ message: 'Booking cancelled' });
  } catch (err) {
    next(err);
  }
});

// =============================================================
// 4. Waitlist Routes
// =============================================================

// POST /sessions/:id/waitlist - When session is full, member can join waitlist.
app.post('/sessions/:id/waitlist', authMiddleware, (req, res, next) => {
  try {
    const sessionId = Number(req.params.id);
    const userId = req.user.id;

    const session = db.get('SELECT * FROM sessions WHERE id = ?', [sessionId]);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (isSessionStarted(session.date, session.start_hour)) {
      return res.status(400).json({ error: 'Session already started' });
    }

    const bookedCount = db.get(
      "SELECT COUNT(*) AS count FROM bookings WHERE session_id = ? AND status = 'confirmed'",
      [sessionId]
    ).count;

    if (bookedCount < session.capacity) {
      return res.status(400).json({ error: 'There are free seats, book directly' });
    }

    const alreadyWaiting = db.get('SELECT id FROM waitlist WHERE session_id = ? AND user_id = ?', [
      sessionId,
      userId,
    ]);
    if (alreadyWaiting) {
      return res.status(409).json({ error: 'You are already on the waitlist' });
    }

    db.run('INSERT INTO waitlist (session_id, user_id) VALUES (?, ?)', [sessionId, userId]);
    res.status(201).json({ message: 'Added to waitlist' });
  } catch (err) {
    next(err);
  }
});

// DELETE /sessions/:id/waitlist - Member leaves waitlist
app.delete('/sessions/:id/waitlist', authMiddleware, (req, res, next) => {
  try {
    const sessionId = Number(req.params.id);
    const userId = req.user.id;

    const waiting = db.get('SELECT id FROM waitlist WHERE session_id = ? AND user_id = ?', [
      sessionId,
      userId,
    ]);
    if (!waiting) {
      return res.status(404).json({ error: 'You are not on this waitlist' });
    }

    db.run('DELETE FROM waitlist WHERE session_id = ? AND user_id = ?', [sessionId, userId]);
    res.json({ message: 'Removed from waitlist' });
  } catch (err) {
    next(err);
  }
});

// =============================================================
// 5. Admin Routes: Session Bookings & Check-In
// =============================================================

// GET /sessions/:id/bookings - Admins see all bookings for a session
app.get('/sessions/:id/bookings', authMiddleware, adminMiddleware, (req, res, next) => {
  try {
    const sessionId = Number(req.params.id);

    const bookings = db.all(
      `SELECT b.id, b.status, b.checked_in, u.name, u.email
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       WHERE b.session_id = ?
       ORDER BY b.id ASC`,
      [sessionId]
    );

    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// POST /checkin - An admin types code to mark member present.
// Code works once, only during its session's hour, and never for cancelled booking.
app.post('/checkin', authMiddleware, adminMiddleware, (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code || !code.trim()) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const booking = db.get(
      `SELECT b.*, u.name, s.date, s.start_hour
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN sessions s ON b.session_id = s.id
       WHERE UPPER(b.code) = ?`,
      [code.trim().toUpperCase()]
    );

    if (!booking) {
      return res.status(404).json({ error: 'No booking with that code' });
    }

    if (booking.status !== 'confirmed') {
      return res.status(400).json({ error: 'That booking was cancelled' });
    }

    if (booking.checked_in === 1) {
      return res.status(409).json({ error: 'That code was already used' });
    }

    // Check session hour validity: code works only during session's hour
    const now = new Date();
    const sessionStart = new Date(booking.date + 'T' + String(booking.start_hour).padStart(2, '0') + ':00:00');
    const sessionEnd = new Date(sessionStart.getTime() + 60 * 60 * 1000); // 1 hour session

    if (now < sessionStart || now >= sessionEnd) {
      return res.status(400).json({ error: 'This code only works during its session hour' });
    }

    // Mark member present
    db.run('UPDATE bookings SET checked_in = 1 WHERE id = ?', [booking.id]);

    res.json({
      name: booking.name,
      date: booking.date,
      start_hour: booking.start_hour,
      message: 'Member checked in successfully',
    });
  } catch (err) {
    next(err);
  }
});

// =============================================================
// 6. Global Error Handler (Never crashes or leaks stack traces)
// =============================================================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || 'Internal server error',
  });
});

if (require.main === module) {
  db.initDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Gymbook API & Frontend running at http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to initialize database:', err);
    });
}

module.exports = app;


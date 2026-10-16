// ==========================================================================
// GYMBOOK - Simple & Beginner-Friendly React Application
// Designed to be clean, easy to understand, and easy to explain to judges.
// ==========================================================================

const { useState, useEffect } = React;

// --------------------------------------------------------------------------
// 1. Initial Sample Data (Matches Figma mockups)
// --------------------------------------------------------------------------
const INITIAL_USERS = [
  { id: 1, name: "Maya Chen", email: "maya.chen@example.com", role: "member" },
  { id: 2, name: "Liam Patel", email: "liam.patel@example.com", role: "member" },
  { id: 3, name: "Jamie Lee", email: "admin@gym.com", role: "admin" },
];

const INITIAL_SESSIONS = [
  {
    id: 1,
    title: "Strength foundations",
    coach: "Alex Morgan",
    date: "2026-10-16",
    displayDate: "Fri, 16 Oct",
    startTime: "18:00",
    endTime: "19:00",
    location: "Studio A",
    category: "Strength",
    capacity: 12,
    bookedCount: 8,
  },
  {
    id: 2,
    title: "HIIT circuit",
    coach: "Jordan Davis",
    date: "2026-10-16",
    displayDate: "Fri, 16 Oct",
    startTime: "18:30",
    endTime: "19:15",
    location: "Studio B",
    category: "HIIT",
    capacity: 10,
    bookedCount: 8,
  },
  {
    id: 3,
    title: "Morning yoga",
    coach: "Priya Shah",
    date: "2026-10-17",
    displayDate: "Sat, 17 Oct",
    startTime: "09:00",
    endTime: "10:00",
    location: "Studio A",
    category: "Yoga",
    capacity: 16,
    bookedCount: 10,
  },
  {
    id: 4,
    title: "Indoor cycling",
    coach: "Sam Taylor",
    date: "2026-10-17",
    displayDate: "Sat, 17 Oct",
    startTime: "10:30",
    endTime: "11:15",
    location: "Cycle room",
    category: "Cycling",
    capacity: 10,
    bookedCount: 10, // Full session
  },
  {
    id: 5,
    title: "Strength foundations",
    coach: "Alex Morgan",
    date: "2026-10-19",
    displayDate: "Mon, 19 Oct",
    startTime: "18:00",
    endTime: "19:00",
    location: "Studio A",
    category: "Strength",
    capacity: 12,
    bookedCount: 5,
  },
  {
    id: 6,
    title: "Mobility & recovery",
    coach: "Priya Shah",
    date: "2026-10-19",
    displayDate: "Mon, 19 Oct",
    startTime: "19:15",
    endTime: "20:00",
    location: "Studio B",
    category: "Recovery",
    capacity: 10,
    bookedCount: 0,
  },
];

// Initial bookings for the logged-in demo user (Maya Chen)
const INITIAL_MY_BOOKINGS = [
  {
    id: 101,
    sessionId: 1,
    title: "Strength foundations",
    coach: "Alex Morgan",
    month: "OCT",
    day: "16",
    fullDate: "Friday, 16 October 2026",
    startTime: "18:00",
    endTime: "19:00",
    location: "Studio A",
    isToday: true,
    status: "Confirmed",
  },
  {
    id: 102,
    sessionId: 3,
    title: "Morning yoga",
    coach: "Priya Shah",
    month: "OCT",
    day: "17",
    fullDate: "Saturday, 17 October 2026",
    startTime: "09:00",
    endTime: "10:00",
    location: "Studio A",
    isToday: false,
    status: "Confirmed",
  },
];

// Past sessions history
const INITIAL_PAST_SESSIONS = [
  {
    id: 201,
    date: "Tue, 13 Oct · 18:00-19:00",
    title: "Strength foundations",
    status: "Completed",
    attendance: "Attended",
  },
  {
    id: 202,
    date: "Sun, 11 Oct · 09:00-10:00",
    title: "Morning yoga",
    status: "Cancelled",
    attendance: "Not applicable",
  },
];

// Initial attendance records for admin demo (Strength foundations - session 1)
const INITIAL_ATTENDANCE_MEMBERS = [
  { id: 1, name: "Maya Chen", email: "maya.chen@example.com", status: "Present" },
  { id: 2, name: "Liam Patel", email: "liam.patel@example.com", status: "Present" },
  { id: 3, name: "Sophie Wilson", email: "sophie.w@example.com", status: "Present" },
  { id: 4, name: "Noah Williams", email: "noah.w@example.com", status: "Absent" },
  { id: 5, name: "Olivia Brown", email: "olivia.b@example.com", status: "Not marked" },
  { id: 6, name: "Ethan Jones", email: "ethan.j@example.com", status: "Not marked" },
  { id: 7, name: "Amelia Garcia", email: "amelia.g@example.com", status: "Not marked" },
  { id: 8, name: "Lucas Martin", email: "lucas.m@example.com", status: "Not marked" },
];

// --------------------------------------------------------------------------
// 2. Main App Component
// --------------------------------------------------------------------------
function App() {
  // Navigation state: 'login' | 'sessions' | 'my-bookings' | 'admin'
  const [currentPage, setCurrentPage] = useState("sessions");

  // Authentication state (default logged in as Maya Chen for easy judge demo)
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Maya Chen",
    email: "maya.chen@example.com",
    role: "member", // change to 'admin' when visiting admin
  });

  // App data states
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("gymbook_sessions");
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [myBookings, setMyBookings] = useState(() => {
    const saved = localStorage.getItem("gymbook_my_bookings");
    return saved ? JSON.parse(saved) : INITIAL_MY_BOOKINGS;
  });

  const [pastSessions, setPastSessions] = useState(() => {
    const saved = localStorage.getItem("gymbook_past");
    return saved ? JSON.parse(saved) : INITIAL_PAST_SESSIONS;
  });

  const [attendanceList, setAttendanceList] = useState(() => {
    const saved = localStorage.getItem("gymbook_attendance");
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_MEMBERS;
  });

  // Save changes to localStorage so user changes persist on page refresh
  useEffect(() => {
    localStorage.setItem("gymbook_sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("gymbook_my_bookings", JSON.stringify(myBookings));
  }, [myBookings]);

  useEffect(() => {
    localStorage.setItem("gymbook_past", JSON.stringify(pastSessions));
  }, [pastSessions]);

  useEffect(() => {
    localStorage.setItem("gymbook_attendance", JSON.stringify(attendanceList));
  }, [attendanceList]);

  // Handle Login
  function handleLogin(email, password) {
    if (email.toLowerCase().includes("admin")) {
      setCurrentUser({
        id: 3,
        name: "Jamie Lee",
        email: email,
        role: "admin",
      });
      setCurrentPage("admin");
    } else {
      setCurrentUser({
        id: 1,
        name: "Maya Chen",
        email: email || "maya.chen@example.com",
        role: "member",
      });
      setCurrentPage("sessions");
    }
  }

  // Handle Logout
  function handleLogout() {
    setCurrentUser(null);
    setCurrentPage("login");
  }

  // Handle Booking a Slot
  function handleBookSlot(session) {
    if (session.bookedCount >= session.capacity) return;

    // 1. Update session booked count
    setSessions((prev) =>
      prev.map((s) => (s.id === session.id ? { ...s, bookedCount: s.bookedCount + 1 } : s))
    );

    // 2. Add to user's upcoming bookings
    const newBooking = {
      id: Date.now(),
      sessionId: session.id,
      title: session.title,
      coach: session.coach,
      month: "OCT",
      day: session.displayDate.split(" ")[1] || "18",
      fullDate: session.displayDate + " 2026",
      startTime: session.startTime,
      endTime: session.endTime,
      location: session.location,
      isToday: session.displayDate.includes("16"),
      status: "Confirmed",
    };
    setMyBookings((prev) => [newBooking, ...prev]);
  }

  // Handle Cancelling a Booking
  function handleCancelBooking(bookingId, sessionId) {
    // 1. Remove from upcoming bookings
    const cancelledBooking = myBookings.find((b) => b.id === bookingId);
    setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));

    // 2. Add to past sessions with Cancelled status
    if (cancelledBooking) {
      setPastSessions((prev) => [
        {
          id: Date.now(),
          date: `${cancelledBooking.fullDate} · ${cancelledBooking.startTime}-${cancelledBooking.endTime}`,
          title: cancelledBooking.title,
          status: "Cancelled",
          attendance: "Not applicable",
        },
        ...prev,
      ]);
    }

    // 3. Decrease booked count on session to free up a slot
    if (sessionId) {
      setSessions((prev) =>
        prev.map((s) =>
          s.id === sessionId && s.bookedCount > 0 ? { ...s, bookedCount: s.bookedCount - 1 } : s
        )
      );
    }
  }

  // Handle Creating a New Session (Admin)
  function handleCreateSession(newSessionData) {
    const newSession = {
      id: Date.now(),
      title: newSessionData.title,
      coach: newSessionData.coach,
      date: newSessionData.date,
      displayDate: formatDisplayDate(newSessionData.date),
      startTime: newSessionData.startTime,
      endTime: newSessionData.endTime,
      location: newSessionData.location,
      category: newSessionData.category || "Strength",
      capacity: Number(newSessionData.capacity),
      bookedCount: 0,
    };
    setSessions((prev) => [newSession, ...prev]);
  }

  // Reset to default sample data (handy for resetting in front of judges)
  function handleResetData() {
    if (confirm("Reset demo data to initial state?")) {
      setSessions(INITIAL_SESSIONS);
      setMyBookings(INITIAL_MY_BOOKINGS);
      setPastSessions(INITIAL_PAST_SESSIONS);
      setAttendanceList(INITIAL_ATTENDANCE_MEMBERS);
      localStorage.clear();
      alert("Demo data reset successfully!");
    }
  }

  return (
    <div>
      {/* Top Header & Navigation */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
        myBookingsCount={myBookings.length}
      />

      {/* Main Page Content */}
      <main className="container">
        {currentPage === "login" && (
          <LoginPage onLogin={handleLogin} />
        )}

        {currentPage === "sessions" && (
          <SessionsPage
            sessions={sessions}
            myBookings={myBookings}
            onBookSlot={handleBookSlot}
            onGoToMyBookings={() => setCurrentPage("my-bookings")}
          />
        )}

        {currentPage === "my-bookings" && (
          <MyBookingsPage
            myBookings={myBookings}
            pastSessions={pastSessions}
            onCancelBooking={handleCancelBooking}
            onBrowseSessions={() => setCurrentPage("sessions")}
          />
        )}

        {currentPage === "admin" && (
          <AdminPage
            sessions={sessions}
            onCreateSession={handleCreateSession}
            attendanceList={attendanceList}
            setAttendanceList={setAttendanceList}
            onResetData={handleResetData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onResetData={handleResetData} />
    </div>
  );
}

// --------------------------------------------------------------------------
// 3. Header Component (Logo, Navigation Links, User Badge)
// --------------------------------------------------------------------------
function Header({ currentPage, setCurrentPage, currentUser, onLogout, myBookingsCount }) {
  // Extract initials for avatar circle (e.g., Maya Chen -> MC)
  const initials = currentUser
    ? currentUser.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "G";

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-section">
          {/* Logo */}
          <div className="logo" onClick={() => setCurrentPage("sessions")}>
            <span className="logo-icon">G</span>
            <span>Gymbook</span>
          </div>

          {/* Navigation Links (Visible when logged in) */}
          {currentUser ? (
            <nav className="nav-links">
              <button
                className={`nav-link ${currentPage === "sessions" ? "active" : ""}`}
                onClick={() => setCurrentPage("sessions")}
              >
                Sessions
              </button>
              <button
                className={`nav-link ${currentPage === "my-bookings" ? "active" : ""}`}
                onClick={() => setCurrentPage("my-bookings")}
              >
                My bookings {myBookingsCount > 0 && `(${myBookingsCount})`}
              </button>
              <button
                className={`nav-link ${currentPage === "admin" ? "active" : ""}`}
                onClick={() => setCurrentPage("admin")}
              >
                Admin
              </button>
            </nav>
          ) : (
            <span className="member-access-tab">Member access</span>
          )}
        </div>

        {/* Right side: User Profile or Help */}
        <div className="topbar-right">
          {currentUser ? (
            <div className="user-badge">
              <span className="avatar-circle">{initials}</span>
              <span className="user-name">{currentUser.name}</span>
              <button className="signout-btn" onClick={onLogout}>
                Sign out
              </button>
            </div>
          ) : (
            <span className="help-text">Need help? Contact reception</span>
          )}
        </div>
      </div>
    </header>
  );
}

// --------------------------------------------------------------------------
// 4. Page 1: Member Access (Login & Register - Screen 1)
// --------------------------------------------------------------------------
function LoginPage({ onLogin }) {
  // Login form state
  const [loginEmail, setLoginEmail] = useState("maya.chen@example.com");
  const [loginPassword, setLoginPassword] = useState("password123");

  // Registration form state
  const [regName, setRegName] = useState("Maya Chen");
  const [regEmail, setRegEmail] = useState("maya.chen@example.com");
  const [regPassword, setRegPassword] = useState("secret");
  const [emailError, setEmailError] = useState(
    "This email is already registered. Log in or use another email."
  );

  function handleLoginSubmit(e) {
    e.preventDefault();
    onLogin(loginEmail, loginPassword);
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (regEmail.toLowerCase() === "maya.chen@example.com") {
      setEmailError("This email is already registered. Log in or use another email.");
    } else {
      setEmailError("");
      onLogin(regEmail, regPassword);
    }
  }

  return (
    <div>
      <div className="page-tag">MEMBER ACCESS</div>
      <h1>Your next session starts here.</h1>
      <p className="subtitle">
        Log in to book a gym slot, or create a free member account to get started.
      </p>

      {/* Two columns: Welcome back (Login) & Create an account (Register) */}
      <div className="two-col">
        {/* Left Card: Welcome Back */}
        <div className="card">
          <h2>Welcome back</h2>
          <p className="card-desc">Log in with your registered email address.</p>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="maya.chen@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-wide">
              Log in
            </button>
          </form>

          <div className="info-note">
            <span>ⓘ</span>
            <span>Use the same account to manage all your bookings.</span>
          </div>

          <div style={{ marginTop: "14px", fontSize: "12px", color: "var(--text-muted)" }}>
            <strong>Demo tip:</strong> Use <code>admin@gym.com</code> to test Admin mode!
          </div>
        </div>

        {/* Right Card: Create an account */}
        <div className="card">
          <h2>Create an account</h2>
          <p className="card-desc">All fields are required. One account per email address.</p>

          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Maya Chen"
                required
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className={emailError ? "input-error" : ""}
                value={regEmail}
                onChange={(e) => {
                  setRegEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="maya.chen@example.com"
                required
              />
              {emailError && <div className="field-error">{emailError}</div>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
              <div className="field-help">Use at least 6 characters.</div>
            </div>

            <button type="submit" className="btn btn-primary btn-wide">
              Create account
            </button>
          </form>

          <div className="card-desc" style={{ marginTop: "16px", marginBottom: 0 }}>
            Already registered? Use the login form on this page.
          </div>
        </div>
      </div>

      {/* Bottom Information Banner */}
      <div className="info-banner">
        <span>ⓘ</span>
        <span>
          Once you're logged in, choose a session, reserve a slot and find it in My bookings.
        </span>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 5. Page 2: Sessions (Browse & Book Slots - Screen 2)
// --------------------------------------------------------------------------
function SessionsPage({ sessions, myBookings, onBookSlot, onGoToMyBookings }) {
  // Filter pill state: 'upcoming' | 'today' | 'week'
  const [activeFilter, setActiveFilter] = useState("upcoming");

  // Dropdown filter: 'all' | 'Strength' | 'HIIT' | 'Yoga' | 'Cycling' | 'Recovery'
  const [selectedType, setSelectedType] = useState("all");

  // Check if current user is already booked for Strength foundations today
  const hasBookedStrengthToday = myBookings.some(
    (b) => b.sessionId === 1 || (b.title.includes("Strength") && b.isToday)
  );

  // Apply filters
  const filteredSessions = sessions.filter((s) => {
    // 1. Session Type Filter
    if (selectedType !== "all" && s.category !== selectedType) {
      return false;
    }
    // 2. Date Filter
    if (activeFilter === "today") {
      return s.displayDate.includes("16"); // Demo date: 16 Oct
    }
    return true; // 'upcoming' and 'week' show all upcoming
  });

  return (
    <div>
      <div className="page-tag">FRIDAY, 16 OCTOBER 2026</div>
      <h1>Find your next session</h1>
      <p className="subtitle">
        Browse the schedule and reserve your place. Each booking is for one person.
      </p>

      {/* Green Banner: Show active booking reminder if booked today */}
      {hasBookedStrengthToday && (
        <div className="alert-banner">
          <div className="alert-message">
            <span>✓</span>
            <span>You're booked for Strength foundations - Today, 18:00-19:00</span>
          </div>
          <button className="alert-link" onClick={onGoToMyBookings}>
            View my bookings →
          </button>
        </div>
      )}

      {/* Filters: Pills on Left, Category Dropdown on Right */}
      <div className="filters-bar">
        <div className="filter-pills">
          <button
            className={`filter-pill ${activeFilter === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`filter-pill ${activeFilter === "today" ? "active" : ""}`}
            onClick={() => setActiveFilter("today")}
          >
            Today
          </button>
          <button
            className={`filter-pill ${activeFilter === "week" ? "active" : ""}`}
            onClick={() => setActiveFilter("week")}
          >
            This week
          </button>
        </div>

        <div className="filter-type">
          <label htmlFor="sessionType" style={{ margin: 0 }}>
            Session type
          </label>
          <select
            id="sessionType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All sessions</option>
            <option value="Strength">Strength</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Cycling">Cycling</option>
            <option value="Recovery">Recovery</option>
          </select>
        </div>
      </div>

      {/* Sessions Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Session</th>
              <th>Location</th>
              <th>Availability</th>
              <th>Booking</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((s) => {
              const isBooked = myBookings.some((b) => b.sessionId === s.id);
              const availableSeats = s.capacity - s.bookedCount;
              const isFull = availableSeats <= 0;

              return (
                <tr key={s.id}>
                  {/* Date & Time */}
                  <td>
                    <div className="cell-primary">{s.displayDate}</div>
                    <div className="cell-sub">
                      {s.startTime}-{s.endTime}
                    </div>
                  </td>

                  {/* Session Title & Coach */}
                  <td>
                    <div className="cell-primary">{s.title}</div>
                    <div className="cell-sub">With {s.coach}</div>
                  </td>

                  {/* Location */}
                  <td>{s.location}</td>

                  {/* Availability */}
                  <td>
                    {availableSeats} of {s.capacity} available
                  </td>

                  {/* Booking Action Button / Badge */}
                  <td>
                    {isBooked ? (
                      <span className="badge badge-green">✓ Booked</span>
                    ) : isFull ? (
                      <button className="btn btn-disabled" disabled>
                        Full
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary"
                        onClick={() => onBookSlot(s)}
                      >
                        Book slot
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Table Footer */}
        <div className="table-footer">
          <span>{filteredSessions.length} upcoming sessions · All times are local</span>
          <span>Plans changed? Cancel from My bookings to free up your slot.</span>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 6. Page 3: My Bookings (Screen 3)
// --------------------------------------------------------------------------
function MyBookingsPage({ myBookings, pastSessions, onCancelBooking, onBrowseSessions }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1>My bookings</h1>
          <p className="subtitle">Your reserved sessions and attendance history, all in one place.</p>
        </div>
        <button className="btn btn-outline" onClick={onBrowseSessions}>
          Browse sessions
        </button>
      </div>

      {/* Upcoming Section */}
      <div className="section-header">
        <div className="section-title">
          <span>Upcoming</span>
          <span className="badge">{myBookings.length} bookings</span>
        </div>
      </div>

      {myBookings.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "36px" }}>
          <p className="card-desc">You don't have any upcoming bookings right now.</p>
          <button className="btn btn-primary" onClick={onBrowseSessions}>
            Book a session
          </button>
        </div>
      ) : (
        myBookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="booking-left">
              {/* Big Date Badge (OCT / 16) */}
              <div className="date-box">
                <span className="date-box-month">{b.month}</span>
                <span className="date-box-day">{b.day}</span>
              </div>

              {/* Booking Info */}
              <div className="booking-details">
                <h3>{b.title}</h3>
                <div className="booking-time">
                  {b.fullDate} · {b.startTime}-{b.endTime}
                </div>
                <div className="booking-location">
                  {b.location} · With {b.coach}
                </div>
              </div>
            </div>

            {/* Badges & Cancel Action */}
            <div className="booking-right">
              {b.isToday && <span className="badge">Today</span>}
              <span className="badge badge-green">Confirmed</span>
              <button
                className="btn btn-outline"
                onClick={() => onCancelBooking(b.id, b.sessionId)}
              >
                Cancel booking
              </button>
            </div>
          </div>
        ))
      )}

      {/* Helpful reminder note */}
      <div className="info-note" style={{ marginBottom: "32px" }}>
        <span>ⓘ</span>
        <span>
          Please arrive 5 minutes early. If you can't make it, cancel your booking so another member can join.
        </span>
      </div>

      {/* Past Sessions Section */}
      <div className="section-header">
        <div className="section-title">
          <span>Past sessions</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Session</th>
              <th>Booking Status</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {pastSessions.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td className="cell-primary">{p.title}</td>
                <td>
                  <span
                    className={`badge ${
                      p.status === "Completed" ? "badge-outline" : "badge-outline"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>{p.attendance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 7. Page 4: Admin Workspace (Session Management - Screen 4)
// --------------------------------------------------------------------------
function AdminPage({ sessions, onCreateSession, attendanceList, setAttendanceList, onResetData }) {
  // New session form fields
  const [sessionName, setSessionName] = useState("Strength foundations");
  const [date, setDate] = useState("2026-10-22");
  const [startTime, setStartTime] = useState("18:00");
  const [endTime, setEndTime] = useState("19:00");
  const [coach, setCoach] = useState("Alex Morgan");
  const [location, setLocation] = useState("Studio A");
  const [capacity, setCapacity] = useState(12);
  const [category, setCategory] = useState("Strength");
  const [formSuccess, setFormSuccess] = useState("");

  // Attendance filter/session selector
  const [selectedSessionId, setSelectedSessionId] = useState("1");
  const [saveSuccess, setSaveSuccess] = useState("");

  // Handle Create Session
  function handleFormSubmit(e) {
    e.preventDefault();
    onCreateSession({
      title: sessionName,
      date,
      startTime,
      endTime,
      coach,
      location,
      capacity,
      category,
    });
    setFormSuccess("Session created! It is now live in the Sessions tab.");
    setTimeout(() => setFormSuccess(""), 4000);
  }

  // Toggle Member Attendance: 'Present' | 'Absent' | 'Not marked'
  function handleMarkAttendance(memberId, status) {
    setAttendanceList((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, status: status } : m))
    );
  }

  // Calculate stats
  const presentCount = attendanceList.filter((m) => m.status === "Present").length;
  const absentCount = attendanceList.filter((m) => m.status === "Absent").length;
  const notMarkedCount = attendanceList.filter((m) => m.status === "Not marked").length;

  return (
    <div>
      <div className="page-tag">ADMIN WORKSPACE</div>
      <h1>Session management</h1>
      <p className="subtitle">
        Create sessions, review bookings and record attendance.
      </p>

      {/* Two Column Grid */}
      <div className="two-col admin-grid">
        {/* Left Column: Create a session Form */}
        <div className="card">
          <h2>Create a session</h2>
          <p className="card-desc">All fields are required.</p>

          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label>Session name</label>
              <input
                type="text"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                placeholder="e.g. Strength foundations"
                required
              />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start time</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="18:00"
                  required
                />
              </div>
              <div className="form-group">
                <label>End time</label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="19:00"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Coach</label>
              <select value={coach} onChange={(e) => setCoach(e.target.value)}>
                <option value="Alex Morgan">Alex Morgan</option>
                <option value="Jordan Davis">Jordan Davis</option>
                <option value="Priya Shah">Priya Shah</option>
                <option value="Sam Taylor">Sam Taylor</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location</label>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="Studio A">Studio A</option>
                  <option value="Studio B">Studio B</option>
                  <option value="Cycle room">Cycle room</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field-help" style={{ marginBottom: "16px" }}>
              Capacity is the maximum number of bookings. Session times are local.
            </div>

            {formSuccess && (
              <div style={{ color: "var(--green)", fontWeight: 600, fontSize: "13px", marginBottom: "10px" }}>
                ✓ {formSuccess}
              </div>
            )}

            <button type="submit" className="btn btn-primary btn-wide">
              Create session
            </button>
          </form>

          <div className="info-note">
            <span>ⓘ</span>
            <span>New sessions appear immediately on the booking page.</span>
          </div>
        </div>

        {/* Right Column: Bookings & Attendance Card */}
        <div className="card">
          <h2>Bookings & attendance</h2>
          <p className="card-desc">Choose a session to see who booked and mark who turned up.</p>

          {/* Session Selector */}
          <div className="form-group">
            <label>Session</label>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.displayDate} 2026 · {s.startTime}-{s.endTime} - {s.title}
                </option>
              ))}
            </select>
          </div>

          {/* Session Summary Bar */}
          <div className="admin-summary-bar">
            <span>Studio A · Alex Morgan</span>
            <span>8/12 booked · 4 slots available</span>
          </div>

          {/* Attendance Stats Counters */}
          <div className="attendance-counters">
            <span className="attendance-pill green">{presentCount} present</span>
            <span className="attendance-pill red">{absentCount} absent</span>
            <span className="attendance-pill">{notMarkedCount} not marked</span>
          </div>

          {/* Members Table */}
          <div className="table-container" style={{ border: "1px solid var(--border)" }}>
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Status</th>
                  <th>Mark Attendance</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div className="cell-primary">{m.name}</div>
                      <div className="cell-sub">{m.email}</div>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          m.status === "Present"
                            ? "badge-green"
                            : m.status === "Absent"
                            ? "badge-red"
                            : ""
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td>
                      <div className="attendance-btn-group">
                        <button
                          type="button"
                          className={`attendance-btn ${
                            m.status === "Present" ? "selected-present" : ""
                          }`}
                          onClick={() => handleMarkAttendance(m.id, "Present")}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          className={`attendance-btn ${
                            m.status === "Absent" ? "selected-absent" : ""
                          }`}
                          onClick={() => handleMarkAttendance(m.id, "Absent")}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Actions */}
          <div className="admin-card-actions">
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              Unmarked members won't be recorded as absent.
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {saveSuccess && (
                <span style={{ color: "var(--green)", fontSize: "13px", fontWeight: 600 }}>
                  ✓ {saveSuccess}
                </span>
              )}
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSaveSuccess("Saved!");
                  setTimeout(() => setSaveSuccess(""), 3000);
                }}
              >
                Save attendance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------------
// 8. Footer Component
// --------------------------------------------------------------------------
function Footer({ onResetData }) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <span>Gymbook · Community gym</span>
          <button
            onClick={onResetData}
            style={{
              marginLeft: "16px",
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "12px",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Reset demo data
          </button>
        </div>
        <div>Questions about a session? hello@gymbook.example</div>
      </div>
    </footer>
  );
}

// --------------------------------------------------------------------------
// 9. Helper Functions
// --------------------------------------------------------------------------
function formatDisplayDate(dateStr) {
  if (!dateStr) return "Thu, 22 Oct";
  const [y, m, d] = dateStr.split("-");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const dayName = days[dateObj.getDay()] || "Thu";
  const monthName = months[dateObj.getMonth()] || "Oct";
  return `${dayName}, ${Number(d)} ${monthName}`;
}

// --------------------------------------------------------------------------
// 10. Mount the React Application
// --------------------------------------------------------------------------
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

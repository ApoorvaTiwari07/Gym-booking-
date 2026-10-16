// db.js - SQLite Database Initialization & Queries using sql.js
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DB_PATH = path.join(__dirname, 'gym.db');
let dbInstance = null;

// Helper to hash passwords securely using PBKDF2
function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const testHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return testHash === hash;
}

// Generate random unguessable 6-char booking code
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateBookingCode() {
  let code = '';
  const bytes = crypto.randomBytes(6);
  for (let i = 0; i < 6; i++) {
    code += CHARS[bytes[i] % CHARS.length];
  }
  return code;
}

// Save database to disk
function persist() {
  if (!dbInstance) return;
  const data = dbInstance.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// Format date helper: YYYY-MM-DD
function getDateString(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + month + '-' + day;
}

async function initDB() {
  if (dbInstance) return dbInstance;
  const SQL = await initSqlJs();

  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    dbInstance = new SQL.Database(fileBuffer);
  } else {
    dbInstance = new SQL.Database();
    createTables();
    seedData();
    persist();
  }
  return dbInstance;
}

function createTables() {
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      role TEXT CHECK(role IN ('member', 'admin')) NOT NULL DEFAULT 'member',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      start_hour INTEGER NOT NULL CHECK(start_hour BETWEEN 0 AND 23),
      capacity INTEGER NOT NULL DEFAULT 20,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(date, start_hour)
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      status TEXT CHECK(status IN ('confirmed', 'cancelled')) NOT NULL DEFAULT 'confirmed',
      code TEXT UNIQUE NOT NULL,
      checked_in INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS waitlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      session_id INTEGER NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, session_id)
    );
  `);
}

function seedData() {
  const adminAuth = hashPassword('password123');
  dbInstance.run(
    'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)',
    ['Raj Yadav (Owner)', 'admin@gym.com', adminAuth.hash, adminAuth.salt, 'admin']
  );

  const krishAuth = hashPassword('password123');
  dbInstance.run(
    'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)',
    ['Krish Chhabra', 'krish.chhabra@gmail.com', krishAuth.hash, krishAuth.salt, 'member']
  );

  const priyaAuth = hashPassword('password123');
  dbInstance.run(
    'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)',
    ['Priya Tiwari', 'priya.t@gmail.com', priyaAuth.hash, priyaAuth.salt, 'member']
  );

  const arjunAuth = hashPassword('password123');
  dbInstance.run(
    'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)',
    ['Arjun Sharma', 'arjun.sharma@gmail.com', arjunAuth.hash, arjunAuth.salt, 'member']
  );


  // Additional members to fill Session 3
  for (let i = 1; i <= 20; i++) {
    const auth = hashPassword('password123');
    dbInstance.run(
      'INSERT INTO users (name, email, password_hash, salt, role) VALUES (?, ?, ?, ?, ?)',
      ['Member ' + i, 'member' + i + '@gym.com', auth.hash, auth.salt, 'member']
    );
  }

  // 3. Seed Sessions across multiple days
  const now = new Date();
  const currentHour = now.getHours();

  // Session 1: Today at current hour (for live check-in demonstration)
  dbInstance.run('INSERT INTO sessions (date, start_hour, capacity) VALUES (?, ?, ?)', [
    getDateString(0),
    currentHour,
    20,
  ]);

  // Session 2: Tomorrow at 07:00
  dbInstance.run('INSERT INTO sessions (date, start_hour, capacity) VALUES (?, ?, ?)', [
    getDateString(1),
    7,
    20,
  ]);

  // Session 3: Tomorrow at 10:00 (FULL SESSION with 20 bookings - perfect for testing waitlist!)
  dbInstance.run('INSERT INTO sessions (date, start_hour, capacity) VALUES (?, ?, ?)', [
    getDateString(1),
    10,
    20,
  ]);

  // Session 4: Day after tomorrow at 18:00
  dbInstance.run('INSERT INTO sessions (date, start_hour, capacity) VALUES (?, ?, ?)', [
    getDateString(2),
    18,
    20,
  ]);

  // Session 5: 3 days from now at 09:00
  dbInstance.run('INSERT INTO sessions (date, start_hour, capacity) VALUES (?, ?, ?)', [
    getDateString(3),
    9,
    20,
  ]);

  // 4. Seed Bookings
  // Confirmed booking for Maya today with code DEMO42
  dbInstance.run(
    'INSERT INTO bookings (user_id, session_id, status, code, checked_in) VALUES (?, ?, ?, ?, ?)',
    [2, 1, 'confirmed', 'DEMO42', 0]
  );

  // Fill Session 3 with 20 confirmed bookings
  for (let i = 1; i <= 20; i++) {
    const userId = 3 + i;
    dbInstance.run(
      'INSERT INTO bookings (user_id, session_id, status, code, checked_in) VALUES (?, ?, ?, ?, ?)',
      [userId, 3, 'confirmed', generateBookingCode(), 0]
    );
  }
}

function all(sql, params = []) {
  const stmt = dbInstance.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

function get(sql, params = []) {
  const rows = all(sql, params);
  return rows.length > 0 ? rows[0] : null;
}

function run(sql, params = []) {
  dbInstance.run(sql, params);
  const lastId = dbInstance.exec('SELECT last_insert_rowid() AS id')[0].values[0][0];
  persist();
  return { lastInsertRowid: lastId };
}

module.exports = {
  initDB,
  all,
  get,
  run,
  hashPassword,
  verifyPassword,
  generateBookingCode,
  persist,
};

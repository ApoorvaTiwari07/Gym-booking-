# Gym Slot Booking System

A full-stack gym slot booking web application built for the BYTE take-home challenge. Members can browse, book, cancel sessions, and join waitlists, while gym staff manage sessions and check members in using unique codes.

---

## Design Note (Stack & Data Model)

This application is built with a Node.js/Express REST backend, an ACID-compliant SQLite relational database (via sql.js with disk persistence), and a responsive Vanilla CSS & React frontend.
The relational data model consists of four normalized tables:
- `users` (id, name, email UNIQUE, password_hash, salt, role ['member', 'admin'])
- `sessions` (id, date, start_hour [0-23], capacity DEFAULT 20, UNIQUE(date, start_hour))
- `bookings` (id, user_id FK, session_id FK, status ['confirmed', 'cancelled'], code UNIQUE, checked_in [0/1])
- `waitlist` (id, user_id FK, session_id FK, created_at, UNIQUE(user_id, session_id))
Concurrency safety and capacity limits (max 20 confirmed bookings per session) are strictly enforced at the database query level inside transactions, preventing race conditions.

---

## Test Accounts & Credentials

The database is pre-seeded with test accounts and sessions across multiple days, including a full session with waitlist capability:

| Role | Name | Email | Password |
|---|---|---|---|
| **Admin** | MR.X (Admin) | `admin@gym.com` | `password123` |
| **Member** | Maya Chen | `maya@gym.com` | `password123` |
| **Member** | Liam Patel | `liam@gym.com` | `password123` |

*(Additional pre-seeded members `member1@gym.com` through `member20@gym.com` fill Session 3 to test the full session and waitlist behaviour immediately).*

---

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Quick Start
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <REPOSITORY_FOLDER>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Open your browser and visit:
   ```
   http://localhost:3000
   ```

The Express server serves both the backend REST API and the frontend web application seamlessly on the same port.

---

## Core Features & Business Logic

1. **Authentication & Roles**:
   - Secure registration: Full name, unique email, and hashed passwords using PBKDF2 with unique cryptographic salt.
   - Two roles: Members book for themselves; Admins manage sessions and record attendance.
   - Admin accounts are created directly in the database and can never be registered via the registration route.
   - Protected client-side and server-side routes (members cannot access admin APIs or the admin view).

2. **Session Scheduling**:
   - Sessions start on the hour (0 to 23), last exactly 1 hour, and have a capacity of 20.
   - The database enforces `UNIQUE(date, start_hour)` so two sessions can never share a start time.
   - Members can filter sessions by date and view remaining seats updating in real time.

3. **Concurrency-Safe Booking**:
   - A member can book any upcoming session that has not started and has free seats.
   - Checks active bookings count inside database transactions to ensure sessions never exceed 20 confirmed bookings even under simultaneous requests.
   - Enforces one active booking per member per session.
   - Optimistic UI updates with instant feedback and automatic rollback on error.

4. **Automatic Waitlist Promotion**:
   - When a session is full (20/20 seats), members can join its waitlist.
   - When a member cancels an upcoming booking, the first person on the waitlist is automatically promoted and assigned a confirmed booking, and their spot on the waitlist is released.
   - Nobody is promoted into a session that has already started.

5. **Cryptographic Check-in**:
   - Every confirmed booking receives a unique, unguessable 6-character alphanumeric code (e.g., `7XKP2Q`).
   - Admins enter the code to mark attendance.
   - Codes work only once, only during the session's active hour, and never for cancelled bookings.

---

## Assumptions & Design Decisions

- **Database Choice**: SQLite (`sql.js`) was chosen because it provides a genuine, ACID-compliant relational SQL database with real tables, foreign keys, and unique constraints, while allowing the project to run out-of-the-box on any reviewer's machine without requiring external Docker or cloud database setup.
- **Session Duration**: Sessions are strictly 1 hour long and start on the hour (0-23).
- **Check-in Window**: Check-in codes are valid strictly during the scheduled session hour (from start time to start time + 60 minutes).
- **Waitlist Order**: Waitlist promotion follows strict First-In, First-Out (FIFO) ordering based on waitlist entry ID / timestamp.

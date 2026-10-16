# Gymbook - Project Overview & Judge Explanation Guide

This guide is designed to help you confidently present and explain your **Gymbook** website to the judges. The code has been written using clean, standard, beginner-friendly **HTML, CSS, and React** so you can easily walk through every part of it.

---

## 1. Quick Project Summary (Elevator Pitch for Judges)

> *"Gymbook is a community gym slot-booking and attendance management web application. It solves the problem of overcrowded gym floors by allowing members to browse upcoming sessions, check real-time slot availability, and reserve their places. It also gives gym staff an admin workspace to create new sessions, monitor attendance, and mark members as Present or Absent."*

---

## 2. Key Features Implemented (Matching the Figma Mockups)

1. **Member Access (Login & Register)**:
   - Split card layout: "Welcome back" (Login) and "Create an account" (Register).
   - Form validation: Validates email format, checks for already registered emails, and requires at least 6 characters for passwords.
   - Demo accounts pre-configured for instant testing (`maya.chen@example.com` for member, `admin@gym.com` for admin).

2. **Sessions Booking Page ("Find your next session")**:
   - Schedule table showing Date & Time, Session Title, Coach, Location, and Available Slots (e.g., `4 of 12 available`).
   - Interactive filtering:
     - Date filter pills: `[Upcoming]`, `[Today]`, and `[This week]`.
     - Session type dropdown: `All sessions`, `Strength`, `HIIT`, `Yoga`, `Cycling`, `Recovery`.
   - Dynamic Booking Action:
     - Displays `Book slot` when seats are free.
     - Displays `✓ Booked` badge if the current member already reserved it.
     - Displays disabled `Full` button if capacity is reached (`0 of 10 available`).
   - Active Booking Banner: A top green alert reminding the member if they have a session booked for today.

3. **My Bookings Page**:
   - Upcoming section with calendar date blocks (`OCT 16`, `OCT 17`), session time, and coach name.
   - Status badges (`[Today]`, `[Confirmed]`).
   - Cancellation feature: Members can click `[Cancel booking]`, which automatically restores 1 seat to that session and moves it to Past Sessions as "Cancelled".
   - Past sessions table tracking attendance history (`Attended`, `Not applicable`).

4. **Admin Workspace ("Session management")**:
   - **Create a session form**: Fields for session name, date, start time, end time, coach, location, and capacity. Newly created sessions immediately appear in the Sessions schedule!
   - **Bookings & Attendance card**: Dropdown to select a session, real-time counters (`3 present`, `1 absent`, `4 not marked`), member list table with toggle buttons (`[Present]` / `[Absent]`), and a `[Save attendance]` button.

---

## 3. How the Code is Structured (Simple to Explain)

The codebase consists of three main files:
- **`index.html`**: The HTML entry point with clean semantic layout and links to styles and scripts.
- **`style.css`**: Vanilla CSS using simple flexbox, CSS grid, and CSS variables (`--green: #1f6b5a;`). No complex build tools or confusing utility classes.
- **`app.jsx`**: The core React application, neatly split into simple components:
  1. `App`: Root component holding the global state.
  2. `Header`: Navigation bar with tabs and user profile badge.
  3. `LoginPage`: Member access screen (Login & Register).
  4. `SessionsPage`: Browse sessions, filter, and book slots.
  5. `MyBookingsPage`: Upcoming cards and past history.
  6. `AdminPage`: Session creation & attendance tracking.
  7. `Footer`: Simple footer with a handy `Reset demo data` link.

---

## 4. How State Management Works (Explain This in 30 Seconds!)

In `app.jsx`, we use React's built-in `useState` hook at the top level in `App`:

```javascript
// 1. Controls which page is currently displayed ('login' | 'sessions' | 'my-bookings' | 'admin')
const [currentPage, setCurrentPage] = useState("sessions");

// 2. Stores the currently logged-in user
const [currentUser, setCurrentUser] = useState({ name: "Maya Chen", role: "member" });

// 3. Array of all gym sessions
const [sessions, setSessions] = useState(INITIAL_SESSIONS);

// 4. Array of the user's booked slots
const [myBookings, setMyBookings] = useState(INITIAL_MY_BOOKINGS);
```

### How Slot Booking Works:
```javascript
function handleBookSlot(session) {
  // If already at full capacity, do nothing
  if (session.bookedCount >= session.capacity) return;

  // 1. Increment the bookedCount in sessions state
  setSessions(prev =>
    prev.map(s => s.id === session.id ? { ...s, bookedCount: s.bookedCount + 1 } : s)
  );

  // 2. Add the session to the member's myBookings list
  setMyBookings(prev => [newBooking, ...prev]);
}
```

### Persistence with `localStorage`:
```javascript
// Every time sessions change, save to localStorage
useEffect(() => {
  localStorage.setItem("gymbook_sessions", JSON.stringify(sessions));
}, [sessions]);
```
*Why this is great for judges:* If you refresh the page or restart the browser during your presentation, your bookings and new sessions are still there!

---

## 5. Answers to Common Judge Questions

### Q1: *"Why did you use React instead of plain JavaScript?"*
> **Answer:** *"With plain JavaScript, whenever a user books a slot, we would have to manually find DOM elements by ID, update the text, change button styles, and update the banner. In React, UI is a direct reflection of state. When `bookedCount` updates, React automatically recalculates available seats and updates the button and table cleanly without messy DOM manipulation."*

### Q2: *"How does the website prevent overbooking a session?"*
> **Answer:** *"Each session object has a `capacity` and a `bookedCount`. In the table rendering, we calculate `availableSeats = capacity - bookedCount`. If `availableSeats <= 0`, React renders a disabled 'Full' button. Furthermore, in the `handleBookSlot` function, we check `if (session.bookedCount >= session.capacity) return;` so no extra booking can be registered."*

### Q3: *"How does the Admin screen communicate with the user's booking view?"*
> **Answer:** *"Both views share the same top-level `sessions` state in the `App` component. When an admin submits the 'Create a session' form, `setSessions` prepends the new session to the list. When switching back to the 'Sessions' tab, the new session is immediately visible and bookable by members."*

### Q4: *"How did you handle responsiveness?"*
> **Answer:** *"We used CSS Grid with `1fr 1fr` for desktop two-column cards, and added a `@media (max-width: 768px)` media query that stacks the columns into a single column (`grid-template-columns: 1fr`) on mobile screens."*

### Q5: *"If you had more time or a backend database, what would you add next?"*
> **Answer:** *"I would connect it to a Node.js/Express REST API with PostgreSQL/MongoDB, add JWT authentication for secure login, implement email/SMS booking confirmation reminders, and add a waitlist queue system for full sessions."*

---

## 6. How to Run the Website

### Option A: Via Local Server (Port 3000)
1. In the terminal:
   ```bash
   npm start
   ```
2. Open your browser and go to:
   ```
   http://localhost:3000
   ```

### Option B: Standalone / Offline (Direct file opening)
- You can simply double-click `frontend/index.html` in Windows Explorer or open it in Google Chrome/Edge!
- All React and Babel dependencies are cached locally in the `vendor/` folder, so it runs **100% offline** without needing an active internet connection.

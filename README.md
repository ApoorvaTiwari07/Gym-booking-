# PULSE ATHLETICS &mdash; Gym Slot Booking &amp; Facility Operations

**Location:** Shalimar Bagh, New Delhi, India  
**Timings:** 10:00 AM TO 10:00 PM (Monday &ndash; Sunday)  
**Sole Owner &amp; Director:** Raj Yadav (+91 98101 23456)  

A modern gym slot booking and operations web application. Members can browse scheduled classes, reserve slots with their real contact details (10-digit Indian phone with `+91`), cancel bookings, and view passes. The gym owner, **Raj Yadav**, oversees facility management, records member attendance, and tracks trainer shift hours and session reports.

---

## Live Deployment (Vercel)

This repository is pre-configured with `vercel.json` for static edge deployment:
- **Live URL:** [https://gym-booking-nyqw.vercel.app](https://gym-booking-nyqw.vercel.app)
- **Framework Preset:** `Other` (Static HTML/CSS/React with client-side persistence)

---

## Test Accounts &amp; Credentials

The application includes pre-seeded accounts for testing:

| Role | Name | Email | Password | Phone |
|---|---|---|---|---|
| **Gym Owner / Admin** | Raj Yadav | `admin@gym.com` | `password123` | `+91 98101 23456` |
| **Member** | Krish Chhabra | `krish.chhabra@gmail.com` | `password123` | `+91 98112 34567` |
| **Member** | Priya Tiwari | `priya.t@gmail.com` | `password123` | `+91 98765 43210` |
| **Member** | Arjun Sharma | `arjun.sharma@gmail.com` | `password123` | `+91 98234 56789` |

*Note: Any new user who creates an account on the registration page will be logged in with their own exact name, email, and 10-digit Indian mobile number.*

---

## Certified Coaching Staff (Reporting to Raj Yadav)

| Coach | Role / Speciality | Shift Timing | Weekly Hours | Rating |
|---|---|---|---|---|
| **Arjun Sharma** | Senior Strength Coach &middot; Barbell Powerlifting | 10:00 AM - 04:00 PM | 36 hrs | 4.9 ★ |
| **Priya Tiwari** | Lead Yoga &middot; Vinyasa Flow &amp; Spine Mobility | 04:00 PM - 10:00 PM | 30 hrs | 5.0 ★ |
| **Krish Chhabra** | Conditioning Coach &middot; Functional Boxing &amp; HIIT | 11:00 AM - 07:00 PM | 40 hrs | 4.8 ★ |
| **Rohan Verma** | Endurance Specialist &middot; Rhythm Indoor Cycling | 02:00 PM - 09:00 PM | 35 hrs | 4.9 ★ |

---

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Quick Start
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/ApoorvaTiwari07/Gym-booking-.git
   cd Gym-booking-
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

---

## Core Features &amp; Architecture

1. **Authentication &amp; User Profile**:
   - Real member registration capturing Full Name, Email, 10-digit Indian mobile (`+91`), training goals, and password.
   - Dynamic user session displaying the member's real name and avatar initials across the app.
   - Admin access reserved for gym owner **Raj Yadav**.

2. **Session Scheduling (10 AM &ndash; 10 PM)**:
   - All classes scheduled within the gym's daily operating hours (10:00 AM to 10:00 PM).
   - Filter by date, category (Strength, HIIT, Yoga, Cycling), or slot availability.

3. **Slot Booking Modal**:
   - Interactive booking popup capturing Attendee Full Name, Email, Phone, and optional workout/health notes for the coach.
   - Real-time seat decrementing and unique pass code generation (e.g. `PA-7102`).

4. **Owner Management &amp; Trainer Reports**:
   - Raj Yadav oversees facility operations and trainer shift reports.
   - Tracks weekly shift hours, sessions taken, and client feedback for each coach.
   - Session roster tool to mark members as **Present** or **Absent**.

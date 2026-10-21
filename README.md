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

*Note: Enrolling as a gym member hides the Admin bar completely; only the gym owner (Raj Yadav) can view and access the Admin Operations page.*

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

1. **Authentication & Role-Based Access Control**:
   - Real member enrollment capturing Full Name, Email, 10-digit Indian mobile (`+91`), training goals, and password.
   - **Admin Bar Restriction**: The Admin navigation bar and operations dashboard are strictly hidden from regular enrolled members and only accessible to gym owner **Raj Yadav**.
   - Typewriter font (**Courier Prime**) with a clean, high-contrast **black and white** color palette for an authentic human-typed aesthetic.

2. **Session Scheduling (10 AM &ndash; 10 PM)**:
   - All classes scheduled within the gym's daily operating hours (10:00 AM to 10:00 PM).
   - Displayed cleanly in chronological order for effortless schedule browsing.

3. **1-Click Slot Booking**:
   - Single-click instant slot confirmation for signed-in members with zero unnecessary forms.
   - Fast attendee confirmation for guests with no health notes required.
   - Real-time seat decrementing and unique pass code generation (e.g. `PA-7102`).

4. **Owner Management &amp; Trainer Reports**:
   - Raj Yadav oversees facility operations and trainer shift reports.
   - Tracks weekly shift hours, sessions taken, and client feedback for each coach.
   - Session roster tool to mark members as **Present** or **Absent**.

5. **Supabase Cloud Database Backend**:
   - Integrated with Supabase PostgreSQL cloud database (`https://xtmajkghfaanuxlmxqil.supabase.co`).
   - Automatically saves any new user who registers or signs in into the `users` table.
   - Pre-configured in `supabaseConfig.js` and `supabaseClient.js`.
   - Includes simple 1-click table setup script in `supabase_setup.sql`.
   - Safe and reliable with seamless local fallback so the website always runs smoothly.

---

## Supabase Database Setup (1 Minute)

To create the `users` table in your Supabase project:
1. Open your Supabase project dashboard: [https://supabase.com/dashboard/project/xtmajkghfaanuxlmxqil](https://supabase.com/dashboard/project/xtmajkghfaanuxlmxqil)
2. Click **SQL Editor** in the left sidebar.
3. Open `supabase_setup.sql` from this repository, copy the SQL, paste it in the editor, and click **Run**.
4. That's it! Any new user who logs in or registers on the website will now be stored in your Supabase database.

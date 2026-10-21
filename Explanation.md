# Pulse Athletics - Project Overview & Evaluation Guide

A walkthrough of the **Pulse Athletics** website. Built using clean, modern **HTML, CSS, and React** with zero unnecessary dependencies, providing a fast, human-designed experience.

**Facility:** PULSE ATHLETICS, Shalimar Bagh, New Delhi, India  
**Timings:** 10:00 AM TO 10:00 PM (Daily)  
**Sole Owner & Director:** Raj Yadav (+91 98101 23456)  

---

## 1. Quick Project Summary

> *"Pulse Athletics is a gym slot-booking and facility management platform built for our training center in Shalimar Bagh, New Delhi. It allows members to register with real details, browse classes scheduled between 10:00 AM and 10:00 PM, and reserve slots with verified Indian phone numbers (+91). It gives the gym owner, Raj Yadav, full administrative control over class attendances, facility operations, and trainer shift hours."*

---

## 2. Key Modules Implemented

1. **Member Access & Real Registration**:
   - Split card layout: Sign In and Register.
   - Captures **Full Name**, **Email Address**, **10-digit Indian Mobile Number (+91)**, training goal, and password.
   - When a member registers, their real name and initials appear immediately in the top navigation profile badge and on their booking passes.

2. **Classes & Schedule (10 AM &ndash; 10 PM)**:
   - Schedule table showing class times, session names, certified coaches, locations (Studio A, Studio B, Cycle Arena), and seat availability.
   - Interactive filters: Category dropdown (Strength, HIIT, Yoga, Cycling) and date pills (All, Today, Available).
   - Real-time seat updates and booking modals capturing attendee contact info.

3. **My Bookings Screen**:
   - Confirmed class reservations with unique pass codes (e.g. `PA-7102`).
   - One-click cancellation automatically restores available seats to the session.
   - Past session attendance history.

4. **Raj Yadav (Owner & Admin Dashboard)**:
   - **Owner Profile**: Shows Raj Yadav as sole owner, facility address in Shalimar Bagh, direct phone, and live KPIs.
   - **Trainer Shift & Hours Report**: Tracks weekly hours (e.g. 36 hrs/week), assigned shifts between 10 AM to 10 PM, sessions taken, and ratings for Arjun Sharma, Priya Tiwari, Krish Chhabra, and Rohan Verma.
   - **Attendance Tracking**: Live check-in system with "Present" and "Absent" toggles.
   - **Schedule Class**: Add new sessions within gym timings (10 AM to 10 PM) assigning from registered coaches.

5. **Supabase Cloud Database Backend**:
   - Integrated with Supabase PostgreSQL database (`https://xtmajkghfaanuxlmxqil.supabase.co`).
   - Automatically saves and syncs new member registrations and logins to the `users` table.
   - Zero-dependency client via official Supabase CDN, working on both static edge (Vercel) and local Node.js.
   - Safe dual-mode operation: synchronizes with Supabase while gracefully falling back to local state if offline.

---

## 3. Tech Stack & File Structure

- **`index.html`**: Semantic HTML5 markup, Courier Prime typewriter font from Google Fonts, Supabase client script, and React 18 client bundle.
- **`style.css`**: Strict black-and-white minimalist design system with human-typed Courier Prime typography and high-contrast responsive layouts.
- **`app.jsx`**: Modular React application managing client-side state, Supabase auth syncing, owner-only admin route guarding, and local persistence.
- **`supabaseConfig.js`**: Clean, human-readable Supabase URL and Publishable Key configuration.
- **`supabaseClient.js`**: Helper methods (`saveUserToSupabase`, `fetchUsersFromSupabase`, `findUserInSupabase`) to interact with Supabase tables.
- **`supabase_setup.sql`**: Simple 1-click SQL script to create the `users` table and policies in the Supabase SQL editor.
- **`vercel.json`**: Static edge deployment configuration for zero-cold-start web hosting.
- **`server.js` & `db.js`**: Node.js/Express REST server with SQLite database and Supabase syncing for optional local full-stack execution.


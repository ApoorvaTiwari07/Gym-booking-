const { useState, useEffect } = React;

const INITIAL_USERS = [
  { id: 1, name: "Raj Yadav", email: "admin@gym.com", phone: "+91 98101 23456", role: "admin", goal: "Gym Owner & Director" },
  { id: 2, name: "Krish Chhabra", email: "krish.chhabra@gmail.com", phone: "+91 98112 34567", role: "member", goal: "HIIT & Agility" },
  { id: 3, name: "Priya Tiwari", email: "priya.t@gmail.com", phone: "+91 98765 43210", role: "member", goal: "Yoga & Flexibility" },
  { id: 4, name: "Arjun Sharma", email: "arjun.sharma@gmail.com", phone: "+91 98234 56789", role: "member", goal: "Strength & Power" }
];

const INITIAL_TRAINERS = [
  {
    id: 1,
    name: "Arjun Sharma",
    role: "Senior Strength Coach",
    email: "arjun@pulseathletics.in",
    phone: "+91 98234 56789",
    specialty: "Powerlifting & Barbell Hypertrophy",
    shift: "10:00 AM - 04:00 PM",
    weeklyHours: 36,
    sessionsTakenWeek: 12,
    rating: "4.9 ★",
    bio: "Certified strength specialist leading heavy compound lifts and progressive overload programming."
  },
  {
    id: 2,
    name: "Priya Tiwari",
    role: "Lead Yoga & Mobility Coach",
    email: "priya@pulseathletics.in",
    phone: "+91 98765 43210",
    specialty: "Vinyasa Flow, Spine Rehab & Mobility",
    shift: "04:00 PM - 10:00 PM",
    weeklyHours: 30,
    sessionsTakenWeek: 10,
    rating: "5.0 ★",
    bio: "Focuses on athletic mobility, injury rehabilitation, and deep functional flexibility."
  },
  {
    id: 3,
    name: "Krish Chhabra",
    role: "Conditioning & Boxing Coach",
    email: "krish@pulseathletics.in",
    phone: "+91 98112 34567",
    specialty: "HIIT, Functional Boxing & Agility",
    shift: "11:00 AM - 07:00 PM",
    weeklyHours: 40,
    sessionsTakenWeek: 14,
    rating: "4.8 ★",
    bio: "High-energy coach specializing in speed, core strength, combat conditioning, and cardio endurance."
  },
  {
    id: 4,
    name: "Rohan Verma",
    role: "Indoor Cycling & Cardio Specialist",
    email: "rohan@pulseathletics.in",
    phone: "+91 98991 23456",
    specialty: "Rhythm Cycling & VO2 Max Endurance",
    shift: "02:00 PM - 09:00 PM",
    weeklyHours: 35,
    sessionsTakenWeek: 11,
    rating: "4.9 ★",
    bio: "Certified endurance trainer guiding rhythm-based cadence cycling and stamina building."
  }
];

const INITIAL_SESSIONS = [
  {
    id: 1,
    title: "Strength Foundations",
    coach: "Arjun Sharma",
    date: "2026-10-17",
    displayDate: "Sat, 17 Oct",
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    location: "Studio A (Weights)",
    category: "Strength",
    capacity: 12,
    bookedCount: 8
  },
  {
    id: 2,
    title: "Combat Conditioning & HIIT",
    coach: "Krish Chhabra",
    date: "2026-10-17",
    displayDate: "Sat, 17 Oct",
    startTime: "12:00 PM",
    endTime: "01:00 PM",
    location: "Studio B (Functional)",
    category: "HIIT",
    capacity: 10,
    bookedCount: 7
  },
  {
    id: 3,
    title: "Vinyasa Mobility & Spine Reset",
    coach: "Priya Tiwari",
    date: "2026-10-17",
    displayDate: "Sat, 17 Oct",
    startTime: "05:00 PM",
    endTime: "06:00 PM",
    location: "Studio A (Recovery)",
    category: "Yoga",
    capacity: 15,
    bookedCount: 9
  },
  {
    id: 4,
    title: "Endurance Cycle Tempo",
    coach: "Rohan Verma",
    date: "2026-10-17",
    displayDate: "Sat, 17 Oct",
    startTime: "07:00 PM",
    endTime: "08:00 PM",
    location: "Cycle Arena",
    category: "Cycling",
    capacity: 12,
    bookedCount: 12
  },
  {
    id: 5,
    title: "Upper Body Hypertrophy",
    coach: "Arjun Sharma",
    date: "2026-10-18",
    displayDate: "Sun, 18 Oct",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    location: "Studio A (Weights)",
    category: "Strength",
    capacity: 12,
    bookedCount: 4
  },
  {
    id: 6,
    title: "Evening High-Intensity Burn",
    coach: "Krish Chhabra",
    date: "2026-10-18",
    displayDate: "Sun, 18 Oct",
    startTime: "08:00 PM",
    endTime: "09:00 PM",
    location: "Studio B (Functional)",
    category: "HIIT",
    capacity: 10,
    bookedCount: 2
  }
];

const INITIAL_ALL_BOOKINGS = [
  {
    id: 101,
    bookingCode: "PA-7102",
    sessionId: 1,
    title: "Strength Foundations",
    coach: "Arjun Sharma",
    userName: "Krish Chhabra",
    userEmail: "krish.chhabra@gmail.com",
    userPhone: "+91 98112 34567",
    notes: "Focusing on overhead press and bench form",
    month: "OCT",
    day: "17",
    fullDate: "Saturday, 17 October 2026",
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    location: "Studio A (Weights)",
    isToday: true,
    status: "Confirmed",
    attendance: "Present"
  },
  {
    id: 102,
    bookingCode: "PA-7103",
    sessionId: 1,
    title: "Strength Foundations",
    coach: "Arjun Sharma",
    userName: "Priya Tiwari",
    userEmail: "priya.t@gmail.com",
    userPhone: "+91 98765 43210",
    notes: "Warm-up wrist stretch needed",
    month: "OCT",
    day: "17",
    fullDate: "Saturday, 17 October 2026",
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    location: "Studio A (Weights)",
    isToday: true,
    status: "Confirmed",
    attendance: "Present"
  },
  {
    id: 103,
    bookingCode: "PA-7104",
    sessionId: 1,
    title: "Strength Foundations",
    coach: "Arjun Sharma",
    userName: "Arjun Sharma",
    userEmail: "arjun.sharma@gmail.com",
    userPhone: "+91 98234 56789",
    notes: "",
    month: "OCT",
    day: "17",
    fullDate: "Saturday, 17 October 2026",
    startTime: "10:30 AM",
    endTime: "11:30 AM",
    location: "Studio A (Weights)",
    isToday: true,
    status: "Confirmed",
    attendance: "Not marked"
  }
];

const INITIAL_PAST_SESSIONS = [
  {
    id: 201,
    date: "Thu, 15 Oct · 11:00 AM - 12:00 PM",
    title: "Strength Foundations",
    status: "Completed",
    attendance: "Attended"
  },
  {
    id: 202,
    date: "Tue, 13 Oct · 06:00 PM - 07:00 PM",
    title: "Combat Conditioning & HIIT",
    status: "Completed",
    attendance: "Attended"
  }
];

function formatIndianPhone(raw) {
  if (!raw) return "";
  const cleaned = raw.replace(/[^\d]/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length > 10 && cleaned.startsWith("91")) {
    const num = cleaned.slice(2);
    return `+91 ${num.slice(0, 5)} ${num.slice(5, 10)}`;
  }
  return raw.startsWith("+91") ? raw : `+91 ${raw}`;
}

function App() {
  const [currentPage, setCurrentPage] = useState("sessions");

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("pa_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("pa_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("pa_sessions");
    return saved ? JSON.parse(saved) : INITIAL_SESSIONS;
  });

  const [trainers, setTrainers] = useState(() => {
    const saved = localStorage.getItem("pa_trainers");
    return saved ? JSON.parse(saved) : INITIAL_TRAINERS;
  });

  const [allBookings, setAllBookings] = useState(() => {
    const saved = localStorage.getItem("pa_all_bookings");
    return saved ? JSON.parse(saved) : INITIAL_ALL_BOOKINGS;
  });

  const [pastSessions, setPastSessions] = useState(() => {
    const saved = localStorage.getItem("pa_past");
    return saved ? JSON.parse(saved) : INITIAL_PAST_SESSIONS;
  });

  const [selectedSessionForBooking, setSelectedSessionForBooking] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("pa_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("pa_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("pa_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("pa_sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("pa_trainers", JSON.stringify(trainers));
  }, [trainers]);

  useEffect(() => {
    localStorage.setItem("pa_all_bookings", JSON.stringify(allBookings));
  }, [allBookings]);

  useEffect(() => {
    localStorage.setItem("pa_past", JSON.stringify(pastSessions));
  }, [pastSessions]);

  function showToast(message, type = "success") {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }

  function handleRegisterUser(newUserData) {
    const trimmedEmail = newUserData.email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { success: false, error: "An account with this email address already exists." };
    }

    const formattedPhone = formatIndianPhone(newUserData.phone);
    const created = {
      id: Date.now(),
      name: newUserData.name.trim(),
      email: trimmedEmail,
      phone: formattedPhone,
      goal: newUserData.goal || "General Strength & Fitness",
      role: trimmedEmail === "admin@gym.com" || trimmedEmail.includes("owner") ? "admin" : "member"
    };

    setUsers((prev) => [...prev, created]);
    setCurrentUser(created);
    setCurrentPage(created.role === "admin" ? "admin" : "sessions");
    showToast(`Welcome, ${created.name}! Your account is now active.`);
    return { success: true };
  }

  function handleLoginUser(email, password) {
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (foundUser) {
      setCurrentUser(foundUser);
      setCurrentPage(foundUser.role === "admin" ? "admin" : "sessions");
      showToast(`Logged in as ${foundUser.name}`);
      return { success: true };
    }

    if (trimmedEmail === "admin@gym.com" || trimmedEmail.includes("raj")) {
      const ownerUser = {
        id: 1,
        name: "Raj Yadav",
        email: "admin@gym.com",
        phone: "+91 98101 23456",
        role: "admin",
        goal: "Gym Owner & Director"
      };
      setCurrentUser(ownerUser);
      setCurrentPage("admin");
      showToast("Signed in as Gym Owner (Raj Yadav).");
      return { success: true };
    }

    return {
      success: false,
      error: "Account not found with this email. Please register on the right side."
    };
  }

  function handleLogout() {
    setCurrentUser(null);
    setCurrentPage("sessions");
    showToast("You have been signed out.");
  }

  function handleOpenBookingModal(session) {
    if (session.bookedCount >= session.capacity) {
      showToast("This session has reached capacity.", "error");
      return;
    }
    setSelectedSessionForBooking(session);
  }

  function handleConfirmBooking(bookingFormData) {
    const session = selectedSessionForBooking;
    if (!session) return;

    if (session.bookedCount >= session.capacity) {
      showToast("Session is already full.", "error");
      setSelectedSessionForBooking(null);
      return;
    }

    setSessions((prev) =>
      prev.map((s) => (s.id === session.id ? { ...s, bookedCount: s.bookedCount + 1 } : s))
    );

    const bookingCode = `PA-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedPhone = formatIndianPhone(bookingFormData.phone);

    const newBooking = {
      id: Date.now(),
      bookingCode,
      sessionId: session.id,
      title: session.title,
      coach: session.coach,
      userName: bookingFormData.name.trim(),
      userEmail: bookingFormData.email.trim(),
      userPhone: formattedPhone,
      notes: bookingFormData.notes || "",
      month: session.displayDate.split(" ")[2] ? session.displayDate.split(" ")[2].toUpperCase() : "OCT",
      day: session.displayDate.split(" ")[1] || "17",
      fullDate: `${session.displayDate} 2026`,
      startTime: session.startTime,
      endTime: session.endTime,
      location: session.location,
      isToday: session.displayDate.includes("17"),
      status: "Confirmed",
      attendance: "Not marked"
    };

    setAllBookings((prev) => [newBooking, ...prev]);

    if (!currentUser) {
      const guestMember = {
        id: Date.now(),
        name: bookingFormData.name.trim(),
        email: bookingFormData.email.trim(),
        phone: formattedPhone,
        role: "member",
        goal: "General Fitness"
      };
      setUsers((prev) => [...prev, guestMember]);
      setCurrentUser(guestMember);
    }

    setSelectedSessionForBooking(null);
    showToast(`Slot booked for ${bookingFormData.name}! Ref: ${bookingCode}`);
  }

  function handleCancelBooking(bookingId, sessionId) {
    const bookingToCancel = allBookings.find((b) => b.id === bookingId);
    if (!bookingToCancel) return;

    setAllBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Cancelled", attendance: "Cancelled" } : b))
    );

    setSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId ? { ...s, bookedCount: Math.max(0, s.bookedCount - 1) } : s
      )
    );

    setPastSessions((prev) => [
      {
        id: Date.now(),
        date: `${bookingToCancel.fullDate} · ${bookingToCancel.startTime} - ${bookingToCancel.endTime}`,
        title: bookingToCancel.title,
        status: "Cancelled",
        attendance: "Not applicable"
      },
      ...prev
    ]);

    showToast("Booking cancelled and slot released.");
  }

  function handleCreateSession(sessionData) {
    const newSession = {
      id: Date.now(),
      title: sessionData.title.trim(),
      date: sessionData.date,
      displayDate: formatDisplayDate(sessionData.date),
      startTime: sessionData.startTime,
      endTime: sessionData.endTime,
      coach: sessionData.coach,
      location: sessionData.location,
      capacity: Number(sessionData.capacity),
      bookedCount: 0,
      category: sessionData.category
    };

    setSessions((prev) => [newSession, ...prev]);
    showToast(`Class "${newSession.title}" added to schedule!`);
  }

  function handleAddTrainer(newTrainerData) {
    const newTrainer = {
      id: Date.now(),
      name: newTrainerData.name.trim(),
      role: newTrainerData.role.trim() || "Trainer & Coach",
      email: newTrainerData.email.trim(),
      phone: formatIndianPhone(newTrainerData.phone),
      specialty: newTrainerData.specialty.trim(),
      shift: newTrainerData.shift || "10:00 AM - 06:00 PM",
      weeklyHours: Number(newTrainerData.weeklyHours) || 36,
      sessionsTakenWeek: 0,
      rating: "5.0 ★",
      bio: newTrainerData.bio.trim() || "Certified fitness instructor at Pulse Athletics, Shalimar Bagh."
    };

    setTrainers((prev) => [...prev, newTrainer]);
    showToast(`Coach ${newTrainer.name} registered under Raj Yadav.`);
  }

  function handleMarkAttendance(bookingId, status) {
    setAllBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, attendance: status } : b))
    );
  }

  const userBookings = currentUser
    ? allBookings.filter(
        (b) =>
          b.userEmail.toLowerCase() === currentUser.email.toLowerCase() &&
          b.status === "Confirmed"
      )
    : [];

  return (
    <div>
      <div className="topbar-announcement">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="timing-indicator">
            <span className="timing-dot"></span>
            TIMINGS: 10:00 AM TO 10:00 PM (DAILY)
          </span>
          <span className="location-tag">
            📍 Shalimar Bagh, New Delhi, India
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "#9ca3af" }}>
          Owner & Director: <strong>Raj Yadav</strong> &middot; +91 98101 23456
        </div>
      </div>

      <Navigation
        currentUser={currentUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
        myBookingsCount={userBookings.length}
      />

      <main className="container">
        {currentPage === "login" && (
          <LoginPage
            onLogin={handleLoginUser}
            onRegister={handleRegisterUser}
          />
        )}

        {currentPage === "sessions" && (
          <SessionsPage
            sessions={sessions}
            userBookings={userBookings}
            onBookSlot={handleOpenBookingModal}
            onGoToMyBookings={() => setCurrentPage("my-bookings")}
          />
        )}

        {currentPage === "my-bookings" && (
          <MyBookingsPage
            currentUser={currentUser}
            userBookings={userBookings}
            pastSessions={pastSessions}
            onCancelBooking={handleCancelBooking}
            onBrowseSessions={() => setCurrentPage("sessions")}
            onGoToLogin={() => setCurrentPage("login")}
          />
        )}

        {currentPage === "admin" && (
          <AdminPage
            sessions={sessions}
            trainers={trainers}
            allBookings={allBookings}
            onCreateSession={handleCreateSession}
            onAddTrainer={handleAddTrainer}
            onMarkAttendance={handleMarkAttendance}
          />
        )}
      </main>

      {selectedSessionForBooking && (
        <BookingModal
          session={selectedSessionForBooking}
          currentUser={currentUser}
          onClose={() => setSelectedSessionForBooking(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.type === "success" ? "✓" : "⚠"}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

function Navigation({ currentUser, currentPage, setCurrentPage, onLogout, myBookingsCount }) {
  const initials = currentUser
    ? currentUser.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand-section">
          <div className="logo" onClick={() => setCurrentPage("sessions")}>
            <span className="brand-title">PULSE ATHLETICS</span>
            <span className="brand-subtitle">Shalimar Bagh &middot; New Delhi</span>
          </div>

          <nav className="nav-links">
            <button
              className={`nav-link ${currentPage === "sessions" ? "active" : ""}`}
              onClick={() => setCurrentPage("sessions")}
            >
              Classes & Schedule
            </button>
            <button
              className={`nav-link ${currentPage === "my-bookings" ? "active" : ""}`}
              onClick={() => setCurrentPage("my-bookings")}
            >
              My Bookings {myBookingsCount > 0 && `(${myBookingsCount})`}
            </button>
            <button
              className={`nav-link ${currentPage === "admin" ? "active" : ""}`}
              onClick={() => setCurrentPage("admin")}
            >
              Gym Owner & Admin
            </button>
          </nav>
        </div>

        <div className="topbar-right">
          {currentUser ? (
            <div className="user-badge">
              <span className="avatar-circle">{initials}</span>
              <div className="user-meta">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role-tag">{currentUser.role === "admin" ? "Owner (Raj Yadav)" : "Member"}</span>
              </div>
              <button className="signout-btn" onClick={onLogout}>
                Sign out
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => setCurrentPage("login")}
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function LoginPage({ onLogin, onRegister }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regGoal, setRegGoal] = useState("Strength & Muscle");
  const [regPassword, setRegPassword] = useState("");
  const [regError, setRegError] = useState("");

  function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginError("");
    const res = onLogin(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.error);
    }
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    setRegError("");

    if (!regName.trim() || regName.trim().length < 2) {
      setRegError("Please enter your full name.");
      return;
    }

    if (!regEmail.trim() || !/^\S+@\S+\.\S+$/.test(regEmail)) {
      setRegError("Please enter a valid email address.");
      return;
    }

    const cleanPhone = regPhone.replace(/[^\d]/g, "");
    if (cleanPhone.length < 10) {
      setRegError("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!regPassword || regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }

    const res = onRegister({
      name: regName,
      email: regEmail,
      phone: regPhone,
      goal: regGoal,
      password: regPassword
    });

    if (!res.success) {
      setRegError(res.error);
    }
  }

  function fillDemoAccount(email, password) {
    setLoginEmail(email);
    setLoginPassword(password);
    setLoginError("");
  }

  return (
    <div>
      <div className="page-tag">PULSE ATHLETICS MEMBER ACCESS</div>
      <h1>Member &amp; Staff Portal</h1>
      <p className="subtitle">
        Sign in to your member account, or register with your real details to book classes at Shalimar Bagh.
      </p>

      <div className="two-col">
        <div className="card">
          <h2>Member Sign In</h2>
          <p className="card-desc">Enter your registered email and password.</p>

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                  setLoginError("");
                }}
                placeholder="e.g. krish.chhabra@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                  setLoginError("");
                }}
                placeholder="••••••••••••"
                required
              />
            </div>

            {loginError && <div className="field-error" style={{ marginBottom: "12px" }}>{loginError}</div>}

            <button type="submit" className="btn btn-primary btn-wide">
              Sign In
            </button>
          </form>

          <div className="demo-switchers">
            <div className="demo-switchers-title">Test Accounts:</div>
            <div className="demo-buttons-group">
              <button
                type="button"
                className="demo-btn"
                onClick={() => fillDemoAccount("admin@gym.com", "password123")}
              >
                Raj Yadav (Gym Owner)
              </button>
              <button
                type="button"
                className="demo-btn"
                onClick={() => fillDemoAccount("krish.chhabra@gmail.com", "password123")}
              >
                Krish Chhabra (Member)
              </button>
              <button
                type="button"
                className="demo-btn"
                onClick={() => fillDemoAccount("priya.t@gmail.com", "password123")}
              >
                Priya Tiwari (Member)
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Create Your Account</h2>
          <p className="card-desc">Your real name and phone will be linked to your bookings.</p>

          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => {
                  setRegName(e.target.value);
                  setRegError("");
                }}
                placeholder="e.g. Arjun Sharma"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => {
                  setRegEmail(e.target.value);
                  setRegError("");
                }}
                placeholder="e.g. arjun.sharma@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number (10 digits)</label>
              <div className="input-with-prefix">
                <span className="input-prefix">+91</span>
                <input
                  type="tel"
                  maxLength="10"
                  value={regPhone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^\d]/g, "");
                    setRegPhone(digits);
                    setRegError("");
                  }}
                  placeholder="98765 43210"
                  required
                />
              </div>
              <div className="field-help">10-digit Indian phone number for booking updates.</div>
            </div>

            <div className="form-group">
              <label>Primary Fitness Goal</label>
              <select value={regGoal} onChange={(e) => setRegGoal(e.target.value)}>
                <option value="Strength & Powerlifting">Strength & Powerlifting</option>
                <option value="HIIT & Combat Conditioning">HIIT & Combat Conditioning</option>
                <option value="Yoga & Mobility Rehab">Yoga & Mobility Rehab</option>
                <option value="Indoor Cycling & Stamina">Indoor Cycling & Stamina</option>
                <option value="Fat Loss & Overall Fitness">Fat Loss & Overall Fitness</option>
              </select>
            </div>

            <div className="form-group">
              <label>Create Password</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => {
                  setRegPassword(e.target.value);
                  setRegError("");
                }}
                placeholder="Minimum 6 characters"
                required
              />
            </div>

            {regError && <div className="field-error" style={{ marginBottom: "12px" }}>{regError}</div>}

            <button type="submit" className="btn btn-primary btn-wide">
              Register &amp; Start Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function SessionsPage({ sessions, userBookings, onBookSlot, onGoToMyBookings }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const bookedSessionIds = new Set(userBookings.map((b) => b.sessionId));

  const filteredSessions = sessions.filter((s) => {
    if (selectedType !== "all" && s.category !== selectedType) {
      return false;
    }
    if (activeFilter === "today") {
      return s.displayDate.includes("17");
    }
    if (activeFilter === "available") {
      return s.capacity - s.bookedCount > 0;
    }
    return true;
  });

  return (
    <div>
      <div className="timing-hero-card">
        <div className="timing-hero-left">
          <div className="timing-icon-circle">⏰</div>
          <div>
            <div className="timing-hero-title">Gym Timings: 10:00 AM TO 10:00 PM</div>
            <div className="timing-hero-sub">
              PULSE ATHLETICS &middot; Shalimar Bagh, New Delhi &middot; All sessions supervised by certified trainers
            </div>
          </div>
        </div>
        <span className="timing-hours-badge">OPEN 10 AM - 10 PM</span>
      </div>

      <div className="page-tag">TRAINING SCHEDULE</div>
      <h1>Reserve Workout Slots</h1>
      <p className="subtitle">
        Select a class, confirm your attendee details, and get your booking pass.
      </p>

      {userBookings.length > 0 && (
        <div className="alert-banner">
          <div className="alert-message">
            <span>✓</span>
            <span>You have {userBookings.length} confirmed upcoming {userBookings.length === 1 ? "booking" : "bookings"}.</span>
          </div>
          <button className="alert-link" onClick={onGoToMyBookings}>
            View my schedule →
          </button>
        </div>
      )}

      <div className="filters-bar">
        <div className="filter-pills">
          <button
            className={`filter-pill ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Sessions
          </button>
          <button
            className={`filter-pill ${activeFilter === "today" ? "active" : ""}`}
            onClick={() => setActiveFilter("today")}
          >
            Today (Sat, 17 Oct)
          </button>
          <button
            className={`filter-pill ${activeFilter === "available" ? "active" : ""}`}
            onClick={() => setActiveFilter("available")}
          >
            Available Slots Only
          </button>
        </div>

        <div className="filter-type">
          <label htmlFor="sessionType" style={{ margin: 0 }}>Category:</label>
          <select
            id="sessionType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Strength">Strength</option>
            <option value="HIIT">HIIT</option>
            <option value="Yoga">Yoga</option>
            <option value="Cycling">Cycling</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Session &amp; Coach</th>
              <th>Studio Location</th>
              <th>Availability</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((s) => {
              const isBooked = bookedSessionIds.has(s.id);
              const availableSeats = s.capacity - s.bookedCount;
              const isFull = availableSeats <= 0;

              return (
                <tr key={s.id}>
                  <td>
                    <div className="cell-primary">{s.displayDate}</div>
                    <div className="cell-sub">{s.startTime} - {s.endTime}</div>
                  </td>

                  <td>
                    <div className="cell-primary">{s.title}</div>
                    <div className="cell-sub">Coach {s.coach} &middot; {s.category}</div>
                  </td>

                  <td>
                    <span className="badge badge-outline">{s.location}</span>
                  </td>

                  <td>
                    <div className="cell-primary">
                      {availableSeats} / {s.capacity} spots left
                    </div>
                    <div className="cell-sub">{s.bookedCount} registered</div>
                  </td>

                  <td>
                    {isBooked ? (
                      <span className="badge badge-green">✓ Reserved</span>
                    ) : isFull ? (
                      <button className="btn btn-disabled" disabled>
                        Full
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => onBookSlot(s)}
                      >
                        Book Slot
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="table-footer">
          <span>{filteredSessions.length} sessions listed &middot; All times are IST (10 AM - 10 PM)</span>
          <span>Location: Shalimar Bagh Facility</span>
        </div>
      </div>
    </div>
  );
}

function BookingModal({ session, currentUser, onClose, onConfirm }) {
  const [name, setName] = useState(currentUser ? currentUser.name : "");
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");
  const [phone, setPhone] = useState(() => {
    if (currentUser && currentUser.phone) {
      return currentUser.phone.replace("+91", "").trim();
    }
    return "";
  });
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  const availableSeats = session.capacity - session.bookedCount;

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    const cleanPhone = phone.replace(/[^\d]/g, "");
    if (cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    onConfirm({ name, email, phone: cleanPhone, notes });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">Confirm Slot Reservation</div>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="modal-session-pill">
            <div className="modal-session-title">{session.title}</div>
            <div className="modal-session-details">
              {session.displayDate} &middot; {session.startTime} - {session.endTime} &middot; {session.location} with Coach {session.coach}
            </div>
            <div style={{ fontSize: "11px", color: "var(--primary)", marginTop: "4px", fontWeight: 700 }}>
              {availableSeats} slots remaining &middot; Facility: Shalimar Bagh
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Attendee Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError("");
                }}
                placeholder="e.g. Krish Chhabra"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFormError("");
                }}
                placeholder="e.g. krish.chhabra@gmail.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number (10 digits)</label>
              <div className="input-with-prefix">
                <span className="input-prefix">+91</span>
                <input
                  type="tel"
                  maxLength="10"
                  value={phone}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^\d]/g, "");
                    setPhone(digits);
                    setFormError("");
                  }}
                  placeholder="98112 34567"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Workout / Health Notes (Optional)</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Beginner, prior lower back stiffness, wrist strap request"
              />
              <div className="field-help">Shared with Coach {session.coach} before session starts.</div>
            </div>

            {formError && <div className="field-error" style={{ marginBottom: "12px" }}>{formError}</div>}

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Confirm Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function MyBookingsPage({ currentUser, userBookings, pastSessions, onCancelBooking, onBrowseSessions, onGoToLogin }) {
  if (!currentUser) {
    return (
      <div className="card" style={{ textAlign: "center", padding: "48px 24px" }}>
        <h2>Sign In to View Your Schedule</h2>
        <p className="card-desc">Log in or create an account with your real details to manage booked classes.</p>
        <button className="btn btn-primary" onClick={onGoToLogin}>
          Sign in / Register
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1>My Reserved Sessions</h1>
          <p className="subtitle">
            Attendee: <strong>{currentUser.name}</strong> ({currentUser.email}) &middot; Phone: {currentUser.phone}
          </p>
        </div>
        <button className="btn btn-outline" onClick={onBrowseSessions}>
          Browse More Classes
        </button>
      </div>

      <div className="section-header">
        <div className="section-title">
          <span>Upcoming Sessions</span>
          <span className="badge badge-teal">{userBookings.length} confirmed</span>
        </div>
      </div>

      {userBookings.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "36px" }}>
          <p className="card-desc">You do not have any active class reservations right now.</p>
          <button className="btn btn-primary" onClick={onBrowseSessions}>
            Book a Class
          </button>
        </div>
      ) : (
        userBookings.map((b) => (
          <div className="booking-card" key={b.id}>
            <div className="booking-left">
              <div className="date-box">
                <span className="date-box-month">{b.month}</span>
                <span className="date-box-day">{b.day}</span>
              </div>

              <div className="booking-details">
                <h3>{b.title}</h3>
                <div className="booking-time">
                  {b.fullDate} &middot; {b.startTime} - {b.endTime}
                </div>
                <div className="booking-location">
                  {b.location} &middot; Coach {b.coach} &middot; Pass Ref: <strong>{b.bookingCode}</strong>
                </div>
                {b.notes && (
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px" }}>
                    Notes: {b.notes}
                  </div>
                )}
              </div>
            </div>

            <div className="booking-right">
              {b.isToday && <span className="badge badge-teal">Today</span>}
              <span className="badge badge-green">Confirmed</span>
              <button
                className="btn btn-outline btn-sm"
                onClick={() => onCancelBooking(b.id, b.sessionId)}
              >
                Cancel Slot
              </button>
            </div>
          </div>
        ))
      )}

      <div className="section-header">
        <div className="section-title">
          <span>Past Sessions</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Class</th>
              <th>Status</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {pastSessions.map((p) => (
              <tr key={p.id}>
                <td>{p.date}</td>
                <td className="cell-primary">{p.title}</td>
                <td>
                  <span className="badge badge-outline">{p.status}</span>
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

function AdminPage({ sessions, trainers, allBookings, onCreateSession, onAddTrainer, onMarkAttendance }) {
  const [adminTab, setAdminTab] = useState("overview");
  const [selectedSessionId, setSelectedSessionId] = useState(sessions[0] ? String(sessions[0].id) : "1");

  const [sessionTitle, setSessionTitle] = useState("");
  const [sessionDate, setSessionDate] = useState("2026-10-19");
  const [sessionStart, setSessionStart] = useState("11:00 AM");
  const [sessionEnd, setSessionEnd] = useState("12:00 PM");
  const [sessionCoach, setSessionCoach] = useState(trainers[0] ? trainers[0].name : "Arjun Sharma");
  const [sessionLocation, setSessionLocation] = useState("Studio A (Weights)");
  const [sessionCapacity, setSessionCapacity] = useState(12);
  const [sessionCategory, setSessionCategory] = useState("Strength");

  const [trainerName, setTrainerName] = useState("");
  const [trainerRole, setTrainerRole] = useState("Fitness Trainer");
  const [trainerEmail, setTrainerEmail] = useState("");
  const [trainerPhone, setTrainerPhone] = useState("");
  const [trainerSpecialty, setTrainerSpecialty] = useState("");
  const [trainerShift, setTrainerShift] = useState("10:00 AM - 04:00 PM");
  const [trainerWeeklyHours, setTrainerWeeklyHours] = useState(36);
  const [trainerBio, setTrainerBio] = useState("");

  const currentSession = sessions.find((s) => String(s.id) === String(selectedSessionId)) || sessions[0];
  const sessionAttendees = currentSession
    ? allBookings.filter((b) => b.sessionId === currentSession.id && b.status === "Confirmed")
    : [];

  const presentCount = sessionAttendees.filter((m) => m.attendance === "Present").length;
  const absentCount = sessionAttendees.filter((m) => m.attendance === "Absent").length;
  const notMarkedCount = sessionAttendees.filter((m) => !m.attendance || m.attendance === "Not marked").length;

  function handleCreateSessionSubmit(e) {
    e.preventDefault();
    if (!sessionTitle.trim()) return;

    onCreateSession({
      title: sessionTitle,
      date: sessionDate,
      startTime: sessionStart,
      endTime: sessionEnd,
      coach: sessionCoach,
      location: sessionLocation,
      capacity: sessionCapacity,
      category: sessionCategory
    });

    setSessionTitle("");
  }

  function handleAddTrainerSubmit(e) {
    e.preventDefault();
    if (!trainerName.trim() || !trainerEmail.trim()) return;

    onAddTrainer({
      name: trainerName,
      role: trainerRole,
      email: trainerEmail,
      phone: trainerPhone,
      specialty: trainerSpecialty,
      shift: trainerShift,
      weeklyHours: trainerWeeklyHours,
      bio: trainerBio
    });

    setTrainerName("");
    setTrainerEmail("");
    setTrainerPhone("");
    setTrainerSpecialty("");
    setTrainerBio("");
  }

  return (
    <div>
      <div className="page-tag">GYM OWNER &amp; HEAD ADMINISTRATION</div>
      <h1>Club Operations &amp; Staff Reports</h1>
      <p className="subtitle">
        Managed by <strong>Raj Yadav</strong> (Owner) &middot; PULSE ATHLETICS, Shalimar Bagh, New Delhi.
      </p>

      <div className="admin-nav-tabs">
        <button
          className={`admin-tab ${adminTab === "overview" ? "active" : ""}`}
          onClick={() => setAdminTab("overview")}
        >
          Raj Yadav (Owner Dashboard)
        </button>
        <button
          className={`admin-tab ${adminTab === "trainers" ? "active" : ""}`}
          onClick={() => setAdminTab("trainers")}
        >
          Trainer Shift &amp; Hours Report ({trainers.length})
        </button>
        <button
          className={`admin-tab ${adminTab === "attendance" ? "active" : ""}`}
          onClick={() => setAdminTab("attendance")}
        >
          Session Attendance &amp; Check-ins
        </button>
        <button
          className={`admin-tab ${adminTab === "bookings" ? "active" : ""}`}
          onClick={() => setAdminTab("bookings")}
        >
          Master Bookings Register ({allBookings.length})
        </button>
        <button
          className={`admin-tab ${adminTab === "create-session" ? "active" : ""}`}
          onClick={() => setAdminTab("create-session")}
        >
          Schedule Class
        </button>
      </div>

      {adminTab === "overview" && (
        <div>
          <div className="owner-profile-card">
            <div className="owner-avatar">RY</div>
            <div className="owner-details">
              <div className="owner-header-row">
                <div>
                  <div className="owner-name">Raj Yadav</div>
                  <div className="owner-title">Sole Owner &amp; Athletic Director &middot; Pulse Athletics</div>
                </div>
                <span className="badge badge-teal">Gym Owner &amp; Administrator</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Raj Yadav oversees all daily operations at Pulse Athletics, Shalimar Bagh. He manages gym timings
                (10:00 AM - 10:00 PM), assigns daily shifts and class rosters to certified trainers, tracks member
                attendances, and maintains high training standards.
              </p>

              <div className="owner-specs-grid">
                <div className="owner-spec-item">
                  <span className="owner-spec-label">Direct Contact (Raj Yadav)</span>
                  <span className="owner-spec-val">+91 98101 23456</span>
                </div>
                <div className="owner-spec-item">
                  <span className="owner-spec-label">Email</span>
                  <span className="owner-spec-val">admin@gym.com</span>
                </div>
                <div className="owner-spec-item">
                  <span className="owner-spec-label">Facility Address</span>
                  <span className="owner-spec-val">PULSE ATHLETICS, Shalimar Bagh, New Delhi, India</span>
                </div>
                <div className="owner-spec-item">
                  <span className="owner-spec-label">Gym Timings</span>
                  <span className="owner-spec-val">10:00 AM TO 10:00 PM (Daily)</span>
                </div>
                <div className="owner-spec-item">
                  <span className="owner-spec-label">Coaches Reporting</span>
                  <span className="owner-spec-val">{trainers.length} Certified Instructors</span>
                </div>
                <div className="owner-spec-item">
                  <span className="owner-spec-label">Facility Setup</span>
                  <span className="owner-spec-val">Studio A (Weights), Studio B (HIIT), Cycle Arena</span>
                </div>
              </div>
            </div>
          </div>

          <div className="four-col">
            <div className="stat-card">
              <div className="stat-label">Gym Timings</div>
              <div className="stat-val" style={{ fontSize: "18px" }}>10 AM - 10 PM</div>
              <div className="stat-sub">Shalimar Bagh, New Delhi</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Trainers on Staff</div>
              <div className="stat-val">{trainers.length}</div>
              <div className="stat-sub">Reporting to Raj Yadav</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Classes Scheduled</div>
              <div className="stat-val">{sessions.length}</div>
              <div className="stat-sub">Active studio sessions</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Confirmed Bookings</div>
              <div className="stat-val">{allBookings.filter((b) => b.status === "Confirmed").length}</div>
              <div className="stat-sub">Active member reservations</div>
            </div>
          </div>

          <div className="section-header">
            <div className="section-title">
              <span>Trainer Work Hours &amp; Shift Summary (Report to Raj Yadav)</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => setAdminTab("trainers")}>
              Manage Shift Roster →
            </button>
          </div>

          <div className="four-col">
            {trainers.map((t) => (
              <div className="trainer-card" key={t.id}>
                <div>
                  <div className="trainer-header">
                    <div className="trainer-avatar">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="trainer-info">
                      <h4>{t.name}</h4>
                      <div className="trainer-specialty">{t.role}</div>
                    </div>
                  </div>
                  <div className="trainer-report-badge">
                    <div className="trainer-report-grid">
                      <div>Shift: {t.shift}</div>
                      <div>Weekly: {t.weeklyHours} hrs</div>
                      <div>Sessions: {t.sessionsTakenWeek} taken</div>
                      <div>Rating: {t.rating}</div>
                    </div>
                  </div>
                  <div className="trainer-body">{t.bio}</div>
                </div>
                <div className="trainer-meta-row">
                  <span>{t.phone}</span>
                  <span className="badge badge-teal">Active on Floor</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === "trainers" && (
        <div className="admin-grid">
          <div>
            <div className="card">
              <h2>Register New Trainer</h2>
              <p className="card-desc">Add a certified coach to report to Raj Yadav at Shalimar Bagh.</p>

              <form onSubmit={handleAddTrainerSubmit}>
                <div className="form-group">
                  <label>Coach Full Name</label>
                  <input
                    type="text"
                    value={trainerName}
                    onChange={(e) => setTrainerName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Role / Designation</label>
                  <input
                    type="text"
                    value={trainerRole}
                    onChange={(e) => setTrainerRole(e.target.value)}
                    placeholder="e.g. Strength &amp; Conditioning Coach"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={trainerEmail}
                      onChange={(e) => setTrainerEmail(e.target.value)}
                      placeholder="vikram@pulseathletics.in"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number (10 digits)</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">+91</span>
                      <input
                        type="tel"
                        maxLength="10"
                        value={trainerPhone}
                        onChange={(e) => setTrainerPhone(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="98100 11223"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Shift Timing (Between 10 AM - 10 PM)</label>
                    <select value={trainerShift} onChange={(e) => setTrainerShift(e.target.value)}>
                      <option value="10:00 AM - 04:00 PM">Morning: 10:00 AM - 04:00 PM</option>
                      <option value="04:00 PM - 10:00 PM">Evening: 04:00 PM - 10:00 PM</option>
                      <option value="11:00 AM - 07:00 PM">Full Day: 11:00 AM - 07:00 PM</option>
                      <option value="02:00 PM - 09:00 PM">Afternoon: 02:00 PM - 09:00 PM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Weekly Working Hours</label>
                    <input
                      type="number"
                      min="10"
                      max="60"
                      value={trainerWeeklyHours}
                      onChange={(e) => setTrainerWeeklyHours(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Specialty Discipline</label>
                  <input
                    type="text"
                    value={trainerSpecialty}
                    onChange={(e) => setTrainerSpecialty(e.target.value)}
                    placeholder="e.g. Olympic Weightlifting &amp; Core Hypertrophy"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Coach Bio &amp; Experience</label>
                  <textarea
                    rows="2"
                    value={trainerBio}
                    onChange={(e) => setTrainerBio(e.target.value)}
                    placeholder="Background, certifications, client specialties..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-wide">
                  Register Trainer under Raj Yadav
                </button>
              </form>
            </div>
          </div>

          <div>
            <h2>Trainer Work Hours &amp; Performance ({trainers.length})</h2>
            <p className="card-desc">Reports submitted to Raj Yadav &middot; Pulse Athletics, Shalimar Bagh.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {trainers.map((t) => (
                <div className="card" key={t.id} style={{ marginBottom: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px" }}>
                    <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                      <div className="trainer-avatar" style={{ width: "48px", height: "48px" }}>
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <h3>{t.name}</h3>
                        <div style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 700 }}>
                          {t.specialty}
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                          {t.email} &middot; {t.phone}
                        </div>
                      </div>
                    </div>
                    <span className="badge badge-teal">Shift: {t.shift}</span>
                  </div>

                  <div className="trainer-report-badge" style={{ marginTop: "12px", marginBottom: "8px" }}>
                    <div className="trainer-report-grid">
                      <div>Assigned Hours: <strong>{t.weeklyHours} hrs/week</strong></div>
                      <div>Sessions Taken: <strong>{t.sessionsTakenWeek} classes</strong></div>
                      <div>Rating: <strong>{t.rating}</strong></div>
                      <div>Supervised By: <strong>Raj Yadav</strong></div>
                    </div>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.4" }}>
                    {t.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === "attendance" && (
        <div className="card">
          <h2>Session Roster &amp; Member Attendance</h2>
          <p className="card-desc">Select a class to inspect registered attendees and mark check-in status.</p>

          <div className="form-group" style={{ maxWidth: "520px" }}>
            <label>Select Scheduled Class:</label>
            <select
              value={selectedSessionId}
              onChange={(e) => setSelectedSessionId(e.target.value)}
            >
              {sessions.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.displayDate} &middot; {s.startTime} - {s.endTime} &middot; {s.title} (Coach {s.coach})
                </option>
              ))}
            </select>
          </div>

          {currentSession && (
            <div className="admin-summary-bar">
              <span>{currentSession.location} &middot; Coach {currentSession.coach}</span>
              <span>
                {currentSession.bookedCount} / {currentSession.capacity} Booked ({currentSession.capacity - currentSession.bookedCount} slots remaining)
              </span>
            </div>
          )}

          <div className="attendance-counters">
            <span className="attendance-pill green">{presentCount} Present</span>
            <span className="attendance-pill red">{absentCount} Absent</span>
            <span className="attendance-pill">{notMarkedCount} Not Marked</span>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Member Name</th>
                  <th>Contact Details</th>
                  <th>Pass Ref</th>
                  <th>Health / Workout Notes</th>
                  <th>Attendance Status</th>
                  <th>Mark Status</th>
                </tr>
              </thead>
              <tbody>
                {sessionAttendees.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", padding: "28px", color: "var(--text-muted)" }}>
                      No members currently registered for this session slot.
                    </td>
                  </tr>
                ) : (
                  sessionAttendees.map((m) => (
                    <tr key={m.id}>
                      <td>
                        <div className="cell-primary">{m.userName}</div>
                      </td>
                      <td>
                        <div className="cell-sub">{m.userEmail}</div>
                        <div className="cell-sub">{m.userPhone}</div>
                      </td>
                      <td>
                        <span className="badge badge-outline">{m.bookingCode}</span>
                      </td>
                      <td style={{ maxWidth: "200px", fontSize: "12px", color: "var(--text-muted)" }}>
                        {m.notes || "—"}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            m.attendance === "Present"
                              ? "badge-green"
                              : m.attendance === "Absent"
                              ? "badge-red"
                              : ""
                          }`}
                        >
                          {m.attendance || "Not marked"}
                        </span>
                      </td>
                      <td>
                        <div className="attendance-btn-group">
                          <button
                            type="button"
                            className={`attendance-btn ${m.attendance === "Present" ? "selected-present" : ""}`}
                            onClick={() => onMarkAttendance(m.id, "Present")}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            className={`attendance-btn ${m.attendance === "Absent" ? "selected-absent" : ""}`}
                            onClick={() => onMarkAttendance(m.id, "Absent")}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminTab === "bookings" && (
        <div className="card">
          <h2>Master Member Bookings Register</h2>
          <p className="card-desc">All reserved classes recorded across members with contact details.</p>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Pass Code</th>
                  <th>Member Name</th>
                  <th>Email &amp; Mobile</th>
                  <th>Class &amp; Coach</th>
                  <th>Date &amp; Time</th>
                  <th>Workout Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((b) => (
                  <tr key={b.id}>
                    <td>
                      <span className="badge badge-outline">{b.bookingCode}</span>
                    </td>
                    <td className="cell-primary">{b.userName}</td>
                    <td>
                      <div className="cell-sub">{b.userEmail}</div>
                      <div className="cell-sub">{b.userPhone}</div>
                    </td>
                    <td>
                      <div className="cell-primary">{b.title}</div>
                      <div className="cell-sub">Coach {b.coach} &middot; {b.location}</div>
                    </td>
                    <td>
                      <div className="cell-primary">{b.fullDate}</div>
                      <div className="cell-sub">{b.startTime} - {b.endTime}</div>
                    </td>
                    <td style={{ maxWidth: "200px", fontSize: "12px", color: "var(--text-muted)" }}>
                      {b.notes || "None"}
                    </td>
                    <td>
                      <span className={`badge ${b.status === "Confirmed" ? "badge-green" : "badge-red"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminTab === "create-session" && (
        <div className="card" style={{ maxWidth: "600px" }}>
          <h2>Schedule New Studio Session</h2>
          <p className="card-desc">Classes must be scheduled between gym timings 10:00 AM to 10:00 PM.</p>

          <form onSubmit={handleCreateSessionSubmit}>
            <div className="form-group">
              <label>Class Name</label>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                placeholder="e.g. Olympic Barbell Strength &amp; Core"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select value={sessionCategory} onChange={(e) => setSessionCategory(e.target.value)}>
                  <option value="Strength">Strength</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Cycling">Cycling</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Time (10 AM - 10 PM)</label>
                <input
                  type="text"
                  value={sessionStart}
                  onChange={(e) => setSessionStart(e.target.value)}
                  placeholder="11:00 AM"
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="text"
                  value={sessionEnd}
                  onChange={(e) => setSessionEnd(e.target.value)}
                  placeholder="12:00 PM"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Coach Assigned</label>
                <select value={sessionCoach} onChange={(e) => setSessionCoach(e.target.value)}>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.name}>
                      {t.name} ({t.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Studio Room</label>
                <select value={sessionLocation} onChange={(e) => setSessionLocation(e.target.value)}>
                  <option value="Studio A (Weights)">Studio A (Main Weight Floor)</option>
                  <option value="Studio B (Functional)">Studio B (HIIT &amp; Functional)</option>
                  <option value="Cycle Arena">Cycle Arena</option>
                  <option value="Studio A (Recovery)">Studio A (Recovery &amp; Yoga)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Capacity</label>
              <input
                type="number"
                min="1"
                max="30"
                value={sessionCapacity}
                onChange={(e) => setSessionCapacity(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-wide">
              Publish Class to Schedule
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <div className="footer-address">PULSE ATHLETICS &middot; Shalimar Bagh, New Delhi, India</div>
          <div style={{ marginTop: "4px" }}>
            Timings: <strong>10:00 AM TO 10:00 PM</strong> (Monday to Sunday) &middot; Contact: +91 98101 23456
          </div>
        </div>
        <div>
          Managed by <strong>Raj Yadav</strong> (Owner &amp; Director) &middot; support@pulseathletics.in
        </div>
      </div>
    </footer>
  );
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return "Sat, 17 Oct";
  const [y, m, d] = dateStr.split("-");
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateObj = new Date(Number(y), Number(m) - 1, Number(d));
  const dayName = days[dateObj.getDay()] || "Sat";
  const monthName = months[dateObj.getMonth()] || "Oct";
  return `${dayName}, ${Number(d)} ${monthName}`;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}

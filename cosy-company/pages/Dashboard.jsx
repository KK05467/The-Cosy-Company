// src/pages/Dashboard.jsx
//
// REDESIGN NOTES (visual only — the useEffect reading localStorage("user"),
// the mode state, and the stats array branching by mode are all unchanged):
// - Replaced the dual blurred glow orbs and glass cards with the flat
//   surface()/colors/fonts system used everywhere else in the redesign.
// - "Live Activity" card and the stat grid now use hairline rules instead
//   of glow-on-hover; the stat grid specifically is now a manifest strip
//   (matches Stats.jsx / SearchRides.jsx's feature row / DashboardCards.jsx)
//   instead of 3 separate glow cards.
//
// FLAGGING, NOT FIXING: this file computes its own inline `stats` array
// and renders it directly — it never actually imports or renders
// RiderDashboard, DriverDashboard, or DashboardCards, even though those
// components exist and branch on the same rider/driver mode. That might be
// intentional (this page has its own bespoke stats), or those three
// components might be meant for a different route I haven't seen. I've
// left Dashboard.jsx's own stats logic exactly as-is rather than guessing
// which one should replace the other — let me know if you want them
// unified.
//
// Sidebar.jsx wasn't shared in this conversation, so it's imported as-is
// and NOT redesigned — it will render with its own (likely old-style)
// visuals until you share that file too.

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBell, FaCar, FaLeaf, FaMapMarkerAlt, FaUsers, FaWallet, FaRoute } from "react-icons/fa";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardToggle from "../components/dashboard/DashboardToggle";
import { colors, fonts, surface } from "../styles/tokens";

function Dashboard({ darkMode, setDarkMode }) {
  const [user, setUser] = useState(null);
  const [mode, setMode] = useState("rider");

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      }
    } catch (err) {
      console.log("Error parsing user:", err);
    }
  }, []);

  const stats =
    mode === "rider"
      ? [
          { title: "Active pools", value: user?.activePools ?? 0, icon: <FaUsers /> },
          { title: "Money saved", value: user?.moneySaved ?? "₹0", icon: <FaWallet /> },
          { title: "CO₂ reduced", value: user?.co2Reduced ?? "0 kg", icon: <FaLeaf /> },
        ]
      : [
          { title: "Today's earnings", value: user?.earnings ?? "₹0", icon: <FaWallet /> },
          { title: "Passengers", value: user?.passengers ?? 0, icon: <FaUsers /> },
          { title: "Trips completed", value: user?.tripsCompleted ?? 0, icon: <FaCar /> },
        ];

  const s = surface(darkMode);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: fonts.body,
        background: s.bg,
      }}
    >
      {/* Sidebar — not redesigned yet, see note above */}
      <Sidebar darkMode={darkMode} />

      {/* Main */}
      <div style={{ flex: 1, padding: "150px 50px 60px", overflowY: "auto" }}>
        {/* TOPBAR */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "44px",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: fonts.mono,
                fontSize: "13px",
                letterSpacing: "2.5px",
                color: s.accent,
                marginBottom: "18px",
                textTransform: "uppercase",
              }}
            >
              SMART MOBILITY PLATFORM
            </p>

            <h1
              style={{
                fontFamily: fonts.display,
                color: s.text,
                fontSize: "46px",
                fontWeight: "600",
                letterSpacing: "-1px",
                lineHeight: "1.1",
                marginBottom: "10px",
              }}
            >
              Welcome back, {user?.name || "traveler"}.
            </h1>

            <p style={{ color: s.textMuted, fontSize: "16px" }}>
              Your route network is active.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <DashboardToggle mode={mode} setMode={setMode} darkMode={darkMode} />

            <motion.div
              whileHover={{ y: -2 }}
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                background: s.bgSoft,
                border: `1px solid ${s.line}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: s.accent,
                fontSize: "17px",
                cursor: "pointer",
              }}
            >
              <FaBell />
            </motion.div>
          </div>
        </motion.div>

        {/* HERO GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "24px",
            marginBottom: "28px",
          }}
        >
          {/* ROUTE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              position: "relative",
              minHeight: "380px",
              borderRadius: "24px",
              overflow: "hidden",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
            }}
          >
            {/* Faint route line, echoes Home.jsx hero instead of a pulsing
                gradient wash */}
            <svg
              viewBox="0 0 700 400"
              preserveAspectRatio="none"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: darkMode ? 0.14 : 0.08 }}
            >
              <path
                d="M -40 320 C 150 320, 180 120, 380 140 C 540 156, 560 280, 760 260"
                fill="none"
                stroke={darkMode ? colors.goldSoft : colors.forest}
                strokeWidth="2.5"
                strokeDasharray="2 14"
                strokeLinecap="round"
              />
            </svg>

            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "44px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 18px",
                    borderRadius: "999px",
                    background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(31,77,58,0.08)",
                    marginBottom: "26px",
                  }}
                >
                  <FaRoute size={13} color={darkMode ? colors.goldSoft : colors.forest} />
                  <span style={{ color: s.text, fontSize: "13.5px", fontWeight: "600" }}>
                    AI pool matching active
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: fonts.display,
                    color: s.text,
                    fontSize: "38px",
                    fontWeight: "600",
                    letterSpacing: "-0.5px",
                    lineHeight: "1.15",
                    maxWidth: "560px",
                    marginBottom: "16px",
                  }}
                >
                  {mode === "rider"
                    ? "Find smarter shared rides nearby."
                    : "Manage rides and maximize earnings."}
                </h2>

                <p style={{ color: s.textMuted, fontSize: "16px", lineHeight: "1.7", maxWidth: "520px" }}>
                  Cosy matches routes, riders, and drivers in real time.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL — LIVE ACTIVITY */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              padding: "30px",
              borderRadius: "24px",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
            }}
          >
            <p
              style={{
                fontFamily: fonts.mono,
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: s.textMuted,
                marginBottom: "22px",
              }}
            >
              Live activity
            </p>

            {[1, 2, 3].map((item, i) => (
              <motion.div
                key={item}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "center",
                  padding: "14px 0",
                  borderBottom: i < 2 ? `1px solid ${s.line}` : "none",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "11px",
                    background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(31,77,58,0.08)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: s.accent,
                    flexShrink: 0,
                  }}
                >
                  <FaMapMarkerAlt size={14} />
                </div>

                <div>
                  <p style={{ color: s.text, fontSize: "14.5px", marginBottom: "3px" }}>
                    Pool forming near Downtown
                  </p>
                  <span style={{ color: s.textMuted, fontSize: "12.5px" }}>2 mins ago</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* STATS — manifest strip, matches DashboardCards.jsx treatment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: `1px solid ${s.line}`,
            borderRadius: "18px",
            overflow: "hidden",
          }}
        >
          {stats.map((item, index) => (
            <div
              key={item.title}
              style={{
                padding: "28px 26px",
                background: s.bgSoft,
                borderRight: index < stats.length - 1 ? `1px solid ${s.line}` : "none",
              }}
            >
              <div style={{ color: s.accent, fontSize: "19px", marginBottom: "18px" }}>{item.icon}</div>

              <h3
                style={{
                  fontFamily: fonts.display,
                  color: s.text,
                  fontSize: "34px",
                  fontWeight: "600",
                  letterSpacing: "-0.5px",
                  marginBottom: "8px",
                }}
              >
                {item.value}
              </h3>

              <p style={{ color: s.textMuted, fontSize: "14px", margin: 0 }}>{item.title}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;

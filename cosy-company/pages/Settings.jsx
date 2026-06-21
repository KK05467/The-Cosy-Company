// src/pages/Settings.jsx
//
// REDESIGN NOTES:
// - Each setting row is now a flat ticket-stub row with a hairline border
//   instead of a glass card on blue glow — same surface treatment as
//   Profile's info rows.
// - Toggle pill recolored to the accent (gold/forest) instead of leftover
//   blue, so an "on" state reads as part of the Cosy system.
// - No backend wiring exists for these toggles yet (no /api/settings route
//   in your backend) — they're still local UI state only, same as before.
//   Flagging this rather than fabricating a fake save call.

import { motion } from "framer-motion";
import { useState } from "react";
import { FaBell, FaMoon, FaShieldAlt, FaGlobe, FaLock } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function Settings({ darkMode }) {
  const s = surface(darkMode);

  const [toggles, setToggles] = useState({
    Notifications: true,
    "Dark Mode": true,
    Security: true,
    Language: true,
    Privacy: true,
  });

  const settings = [
    { icon: <FaBell />, title: "Notifications", desc: "Receive ride and payment alerts" },
    { icon: <FaMoon />, title: "Dark Mode", desc: "Switch between light and dark themes" },
    { icon: <FaShieldAlt />, title: "Security", desc: "Enable 2FA and extra account protection" },
    { icon: <FaGlobe />, title: "Language", desc: "Choose your preferred language" },
    { icon: <FaLock />, title: "Privacy", desc: "Manage your profile visibility" },
  ];

  const toggleSwitch = (title) => {
    setToggles((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 90px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "44px" }}
        >
          <p
            style={{
              fontFamily: fonts.mono,
              color: s.accent,
              letterSpacing: "2.5px",
              fontSize: "11px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            ACCOUNT
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "44px",
              fontWeight: "600",
            }}
          >
            Settings
          </h1>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: s.line, borderRadius: "18px", overflow: "hidden" }}>
          {settings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              style={{
                padding: "26px 30px",
                background: s.bgSoft,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: "18px", alignItems: "center" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: darkMode ? colors.inkDark : colors.paperSoft,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: s.accent,
                    fontSize: "18px",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <h3 style={{ color: s.text, fontSize: "16px", fontWeight: "600", margin: 0, marginBottom: "4px" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: s.textMuted, fontSize: "13px", margin: 0 }}>{item.desc}</p>
                </div>
              </div>

              {/* TOGGLE */}
              <motion.div
                whileTap={{ scale: 0.92 }}
                onClick={() => toggleSwitch(item.title)}
                style={{
                  width: "52px",
                  height: "30px",
                  borderRadius: "999px",
                  background: toggles[item.title]
                    ? (darkMode ? colors.goldSoft : colors.forest)
                    : s.line,
                  position: "relative",
                  cursor: "pointer",
                  transition: "background 0.25s ease",
                  flexShrink: 0,
                }}
              >
                <motion.div
                  animate={{ x: toggles[item.title] ? 24 : 3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    background: darkMode ? colors.ink : "#fff",
                    position: "absolute",
                    top: "3px",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings;
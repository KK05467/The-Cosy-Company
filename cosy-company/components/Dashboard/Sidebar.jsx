// src/components/dashboard/Sidebar.jsx
//
// REDESIGN NOTES (visual only — useLocation, the active-path check, and the
// links array are all unchanged, including the /bookings path, which I'm
// leaving exactly as the original author wrote it rather than guessing it
// should be /my-bookings):
// - Replaced the gradient-filled active pill + radial hover glow with a
//   quieter treatment: hairline-divided rows, a left-edge tick marking the
//   active item (echoes the underline tick used for Navbar.jsx's active
//   link), and no per-item glow. A sidebar sits on screen for an entire
//   session — it should read as calm structure, not a row of CTAs.
// - Wordmark now uses Fraunces, matching the wordmark treatment in
//   Navbar.jsx and SplashScreen.jsx instead of its own one-off styling.

import { motion } from "framer-motion";
import { FaHome, FaCar, FaWallet, FaUser, FaCog } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { fonts, surface } from "../../styles/tokens";

function Sidebar({ darkMode }) {
  const location = useLocation();
  const s = surface(darkMode);

  const links = [
    { icon: <FaHome />, title: "Dashboard", path: "/dashboard" },
    { icon: <FaCar />, title: "Bookings", path: "/bookings" },
    { icon: <FaWallet />, title: "Wallet", path: "/wallet" },
    { icon: <FaUser />, title: "Profile", path: "/profile" },
    { icon: <FaCog />, title: "Settings", path: "/settings" },
  ];

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        width: "260px",
        minHeight: "100vh",
        padding: "150px 22px 40px",
        flexShrink: 0,
        background: s.bg,
        borderRight: `1px solid ${s.line}`,
        fontFamily: fonts.body,
      }}
    >
      {/* LOGO */}
      <div style={{ marginBottom: "54px", paddingLeft: "14px" }}>
        <h1
          style={{
            fontFamily: fonts.display,
            color: s.text,
            fontSize: "28px",
            fontWeight: "600",
            marginBottom: "6px",
            letterSpacing: "-0.5px",
          }}
        >
          Cosy
        </h1>
        <p
          style={{
            fontFamily: fonts.mono,
            color: s.accent,
            fontSize: "9.5px",
            letterSpacing: "2.5px",
          }}
        >
          RIDE COSY · DRIVE COSY
        </p>
      </div>

      {/* LINKS */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {links.map((item, index) => {
          const active = location.pathname === item.path;

          return (
            <Link key={index} to={item.path} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ x: active ? 0 : 3 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "13px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  position: "relative",
                  background: active ? s.bgSoft : "transparent",
                }}
              >
                {/* active tick — replaces the gradient-filled pill */}
                {active && (
                  <motion.div
                    layoutId="sidebarActiveTick"
                    style={{
                      position: "absolute",
                      left: "-22px",
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      borderRadius: "2px",
                      background: s.accent,
                    }}
                  />
                )}

                <div style={{ fontSize: "16px", color: active ? s.accent : s.textMuted }}>
                  {item.icon}
                </div>

                <p
                  style={{
                    fontSize: "15px",
                    margin: 0,
                    fontWeight: active ? "600" : "500",
                    color: active ? s.text : s.textMuted,
                  }}
                >
                  {item.title}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Sidebar;
// src/pages/NotFound.jsx
//
// REDESIGN NOTES: every other route line in this app (Home.jsx hero,
// AuthLeft.jsx, Dashboard.jsx) connects two real points — a trip that
// exists. Here the line visibly trails off and breaks instead of
// connecting anywhere, which is a small honest detail for "this road
// doesn't exist" rather than reusing the same connected-path motif as a
// page that worked. No logic to preserve — Link targets (/) and
// window.history.back() are unchanged.

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function NotFound({ darkMode }) {
  const s = surface(darkMode);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: s.bg,
        fontFamily: fonts.body,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BROKEN ROUTE LINE — trails off and stops, unlike the connected
          paths used elsewhere */}
      <svg
        viewBox="0 0 900 300"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: darkMode ? 0.16 : 0.1 }}
      >
        <path
          d="M -40 220 C 200 220, 240 80, 420 100"
          fill="none"
          stroke={darkMode ? colors.goldSoft : colors.forest}
          strokeWidth="2.5"
          strokeDasharray="2 14"
          strokeLinecap="round"
        />
        {/* the break */}
        <circle cx="420" cy="100" r="5" fill={colors.rust} />
        <path
          d="M 480 100 C 620 118, 680 240, 940 230"
          fill="none"
          stroke={darkMode ? colors.goldSoft : colors.forest}
          strokeWidth="2.5"
          strokeDasharray="2 14"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", zIndex: 2 }}
      >
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: "13px",
            letterSpacing: "2.5px",
            color: s.accent,
            marginBottom: "10px",
            textTransform: "uppercase",
          }}
        >
          ROUTE NOT FOUND
        </p>

        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: "120px",
            fontWeight: "600",
            margin: 0,
            lineHeight: 1,
            color: s.accent,
            letterSpacing: "-2px",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: fonts.display,
            color: s.text,
            fontSize: "28px",
            fontWeight: "600",
            marginTop: "14px",
            marginBottom: "12px",
          }}
        >
          This road doesn't exist.
        </h2>

        <p style={{ color: s.textMuted, fontSize: "16px", marginBottom: "36px" }}>
          The page you're looking for has been moved, removed, or never existed.
        </p>

        <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 26px",
                borderRadius: "12px",
                border: "none",
                color: darkMode ? colors.ink : "#fff",
                cursor: "pointer",
                background: darkMode
                  ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                  : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                fontWeight: "700",
                fontSize: "14.5px",
                fontFamily: fonts.body,
              }}
            >
              <FaHome size={14} /> Back to home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 26px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "14.5px",
              fontFamily: fonts.body,
              background: "transparent",
              border: `1px solid ${s.line}`,
              color: s.text,
            }}
          >
            <FaArrowLeft size={13} /> Go back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;

// /components/AuthLeft.jsx
//
// REDESIGN NOTES: this panel has no logic — pure marketing copy and visual
// treatment, paired alongside LoginForm.jsx / SignupForm.jsx on the auth
// screens. Previously it was two blurred glow orbs over a background image
// at 0.18 opacity, with generic "premium smart mobility" copy.
//
// New treatment: a vertical ticket counterfoil — the torn-off stub a
// transit ticket leaves behind. A route line (echoing Home.jsx's hero
// background path) traces up the panel, with departure/arrival points
// marked, and the copy speaks in route terms rather than generic SaaS
// language ("premium smart mobility for modern cities" → replaced with
// something a Cosy rider would actually recognize).

import { motion } from "framer-motion";
import { colors, fonts } from "../styles/tokens";

function AuthLeft({ darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        flex: 1,
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "80px",
        background: darkMode ? colors.ink : colors.paper,
      }}
    >
      {/* ROUTE LINE — traces the panel like a transit map, not decorative blur */}
      <svg
        viewBox="0 0 600 800"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: darkMode ? 0.22 : 0.14 }}
      >
        <path
          d="M -40 80 C 180 80, 160 350, 360 380 C 520 405, 480 620, 640 700"
          fill="none"
          stroke={darkMode ? colors.goldSoft : colors.forest}
          strokeWidth="2.5"
          strokeDasharray="2 16"
          strokeLinecap="round"
        />
        <circle cx="-40" cy="80" r="6" fill={darkMode ? colors.goldSoft : colors.forest} />
        <circle cx="640" cy="700" r="6" fill={colors.rust} />
      </svg>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: "520px" }}>
        <p
          style={{
            fontFamily: fonts.mono,
            color: darkMode ? colors.goldSoft : colors.forest,
            letterSpacing: "3px",
            marginBottom: "26px",
            fontSize: "12.5px",
            textTransform: "uppercase",
          }}
        >
          THE COSY COMPANY
        </p>

        <h1
          style={{
            fontFamily: fonts.display,
            color: darkMode ? colors.paper : colors.ink,
            fontSize: "58px",
            lineHeight: "1.12",
            marginBottom: "26px",
            fontWeight: "600",
            letterSpacing: "-1px",
          }}
        >
          Every great commute starts with someone willing to share the ride.
        </h1>

        <p
          style={{
            color: darkMode ? "rgba(246,242,232,0.65)" : "rgba(19,35,28,0.68)",
            fontSize: "17px",
            lineHeight: "1.8",
          }}
        >
          Cosy connects verified drivers and riders heading the same
          way — splitting cost, cutting traffic, and making the trip
          worth looking forward to.
        </p>

        {/* SMALL TICKET DETAIL — echoes the splash/hero motif without
            repeating the exact toggle component */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "40px",
            padding: "10px 16px",
            borderRadius: "999px",
            border: `1px solid ${darkMode ? "rgba(201,162,39,0.25)" : "rgba(31,77,58,0.18)"}`,
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: "12px",
              color: darkMode ? colors.goldSoft : colors.forest,
              letterSpacing: "1px",
            }}
          >
            50,000+ riders already aboard
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default AuthLeft;

// src/components/SplashScreen.jsx
//
// REDESIGN NOTES:
// - Old version: blurred glow blobs, 8 floating particles, a near-invisible
//   sliding car image, pulsing letter-spacing on the wordmark — five
//   unrelated decorative loops running at once, none specific to Cosy.
// - New version: a single orchestrated sequence — a ticket stub draws itself
//   (the perforation "punches" through as two dots travel down a dashed
//   line), then the wordmark and tagline settle into place. This is the same
//   ticket vocabulary used in Home/Footer, so the app feels like one
//   designed thing instead of a different mood per screen.
// - Typography matches the rest of the redesign: Fraunces for the wordmark,
//   IBM Plex Mono for the tagline (see tokens.js / index.html font links
//   from Home.jsx).

import { motion } from "framer-motion";
import { colors, fonts } from "../styles/tokens";

function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.6 }}
      style={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: colors.ink,
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* TICKET STUB — draws in, then the perforation "punches" */}
        <svg width="220" height="64" viewBox="0 0 220 64" style={{ marginBottom: "36px" }}>
          {/* outer stub outline, drawn on */}
          <motion.rect
            x="2"
            y="2"
            width="216"
            height="60"
            rx="10"
            fill="none"
            stroke={colors.lineDark}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* perforation line */}
          <motion.line
            x1="148"
            y1="2"
            x2="148"
            y2="62"
            stroke={colors.lineDark}
            strokeWidth="1.5"
            strokeDasharray="3 5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          />

          {/* the "punch" — a dot that travels down the perforation and pops */}
          <motion.circle
            cx="148"
            r="4"
            fill={colors.goldSoft}
            initial={{ cy: 2, opacity: 0 }}
            animate={{ cy: 62, opacity: [0, 1, 1, 0] }}
            transition={{ delay: 0.6, duration: 0.7, ease: "easeIn" }}
          />

          {/* route code on the left stub, fare on the right — small ticket detail */}
          <motion.text
            x="22"
            y="38"
            fill={colors.goldSoft}
            fontSize="11"
            fontFamily={fonts.mono}
            letterSpacing="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            HSR → KRM
          </motion.text>
          <motion.text
            x="172"
            y="38"
            fill={colors.goldSoft}
            fontSize="11"
            fontFamily={fonts.mono}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.95, duration: 0.4 }}
          >
            #042
          </motion.text>
        </svg>

        {/* WORDMARK */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{
            fontFamily: fonts.display,
            fontSize: "56px",
            fontWeight: "600",
            letterSpacing: "-1px",
            color: colors.paper,
            margin: 0,
          }}
        >
          The <span style={{ color: colors.goldSoft }}>Cosy</span> Company
        </motion.h1>

        {/* TAGLINE */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.5 }}
          style={{
            fontFamily: fonts.mono,
            color: "rgba(246,242,232,0.55)",
            letterSpacing: "3px",
            fontSize: "12px",
            marginTop: "18px",
            textTransform: "uppercase",
          }}
        >
          Travel together
        </motion.p>
      </div>
    </motion.div>
  );
}

export default SplashScreen;

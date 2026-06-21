// src/pages/Home.jsx
//
// REDESIGN NOTES:
// - Replaced the glass-card-on-blurred-gradient pattern with a flat paper/ink
//   surface, hairline rule, and a literal "ticket" motif (perforated divider,
//   route line A→B) — the product is about booking a seat on a route, so the
//   signature element is built from that vocabulary instead of a generic glow.
// - The rider/driver choice is now an explicit segmented toggle the person can
//   click, not just a silent localStorage read. Toggling re-renders the single
//   CTA below it immediately, and persists the choice back to localStorage so
//   Dashboard and Home agree on mode.
// - Typography: Fraunces (serif display) for the headline, Inter for body,
//   IBM Plex Mono for the route/eyebrow labels — reinforces "this is a transit
//   ticket," not a generic landing page.
//
// Fraunces / IBM Plex Mono are loaded via Google Fonts in index.html — see
// the <link> snippet left at the bottom of this file as a comment.

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaStar, FaCar, FaUserFriends } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function Home({ darkMode }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState("rider"); // "rider" | "driver"
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedMode = localStorage.getItem("userMode");
    setLoggedIn(!!token);
    setMode(savedMode === "driver" ? "driver" : "rider");
  }, []);

  // CHANGE: toggle is now interactive on the landing page itself, for anyone —
  // logged in or not. Choosing a mode here sets the preference so Dashboard
  // opens to the same mode. Previously this was read-only and silent.
  const handleModeChange = (next) => {
    setMode(next);
    localStorage.setItem("userMode", next);
  };

  const s = surface(darkMode);
  const isDriver = mode === "driver";

  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        padding: "170px 80px 90px",
        background: s.bg,
        fontFamily: fonts.body,
        overflow: "hidden",
      }}
    >
      {/* Faint route line tracing the full width behind the content —
          replaces the blurred-blob glows with something that means something:
          a road. Dashed like a map route, not decorative blur. */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: darkMode ? 0.16 : 0.1,
          zIndex: 1,
        }}
      >
        <path
          d="M -100 650 C 300 650, 350 200, 750 220 C 1100 235, 1150 500, 1600 480"
          fill="none"
          stroke={darkMode ? colors.goldSoft : colors.forest}
          strokeWidth="3"
          strokeDasharray="2 18"
          strokeLinecap="round"
        />
      </svg>

      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "1100px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* EYEBROW — monospace, route-label feel */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: fonts.mono,
            fontSize: "13px",
            letterSpacing: "2.5px",
            color: s.accent,
            marginBottom: "28px",
            textTransform: "uppercase",
          }}
        >
          COSY · SHARED ROUTES, REAL PEOPLE
        </motion.p>

        {/* HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: fonts.display,
            fontSize: "84px",
            lineHeight: "1.02",
            fontWeight: "600",
            letterSpacing: "-2px",
            color: s.text,
            marginBottom: "30px",
            maxWidth: "840px",
          }}
        >
          Your seat on the route is waiting.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          style={{
            color: s.textMuted,
            fontSize: "19px",
            lineHeight: "1.75",
            maxWidth: "560px",
            marginBottom: "56px",
          }}
        >
          Cosy connects verified commuters heading the same way. Split the
          cost, skip the traffic, keep the city a little quieter.
        </motion.p>

        {/* TICKET — the signature element. A horizontal stub with a
            perforated divider, holding the rider/driver toggle on one side
            and the resulting single CTA on the other. */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          style={{
            display: "flex",
            alignItems: "stretch",
            background: s.bgSoft,
            border: `1px solid ${s.line}`,
            borderRadius: "18px",
            overflow: "hidden",
            maxWidth: "640px",
          }}
        >
          {/* LEFT STUB — mode toggle */}
          <div style={{ padding: "26px 28px", flex: "0 0 auto" }}>
            <p
              style={{
                fontFamily: fonts.mono,
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: s.textMuted,
                marginBottom: "14px",
                textTransform: "uppercase",
              }}
            >
              I am a
            </p>

            <div
              style={{
                display: "inline-flex",
                borderRadius: "999px",
                background: darkMode ? "rgba(0,0,0,0.25)" : "rgba(19,35,28,0.06)",
                padding: "4px",
                gap: "2px",
              }}
            >
              {[
                { key: "rider", label: "Rider", icon: <FaUserFriends size={13} /> },
                { key: "driver", label: "Driver", icon: <FaCar size={13} /> },
              ].map((opt) => {
                const active = mode === opt.key;
                return (
                  <button
                    key={opt.key}
                    onClick={() => handleModeChange(opt.key)}
                    aria-pressed={active}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      padding: "9px 18px",
                      borderRadius: "999px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: fonts.body,
                      fontSize: "14px",
                      fontWeight: "600",
                      transition: "background 0.25s, color 0.25s",
                      background: active
                        ? darkMode
                          ? colors.goldSoft
                          : colors.forest
                        : "transparent",
                      color: active ? (darkMode ? colors.ink : "#fff") : s.textMuted,
                    }}
                  >
                    {opt.icon}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* PERFORATION — visually "tears" the ticket in two */}
          <div
            style={{
              position: "relative",
              width: "1px",
              background: s.line,
              flex: "0 0 auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-9px",
                left: "-9px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: s.bg,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-9px",
                left: "-9px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: s.bg,
              }}
            />
          </div>

          {/* RIGHT STUB — single resulting CTA, swaps with the toggle */}
          <div
            style={{
              padding: "26px 28px",
              flex: "1 1 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.button
                key={mode}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.22 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  navigate(isDriver ? "/driver-create-ride" : "/search-rides")
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "16px 26px",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "700",
                  fontFamily: fonts.body,
                  color: darkMode ? colors.ink : "#fff",
                  background: isDriver
                    ? `linear-gradient(135deg, ${colors.rust}, #832318)`
                    : darkMode
                      ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                      : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                }}
              >
                {isDriver ? "Start a Ride" : "Book a Ride"}
                <FaArrowRight size={13} />
              </motion.button>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* TRUST LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "50px",
          }}
        >
          <div style={{ display: "flex" }}>
            {[11, 12, 13].map((imgId) => (
              <img
                key={imgId}
                src={`https://i.pravatar.cc/100?img=${imgId}`}
                alt=""
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  border: `2px solid ${s.bg}`,
                  marginLeft: "-9px",
                }}
              />
            ))}
          </div>
          <p style={{ color: s.textMuted, fontSize: "14.5px" }}>
            <span style={{ color: s.text, fontWeight: "600" }}>
              4.9 average
            </span>{" "}
            across 50,000+ shared rides this year
          </p>
          <FaStar size={12} color={colors.gold} />
        </motion.div>
      </div>
    </section>
  );
}

export default Home;

/*
Add to index.html <head>:
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap" rel="stylesheet">
*/

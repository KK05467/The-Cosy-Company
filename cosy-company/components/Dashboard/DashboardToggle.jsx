// src/components/dashboard/DashboardToggle.jsx
//
// REDESIGN NOTES: same component, same props (mode, setMode, darkMode),
// same onClick logic — only the visual treatment changed, replacing the
// glass-pill-with-glow-shadow with the flat surface()/colors/fonts system
// used everywhere else. Deliberately kept as a simple pill (not the full
// ticket-with-perforation from Home.jsx's hero) since this is a persistent
// in-app control someone clicks repeatedly, not a one-time landing CTA —
// it should feel quick and utilitarian, not ceremonial.

import { motion } from "framer-motion";
import { colors, fonts, surface } from "../../styles/tokens";

function DashboardToggle({ mode, setMode, darkMode }) {
  const s = surface(darkMode);

  const options = [
    { key: "rider", label: "Rider" },
    { key: "driver", label: "Driver" },
  ];

  return (
    <div
      style={{
        display: "inline-flex",
        padding: "4px",
        borderRadius: "12px",
        background: s.bgSoft,
        border: `1px solid ${s.line}`,
      }}
    >
      {options.map((opt) => {
        const active = mode === opt.key;
        return (
          <motion.button
            key={opt.key}
            whileTap={{ scale: 0.96 }}
            onClick={() => setMode(opt.key)}
            aria-pressed={active}
            style={{
              padding: "10px 22px",
              borderRadius: "9px",
              border: "none",
              cursor: "pointer",
              fontFamily: fonts.body,
              fontSize: "14px",
              fontWeight: "700",
              transition: "background 0.25s, color 0.25s",
              background: active
                ? darkMode
                  ? colors.goldSoft
                  : colors.forest
                : "transparent",
              color: active ? (darkMode ? colors.ink : "#fff") : s.textMuted,
            }}
          >
            {opt.label}
          </motion.button>
        );
      })}
    </div>
  );
}

export default DashboardToggle;

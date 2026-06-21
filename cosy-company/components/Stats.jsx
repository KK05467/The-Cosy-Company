// src/components/Stats.jsx
//
// REDESIGN NOTES: old version repeated the same glow-card pattern as
// Features — four nearly-identical cards. Numbers like these are better as
// a single continuous strip (like a manifest header / ticket counterfoil),
// divided by hairline rules instead of four separate boxes. This also visually
// echoes the hero's ticket motif instead of introducing a third unrelated
// card style.

import { motion } from "framer-motion";
import { fonts, surface } from "../styles/tokens";

function Stats({ darkMode }) {
  const s = surface(darkMode);

  const stats = [
    { value: "50K+", label: "Active commuters" },
    { value: "120K+", label: "Shared rides completed" },
    { value: "80 t", label: "CO\u2082 kept out of the air" },
    { value: "40+", label: "Smart routes live" },
  ];

  return (
    <section
      style={{
        padding: "0 80px 130px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: `1px solid ${s.line}`,
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={item.label}
            style={{
              padding: "40px 32px",
              borderRight: index < stats.length - 1 ? `1px solid ${s.line}` : "none",
              background: s.bgSoft,
            }}
          >
            <h3
              style={{
                fontFamily: fonts.display,
                fontSize: "40px",
                fontWeight: "600",
                color: s.text,
                marginBottom: "10px",
                letterSpacing: "-0.5px",
              }}
            >
              {item.value}
            </h3>
            <p
              style={{
                color: s.textMuted,
                fontSize: "14.5px",
                lineHeight: "1.5",
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default Stats;

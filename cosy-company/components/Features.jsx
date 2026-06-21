// src/components/Features.jsx
//
// REDESIGN NOTES:
// - Old version: 4 identical translucent cards, each with its own blurred
//   circle glow — the exact "default AI layout" called out in the brief.
// - New version: a single manifest-style list, like the back of a ticket
//   where terms/details are printed in a row. Hairline rules instead of
//   card borders, monospace index labels (these ARE a real ordered list of
//   "what you get," so a sequence label is honest here, but rendered as
//   ticket-line numbers, not generic 01/02/03 chips).

import { motion } from "framer-motion";
import { FaRoute, FaShieldAlt, FaWallet, FaClock } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function Features({ darkMode }) {
  const s = surface(darkMode);

  const features = [
    {
      icon: <FaRoute />,
      title: "Smart route matching",
      desc: "We match you with commuters already heading your way — no detours, no wasted seats.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified people only",
      desc: "Every driver and rider is identity-checked before their first trip.",
    },
    {
      icon: <FaWallet />,
      title: "Split the real cost",
      desc: "Fuel and tolls divided fairly across the seats filled — never marked up.",
    },
    {
      icon: <FaClock />,
      title: "Live arrival times",
      desc: "Know exactly when your ride is two minutes out, not somewhere in the city.",
    },
  ];

  return (
    <section
      style={{
        padding: "130px 80px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "70px",
            borderBottom: `1px solid ${s.line}`,
            paddingBottom: "40px",
          }}
        >
          <div style={{ maxWidth: "560px" }}>
            <p
              style={{
                fontFamily: fonts.mono,
                fontSize: "13px",
                letterSpacing: "2.5px",
                color: s.accent,
                marginBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              WHAT'S INCLUDED
            </p>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "52px",
                fontWeight: "600",
                letterSpacing: "-1px",
                color: s.text,
                lineHeight: "1.1",
              }}
            >
              Every ride, the same standard.
            </h2>
          </div>
          <p style={{ color: s.textMuted, fontSize: "16px", maxWidth: "320px", lineHeight: "1.7" }}>
            No tiers, no surge pricing tricks. What you get on your first
            ride is what you get on your hundredth.
          </p>
        </div>

        {/* MANIFEST LIST */}
        <div>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              style={{
                display: "grid",
                gridTemplateColumns: "70px 56px 1fr",
                gap: "28px",
                alignItems: "flex-start",
                padding: "32px 0",
                borderBottom: index < features.length - 1 ? `1px solid ${s.line}` : "none",
              }}
            >
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "13px",
                  color: s.textMuted,
                  paddingTop: "6px",
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(31,77,58,0.08)",
                  color: s.accent,
                  fontSize: "17px",
                }}
              >
                {feature.icon}
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "24px",
                    fontWeight: "600",
                    color: s.text,
                    flex: "0 0 260px",
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: s.textMuted,
                    fontSize: "16px",
                    lineHeight: "1.7",
                    maxWidth: "440px",
                    flex: "1 1 300px",
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;

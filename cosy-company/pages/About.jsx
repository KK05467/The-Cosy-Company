// src/pages/About.jsx
//
// REWRITE NOTES: previous version was a bare stub — no background, no
// design system, a single <h1> and nothing else. Rebuilt with real content
// using the shared surface()/colors/fonts tokens, and a closing CTA
// (Book a ride / Become a driver) so the page doesn't dead-end — it was
// one of the only nav-linked pages with no path forward for the reader.

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaLeaf, FaHandshake, FaRoute } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function About({ darkMode }) {
  const s = surface(darkMode);

  const values = [
    {
      icon: <FaRoute />,
      title: "Built around real routes",
      desc: "Cosy doesn't dispatch random drivers — it matches people who are already going the same way, every day.",
    },
    {
      icon: <FaHandshake />,
      title: "Verified, both directions",
      desc: "Every rider and driver is identity-checked before their first trip. Trust runs both ways, not just one.",
    },
    {
      icon: <FaLeaf />,
      title: "Fewer cars, same commute",
      desc: "Every shared seat is one less car on the road. Riders save money; the city breathes a little easier.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 100px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "64px" }}
        >
          <p
            style={{
              fontFamily: fonts.mono,
              fontSize: "13px",
              letterSpacing: "2.5px",
              color: s.accent,
              marginBottom: "22px",
              textTransform: "uppercase",
            }}
          >
            ABOUT COSY
          </p>

          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "48px",
              fontWeight: "600",
              letterSpacing: "-1.5px",
              lineHeight: "1.15",
              marginBottom: "24px",
              maxWidth: "700px",
            }}
          >
            We think the commute shouldn't be something you do alone.
          </h1>

          <p style={{ color: s.textMuted, fontSize: "17px", lineHeight: "1.8", maxWidth: "640px" }}>
            Cosy started with a simple observation: most cars on the road
            during rush hour are carrying one person along a route someone
            else is driving anyway. We built a way to put those empty seats
            to use — verified, scheduled, and split fairly.
          </p>
        </motion.div>

        {/* VALUES — manifest list, consistent with Features.jsx */}
        <div style={{ marginBottom: "70px" }}>
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              style={{
                display: "grid",
                gridTemplateColumns: "56px 1fr",
                gap: "22px",
                alignItems: "flex-start",
                padding: "26px 0",
                borderBottom: index < values.length - 1 ? `1px solid ${s.line}` : "none",
              }}
            >
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
                {item.icon}
              </div>

              <div>
                <h3
                  style={{
                    fontFamily: fonts.display,
                    fontSize: "20px",
                    fontWeight: "600",
                    color: s.text,
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: s.textMuted, fontSize: "15.5px", lineHeight: "1.7", maxWidth: "520px" }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CLOSING CTA — the page previously had nowhere for the reader to go next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          style={{
            padding: "40px",
            borderRadius: "20px",
            background: s.bgSoft,
            border: `1px solid ${s.line}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: fonts.display,
                color: s.text,
                fontSize: "22px",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Ready to share the ride?
            </h3>
            <p style={{ color: s.textMuted, fontSize: "14.5px" }}>
              Find a route or start one — either way, you're a couple of taps from your next trip.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
            <Link to="/search-rides" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: darkMode
                    ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                    : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                  color: darkMode ? colors.ink : "#fff",
                  fontWeight: "700",
                  fontSize: "14px",
                  fontFamily: fonts.body,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Book a ride
              </motion.button>
            </Link>

            <Link to="/driver-create-ride" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "13px 24px",
                  borderRadius: "12px",
                  border: `1px solid ${s.line}`,
                  background: "transparent",
                  color: s.text,
                  fontWeight: "700",
                  fontSize: "14px",
                  fontFamily: fonts.body,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Become a driver
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;

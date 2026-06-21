// src/pages/HowItWorks.jsx
//
// REDESIGN NOTES: this is the one page in the app where a real ordered
// sequence exists (you do these four things in this order), unlike the
// "4 features" / "4 stats" grids elsewhere that were unordered facts
// dressed up as cards. That makes this the legitimate place for a
// connected route-line timeline — reusing the dashed-path SVG language
// from Home.jsx/AuthLeft.jsx/Dashboard.jsx, but here the line is load-
// bearing structure connecting real sequential steps, not background
// texture behind unrelated content.

import { FaSearchLocation, FaUsers, FaCar, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { colors, fonts, surface } from "../styles/tokens";

function HowItWorks({ darkMode }) {
  const s = surface(darkMode);

  const steps = [
    { icon: <FaSearchLocation />, title: "Enter your route", desc: "Drop a pin or search your pickup and destination." },
    { icon: <FaUsers />, title: "Get matched", desc: "We match you with verified riders or drivers heading the same way." },
    { icon: <FaCar />, title: "Travel together", desc: "Share the ride, split the cost, skip the traffic." },
    { icon: <FaCheckCircle />, title: "Arrive, rate, repeat", desc: "Pay securely in-app and rate your trip when you arrive." },
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
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
            THE ROUTE
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "52px",
              fontWeight: "600",
              letterSpacing: "-1.5px",
            }}
          >
            How Cosy works.
          </h1>
        </motion.div>

        {/* TIMELINE */}
        <div style={{ position: "relative" }}>
          {/* connecting route line — drawn once behind all four stops */}
          <div
            style={{
              position: "absolute",
              top: "29px",
              left: "calc(12.5% )",
              right: "calc(12.5%)",
              height: "2px",
              background: `repeating-linear-gradient(to right, ${s.line} 0, ${s.line} 8px, transparent 8px, transparent 16px)`,
              zIndex: 0,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "28px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ textAlign: "center" }}
              >
                {/* waypoint marker — sits on the route line */}
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "50%",
                    margin: "0 auto 22px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: s.bg,
                    border: `2px solid ${s.accent}`,
                    color: s.accent,
                    fontSize: "22px",
                    position: "relative",
                  }}
                >
                  {step.icon}

                  {/* step number */}
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-8px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: darkMode
                        ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                        : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                      color: darkMode ? colors.ink : "#fff",
                      fontFamily: fonts.mono,
                      fontSize: "11px",
                      fontWeight: "700",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {index + 1}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: fonts.display,
                    color: s.text,
                    fontSize: "19px",
                    fontWeight: "600",
                    marginBottom: "10px",
                  }}
                >
                  {step.title}
                </h3>

                <p style={{ color: s.textMuted, fontSize: "14.5px", lineHeight: "1.65", maxWidth: "220px", margin: "0 auto" }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;

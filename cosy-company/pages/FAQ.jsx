// src/pages/FAQ.jsx
//
// REDESIGN NOTES: the original used a one-off blue/slate palette that
// didn't match the rest of the app (forest/gold/cream/ink everywhere else)
// and rendered every answer open at once. Replaced with:
// - The shared surface()/colors/fonts tokens, so this page matches
//   Contact/Features/SearchRides instead of introducing a fourth palette.
// - An accordion instead of always-open cards — most people scan questions
//   rather than read every answer, so collapsing by default with a left
//   tick marking the open item (echoes Sidebar.jsx's active-item tick)
//   gives this page real FAQ behavior instead of just looking like a list.
// - Mono index numbers on each question, consistent with the manifest
//   numbering used in Features.jsx.

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { colors, fonts, surface } from "../styles/tokens";

function FAQ({ darkMode }) {
  const s = surface(darkMode);
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How does vehicle pooling work?",
      a: "Cosy matches riders travelling on similar routes and schedules, so you share a car with someone already heading your way instead of booking a ride alone.",
    },
    {
      q: "Is Cosy safe?",
      a: "Every driver and rider on Cosy is identity-verified before their first trip, and ride details are tracked from pickup to drop-off.",
    },
    {
      q: "How are payments handled?",
      a: "Payments are processed securely through integrated payment gateways — fares are split fairly across the seats filled, with no hidden markups.",
    },
    {
      q: "Can I be both a rider and driver?",
      a: "Yes. You can switch between rider and driver mode anytime from your dashboard, with no separate sign-up required.",
    },
  ];

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 100px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "50px" }}
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
            QUESTIONS, ANSWERED
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "50px",
              fontWeight: "600",
              letterSpacing: "-1.5px",
              lineHeight: "1.1",
            }}
          >
            Frequently asked questions.
          </h1>
        </motion.div>

        {/* ACCORDION */}
        <div
          style={{
            border: `1px solid ${s.line}`,
            borderRadius: "18px",
            overflow: "hidden",
            background: s.bgSoft,
          }}
        >
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                style={{
                  borderBottom: index < faqs.length - 1 ? `1px solid ${s.line}` : "none",
                }}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    padding: "24px 28px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  {/* active tick — echoes Sidebar.jsx's active-item marker */}
                  {isOpen && (
                    <motion.div
                      layoutId="faqActiveTick"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "14px",
                        bottom: "14px",
                        width: "3px",
                        borderRadius: "2px",
                        background: s.accent,
                      }}
                    />
                  )}

                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: "12px",
                      color: s.textMuted,
                      flexShrink: 0,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    style={{
                      flex: 1,
                      fontFamily: fonts.display,
                      fontSize: "18.5px",
                      fontWeight: "600",
                      color: s.text,
                    }}
                  >
                    {item.q}
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: "20px",
                      color: s.accent,
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          color: s.textMuted,
                          fontSize: "15.5px",
                          lineHeight: "1.75",
                          padding: "0 28px 26px 68px",
                          margin: 0,
                        }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* FOOTER NUDGE */}
        <p
          style={{
            color: s.textMuted,
            fontSize: "15px",
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          Still have a question?{" "}
          <Link to="/contact" style={{ color: s.accent, fontWeight: "600", textDecoration: "none" }}>
            Get in touch
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FAQ;

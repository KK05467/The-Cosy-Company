// src/pages/Pricing.jsx
//
// REDESIGN NOTES:
// - Three plans now read as ticket stubs in a row rather than glass cards —
//   flat surface, hairline border, mono price label under a serif number.
// - The middle "Premium" plan gets the one solid-fill treatment (matches
//   Profile's membership card) to signal it's the recommended tier, instead
//   of a generic "Most Popular" ribbon.
// - Feature checks use the accent color so they read as part of the system,
//   not leftover blue (#3b82f6) from the old palette.

import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { colors, fonts, surface } from "../styles/tokens";

function Pricing({ darkMode }) {
  const s = surface(darkMode);

  const plans = [
    {
      title: "Rider",
      price: "Free",
      note: "for anyone booking a seat",
      features: ["AI Ride Matching", "Real-Time Tracking", "Secure Payments", "Route Optimization"],
      featured: false,
    },
    {
      title: "Premium",
      price: "₹199",
      note: "per month",
      features: ["Priority Matching", "Lower Service Fees", "Advanced Analytics", "Premium Support"],
      featured: true,
    },
    {
      title: "Corporate",
      price: "Custom",
      note: "for teams & fleets",
      features: ["Employee Pooling", "Admin Dashboard", "Reporting Tools", "Dedicated Support"],
      featured: false,
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
      <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <p
            style={{
              fontFamily: fonts.mono,
              color: s.accent,
              letterSpacing: "2.5px",
              fontSize: "11px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            PLANS &amp; PRICING
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "56px",
              fontWeight: "600",
              marginBottom: "16px",
              letterSpacing: "-1px",
            }}
          >
            Choose how you travel
          </h1>
          <p style={{ color: s.textMuted, fontSize: "17px" }}>
            Every plan keeps the road shared. Pick the level of priority that fits you.
          </p>
        </motion.div>

        {/* PLAN ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {plans.map((plan, i) => {
            const featuredFill = darkMode
              ? `linear-gradient(135deg, ${colors.forestDeep}, ${colors.forest})`
              : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`;

            return (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                style={{
                  padding: "40px 34px",
                  borderRadius: "20px",
                  background: plan.featured ? featuredFill : s.bgSoft,
                  border: plan.featured ? "none" : `1px solid ${s.line}`,
                  position: "relative",
                }}
              >
                {plan.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "24px",
                      right: "30px",
                      fontFamily: fonts.mono,
                      fontSize: "10px",
                      letterSpacing: "1.5px",
                      color: "rgba(246,242,232,0.7)",
                      textTransform: "uppercase",
                    }}
                  >
                    Recommended
                  </div>
                )}

                <h2
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: "13px",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: plan.featured ? "rgba(246,242,232,0.75)" : s.accent,
                    marginBottom: "20px",
                  }}
                >
                  {plan.title}
                </h2>

                <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "6px" }}>
                  <h1
                    style={{
                      fontFamily: fonts.display,
                      fontSize: "42px",
                      fontWeight: "600",
                      color: plan.featured ? colors.paper : s.text,
                      margin: 0,
                    }}
                  >
                    {plan.price}
                  </h1>
                </div>
                <p
                  style={{
                    color: plan.featured ? "rgba(246,242,232,0.65)" : s.textMuted,
                    fontSize: "13px",
                    marginBottom: "32px",
                  }}
                >
                  {plan.note}
                </p>

                <div
                  style={{
                    height: "1px",
                    background: plan.featured ? "rgba(246,242,232,0.15)" : s.line,
                    marginBottom: "28px",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {plan.features.map((feature) => (
                    <div key={feature} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <FaCheck size={12} color={plan.featured ? colors.goldSoft : s.accent} />
                      <span
                        style={{
                          color: plan.featured ? "rgba(246,242,232,0.9)" : s.text,
                          fontSize: "14.5px",
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    marginTop: "32px",
                    padding: "14px",
                    borderRadius: "12px",
                    border: plan.featured ? "none" : `1px solid ${s.line}`,
                    background: plan.featured ? colors.goldSoft : "transparent",
                    color: plan.featured ? colors.ink : s.text,
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {plan.price === "Free" ? "Get Started" : plan.price === "Custom" ? "Contact Sales" : "Upgrade Now"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Pricing;

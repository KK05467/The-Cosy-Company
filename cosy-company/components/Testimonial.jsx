// src/components/Testimonial.jsx
//
// REDESIGN NOTES: old version was another glow-card with a giant quote —
// same visual family as the broken stats/features cards, just bigger. New
// version reuses the hero's perforated-ticket motif (a quote "torn off" the
// ticket stub) so the page has one recurring signature element instead of
// three different card treatments stacked on top of each other.

import { motion } from "framer-motion";
import { fonts, surface } from "../styles/tokens";

function Testimonial({ darkMode }) {
  const s = surface(darkMode);

  return (
    <section style={{ padding: "0 80px 130px", background: s.bg, fontFamily: fonts.body }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "flex",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        {/* LEFT STUB — rider identity, mirrors hero ticket's left stub */}
        <div
          style={{
            flex: "0 0 240px",
            padding: "44px 36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: `1px solid ${s.line}`,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: fonts.mono,
                fontSize: "11px",
                letterSpacing: "1.5px",
                color: s.textMuted,
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              Rider since 2024
            </p>
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt=""
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "50%",
                marginBottom: "16px",
              }}
            />
            <h4 style={{ color: s.text, fontSize: "17px", fontWeight: "600", marginBottom: "4px" }}>
              Aryan Sharma
            </h4>
            <p style={{ color: s.textMuted, fontSize: "14px" }}>Product Designer</p>
          </div>

          <p style={{ fontFamily: fonts.mono, fontSize: "12px", color: s.textMuted }}>
            ROUTE: HSR → KORAMANGALA
          </p>
        </div>

        {/* RIGHT — the quote itself */}
        <div style={{ flex: "1 1 auto", padding: "52px 56px", display: "flex", alignItems: "center" }}>
          <p
            style={{
              fontFamily: fonts.display,
              fontSize: "32px",
              lineHeight: "1.45",
              fontWeight: "500",
              color: s.text,
              letterSpacing: "-0.3px",
            }}
          >
            Cosy turned my worst part of the day into the easiest. I split
            the cost with someone going the exact same way, every morning —
            it just makes sense.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Testimonial;

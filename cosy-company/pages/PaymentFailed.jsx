// src/pages/PaymentFailed.jsx
//
// REDESIGN NOTES: matches the resolved-state card treatment used in
// PaymentSuccess.jsx, so a person bouncing between a successful and a
// failed payment sees one consistent "outcome screen" language instead of
// two unrelated designs. All links (/payment, /wallet) are confirmed real
// routes per App.jsx — no changes needed there.

import { motion } from "framer-motion";
import { FaTimesCircle, FaRedo, FaWallet, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { colors, fonts, surface } from "../styles/tokens";

function PaymentFailed({ darkMode }) {
  const s = surface(darkMode);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "560px",
          padding: "50px",
          borderRadius: "24px",
          textAlign: "center",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
        }}
      >
        <FaTimesCircle style={{ color: colors.rust, fontSize: "64px", marginBottom: "22px" }} />

        <h1
          style={{
            fontFamily: fonts.display,
            color: s.text,
            fontSize: "34px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            marginBottom: "12px",
          }}
        >
          Payment failed
        </h1>

        <p style={{ color: s.textMuted, fontSize: "15.5px", lineHeight: "1.7", marginBottom: "30px" }}>
          We couldn't process your transaction. Check your payment method and try again.
        </p>

        {/* INFO ROWS — manifest style instead of two separate glow cards */}
        <div
          style={{
            border: `1px solid ${s.line}`,
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "28px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <InfoCell icon={<FaWallet />} title="Check balance" desc="Ensure sufficient funds" s={s} borderRight />
          <InfoCell icon={<FaShieldAlt />} title="Secure payment" desc="All data encrypted" s={s} />
        </div>

        <Link to="/payment" style={{ textDecoration: "none" }}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              padding: "15px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: fonts.body,
              color: darkMode ? colors.ink : "#fff",
              background: darkMode
                ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaRedo size={13} />
            Retry payment
          </motion.button>
        </Link>

        <Link
          to="/wallet"
          style={{
            display: "block",
            marginTop: "16px",
            color: s.accent,
            fontSize: "14px",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          Go to wallet
        </Link>
      </motion.div>
    </div>
  );
}

function InfoCell({ icon, title, desc, s, borderRight }) {
  return (
    <div
      style={{
        padding: "18px",
        textAlign: "left",
        background: s.bg,
        borderRight: borderRight ? `1px solid ${s.line}` : "none",
      }}
    >
      <div style={{ color: s.accent, fontSize: "16px", marginBottom: "8px" }}>{icon}</div>
      <h4 style={{ margin: 0, color: s.text, fontSize: "13.5px", fontWeight: "600" }}>{title}</h4>
      <p style={{ margin: "5px 0 0", color: s.textMuted, fontSize: "12px" }}>{desc}</p>
    </div>
  );
}

export default PaymentFailed;

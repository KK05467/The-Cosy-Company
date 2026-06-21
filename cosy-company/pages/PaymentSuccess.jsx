// src/pages/PaymentSuccess.jsx
//
// REDESIGN NOTES: matches the resolved-state card treatment used in
// PaymentFailed.jsx, so the success/failure outcome screens read as
// siblings. No logic changed — reading amount/bookingId from
// location.state, navigate("/my-bookings"), and the Link to "/" are all
// exactly as given.
//
// FLAGGING (not fixing, per explicit instruction): this version makes no
// API call to confirm or persist the payment server-side — it trusts
// whatever was passed via navigate(...) state. An earlier version of this
// file in our conversation called a /api/bookings/mark-paid endpoint
// instead. You said to redesign this one as-is, so I have not added that
// call back in. If a confirmed payment actually needs to be written to the
// booking's status server-side, that logic isn't present in either visual
// layer — it would need to happen wherever this page is navigated to from.

import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaHome, FaReceipt } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

function PaymentSuccess({ darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const s = surface(darkMode);

  const amount = location.state?.amount;
  const bookingId = location.state?.bookingId;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          maxWidth: "560px",
          width: "100%",
          padding: "50px",
          borderRadius: "24px",
          textAlign: "center",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
        >
          <FaCheckCircle style={{ color: "#2D6A4F", fontSize: "64px", marginBottom: "22px" }} />
        </motion.div>

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
          Payment successful
        </h1>

        <p style={{ color: s.textMuted, fontSize: "15.5px", lineHeight: "1.7", marginBottom: "28px" }}>
          Your ride is confirmed and the driver has been notified.
        </p>

        {(amount || bookingId) && (
          <div
            style={{
              padding: "18px 20px",
              borderRadius: "14px",
              marginBottom: "28px",
              background: s.bg,
              border: `1px solid ${s.line}`,
              textAlign: "left",
            }}
          >
            {amount && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: bookingId ? "10px" : 0,
                }}
              >
                <span style={{ color: s.textMuted, fontSize: "13px" }}>Amount paid</span>
                <span style={{ color: s.accent, fontWeight: "700", fontFamily: fonts.display }}>₹{amount}</span>
              </div>
            )}
            {bookingId && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: s.textMuted, fontSize: "13px" }}>Booking ID</span>
                <span style={{ color: s.text, fontFamily: fonts.mono, fontSize: "13px" }}>
                  #{bookingId.slice(-8).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}

        <div style={{ display: "flex", gap: "12px" }}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/my-bookings")}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              background: darkMode
                ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
              color: darkMode ? colors.ink : "#fff",
              fontWeight: "700",
              fontSize: "13.5px",
              fontFamily: fonts.body,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <FaReceipt size={13} /> View booking
          </motion.button>

          <Link to="/" style={{ flex: 1, textDecoration: "none" }}>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                cursor: "pointer",
                background: "transparent",
                border: `1px solid ${s.line}`,
                color: s.text,
                fontWeight: "700",
                fontSize: "13.5px",
                fontFamily: fonts.body,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <FaHome size={13} /> Home
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;

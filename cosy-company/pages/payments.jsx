// src/pages/PaymentSuccess.jsx
//
// CHANGE NOTE: the original version only rendered a static success message.
// It never read the bookingId/amount passed via navigate("/payments", { state: {...} })
// from Bookings.jsx, and never told the backend the booking was paid — so a
// booking's status would stay "confirmed" forever even after this page showed
// "Payment Successful."
//
// ASSUMPTION I HAD TO MAKE (please verify/adjust):
//   - Endpoint: PATCH /api/bookings/mark-paid/:id
//   - Body: { } (none needed) — adjust if your backend expects e.g. { amount, paymentId }
// If your real endpoint is named differently, change MARK_PAID_ENDPOINT below.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function PaymentSuccess({ darkMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingId = location.state?.bookingId;
  const amount = location.state?.amount;

  const [status, setStatus] = useState(bookingId ? "confirming" : "missing-state");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // CHANGE: if someone lands here directly (refresh, back button, bookmarked
    // link) without bookingId in state, don't pretend payment succeeded.
    if (!bookingId) {
      setStatus("missing-state");
      return;
    }

    let cancelled = false;

    const markPaid = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          if (!cancelled) {
            setStatus("error");
            setErrorMsg("You're not logged in. Please log in again.");
          }
          return;
        }

        const res = await fetch(`${API_BASE}/api/bookings/mark-paid/${bookingId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        let data;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        if (cancelled) return;

        if (res.ok && (data?.success ?? true)) {
          setStatus("success");
        } else {
          setStatus("error");
          setErrorMsg(data?.message || `Could not confirm payment (status ${res.status}).`);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setStatus("error");
          setErrorMsg("Could not reach the server to confirm payment.");
        }
      }
    };

    markPaid();

    return () => {
      cancelled = true;
    };
  }, [bookingId]);

  const isLoading = status === "confirming";
  const isError = status === "error" || status === "missing-state";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        fontFamily: "Inter, sans-serif",
        background: darkMode
          ? "linear-gradient(135deg,#0F1115,#171923)"
          : "linear-gradient(135deg,#F5F1E8,#EAE3D2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* GLOW */}
      <div
        style={{
          position: "absolute",
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: isError ? "#B0413E" : darkMode ? "#D4AF37" : "#2D6A4F",
          filter: "blur(160px)",
          opacity: 0.14,
          top: "-120px",
          right: "-120px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        style={{
          width: "100%",
          maxWidth: "620px",
          padding: "60px",
          borderRadius: "34px",
          textAlign: "center",
          background: darkMode
            ? "rgba(23,25,35,0.72)"
            : "rgba(255,255,255,0.65)",
          border: darkMode
            ? "1px solid rgba(212,175,55,0.14)"
            : "1px solid rgba(31,77,58,0.14)",
          backdropFilter: "blur(25px)",
          boxShadow: darkMode
            ? "0 30px 90px rgba(0,0,0,0.55)"
            : "0 30px 90px rgba(31,77,58,0.12)",
        }}
      >
        {isLoading && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                border: darkMode
                  ? "4px solid rgba(212,175,55,0.2)"
                  : "4px solid rgba(31,77,58,0.2)",
                borderTopColor: darkMode ? "#D4AF37" : "#1F4D3A",
                margin: "0 auto 30px",
              }}
            />
            <h1
              style={{
                color: darkMode ? "#F5F5F5" : "#1D1D1D",
                fontSize: "32px",
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              Confirming your payment...
            </h1>
            <p style={{ color: darkMode ? "#A1A1AA" : "#4B5563", fontSize: "15px" }}>
              Please don't close this page.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <FaCheckCircle
                style={{
                  color: darkMode ? "#D4AF37" : "#1F4D3A",
                  fontSize: "110px",
                  marginBottom: "26px",
                  filter: darkMode
                    ? "drop-shadow(0 0 25px rgba(212,175,55,0.35))"
                    : "drop-shadow(0 0 25px rgba(31,77,58,0.25))",
                }}
              />
            </motion.div>

            <h1
              style={{
                color: darkMode ? "#F5F5F5" : "#1D1D1D",
                fontSize: "52px",
                marginBottom: "14px",
                fontWeight: "800",
              }}
            >
              Payment Successful
            </h1>

            <p
              style={{
                color: darkMode ? "#A1A1AA" : "#4B5563",
                fontSize: "16px",
                lineHeight: "1.8",
                marginBottom: "8px",
              }}
            >
              Your ride has been booked successfully. Sit back and enjoy your journey with Cosy.
            </p>

            {amount && (
              <p
                style={{
                  color: darkMode ? "#D4AF37" : "#1F4D3A",
                  fontSize: "18px",
                  fontWeight: "700",
                  marginBottom: "30px",
                }}
              >
                ₹{amount} paid
              </p>
            )}

            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "16px 34px",
                  borderRadius: "16px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginTop: "20px",
                  background: darkMode
                    ? "linear-gradient(135deg,#D4AF37,#A8892F)"
                    : "linear-gradient(135deg,#1F4D3A,#2D6A4F)",
                  color: "#fff",
                  boxShadow: darkMode
                    ? "0 10px 40px rgba(212,175,55,0.25)"
                    : "0 10px 40px rgba(31,77,58,0.25)",
                }}
              >
                Go To Dashboard
              </motion.button>
            </Link>
          </>
        )}

        {isError && (
          <>
            <FaExclamationCircle
              style={{
                color: "#B0413E",
                fontSize: "90px",
                marginBottom: "26px",
              }}
            />
            <h1
              style={{
                color: darkMode ? "#F5F5F5" : "#1D1D1D",
                fontSize: "36px",
                marginBottom: "14px",
                fontWeight: "800",
              }}
            >
              {status === "missing-state" ? "Nothing to confirm" : "Payment Confirmation Failed"}
            </h1>
            <p
              style={{
                color: darkMode ? "#A1A1AA" : "#4B5563",
                fontSize: "15px",
                lineHeight: "1.8",
                marginBottom: "30px",
              }}
            >
              {status === "missing-state"
                ? "We couldn't find a booking to confirm. If you just paid, please check your bookings page — your payment may still have gone through."
                : errorMsg}
            </p>

            <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/bookings")}
                style={{
                  padding: "14px 28px",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  background: darkMode
                    ? "linear-gradient(135deg,#D4AF37,#A8892F)"
                    : "linear-gradient(135deg,#1F4D3A,#2D6A4F)",
                  color: "#fff",
                }}
              >
                View My Bookings
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/dashboard")}
                style={{
                  padding: "14px 28px",
                  borderRadius: "14px",
                  border: darkMode
                    ? "1px solid rgba(212,175,55,0.3)"
                    : "1px solid rgba(31,77,58,0.3)",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: darkMode ? "#D4AF37" : "#1F4D3A",
                }}
              >
                Go To Dashboard
              </motion.button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;

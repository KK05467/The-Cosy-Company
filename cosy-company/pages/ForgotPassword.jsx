// src/pages/ForgotPassword.jsx
//
// REDESIGN NOTES: matches the auth-card treatment used in LoginForm.jsx /
// SignupForm.jsx instead of introducing a third blue/slate palette.
//
// BUG FIXES (functional, not just visual):
// - titleStyle, cardStyle, and buttonStyle were static objects, NOT
//   functions of darkMode, even though inputStyle correctly was one. In
//   light mode this meant: white title text on a light background
//   (invisible), and a card background/border tuned only for dark mode
//   (near-zero contrast in light mode). All styling below is now properly
//   theme-aware via the shared surface() tokens.
// - The status message used one hardcoded blue for both success and error
//   text — "OTP sent" and a real error message were visually
//   indistinguishable. Added a separate error state with distinct rust
//   coloring.
// - Added a check that email isn't empty before submitting.
// - Replaced hardcoded http://localhost:5000 with the shared API_BASE
//   pattern used across the rest of the project.
//
// FLAGGING, NOT FIXING: this still auto-navigates to /reset-password after
// a successful OTP send. I don't have that file, so I can't confirm it
// receives the email/session context it needs to verify the right OTP —
// worth checking that page actually knows which email this OTP was sent to
// (e.g. via location.state, the same pattern used in PaymentSuccess.jsx).

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

export default function ForgotPassword({ darkMode }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  const s = surface(darkMode);

  const handleSubmit = async () => {
    setMessage("");
    setIsError(false);

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setIsError(true);
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.message || `Could not send OTP (status ${res.status}).`);
      }

      setMessage("OTP sent to your email.");
      setIsError(false);

      // NOTE: navigates on a timer regardless of whether /reset-password
      // has the email/session it needs — see file-level comment above.
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    } catch (err) {
      setMessage(err.message || "Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    marginBottom: "16px",
    border: `1px solid ${s.line}`,
    background: s.bgSoft,
    color: s.text,
    fontFamily: fonts.body,
    fontSize: "14.5px",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "22px",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
        }}
      >
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: "11px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: s.accent,
            marginBottom: "18px",
          }}
        >
          Account recovery
        </p>

        <h1
          style={{
            fontFamily: fonts.display,
            color: s.text,
            fontSize: "30px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
          }}
        >
          Forgot your password?
        </h1>

        <p style={{ color: s.textMuted, marginBottom: "26px", fontSize: "14.5px", lineHeight: "1.6" }}>
          Enter your email and we'll send you a one-time code to reset it.
        </p>

        <input
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={fieldStyle}
        />

        {message && (
          <p
            style={{
              color: isError ? colors.rust : s.accent,
              fontSize: "13.5px",
              marginBottom: "16px",
            }}
          >
            {message}
          </p>
        )}

        <motion.button
          whileHover={{ y: loading ? 0 : -2 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: loading
              ? s.line
              : darkMode
                ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
            color: loading ? s.textMuted : darkMode ? colors.ink : "#fff",
            fontWeight: "700",
            fontFamily: fonts.body,
            fontSize: "15px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending..." : "Send OTP"}
        </motion.button>
      </div>
    </motion.div>
  );
}

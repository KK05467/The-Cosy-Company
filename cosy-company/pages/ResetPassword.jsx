// src/pages/ResetPassword.jsx
//
// REDESIGN NOTES:
// - Replaced the blue glass card with the flat paper/ink ticket surface and
//   a hairline perforation between the "send OTP" stage and the "reset"
//   stage — same visual idea as Home's ticket toggle, applied to a 2-step
//   form instead of a mode switch.
// - Buttons now use the accent color (gold in dark mode, forest in light)
//   instead of leftover blue, so this page matches the rest of the system.
// - Message text color reflects success vs error (previously always blue,
//   even for error states like "Email required").

import { useState } from "react";
import { motion } from "framer-motion";
import OtpTimer from "../components/OtpTimer";
import { colors, fonts, surface } from "../styles/tokens";

export default function ResetPassword({ darkMode }) {
  const s = surface(darkMode);

  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [expiresAt, setExpiresAt] = useState(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    if (!form.email) {
      setIsError(true);
      return setMessage("Email required");
    }

    try {
      setOtpLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setExpiresAt(data.expiresAt);
      setIsError(false);
      setMessage("OTP sent successfully");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const resetPassword = async () => {
    if (!form.email) { setIsError(true); return setMessage("Email required"); }
    if (!form.otp) { setIsError(true); return setMessage("OTP required"); }
    if (!form.newPassword) { setIsError(true); return setMessage("Password required"); }

    try {
      setResetLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setIsError(false);
      setMessage("Password reset successful");
    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "15px 16px",
    borderRadius: "12px",
    marginBottom: "12px",
    background: darkMode ? colors.inkDark : "#fff",
    border: `1px solid ${s.line}`,
    color: s.text,
    outline: "none",
    fontSize: "14.5px",
    fontFamily: fonts.body,
    boxSizing: "border-box",
  };

  const primaryBtn = (loading) => ({
    width: "100%",
    padding: "15px",
    borderRadius: "12px",
    border: "none",
    background: loading ? s.line : (darkMode ? colors.goldSoft : colors.forest),
    color: darkMode ? colors.ink : "#fff",
    fontWeight: "600",
    fontSize: "14.5px",
    cursor: loading ? "default" : "pointer",
  });

  return (
    <div
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
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "460px",
          borderRadius: "20px",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "40px 38px 30px" }}>
          <p
            style={{
              fontFamily: fonts.mono,
              color: s.accent,
              letterSpacing: "2.5px",
              fontSize: "11px",
              textTransform: "uppercase",
              marginBottom: "14px",
            }}
          >
            ACCOUNT RECOVERY
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "32px",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Reset your password
          </h1>
          <p style={{ color: s.textMuted, fontSize: "14px" }}>
            We'll send a one-time code to verify it's you.
          </p>
        </div>

        {/* STEP 1 — email + send OTP */}
        <div style={{ padding: "0 38px 28px" }}>
          <input
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            style={inputStyle}
          />
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={sendOtp}
            disabled={otpLoading}
            style={primaryBtn(otpLoading)}
          >
            {otpLoading ? "Sending..." : "Send OTP"}
          </motion.button>

          {expiresAt && (
            <div style={{ marginTop: "14px" }}>
              <OtpTimer expiryTime={expiresAt} />
            </div>
          )}
        </div>

        {/* PERFORATION DIVIDER */}
        <div style={{ position: "relative", height: "1px", background: s.line, margin: "0 38px" }}>
          <div style={{ position: "absolute", top: "-9px", left: "-47px", width: "18px", height: "18px", borderRadius: "50%", background: s.bg }} />
          <div style={{ position: "absolute", top: "-9px", right: "-47px", width: "18px", height: "18px", borderRadius: "50%", background: s.bg }} />
        </div>

        {/* STEP 2 — otp + new password */}
        <div style={{ padding: "28px 38px 38px" }}>
          <p
            style={{
              fontFamily: fonts.mono,
              color: s.textMuted,
              letterSpacing: "1.5px",
              fontSize: "10px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Verify &amp; reset
          </p>

          <input name="otp" placeholder="Enter OTP" onChange={handleChange} style={inputStyle} />
          <input
            name="newPassword"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: "20px" }}
          />

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={resetPassword}
            disabled={resetLoading}
            style={primaryBtn(resetLoading)}
          >
            {resetLoading ? "Processing..." : "Reset Password"}
          </motion.button>

          {message && (
            <p
              style={{
                marginTop: "16px",
                fontSize: "13px",
                color: isError ? colors.rust : s.accent,
              }}
            >
              {message}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

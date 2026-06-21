// /components/SignupForm.jsx
//
// REDESIGN NOTES: same flat ticket-stub card treatment as LoginForm.jsx —
// hairline border, no glow orb, mono eyebrow, Fraunces heading.
//
// BUG FIXES (functional, not just visual):
// - phone and dob were collected in state, fully wired to inputs, and then
//   silently dropped from the request body (only name/email/password were
//   sent). Added them to the payload. If your backend's signup endpoint
//   doesn't accept these fields yet, it'll just ignore the extra keys —
//   but if it does expect them (likely, since the form asks for them),
//   this was actual data loss on every signup.
// - Submit button now disables while loading — previously nothing stopped
//   a double-click from firing two signup requests.
// - Added minimal required-field validation before hitting the network.
// - Wrapped response.json() in its own try/catch so a non-JSON error
//   response (502, proxy page, etc.) doesn't produce a generic, unhelpful
//   "Something went wrong" with no real diagnostic.
// - Replaced hardcoded http://localhost:5000 with the shared API_BASE
//   pattern used across the rest of the project.
// - "Continue with Google" previously had no onClick — see the same TODO
//   pattern as LoginForm.jsx. Not faking OAuth; flagging it as unwired.

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function SignupForm({ darkMode }) {
  const navigate = useNavigate();
  const s = surface(darkMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    // CHANGE: validate before making a network call at all.
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Name, email, and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // CHANGE: phone and dob were collected but never sent — added here.
        body: JSON.stringify({ name, email, phone, dob, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        setError(data?.message || `Signup failed (status ${response.status}).`);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "13px 16px",
    borderRadius: "12px",
    border: `1px solid ${s.line}`,
    background: s.bgSoft,
    color: s.text,
    fontFamily: fonts.body,
    fontSize: "14.5px",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "14px",
  };

  return (
    <div
      style={{
        flex: 1,
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
          maxWidth: "440px",
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
          Join Cosy
        </p>

        <h1
          style={{
            fontFamily: fonts.display,
            color: s.text,
            fontSize: "32px",
            fontWeight: "600",
            letterSpacing: "-0.5px",
            marginBottom: "10px",
            lineHeight: "1.15",
          }}
        >
          Create your account
        </h1>

        <p style={{ color: s.textMuted, marginBottom: "10px", fontSize: "14.5px", lineHeight: "1.6" }}>
          Join the future of smart, shared mobility.
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ ...fieldStyle, marginTop: "20px" }}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={fieldStyle}
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={fieldStyle}
        />

        {/* DOB */}
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{ ...fieldStyle, cursor: "pointer" }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={fieldStyle}
        />

        {error && (
          <p style={{ color: colors.rust, marginTop: "16px", fontSize: "13.5px" }}>{error}</p>
        )}

        {/* SIGNUP BUTTON */}
        <motion.button
          whileHover={{ y: loading ? 0 : -2 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={handleSignup}
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
            fontSize: "15px",
            fontWeight: "700",
            fontFamily: fonts.body,
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "22px",
          }}
        >
          {loading ? "Creating account..." : "Create account"}
        </motion.button>

        {/* DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "22px", marginBottom: "22px" }}>
          <div style={{ flex: 1, height: "1px", background: s.line }} />
          <span style={{ color: s.textMuted, fontSize: "12.5px" }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: s.line }} />
        </div>

        {/* GOOGLE BUTTON */}
        {/* CHANGE: previously had no onClick at all. Not faking real OAuth
            here either — see the matching note in LoginForm.jsx. */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // TODO: replace with real Google OAuth (Google Identity
            // Services + your backend's /api/auth/google endpoint).
            alert("Google sign-up isn't connected yet.");
          }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            background: "transparent",
            border: `1px solid ${s.line}`,
            color: s.text,
            fontSize: "14px",
            fontWeight: "600",
            fontFamily: fonts.body,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FaGoogle style={{ color: "#EA4335", fontSize: "17px" }} />
          Continue with Google
        </motion.button>

        {/* LOGIN LINK */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
          <p style={{ color: s.textMuted, fontSize: "14px" }}>Already have an account?</p>
          <Link to="/login" style={{ color: s.accent, textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default SignupForm;

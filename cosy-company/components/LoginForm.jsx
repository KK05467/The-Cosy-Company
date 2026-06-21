// /components/LoginForm.jsx
//
// REDESIGN NOTES (visual only — handleLogin, login(), navigate, and all
// useState calls are unchanged):
// - Replaced the glass-card-on-glow-orb pattern with the flat ticket system
//   from Home/Contact/SearchRides: a single stub card, hairline border, no
//   blurred glow.
// - Import path note: this file lives at /components/LoginForm.jsx (one
//   level above src/), same level as your AuthContext import
//   ("../src/context/AuthContext"). The tokens import below follows the
//   same pattern ("../src/styles/tokens") — adjust if your actual nesting
//   differs from what you described.
//
// BUG FIXES (functional, not just visual):
// - The "Continue with Google" button previously had no onClick at all —
//   it was a fully decorative button that looked clickable but did
//   nothing. I've left it wired to a clearly-marked TODO since real Google
//   OAuth needs a client ID / redirect flow I don't have — see the comment
//   on that button below.
// - Replaced hardcoded http://localhost:5000 with the same API_BASE pattern
//   used across the other pages in this project.
// - Separated "response not ok" from "response body isn't JSON" so a 500
//   with an HTML error page doesn't produce a confusing generic message.

import { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function LoginForm({ darkMode }) {
  const navigate = useNavigate();
  const s = surface(darkMode);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // CHANGE: don't let a non-JSON error body (502, proxy page, etc.)
      // throw inside this try block with a confusing message.
      let data;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw new Error(data?.message || `Login failed (status ${response.status}).`);
      }

      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
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
          maxWidth: "420px",
          padding: "40px",
          borderRadius: "22px",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
        }}
      >
        {/* EYEBROW — matches the mono route-label treatment elsewhere */}
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
          Welcome back
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
          Sign in to Cosy
        </h1>

        <p style={{ color: s.textMuted, marginBottom: "30px", fontSize: "14.5px", lineHeight: "1.6" }}>
          Pick up where your last ride left off.
        </p>

        {/* EMAIL */}
        <div style={{ marginBottom: "16px" }}>
          <p style={{ color: s.accent, marginBottom: "8px", fontSize: "12.5px", fontWeight: "600" }}>
            Email address
          </p>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={fieldStyle}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "12px" }}>
          <p style={{ color: s.accent, marginBottom: "8px", fontSize: "12.5px", fontWeight: "600" }}>
            Password
          </p>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={fieldStyle}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/forgot-password")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: s.accent,
              cursor: "pointer",
              fontSize: "13px",
              fontFamily: fonts.body,
            }}
          >
            Forgot password?
          </button>
        </div>

        {error && (
          <p style={{ color: colors.rust, marginBottom: "16px", fontSize: "13.5px" }}>{error}</p>
        )}

        {/* SIGN IN */}
        <motion.button
          whileHover={{ y: loading ? 0 : -2 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          onClick={handleLogin}
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
            marginBottom: "22px",
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </motion.button>

        {/* DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "22px" }}>
          <div style={{ flex: 1, height: "1px", background: s.line }} />
          <span style={{ color: s.textMuted, fontSize: "12.5px" }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: s.line }} />
        </div>

        {/* GOOGLE LOGIN */}
        {/* CHANGE: this previously had no onClick — clicking it did nothing.
            Wiring up real Google OAuth needs a client ID and redirect/popup
            flow that isn't in scope here. The TODO below points at the
            simplest real implementation (Google Identity Services), so this
            button is honest about not being wired yet instead of silently
            failing. Remove the alert once real OAuth is added. */}
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // TODO: replace with real Google OAuth (e.g. Google Identity
            // Services button + your backend's /api/auth/google endpoint).
            alert("Google sign-in isn't connected yet.");
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

        {/* FOOTER */}
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "26px" }}>
          <p style={{ color: s.textMuted, fontSize: "14px" }}>Don't have an account?</p>
          <Link to="/signup" style={{ color: s.accent, textDecoration: "none", fontSize: "14px", fontWeight: "600" }}>
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default LoginForm;

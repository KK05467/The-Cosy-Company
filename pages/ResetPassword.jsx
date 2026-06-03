import { useState } from "react"
import { motion } from "framer-motion"
import OtpTimer from "../components/OtpTimer"

export default function ResetPassword({ darkMode }) {
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  })

  const [expiresAt, setExpiresAt] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const sendOtp = async () => {
    try {
      setLoading(true)
      setMessage("")

      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        }
      )

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setExpiresAt(data.expiresAt)
      setMessage("OTP sent successfully ✔")
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async () => {
    try {
      setLoading(true)
      setMessage("")

      const res = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      )

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setMessage("Password reset successful ✔")
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={wrapper(darkMode)}
    >
      <div style={card}>
        <h1 style={title}>Reset Password</h1>

        <p style={subtitle}>
          Verify OTP and set new password
        </p>

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          style={input(darkMode)}
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={sendOtp}
          style={btnPrimary}
        >
          {loading ? "Sending..." : "Send OTP"}
        </motion.button>

        {/* TIMER */}
        {expiresAt && <OtpTimer expiryTime={expiresAt} />}
  

        {/* OTP */}
        <input
          name="otp"
          placeholder="Enter OTP"
          onChange={handleChange}
          style={input(darkMode)}
        />

        {/* NEW PASSWORD */}
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          onChange={handleChange}
          style={input(darkMode)}
        />

        {/* RESET BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={resetPassword}
          style={btnSecondary}
        >
          Reset Password
        </motion.button>

        {/* MESSAGE */}
        {message && (
          <p style={msg}>{message}</p>
        )}
      </div>
    </motion.div>
  )
}

/* ================= COSY STYLES ================= */

const wrapper = (darkMode) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  background: darkMode
    ? "linear-gradient(to bottom right, #020617, #050816)"
    : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
})

const card = {
  width: "100%",
  maxWidth: "460px",
  padding: "36px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 0 60px rgba(37,99,235,0.08)",
}

const title = {
  color: "white",
  fontSize: "34px",
  marginBottom: "10px",
}

const subtitle = {
  color: "#94a3b8",
  fontSize: "14px",
  marginBottom: "20px",
}

const input = (darkMode) => ({
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: darkMode ? "white" : "#0f172a",
  outline: "none",
})

const btnPrimary = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  marginBottom: "10px",
  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
}

const btnSecondary = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
}

const msg = {
  marginTop: "12px",
  color: "#3b82f6",
  fontSize: "13px",
}
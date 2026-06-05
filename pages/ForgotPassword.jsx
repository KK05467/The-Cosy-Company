import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default function ForgotPassword({ darkMode }) {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setMessage("")

      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      )

      const data = await res.json()

      if (!res.ok) throw new Error(data.message)

      setMessage("OTP sent to email ✔")

      setTimeout(() => {
        navigate("/reset-password")
      }, 1500)
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
      style={wrapperStyle(darkMode)}
    >
      <div style={cardStyle}>
        <h1 style={titleStyle}>Forgot Password</h1>

        <p style={subStyle}>
          Enter your email to receive OTP
        </p>

        <input
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle(darkMode)}
        />

        {message && (
          <p style={{ color: "#3b82f6", fontSize: "13px" }}>
            {message}
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubmit}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Sending..." : "Send OTP"}
        </motion.button>
      </div>
    </motion.div>
  )
}

/* ===== STYLES ===== */

const wrapperStyle = (darkMode) => ({
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "30px",
  background: darkMode
    ? "linear-gradient(to bottom right, #020617, #050816)"
    : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
})

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "36px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
}

const titleStyle = {
  color: "white",
  fontSize: "32px",
  marginBottom: "10px",
}

const subStyle = {
  color: "#94a3b8",
  marginBottom: "20px",
  fontSize: "14px",
}

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  marginBottom: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: darkMode ? "white" : "#0f172a",
  outline: "none",
})

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "none",
  background: "linear-gradient(135deg, #2563eb, #3b82f6)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
}
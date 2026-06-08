import { useState } from "react"
import { motion } from "framer-motion"
import { FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../src/context/AuthContext"


function LoginForm({ darkMode }) {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
const { login } = useAuth()
  const handleLogin = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      )

      const data = await response.json()
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message)
      }

      login(data.user, data.token);

      navigate("/dashboard")
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 60,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
      }}
      style={{
        flex: 1,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BLUE GLOW */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(140px)",
          opacity: 0.12,
          right: "-100px",
          top: "-100px",
        }}
      />

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "36px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 60px rgba(37,99,235,0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* HEADING */}
        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "36px",
            marginBottom: "10px",
            lineHeight: 1.1,
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "28px",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        >
          Sign in to continue your journey with Cosy.
        </p>

        {/* EMAIL */}
        <div style={{ marginBottom: "16px" }}>
          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Email Address
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle(darkMode)}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "14px" }}>
          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Password
          </p>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle(darkMode)}
          />
        </div>

        {/* FORGOT PASSWORD */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <p
          onClick={() => navigate("/forgot-password")}
            style={{
              color: "#3b82f6",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Forgot Password?
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p
            style={{
              color: "#ef4444",
              marginBottom: "14px",
              fontSize: "13px",
            }}
          >
            {error}
          </p>
        )}

        {/* SIGN IN BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.02,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background:
              "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "20px",
            boxShadow: "0 0 30px rgba(37,99,235,0.3)",
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </motion.button>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />

          <span
            style={{
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            OR
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.08)",
            }}
          />
        </div>

        {/* GOOGLE LOGIN */}
        <motion.button
          whileHover={{
            scale: 1.02,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: darkMode ? "white" : "#0f172a",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            backdropFilter: "blur(20px)",
          }}
        >
          <FaGoogle
            style={{
              color: "#EA4335",
              fontSize: "18px",
            }}
          />

          Continue with Google
        </motion.button>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "24px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
            }}
          >
            Don't have an account?
          </p>

          <Link
            to="/signup"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: darkMode ? "white" : "#0f172a",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
})

export default LoginForm
import { useState } from "react"
import { motion } from "framer-motion"
import { FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

function SignupForm({ darkMode }) {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    try {
      setLoading(true)

      const response = await fetch(
        "http://localhost:5000/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        alert(data.message)
        return
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      alert("Account Created Successfully")

      navigate("/dashboard")
    } catch (error) {
      console.error(error)
      alert("Something went wrong")
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
      {/* GLOW */}
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
        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "36px",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "28px",
            fontSize: "15px",
          }}
        >
          Join the future of smart mobility.
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle(darkMode)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
          }}
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
          }}
        />

        {/* DOB */}
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
            cursor: "pointer",
          }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
          }}
        />

        {/* SIGNUP BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.02,
            y: -2,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={handleSignup}
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
            marginTop: "22px",
            boxShadow: "0 0 30px rgba(37,99,235,0.3)",
          }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </motion.button>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginTop: "22px",
            marginBottom: "22px",
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

        {/* GOOGLE BUTTON */}
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

        {/* LOGIN LINK */}
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
            Already have an account?
          </p>

          <Link
            to="/login"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Sign In
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

export default SignupForm
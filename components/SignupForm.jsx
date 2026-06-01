import { motion } from "framer-motion"
import { FaGoogle } from "react-icons/fa"
import { Link } from "react-router-dom"

function SignupForm({ darkMode }) {

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
        padding: "32px",
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
          width: "450px",
          height: "450px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(150px)",
          opacity: 0.12,
          right: "-120px",
          top: "-80px",
        }}
      />

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          padding: "40px",
          borderRadius: "28px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(37,99,235,0.08)",
          position: "relative",
          zIndex: 2,
        }}
      >

        {/* HEADING */}
        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "38px",
            marginBottom: "10px",
            lineHeight: 1.1,
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "28px",
            fontSize: "15px",
            lineHeight: 1.6,
          }}
        >
          Join the future of smart mobility.
        </p>

        {/* NAME */}
        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle(darkMode)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
          }}
        />

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Phone Number"
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
          }}
        />

        {/* DOB */}
        <input
          type="date"
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
          style={{
            ...inputStyle(darkMode),
            marginTop: "14px",
          }}
        />

        {/* CREATE ACCOUNT BUTTON */}
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
            border: "none",
            background:
              "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "24px",
            boxShadow: "0 0 30px rgba(37,99,235,0.3)",
          }}
        >
          Create Account
        </motion.button>

        {/* DIVIDER */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: "24px",
            marginBottom: "24px",
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

        {/* GOOGLE SIGNUP */}
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
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
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

        {/* LOGIN LINK */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "22px",
          }}
        >
          <p
            style={{
              color: "#94a3b8",
              fontSize: "14px",
              margin: 0,
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
import { motion } from "framer-motion"
import { FaGoogle } from "react-icons/fa"
import { Link } from "react-router-dom"

function LoginForm({ navigate, darkMode }) {

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
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
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
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(160px)",
          opacity: 0.12,
          right: "-150px",
          top: "-100px",
        }}
      />

      {/* CARD */}
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          padding: "55px",
          borderRadius: "32px",
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
            fontSize: "52px",
            marginBottom: "14px",
            lineHeight: 1.1,
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "40px",
            fontSize: "18px",
            lineHeight: 1.7,
          }}
        >
          Sign in to continue your journey with Cosy.
        </p>

        {/* EMAIL */}
        <div style={{ marginBottom: "24px" }}>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "12px",
              fontSize: "15px",
            }}
          >
            Email Address
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: darkMode ? "white" : "#0f172a",
              fontSize: "16px",
              outline: "none",
              transition: "0.3s",
            }}
          />

        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "18px" }}>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "12px",
              fontSize: "15px",
            }}
          >
            Password
          </p>

          <input
            type="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "18px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
             color: darkMode ? "white" : "#0f172a",
              fontSize: "16px",
              outline: "none",
              transition: "0.3s",
            }}
          />

        </div>

        {/* FORGOT PASSWORD */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "32px",
          }}
        >

          <p
            style={{
              color: "#3b82f6",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Forgot Password?
          </p>

        </div>
        {/* DIVIDER */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "28px",
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
      fontSize: "14px",
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
    y: -3,
  }}
  whileTap={{
    scale: 0.96,
  }}
  onClick={() => navigate("/dashboard")}
  style={{
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: darkMode ? "white" : "#0f172a",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "14px",
    marginBottom: "28px",
    backdropFilter: "blur(20px)",
  }}
>
  <FaGoogle
    style={{
      color: "#EA4335",
      fontSize: "20px",
    }}
  />

  Continue with Google
</motion.button>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.02,
            y: -3,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() => navigate("/dashboard")}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
           background: darkMode
  ? "linear-gradient(to bottom right, #020617, #050816)"
  : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
            color: darkMode ? "white" : "#0f172a",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(37,99,235,0.3)",
            marginBottom: "28px",
          }}
        >
          Sign In
        </motion.button>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
          }}
        >

          <p
            style={{
              color: "#94a3b8",
              fontSize: "15px",
            }}
          >
            Don’t have an account?
          </p>

          <Link
  to="/signup"
  style={{
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "15px",
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

export default LoginForm
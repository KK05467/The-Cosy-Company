import { motion } from "framer-motion"

function LoginForm() {

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
        background:
          "linear-gradient(to bottom right, #020617, #050816)",
      }}
    >

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
        }}
      >

        <h1
          style={{
            color: "white",
            fontSize: "52px",
            marginBottom: "14px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "40px",
            fontSize: "18px",
          }}
        >
          Sign in to continue your journey.
        </p>

        {/* EMAIL */}
        <div style={{ marginBottom: "24px" }}>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "12px",
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
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />

        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "32px" }}>

          <p
            style={{
              color: "#cbd5e1",
              marginBottom: "12px",
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
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />

        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.02,
            y: -3,
          }}
          whileTap={{
            scale: 0.96,
          }}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "18px",
            border: "none",
            background:
              "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "white",
            fontSize: "17px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(37,99,235,0.3)",
          }}
        >
          Sign In
        </motion.button>

      </div>

    </motion.div>

  )
}

export default LoginForm
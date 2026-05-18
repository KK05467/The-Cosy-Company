import { motion } from "framer-motion"

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

      {/* GLOW */}
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
          maxWidth: "540px",
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

        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "52px",
            marginBottom: "14px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "40px",
            fontSize: "18px",
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
            marginTop: "20px",
          }}
        />

        {/* PHONE NUMBER */}
        <input
          type="numeric"
          placeholder="Phone No."
          style={{
            ...inputStyle(darkMode),
            marginTop: "20px",
          }}
        />

        {/* DOB */}
        <input
        type="date"
        placeholder = "DOB"
        style={{
            ...inputStyle(darkMode),
            marginTop: "20px",
            color: darkMode ? "white" : "#0f172a",
            cursor: "pointer",
        }}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          style={{
            ...inputStyle(darkMode),
            marginTop: "20px",
          }}
        />

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
            marginTop: "32px",
            boxShadow: "0 0 40px rgba(37,99,235,0.3)",
          }}
        >
          Create Account
        </motion.button>

      </div>

    </motion.div>

  )
}

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "18px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: darkMode ? "white" : "#0f172a",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
})

export default SignupForm
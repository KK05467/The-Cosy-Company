import { motion } from "framer-motion"

function AuthLeft({ darkMode }) {

  return (

    <motion.div
      initial={{
        opacity: 0,
        x: -60,
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
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "80px",
      }}
    >

      {/* BACKGROUND IMAGE */}
      <img
        src="/auth.webp"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.22,
        }}
      />

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: darkMode
  ? "linear-gradient(to bottom right, #020617, #050816)"
  : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        }}
      />

      {/* GLOW */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(160px)",
          opacity: 0.18,
          top: "-100px",
          left: "-120px",
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "650px",
        }}
      >

        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "4px",
            marginBottom: "24px",
          }}
        >
          THE COSY COMPANY
        </p>

        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "78px",
            lineHeight: "1.1",
            marginBottom: "30px",
            fontWeight: "700",
          }}
        >
          Premium Smart Mobility For Modern Cities.
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            lineHeight: "1.8",
          }}
        >
          Join thousands of commuters already saving
          time, money, and fuel through premium ride pooling.
        </p>

      </div>

    </motion.div>

  )
}

export default AuthLeft
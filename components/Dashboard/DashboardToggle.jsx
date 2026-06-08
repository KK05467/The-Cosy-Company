import { motion } from "framer-motion"

function DashboardToggle({  mode, setMode, darkMode }) {

  return (

    <div
      style={{
        display: "flex",
        padding: "8px",
        borderRadius: "20px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        backdropFilter: "blur(20px)",
      }}
    >

      {/* RIDER */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setMode("rider")}
        style={{
          padding: "14px 28px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          background:
            mode === "rider"
              ? "#2563eb"
              : "transparent",
         color: darkMode ? "white" : "#0f172a",
          fontSize: "15px",
          fontWeight: "600",
          transition: "0.3s",
        }}
      >
        Rider
      </motion.button>

      {/* DRIVER */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setMode("driver")}
        style={{
          padding: "14px 28px",
          borderRadius: "14px",
          border: "none",
          cursor: "pointer",
          background:
            mode === "driver"
              ? "#2563eb"
              : "transparent",
          color: darkMode ? "white" : "#0f172a",
          fontSize: "15px",
          fontWeight: "600",
          transition: "0.3s",
        }}
      >
        Driver
      </motion.button>

    </div>

  )
}

export default DashboardToggle
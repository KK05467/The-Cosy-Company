// src/pages/DriverCreateRide.jsx

import { motion } from "framer-motion"

function DriverCreateRide({ darkMode }) {

  const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: darkMode
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.75)",
    color: darkMode ? "white" : "#0f172a",
    fontSize: "16px",
    outline: "none",
    marginTop: "10px",
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "140px 80px 60px",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
      }}
    >

      <h1
        style={{
          color: darkMode ? "white" : "#0f172a",
          fontSize: "68px",
          marginBottom: "50px",
        }}
      >
        Create Ride
      </h1>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        style={{
          maxWidth: "800px",
          padding: "50px",
          borderRadius: "34px",
          background: darkMode
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.75)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >

        <div style={{ marginBottom: "28px" }}>

          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Pickup Location
          </p>

          <input
            type="text"
            placeholder="Enter pickup point"
            style={inputStyle}
          />

        </div>

        <div style={{ marginBottom: "28px" }}>

          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Destination
          </p>

          <input
            type="text"
            placeholder="Enter destination"
            style={inputStyle}
          />

        </div>

        <div style={{ marginBottom: "28px" }}>

          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Available Seats
          </p>

          <input
            type="number"
            placeholder="Number of seats"
            style={inputStyle}
          />

        </div>

        <div style={{ marginBottom: "40px" }}>

          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Ride Price
          </p>

          <input
            type="text"
            placeholder="₹ Enter amount"
            style={inputStyle}
          />

        </div>

        <button
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "20px",
            border: "none",
            background:
              "linear-gradient(135deg, #2563eb, #3b82f6)",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 0 40px rgba(37,99,235,0.35)",
          }}
        >
          Publish Ride
        </button>

      </motion.div>

    </div>

  )
}

export default DriverCreateRide
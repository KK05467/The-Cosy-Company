// src/pages/PaymentSuccess.jsx

import { motion } from "framer-motion"
import { FaCheckCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

function PaymentSuccess({ darkMode }) {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
      }}
    >

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
          width: "100%",
          maxWidth: "620px",
          padding: "60px",
          borderRadius: "40px",
          textAlign: "center",
          background: darkMode
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.75)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >

        <FaCheckCircle
          style={{
            color: "#22c55e",
            fontSize: "100px",
            marginBottom: "30px",
          }}
        />

        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "54px",
            marginBottom: "20px",
          }}
        >
          Payment Successful
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            lineHeight: "1.8",
            marginBottom: "40px",
          }}
        >
          Your ride booking has been confirmed successfully.
        </p>

        <Link to="/dashboard">

          <button
            style={{
              padding: "18px 38px",
              borderRadius: "18px",
              border: "none",
              background: "#2563eb",
              color: "white",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            Go To Dashboard
          </button>

        </Link>

      </motion.div>

    </div>

  )
}

export default PaymentSuccess
// src/pages/PaymentFailed.jsx

import { motion } from "framer-motion"
import { FaTimesCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

function PaymentFailed({ darkMode }) {

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

        <FaTimesCircle
          style={{
            color: "#ef4444",
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
          Payment Failed
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
            lineHeight: "1.8",
            marginBottom: "40px",
          }}
        >
          Something went wrong while processing your payment.
        </p>

        <Link to="/wallet">

          <button
            style={{
              padding: "18px 38px",
              borderRadius: "18px",
              border: "none",
              background: "#ef4444",
              color: "white",
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            Retry Payment
          </button>

        </Link>

      </motion.div>

    </div>

  )
}

export default PaymentFailed
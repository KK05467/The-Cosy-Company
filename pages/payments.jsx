import { useState } from "react"
import { motion } from "framer-motion"
import { useLocation } from "react-router-dom"
import {
  FaWallet,
  FaMoneyBillWave,
  FaGooglePay,
} from "react-icons/fa"

function Payment({ darkMode }) {
  const [method, setMethod] = useState("wallet")
  const location = useLocation()

  const walletBalance = 1250
  const fare = 450
  const platformFee = 49
  const total = fare + platformFee
   const {
    bookingId,
    amount,
    from,
    to,
    driver,
  } = location.state || {}

  if (!location.state) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: darkMode ? "white" : "#0f172a",
        }}
      >
        No booking selected.
      </div>
    )
  }


  const handlePayment = () => {
    if (method === "wallet") {
      alert("Wallet Payment Successful ✅")
    }

    if (method === "upi") {
      alert("Redirecting to UPI Payment ✅")
    }

    if (method === "cash") {
      alert("Ride Booked - Pay Driver in Cash ✅")
    }
  }

  return (
    
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        style={{
          width: "100%",
          maxWidth: "950px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
          padding: "30px",
        }}
      >
        {/* PAYMENT METHODS */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "30px",
          }}
        >
          <h1
            style={{
              color: darkMode ? "white" : "#0f172a",
              marginBottom: "10px",
            }}
          >
            Payment Method
          </h1>

          <p
            style={{
              color: "#94a3b8",
              marginBottom: "30px",
            }}
          >
            Choose how you want to pay.
          </p>

          {/* WALLET */}
          <PaymentOption
            active={method === "wallet"}
            onClick={() => setMethod("wallet")}
            icon={<FaWallet />}
            title="Wallet"
            subtitle={`Available Balance ₹${walletBalance}`}
          />

          {/* UPI */}
          <PaymentOption
            active={method === "upi"}
            onClick={() => setMethod("upi")}
            icon={<FaGooglePay />}
            title="UPI Payment"
            subtitle="Google Pay • PhonePe • Paytm"
          />

          {/* CASH */}
          <PaymentOption
            active={method === "cash"}
            onClick={() => setMethod("cash")}
            icon={<FaMoneyBillWave />}
            title="Cash"
            subtitle="Pay directly to driver"
          />

          {method === "upi" && (
            <div
              style={{
                marginTop: "25px",
              }}
            >
              <label
                style={{
                  color: "#cbd5e1",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                UPI ID
              </label>

              <input
                placeholder="example@oksbi"
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  background:
                    "rgba(255,255,255,0.04)",
                  color: "white",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={handlePayment}
            style={{
              width: "100%",
              marginTop: "30px",
              padding: "16px",
              borderRadius: "16px",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              boxShadow:
                "0 0 30px rgba(37,99,235,0.35)",
            }}
          >
            Confirm Payment
          </motion.button>
        </div>

        {/* RIDE SUMMARY */}
        <div
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            borderRadius: "24px",
            padding: "30px",
          }}
        >
          <h2
            style={{
              color: darkMode ? "white" : "#0f172a",
              marginBottom: "25px",
            }}
          >
            Ride Summary
          </h2>

          <Summary
            title="From"
            value="Bhubaneswar"
          />

          <Summary
            title="To"
            value="Cuttack"
          />

          <Summary
            title="Passengers"
            value="2"
          />

          <Summary
            title="Ride Fare"
            value={`₹${fare}`}
          />

          <Summary
            title="Platform Fee"
            value={`₹${platformFee}`}
          />

          <hr
            style={{
              border: "none",
              borderTop:
                "1px solid rgba(255,255,255,0.08)",
              margin: "20px 0",
            }}
          />

          <Summary
            title="Total"
            value={`₹${total}`}
            bold
          />

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              borderRadius: "18px",
              background:
                "rgba(37,99,235,0.1)",
              border:
                "1px solid rgba(37,99,235,0.2)",
            }}
          >
            <p
              style={{
                color: "#93c5fd",
                margin: 0,
                lineHeight: 1.7,
              }}
            >
              Wallet payments are instant.
              <br />
              UPI supports all major apps.
              <br />
              Cash can be paid directly to
              the driver.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function PaymentOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      onClick={onClick}
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        padding: "18px",
        marginBottom: "15px",
        borderRadius: "18px",
        cursor: "pointer",
        border: active
          ? "1px solid #3b82f6"
          : "1px solid rgba(255,255,255,0.08)",
        background: active
          ? "rgba(37,99,235,0.15)"
          : "rgba(255,255,255,0.03)",
      }}
    >
      <div
        style={{
          color: "#3b82f6",
          fontSize: "28px",
        }}
      >
        {icon}
      </div>

      <div>
        <h3
          style={{
            color: "white",
            margin: 0,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            color: "#94a3b8",
            margin: "5px 0 0",
            fontSize: "14px",
          }}
        >
          {subtitle}
        </p>
      </div>
    </motion.div>
  )
}

function Summary({
  title,
  value,
  bold,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "15px",
      }}
    >
      <span
        style={{
          color: "#94a3b8",
        }}
      >
        {title}
      </span>

      <span
        style={{
          color: "white",
          fontWeight: bold ? "700" : "500",
        }}
      >
        {value}
      </span>
    </div>
  )
}

export default Payment
// src/pages/Wallet.jsx

import { motion } from "framer-motion"

import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaLeaf,
} from "react-icons/fa"

import Sidebar from "../components/dashboard/Sidebar"

function Wallet({ darkMode }) {

  const transactions = [
    {
      title: "Ride Payment",
      amount: "- ₹240",
      type: "debit",
    },
    {
      title: "Wallet Topup",
      amount: "+ ₹1,000",
      type: "credit",
    },
    {
      title: "Cashback Reward",
      amount: "+ ₹120",
      type: "credit",
    },
    {
      title: "Driver Earnings",
      amount: "+ ₹840",
      type: "credit",
    },
  ]

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >

      {/* SIDEBAR */}
      <Sidebar darkMode={darkMode} />

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >

        {/* HEADER */}
        <div
          style={{
            marginBottom: "40px",
          }}
        >

          <p
            style={{
              color: "#3b82f6",
              letterSpacing: "4px",
              marginBottom: "12px",
            }}
          >
            DIGITAL WALLET
          </p>

          <h1
            style={{
              color: darkMode ? "white" : "#0f172a",
              fontSize: "56px",
              marginBottom: "12px",
            }}
          >
            Wallet Overview
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            Manage your ride payments, rewards, and earnings.
          </p>

        </div>

        {/* BALANCE CARD */}
        <motion.div
          whileHover={{
            y: -6,
          }}
          style={{
            padding: "40px",
            borderRadius: "36px",
            background:
              "linear-gradient(135deg, #2563eb, #1d4ed8)",
            marginBottom: "35px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 80px rgba(37,99,235,0.35)",
          }}
        >

          <div
            style={{
              position: "absolute",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              top: "-120px",
              right: "-100px",
            }}
          />

          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              marginBottom: "20px",
              fontSize: "18px",
            }}
          >
            Available Balance
          </p>

          <h1
            style={{
              color: "white",
              fontSize: "72px",
              marginBottom: "30px",
            }}
          >
            ₹12,480
          </h1>

          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >

            <button
              style={{
                padding: "16px 28px",
                borderRadius: "18px",
                border: "none",
                background: "white",
                color: "#2563eb",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add Money
            </button>

            <button
              style={{
                padding: "16px 28px",
                borderRadius: "18px",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "16px",
                backdropFilter: "blur(20px)",
              }}
            >
              Withdraw
            </button>

          </div>

        </motion.div>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "28px",
          }}
        >

          {/* TRANSACTIONS */}
          <div
            style={{
              padding: "35px",
              borderRadius: "32px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >

            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                marginBottom: "30px",
                fontSize: "28px",
              }}
            >
              Recent Transactions
            </h2>

            {transactions.map((item, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "18px 0",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >

                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "18px",
                      background:
                        item.type === "credit"
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(239,68,68,0.15)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color:
                        item.type === "credit"
                          ? "#22c55e"
                          : "#ef4444",
                    }}
                  >
                    {item.type === "credit"
                      ? <FaArrowDown />
                      : <FaArrowUp />
                    }
                  </div>

                  <div>

                    <h3
                      style={{
                        color:
                          darkMode
                            ? "white"
                            : "#0f172a",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                      }}
                    >
                      Today
                    </p>

                  </div>

                </div>

                <h3
                  style={{
                    color:
                      item.type === "credit"
                        ? "#22c55e"
                        : "#ef4444",
                  }}
                >
                  {item.amount}
                </h3>

              </div>

            ))}

          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
            }}
          >

            {/* CARD */}
            <div
              style={{
                padding: "30px",
                borderRadius: "30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "40px",
                }}
              >

                <FaCreditCard
                  color="#3b82f6"
                  size={34}
                />

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  VISA
                </p>

              </div>

              <h2
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  letterSpacing: "4px",
                  marginBottom: "30px",
                }}
              >
                •••• •••• •••• 2048
              </h2>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >

                <div>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  >
                    CARD HOLDER
                  </p>

                  <h4
                    style={{
                      color:
                        darkMode
                          ? "white"
                          : "#0f172a",
                    }}
                  >
                    Keertan Kumar
                  </h4>

                </div>

                <div>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  >
                    EXPIRES
                  </p>

                  <h4
                    style={{
                      color:
                        darkMode
                          ? "white"
                          : "#0f172a",
                    }}
                  >
                    08/29
                  </h4>

                </div>

              </div>

            </div>

            {/* STATS */}
            <div
              style={{
                padding: "30px",
                borderRadius: "30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginBottom: "24px",
                }}
              >

                <FaLeaf color="#22c55e" />

                <h3
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  Eco Contribution
                </h3>

              </div>

              <h1
                style={{
                  color: "#22c55e",
                  fontSize: "52px",
                  marginBottom: "12px",
                }}
              >
                82kg
              </h1>

              <p
                style={{
                  color: "#94a3b8",
                  lineHeight: "1.8",
                }}
              >
                You helped reduce carbon emissions
                through shared mobility rides.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Wallet
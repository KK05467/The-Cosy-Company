// src/pages/Wallet.jsx

import { motion } from "framer-motion";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaCreditCard,
  FaLeaf,
  FaMoneyBillWave,
  FaCar,
  FaCloudRain,
  FaMoon,
} from "react-icons/fa";

import Sidebar from "../components/dashboard/Sidebar";

function Wallet({ darkMode }) {
  // SAMPLE DATA
  const walletBalance = 12480;

  const stats = {
    totalSpent: 3240,
    totalEarnings: 7840,
    platformEarnings: 1220,
    nightBonus: 360,
    rainBonus: 280,
  };

  const transactions = [
    {
      title: "Ride Payment",
      amount: "- ₹240",
      type: "debit",
      icon: <FaCar />,
    },
    {
      title: "Wallet Topup",
      amount: "+ ₹1,000",
      type: "credit",
      icon: <FaWallet />,
    },
    {
      title: "Driver Earnings",
      amount: "+ ₹840",
      type: "credit",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Night Bonus Share",
      amount: "+ ₹180",
      type: "credit",
      icon: <FaMoon />,
    },
    {
      title: "Rain Bonus Share",
      amount: "+ ₹140",
      type: "credit",
      icon: <FaCloudRain />,
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
        fontFamily: "Inter,sans-serif",
      }}
    >
      <Sidebar darkMode={darkMode} />

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        {/* HEADER */}

        <div style={{ marginBottom: "40px" }}>
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
            Manage payments and driver earnings.
          </p>
        </div>

        {/* BALANCE CARD */}

        <motion.div
          whileHover={{ y: -6 }}
          style={{
            padding: "40px",
            borderRadius: "36px",
            background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
            marginBottom: "35px",
            boxShadow: "0 0 80px rgba(37,99,235,0.35)",
          }}
        >
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
            ₹{walletBalance}
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
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Add Money
            </button>

            <button
              style={{
                padding: "16px 28px",
                borderRadius: "18px",
                background: "rgba(255,255,255,.1)",
                color: "white",
                border: "1px solid rgba(255,255,255,.15)",
                cursor: "pointer",
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
            gridTemplateColumns: "1.3fr .7fr",
            gap: "28px",
          }}
        >
          {/* TRANSACTIONS */}

          <div
            style={{
              padding: "35px",
              borderRadius: "32px",
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                marginBottom: "30px",
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
                  borderBottom: "1px solid rgba(255,255,255,.06)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "18px",
                      background:
                        item.type === "credit"
                          ? "rgba(34,197,94,.15)"
                          : "rgba(239,68,68,.15)",
                      color: item.type === "credit" ? "#22c55e" : "#ef4444",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.type === "credit" ? <FaArrowDown /> : <FaArrowUp />}
                  </div>

                  <div>
                    <h3
                      style={{
                        color: darkMode ? "white" : "#0f172a",
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
                    color: item.type === "credit" ? "#22c55e" : "#ef4444",
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
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "40px",
                }}
              >
                <FaCreditCard color="#3b82f6" size={34} />

                <p style={{ color: "#94a3b8" }}>VISA</p>
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

              <h4
                style={{
                  color: darkMode ? "white" : "#0f172a",
                }}
              >
                Keertan Kumar
              </h4>
            </div>

            {/* STATS */}

            <div
              style={{
                padding: "30px",
                borderRadius: "30px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <h3
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  marginBottom: "25px",
                }}
              >
                Earnings Breakdown
              </h3>

              <Stat
                title="Driver Earnings"
                value={`₹${stats.totalEarnings}`}
                color="#22c55e"
              />

              <Stat
                title="Platform Earnings"
                value={`₹${stats.platformEarnings}`}
                color="#3b82f6"
              />

              <Stat
                title="Night Bonus Share"
                value={`₹${stats.nightBonus}`}
                color="#f59e0b"
              />

              <Stat
                title="Rain Bonus Share"
                value={`₹${stats.rainBonus}`}
                color="#06b6d4"
              />
            </div>

            {/* ECO */}

            <div
              style={{
                padding: "30px",
                borderRadius: "30px",
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  marginBottom: "20px",
                  alignItems: "center",
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
                Carbon emissions reduced through shared rides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "18px",
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
          color,
          fontWeight: "600",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default Wallet;

import { useState, useEffect } from "react"

import {
  FaBell,
  FaCar,
  FaLeaf,
  FaMapMarkerAlt,
  FaUsers,
  FaWallet,
  FaRoute,
} from "react-icons/fa"

import Sidebar from "../components/dashboard/Sidebar"
import DashboardToggle from "../components/dashboard/DashboardToggle"

function Dashboard({ darkMode, setDarkMode }) {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState("rider")

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")

      if (storedUser) {
        const parsed = JSON.parse(storedUser)
        setUser(parsed)
      }
    } catch (err) {
      console.log("Error parsing user:", err)
    }
  }, [])

  const stats =
    mode === "rider"
      ? [
          {
            title: "Active Pools",
            value: user?.activePools ?? 0,
            icon: <FaUsers />,
          },
          {
            title: "Money Saved",
            value: user?.moneySaved ?? "₹0",
            icon: <FaWallet />,
          },
          {
            title: "CO₂ Reduced",
            value: user?.co2Reduced ?? "0kg",
            icon: <FaLeaf />,
          },
        ]
      : [
          {
            title: "Today's Earnings",
            value: user?.earnings ?? "₹0",
            icon: <FaWallet />,
          },
          {
            title: "Passengers",
            value: user?.passengers ?? 0,
            icon: <FaUsers />,
          },
          {
            title: "Trips Completed",
            value: user?.tripsCompleted ?? 0,
            icon: <FaCar />,
          },
        ]

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "120px",
        display: "flex",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* BLUE GLOW */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(180px)",
          opacity: 0.12,
          top: "-250px",
          right: "-200px",
        }}
      />

      {/* SIDEBAR */}
      <Sidebar darkMode={darkMode} />

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          padding: "35px",
          overflowY: "auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* TOPBAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          {/* LEFT */}
          <div>
            <p
              style={{
                color: "#3b82f6",
                letterSpacing: "4px",
                marginBottom: "10px",
                fontSize: "14px",
              }}
            >
              SMART MOBILITY PLATFORM
            </p>

            <h1
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "54px",
                lineHeight: 1.1,
                marginBottom: "10px",
              }}
            >
              Welcome back, {user?.name || "User"}
            </h1>

            <p style={{ color: "#94a3b8", fontSize: "18px" }}>
              Your smart travel ecosystem is active.
            </p>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <DashboardToggle
              mode={mode}
              setMode={setMode}
              darkMode={darkMode}
            />

            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: darkMode ? "white" : "#0f172a",
                fontSize: "20px",
                cursor: "pointer",
                backdropFilter: "blur(20px)",
              }}
            >
              <FaBell />
            </div>
          </div>
        </div>

        {/* HERO GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "28px",
            marginBottom: "30px",
          }}
        >
          {/* MAP CARD */}
          <div
            style={{
              position: "relative",
              minHeight: "420px",
              borderRadius: "34px",
              overflow: "hidden",
              background: darkMode
                ? "linear-gradient(to bottom right, #020617, #050816)"
                : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1600&auto=format&fit=crop"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.28,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: darkMode
                  ? "linear-gradient(to bottom right, #020617, #050816)"
                  : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "40px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 20px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    marginBottom: "28px",
                  }}
                >
                  <FaRoute color="#3b82f6" />

                  <span
                    style={{
                      color: darkMode ? "white" : "#0f172a",
                    }}
                  >
                    AI Pool Matching Active
                  </span>
                </div>

                <h1
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                    fontSize: "52px",
                    lineHeight: 1.1,
                    maxWidth: "620px",
                    marginBottom: "20px",
                  }}
                >
                  {mode === "rider"
                    ? "Find smarter shared rides nearby."
                    : "Manage rides and maximize earnings."}
                </h1>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: "18px",
                    lineHeight: 1.8,
                    maxWidth: "620px",
                  }}
                >
                  Cosy intelligently matches routes, passengers, and drivers in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div
              style={{
                padding: "30px",
                borderRadius: "30px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h2
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  marginBottom: "24px",
                  fontSize: "24px",
                }}
              >
                Live Activity
              </h2>

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginBottom: "22px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "16px",
                      background: "rgba(37,99,235,0.18)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#3b82f6",
                    }}
                  >
                    <FaMapMarkerAlt />
                  </div>

                  <div>
                    <p
                      style={{
                        color: darkMode ? "white" : "#0f172a",
                        marginBottom: "4px",
                      }}
                    >
                      Pool forming near Downtown
                    </p>
                    <span style={{ color: "#94a3b8", fontSize: "14px" }}>
                      2 mins ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {stats.map((item, index) => (
            <div
              key={index}
              style={{
                padding: "30px",
                borderRadius: "28px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "22px",
                  background: "rgba(37,99,235,0.15)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#3b82f6",
                  fontSize: "28px",
                  marginBottom: "24px",
                }}
              >
                {item.icon}
              </div>

              <h1
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  fontSize: "42px",
                  marginBottom: "10px",
                }}
              >
                {item.value}
              </h1>

              <p style={{ color: "#94a3b8", fontSize: "17px" }}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
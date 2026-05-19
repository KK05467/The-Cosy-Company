import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCog,
  FaShieldAlt,
  FaStar,
  FaCar,
  FaWallet,
  FaLeaf,
  FaEdit,
} from "react-icons/fa"

import { motion } from "framer-motion"

import { Link } from "react-router-dom"

function Profile({ darkMode }) {

  const stats = [
    {
      icon: <FaCar />,
      value: "148",
      label: "Trips",
    },
    {
      icon: <FaWallet />,
      value: "₹12.4K",
      label: "Saved",
    },
    {
      icon: <FaLeaf />,
      value: "82kg",
      label: "CO₂ Saved",
    },
  ]

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "50px",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
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

      {/* HEADER */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >

          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
            }}
          >

            {/* AVATAR */}
            <div
              style={{
                position: "relative",
              }}
            >

              <div
                style={{
                  width: "130px",
                  height: "130px",
                  borderRadius: "36px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow:
                    "0 0 60px rgba(37,99,235,0.45)",
                }}
              >

                <FaUser
                  style={{
                    color: "white",
                    fontSize: "48px",
                  }}
                />

              </div>

              {/* VERIFIED BADGE */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-5px",
                  right: "-5px",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  border: "4px solid #020617",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <FaShieldAlt
                  style={{
                    color: "white",
                    fontSize: "16px",
                  }}
                />

              </div>

            </div>

            {/* USER INFO */}
            <div>

              <p
                style={{
                  color: "#3b82f6",
                  letterSpacing: "3px",
                  marginBottom: "14px",
                  fontSize: "14px",
                }}
              >
                PREMIUM MEMBER
              </p>

              <h1
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  fontSize: "58px",
                  marginBottom: "10px",
                  lineHeight: 1,
                }}
              >
                Keertan Kumar
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >

                <FaStar color="#facc15" />

                <span
                  style={{
                    color: "#cbd5e1",
                    fontSize: "17px",
                  }}
                >
                  4.9 Rating • Elite Rider & Driver
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              gap: "18px",
            }}
          >

            {/* EDIT BUTTON */}

              <Link
                to="/edit-profile"
                style={{
                    textDecoration: "none",
                }}
                >

    <motion.button
        whileHover={{
        y: -4,
        }}
        whileTap={{
        scale: 0.96,
        }}
        style={{
        padding: "18px 28px",
        borderRadius: "20px",
        border:
            "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.05)",
        color: darkMode ? "white" : "#0f172a",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        backdropFilter: "blur(20px)",
        }}
    >

    <FaEdit />

    Edit Profile

  </motion.button>

</Link>

            {/* SETTINGS BUTTON */}
            <Link
              to="/settings"
              style={{
                textDecoration: "none",
              }}
            >

              <motion.button
                whileHover={{
                  y: -4,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                style={{
                  padding: "18px 28px",
                  borderRadius: "20px",
                  border: "none",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  boxShadow:
                    "0 0 40px rgba(37,99,235,0.35)",
                }}
              >

                <FaCog />

                Settings

              </motion.button>

            </Link>

          </div>

        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "30px",
          }}
        >

          {/* PROFILE CARD */}
          <div
            style={{
              padding: "40px",
              borderRadius: "36px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >

            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "32px",
                marginBottom: "34px",
              }}
            >
              Personal Information
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "28px",
              }}
            >

              {[
                {
                  icon: <FaEnvelope />,
                  label: "Email",
                  value: "keertan@example.com",
                },
                {
                  icon: <FaPhone />,
                  label: "Phone",
                  value: "+91 9876543210",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Location",
                  value: "Bhubaneswar, India",
                },
                {
                  icon: <FaUser />,
                  label: "Account Type",
                  value: "Rider + Driver",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    padding: "26px",
                    borderRadius: "24px",
                    background: "rgba(255,255,255,0.03)",
                    border:
                      "1px solid rgba(255,255,255,0.06)",
                  }}
                >

                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      borderRadius: "18px",
                      background:
                        "rgba(37,99,235,0.15)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#3b82f6",
                      fontSize: "22px",
                      marginBottom: "22px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <p
                    style={{
                      color: "#94a3b8",
                      marginBottom: "10px",
                      fontSize: "15px",
                    }}
                  >
                    {item.label}
                  </p>

                  <h3
                    style={{
                      color: darkMode
                        ? "white"
                        : "#0f172a",
                      fontSize: "20px",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.value}
                  </h3>

                </div>

              ))}

            </div>

          </div>

          {/* STATS CARD */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >

            {/* MEMBERSHIP */}
            <div
              style={{
                padding: "36px",
                borderRadius: "34px",
                background:
                  "linear-gradient(135deg,#2563eb,#1d4ed8)",
                color: "white",
                boxShadow:
                  "0 0 50px rgba(37,99,235,0.35)",
              }}
            >

              <p
                style={{
                  letterSpacing: "3px",
                  marginBottom: "20px",
                  opacity: 0.8,
                }}
              >
                COSY PREMIUM
              </p>

              <h1
                style={{
                  fontSize: "42px",
                  marginBottom: "18px",
                }}
              >
                Gold Member
              </h1>

              <p
                style={{
                  lineHeight: 1.8,
                  opacity: 0.9,
                }}
              >
                Enjoy priority ride matching,
                premium support, and lower ride fees.
              </p>

            </div>

            {/* STATS */}
            {stats.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                style={{
                  padding: "28px",
                  borderRadius: "28px",
                  background: "rgba(255,255,255,0.04)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  alignItems: "center",
                  gap: "22px",
                }}
              >

                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "22px",
                    background:
                      "rgba(37,99,235,0.15)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#3b82f6",
                    fontSize: "28px",
                  }}
                >
                  {item.icon}
                </div>

                <div>

                  <h1
                    style={{
                      color: darkMode
                        ? "white"
                        : "#0f172a",
                      fontSize: "38px",
                      marginBottom: "6px",
                    }}
                  >
                    {item.value}
                  </h1>

                  <p
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    {item.label}
                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </div>

      </motion.div>

    </div>

  )
}

export default Profile
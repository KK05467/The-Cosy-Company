// src/pages/Profile.jsx

import { motion } from "framer-motion"

import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCar,
  FaStar,
  FaShieldAlt,
  FaEdit,
} from "react-icons/fa"

function Profile({ darkMode }) {

  const cardStyle = {
    background: darkMode
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.7)",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",
    backdropFilter: "blur(20px)",
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
      <div
        style={{
          marginBottom: "50px",
          position: "relative",
          zIndex: 2,
        }}
      >

        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "4px",
            marginBottom: "14px",
          }}
        >
          USER PROFILE
        </p>

        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "64px",
            marginBottom: "14px",
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
          }}
        >
          Manage your personal information and travel identity.
        </p>

      </div>

      {/* MAIN GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: "30px",
          position: "relative",
          zIndex: 2,
        }}
      >

        {/* LEFT PROFILE CARD */}
        <motion.div
          whileHover={{
            y: -6,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            padding: "40px",
            borderRadius: "34px",
            ...cardStyle,
          }}
        >

          {/* IMAGE */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
              position: "relative",
            }}
          >

            <img
              src="https://i.pravatar.cc/300?img=15"
              alt=""
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid rgba(37,99,235,0.4)",
              }}
            />

            <button
              style={{
                position: "absolute",
                bottom: "8px",
                right: "110px",
                width: "52px",
                height: "52px",
                borderRadius: "18px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontSize: "18px",
                boxShadow: "0 0 30px rgba(37,99,235,0.4)",
              }}
            >
              <FaCamera />
            </button>

          </div>

          {/* USER INFO */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >

            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "34px",
                marginBottom: "10px",
              }}
            >
              Keertan Kumar
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "17px",
                marginBottom: "18px",
              }}
            >
              Premium Rider • Bhubaneswar
            </p>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 20px",
                borderRadius: "999px",
                background: "rgba(37,99,235,0.14)",
                color: "#3b82f6",
                fontWeight: "600",
              }}
            >

              <FaShieldAlt />

              Verified Account

            </div>

          </div>

          {/* STATS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >

            {[
              {
                value: "4.9",
                label: "Rating",
                icon: <FaStar />,
              },
              {
                value: "124",
                label: "Trips",
                icon: <FaCar />,
              },
            ].map((item, index) => (

              <div
                key={index}
                style={{
                  padding: "24px",
                  borderRadius: "24px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                }}
              >

                <div
                  style={{
                    color: "#3b82f6",
                    fontSize: "24px",
                    marginBottom: "14px",
                  }}
                >
                  {item.icon}
                </div>

                <h2
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                    fontSize: "34px",
                    marginBottom: "8px",
                  }}
                >
                  {item.value}
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {item.label}
                </p>

              </div>

            ))}

          </div>

        </motion.div>

        {/* RIGHT SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >

          {/* PERSONAL INFO */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            style={{
              padding: "40px",
              borderRadius: "34px",
              ...cardStyle,
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "36px",
              }}
            >

              <div>

                <h2
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                    fontSize: "34px",
                    marginBottom: "10px",
                  }}
                >
                  Personal Information
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Your basic account information.
                </p>

              </div>

              <button
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  border: "none",
                  background: "#2563eb",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                <FaEdit />
              </button>

            </div>

            {/* INFO GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >

              {[
                {
                  icon: <FaEnvelope />,
                  title: "Email Address",
                  value: "keertan@gmail.com",
                },
                {
                  icon: <FaPhone />,
                  title: "Phone Number",
                  value: "+91 9876543210",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Location",
                  value: "Bhubaneswar, India",
                },
                {
                  icon: <FaCar />,
                  title: "Preferred Travel",
                  value: "Premium Pooling",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    padding: "28px",
                    borderRadius: "26px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >

                  <div
                    style={{
                      color: "#3b82f6",
                      fontSize: "24px",
                      marginBottom: "18px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <p
                    style={{
                      color: "#94a3b8",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </p>

                  <h3
                    style={{
                      color: darkMode ? "white" : "#0f172a",
                      fontSize: "22px",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.value}
                  </h3>

                </div>

              ))}

            </div>

          </motion.div>

          {/* ACTIVITY CARD */}
          <motion.div
            whileHover={{
              y: -4,
            }}
            style={{
              padding: "40px",
              borderRadius: "34px",
              ...cardStyle,
            }}
          >

            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "34px",
                marginBottom: "32px",
              }}
            >
              Recent Activity
            </h2>

            {[1, 2, 3].map((item) => (

              <div
                key={item}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "22px 0",
                  borderBottom:
                    item !== 3
                      ? "1px solid rgba(255,255,255,0.06)"
                      : "none",
                }}
              >

                <div>

                  <h3
                    style={{
                      color: darkMode ? "white" : "#0f172a",
                      marginBottom: "8px",
                    }}
                  >
                    Ride Completed Successfully
                  </h3>

                  <p
                    style={{
                      color: "#94a3b8",
                    }}
                  >
                    KIIT Square → Infocity
                  </p>

                </div>

                <span
                  style={{
                    color: "#3b82f6",
                    fontWeight: "600",
                  }}
                >
                  Today
                </span>

              </div>

            ))}

          </motion.div>

        </div>

      </div>

    </div>

  )
}

export default Profile
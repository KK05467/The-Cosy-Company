// src/pages/Settings.jsx

import {
  FaBell,
  FaMoon,
  FaShieldAlt,
  FaGlobe,
  FaLock,
} from "react-icons/fa"

function Settings({ darkMode }) {

  const settings = [
    {
      icon: <FaBell />,
      title: "Notifications",
      desc: "Receive ride and payment alerts",
    },
    {
      icon: <FaMoon />,
      title: "Dark Mode",
      desc: "Switch between light and dark themes",
    },
    {
      icon: <FaShieldAlt />,
      title: "Security",
      desc: "Enable 2FA and extra account protection",
    },
    {
      icon: <FaGlobe />,
      title: "Language",
      desc: "Choose your preferred language",
    },
    {
      icon: <FaLock />,
      title: "Privacy",
      desc: "Manage your profile visibility",
    },
  ]

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
        Settings
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >

        {settings.map((item, index) => (

          <div
            key={index}
            style={{
              padding: "30px",
              borderRadius: "28px",
              background: darkMode
                ? "rgba(255,255,255,0.04)"
                : "rgba(255,255,255,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >

            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
              }}
            >

              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "20px",
                  background: "rgba(37,99,235,0.15)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#3b82f6",
                  fontSize: "24px",
                }}
              >
                {item.icon}
              </div>

              <div>

                <h2
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                    marginBottom: "8px",
                  }}
                >
                  {item.title}
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  {item.desc}
                </p>

              </div>

            </div>

            <div
              style={{
                width: "64px",
                height: "34px",
                borderRadius: "999px",
                background: "#2563eb",
                position: "relative",
                cursor: "pointer",
              }}
            >

              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Settings
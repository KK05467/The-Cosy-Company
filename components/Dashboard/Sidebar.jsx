import {
  FaHome,
  FaCar,
  FaWallet,
  FaUser,
  FaCog,
} from "react-icons/fa"

import { Link, useLocation } from "react-router-dom"

function Sidebar({ darkMode }) {
  const location = useLocation()

  const links = [
    {
      icon: <FaHome />,
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: <FaCar />,
      title: "Bookings",
      path: "/bookings",
    },
    {
      icon: <FaWallet />,
      title: "Wallet",
      path: "/wallet",
    },
    {
      icon: <FaUser />,
      title: "Profile",
      path: "/profile",
    },
    {
      icon: <FaCog />,
      title: "Settings",
      path: "/settings",
    },
  ]

  return (
    <div
    onClick={() => alert("SIDEBAR CLICKED")}
  style={{
    width: "280px",
    minHeight: "100vh",
    padding: "40px 25px",
    background: "rgba(255,255,255,0.03)",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(20px)",

    position: "relative",
    zIndex: 9999,
    flexShrink: 0,
  }}
>
      <div
        style={{
          marginBottom: "70px",
        }}
      >
        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "42px",
            marginBottom: "6px",
          }}
        >
          Cosy
        </h1>

        <p
          style={{
            color: "#3b82f6",
            fontSize: "11px",
            letterSpacing: "4px",
          }}
        >
          TRAVEL TOGETHER
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        {links.map((item, index) => {
          const active = location.pathname === item.path

          return (
            <Link
              key={index}
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  padding: "18px 22px",
                  borderRadius: "18px",
                  background: active
                    ? "rgba(37,99,235,0.15)"
                    : "transparent",
                  color: active
                    ? "#3b82f6"
                    : "#cbd5e1",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                  }}
                >
                  {item.icon}
                </div>

                <p
                  style={{
                    fontSize: "16px",
                    margin: 0,
                  }}
                >
                  {item.title}
                </p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
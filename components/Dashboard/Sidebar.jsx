import {
  FaHome,
  FaCar,
  FaWallet,
  FaUser,
  FaCog,
} from "react-icons/fa"

function Sidebar({ darkMode }) {

  const links = [
    {
      icon: <FaHome />,
      title: "Dashboard",
    },
    {
      icon: <FaCar />,
      title: "Bookings",
    },
    {
      icon: <FaWallet />,
      title: "Wallet",
    },
    {
      icon: <FaUser />,
      title: "Profile",
    },
    {
      icon: <FaCog />,
      title: "Settings",
    },
  ]

  return (

    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        padding: "40px 25px",
        background: "rgba(255,255,255,0.03)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >

      {/* LOGO */}
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

      {/* NAVIGATION */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >

        {links.map((item, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              padding: "18px 22px",
              borderRadius: "18px",
              background:
                index === 0
                  ? "rgba(37,99,235,0.15)"
                  : "transparent",
              color:
                index === 0
                  ? "#3b82f6"
                  : "#cbd5e1",
              cursor: "pointer",
              transition: "0.3s",
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
              }}
            >
              {item.title}
            </p>

          </div>

        ))}

      </div>

    </div>

  )
}

export default Sidebar
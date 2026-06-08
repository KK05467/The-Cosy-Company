import {
  FaWallet,
  FaCar,
  FaLeaf,
  FaUsers,
} from "react-icons/fa"

function DashboardCards({ driver }) {

  const cards = driver
    ? [
        {
          icon: <FaWallet />,
          title: "Today's Earnings",
          value: "₹4,820",
        },
        {
          icon: <FaCar />,
          title: "Trips Completed",
          value: "148",
        },
        {
          icon: <FaUsers />,
          title: "Passengers",
          value: "328",
        },
        {
          icon: <FaLeaf />,
          title: "Fuel Saved",
          value: "120L",
        },
      ]
    : [
        {
          icon: <FaWallet />,
          title: "Wallet Balance",
          value: "₹2,400",
        },
        {
          icon: <FaCar />,
          title: "Booked Rides",
          value: "42",
        },
        {
          icon: <FaUsers />,
          title: "Shared Trips",
          value: "16",
        },
        {
          icon: <FaLeaf />,
          title: "CO₂ Reduced",
          value: "82kg",
        },
      ]

  return (

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "25px",
      }}
    >

      {cards.map((card, index) => (

        <div
          key={index}
          style={{
            padding: "32px",
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
              borderRadius: "20px",
              background: "rgba(37,99,235,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3b82f6",
              fontSize: "28px",
              marginBottom: "24px",
            }}
          >
            {card.icon}
          </div>

          <h1
            style={{
              color: darkMode ? "white" : "#0f172a",
              fontSize: "40px",
              marginBottom: "10px",
            }}
          >
            {card.value}
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "17px",
            }}
          >
            {card.title}
          </p>

        </div>

      ))}

    </div>

  )
}

export default DashboardCards
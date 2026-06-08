import {
  FaSearchLocation,
  FaUsers,
  FaCar,
  FaCheckCircle,
} from "react-icons/fa"

function HowItWorks({ darkMode }) {
  const steps = [
    {
      icon: <FaSearchLocation />,
      title: "Enter Route",
      desc: "Enter pickup and destination.",
    },
    {
      icon: <FaUsers />,
      title: "Find Pool",
      desc: "AI finds matching riders.",
    },
    {
      icon: <FaCar />,
      title: "Travel Together",
      desc: "Share the ride and cost.",
    },
    {
      icon: <FaCheckCircle />,
      title: "Reach Destination",
      desc: "Secure payment and ratings.",
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 80px",
      }}
    >
      <h1
        style={{
          color: darkMode ? "white" : "#0f172a",
          fontSize: "64px",
          textAlign: "center",
          marginBottom: "80px",
        }}
      >
        How Cosy Works
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "30px",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: "35px",
              borderRadius: "30px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "40px",
                color: "#3b82f6",
                marginBottom: "20px",
              }}
            >
              {step.icon}
            </div>

            <h3
              style={{
                color: darkMode ? "white" : "#0f172a",
              }}
            >
              {step.title}
            </h3>

            <p style={{ color: "#94a3b8" }}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorks
import { FaCheck } from "react-icons/fa"

function Pricing({ darkMode }) {
  const plans = [
    {
      title: "Rider",
      price: "Free",
      features: [
        "AI Ride Matching",
        "Real-Time Tracking",
        "Secure Payments",
        "Route Optimization",
      ],
    },
    {
      title: "Premium",
      price: "₹199/month",
      features: [
        "Priority Matching",
        "Lower Service Fees",
        "Advanced Analytics",
        "Premium Support",
      ],
    },
    {
      title: "Corporate",
      price: "Custom",
      features: [
        "Employee Pooling",
        "Admin Dashboard",
        "Reporting Tools",
        "Dedicated Support",
      ],
    },
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 80px",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
      }}
    >
      <h1
        style={{
          color: darkMode ? "white" : "#0f172a",
          fontSize: "64px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Pricing Plans
      </h1>

      <p
        style={{
          color: "#94a3b8",
          textAlign: "center",
          marginBottom: "70px",
        }}
      >
        Choose the perfect plan for your journey.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "30px",
        }}
      >
        {plans.map((plan, index) => (
          <div
            key={index}
            style={{
              padding: "40px",
              borderRadius: "30px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h2
              style={{
                color: "#3b82f6",
                marginBottom: "15px",
              }}
            >
              {plan.title}
            </h2>

            <h1
              style={{
                color: darkMode ? "white" : "#0f172a",
                marginBottom: "30px",
              }}
            >
              {plan.price}
            </h1>

            {plan.features.map((feature, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: "15px",
                  color: "#cbd5e1",
                }}
              >
                <FaCheck color="#3b82f6" />
                {feature}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
function FAQ({ darkMode }) {
  const faqs = [
    {
      q: "How does vehicle pooling work?",
      a: "Cosy matches riders travelling on similar routes and schedules."
    },
    {
      q: "Is Cosy safe?",
      a: "All users are verified and ride details are tracked."
    },
    {
      q: "How are payments handled?",
      a: "Payments are securely processed through integrated gateways."
    },
    {
      q: "Can I be both a rider and driver?",
      a: "Yes, you can switch between rider and driver modes anytime."
    }
  ]

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 80px",
        background: darkMode ? "#020617" : "#f8fafc",
        color: darkMode ? "white" : "#0f172a",
      }}
    >
      <h1 style={{ fontSize: "60px", marginBottom: "50px" }}>
        Frequently Asked Questions
      </h1>

      {faqs.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: "25px",
            padding: "25px",
            borderRadius: "20px",
            background: "rgba(37,99,235,0.08)",
          }}
        >
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
    </div>
  )
}

export default FAQ
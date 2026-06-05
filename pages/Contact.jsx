import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa"

function Contact({ darkMode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 80px 80px",
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

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "80px",
          }}
        >
          <p
            style={{
              color: "#3b82f6",
              letterSpacing: "4px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            GET IN TOUCH
          </p>

          <h1
            style={{
              color: darkMode ? "white" : "#0f172a",
              fontSize: "72px",
              marginBottom: "20px",
            }}
          >
            Contact Us
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "20px",
              maxWidth: "750px",
              margin: "0 auto",
              lineHeight: "1.8",
            }}
          >
            Have questions, suggestions, or partnership opportunities?
            We'd love to hear from you. Reach out and our team will get
            back to you as soon as possible.
          </p>
        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "35px",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            }}
          >
            {[
              {
                icon: <FaEnvelope />,
                title: "Email",
                value: "support@cosy.com",
              },
              {
                icon: <FaPhone />,
                title: "Phone",
                value: "+91 98765 43210",
              },
              {
                icon: <FaMapMarkerAlt />,
                title: "Office",
                value: "Bhubaneswar, Odisha, India",
              },
              {
                icon: <FaClock />,
                title: "Working Hours",
                value: "Mon - Sat | 9:00 AM - 8:00 PM",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "30px",
                  borderRadius: "30px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
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
                    fontSize: "24px",
                  }}
                >
                  {item.icon}
                </div>

                <div>
                  <p
                    style={{
                      color: "#94a3b8",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </p>

                  <h3
                    style={{
                      color: darkMode ? "white" : "#0f172a",
                    }}
                  >
                    {item.value}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* CONTACT FORM */}
          <div
            style={{
              padding: "40px",
              borderRadius: "35px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "36px",
                marginBottom: "35px",
              }}
            >
              Send a Message
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                placeholder="Full Name"
                style={inputStyle(darkMode)}
              />

              <input
                type="email"
                placeholder="Email Address"
                style={inputStyle(darkMode)}
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              style={{
                ...inputStyle(darkMode),
                marginBottom: "20px",
              }}
            />

            <textarea
              rows="8"
              placeholder="Your Message..."
              style={{
                ...inputStyle(darkMode),
                resize: "none",
                marginBottom: "25px",
              }}
            />

            <button
              style={{
                padding: "18px 34px",
                borderRadius: "18px",
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
              <FaPaperPlane />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const inputStyle = (darkMode) => ({
  width: "100%",
  padding: "18px 20px",
  borderRadius: "18px",
  border: darkMode
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(15,23,42,0.08)",
  background: darkMode
    ? "rgba(255,255,255,0.04)"
    : "rgba(255,255,255,0.8)",
  color: darkMode ? "white" : "#0f172a",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box",
})

export default Contact
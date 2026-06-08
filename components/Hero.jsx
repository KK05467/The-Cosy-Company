import { motion } from "framer-motion"

import {
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCar,
} from "react-icons/fa"

function Hero({ darkMode }) {

  return (

    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        padding: "180px 80px 100px",
        background: darkMode
  ? "linear-gradient(to bottom right, #020617, #050816)"
  : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
      }}
    >

      {/* FULLSCREEN IMAGE */}
      <img
        src="/hero-car.webp"
        alt="hero"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.42,
          zIndex: 1,
        }}
      />

      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          
           background: darkMode
  ? "linear-gradient(to bottom right, #020617, #050816)"
  : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
          zIndex: 2,
        }}
      />

      {/* BLUE GLOW */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "#2563eb",
          filter: "blur(180px)",
          opacity: 0.18,
          right: "-250px",
          top: "-120px",
          zIndex: 2,
        }}
      />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "760px",
        }}
      >

        {/* TOP TAG */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "30px",
            backdropFilter: "blur(20px)",
          }}
        >

          <FaUsers color="#3b82f6" />

          <span
            style={{
              color: darkMode ? "white" : "#0f172a",
              fontSize: "15px",
            }}
          >
            Smart rides. Better cities. Together.
          </span>

        </div>

        {/* HEADING */}
        <h1
          style={{
            fontSize: "92px",
            lineHeight: "1",
            fontWeight: "700",
            marginBottom: "30px",
            color: darkMode ? "white" : "#0f172a",
          }}
        >
          Travel{" "}

          <span style={{ color: "#2563eb" }}>
            Together.
          </span>

          <br />

          Arrive{" "}

          <span style={{ color: "#2563eb" }}>
            Better.
          </span>

        </h1>

        {/* SUBTEXT */}
        <p
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "22px",
            lineHeight: "1.8",
            maxWidth: "680px",
          }}
        >
          The Cosy Company connects you with verified
          travelers going your way. Save money,
          reduce traffic, and help build a greener tomorrow.
        </p>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "22px",
            marginTop: "45px",
          }}
        >

          {/* PRIMARY BUTTON */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "20px 38px",
              borderRadius: "22px",
              border: "none",
              background: "#2563eb",
              color: darkMode ? "white" : "#0f172a",
              fontSize: "18px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 0 50px rgba(37,99,235,0.45)",
            }}
          >
            Book a Ride

            <FaArrowRight />
          </button>

          {/* SECONDARY BUTTON */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "20px 38px",
              borderRadius: "22px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: darkMode ? "white" : "#0f172a",
              fontSize: "18px",
              cursor: "pointer",
              backdropFilter: "blur(20px)",
            }}
          >
            Explore Routes

            <FaCar />
          </button>

        </div>

        {/* TRUSTED USERS */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginTop: "45px",
          }}
        >

          {/* USERS */}
          <div
            style={{
              display: "flex",
            }}
          >

            {[1, 2, 3].map((item) => (

              <img
                key={item}
                src={`https://i.pravatar.cc/100?img=${item + 10}`}
                alt=""
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "3px solid #020617",
                  marginLeft: "-10px",
                }}
              />

            ))}

          </div>

          {/* REVIEW TEXT */}
          <div>

            <p
              style={{
                color: darkMode ? "white" : "#0f172a",
                marginBottom: "6px",
                fontSize: "17px",
              }}
            >
              Trusted by 50,000+ commuters
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#facc15",
              }}
            >

              {[1, 2, 3, 4, 5].map((item) => (
                <FaStar key={item} />
              ))}

              <span
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  marginLeft: "6px",
                }}
              >
                4.8 (2.3K reviews)
              </span>

            </div>

          </div>

        </div>

      </motion.div>

    </section>
  )
}

export default Hero
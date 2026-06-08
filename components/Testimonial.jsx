import { motion } from "framer-motion"

function Testimonial({ darkMode }) {

  return (

    <section
      style={{
        padding: "120px 80px",
      }}
    >

      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        style={{
          padding: "70px",
          borderRadius: "40px",
         background: darkMode
  ? "linear-gradient(to bottom right, #020617, #050816)"
  : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >

        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "3px",
            marginBottom: "30px",
          }}
        >
          TESTIMONIAL
        </p>

        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "52px",
            lineHeight: "1.4",
            maxWidth: "1000px",
            marginBottom: "40px",
          }}
        >
          “Cosy completely changed my daily commute.
          Affordable, comfortable, and incredibly smooth.”
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >

          <img
            src="https://i.pravatar.cc/100?img=15"
            alt=""
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          />

          <div>

            <h3
              style={{
                color: darkMode ? "white" : "#0f172a",
                marginBottom: "6px",
              }}
            >
              Aryan Sharma
            </h3>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Product Designer
            </p>

          </div>

        </div>

      </motion.div>

    </section>
  )
}

export default Testimonial
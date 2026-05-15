import { motion } from "framer-motion"
import {
  FaUsers,
  FaCar,
  FaLeaf,
  FaMapMarkedAlt,
} from "react-icons/fa"

function Stats() {

  const stats = [
    {
      icon: <FaUsers />,
      value: "50K+",
      label: "Active Commuters",
    },
    {
      icon: <FaCar />,
      value: "120K+",
      label: "Shared Rides",
    },
    {
      icon: <FaLeaf />,
      value: "80 Tons",
      label: "CO₂ Saved",
    },
    {
      icon: <FaMapMarkedAlt />,
      value: "40+",
      label: "Smart Routes",
    },
  ]

  return (

    <section
      style={{
        padding: "120px 80px",
        position: "relative",
        zIndex: 5,
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
        }}
      >

        {stats.map((item, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -10,
            }}
            transition={{
              duration: 0.3,
            }}
            style={{
              padding: "40px",
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
                marginBottom: "25px",
              }}
            >
              {item.icon}
            </div>

            <h1
              style={{
                color: "white",
                fontSize: "42px",
                marginBottom: "10px",
              }}
            >
              {item.value}
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "17px",
              }}
            >
              {item.label}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  )
}

export default Stats
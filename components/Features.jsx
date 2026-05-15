import { motion } from "framer-motion"

import {
  FaShieldAlt,
  FaRoute,
  FaWallet,
  FaClock,
} from "react-icons/fa"

function Features() {

  const features = [
    {
      icon: <FaRoute />,
      title: "Smart Route Matching",
      desc: "AI-powered ride matching for optimized travel routes.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Drivers",
      desc: "Travel securely with verified and trusted commuters.",
    },
    {
      icon: <FaWallet />,
      title: "Affordable Pricing",
      desc: "Reduce transportation costs through shared rides.",
    },
    {
      icon: <FaClock />,
      title: "Real-Time Tracking",
      desc: "Track rides live with accurate arrival predictions.",
    },
  ]

  return (

    <section
      style={{
        padding: "80px",
      }}
    >

      <div
        style={{
          textAlign: "center",
          marginBottom: "80px",
        }}
      >

        <p
          style={{
            color: "#3b82f6",
            marginBottom: "20px",
            letterSpacing: "3px",
          }}
        >
          FEATURES
        </p>

        <h1
          style={{
            color: "white",
            fontSize: "68px",
            marginBottom: "20px",
          }}
        >
          Built for Modern Mobility
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "20px",
          }}
        >
          Experience premium ride pooling with cutting-edge technology.
        </p>

      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "35px",
        }}
      >

        {features.map((feature, index) => (

          <motion.div
            key={index}
            whileHover={{
              y: -12,
            }}
            transition={{
              duration: 0.3,
            }}
            style={{
              padding: "45px",
              borderRadius: "32px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >

            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                background: "rgba(37,99,235,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#3b82f6",
                fontSize: "30px",
                marginBottom: "30px",
              }}
            >
              {feature.icon}
            </div>

            <h2
              style={{
                color: "white",
                fontSize: "34px",
                marginBottom: "18px",
              }}
            >
              {feature.title}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "18px",
                lineHeight: "1.8",
              }}
            >
              {feature.desc}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  )
}

export default Features
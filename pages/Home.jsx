import { motion } from "framer-motion"

function Home() {

  return (

    <motion.div
      initial={{
        opacity: 0,
        scale: 0.98,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        height: "100vh",
        background:
          "linear-gradient(to bottom right, #020617, #111827)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >

      <div style={{ textAlign: "center" }}>

        <h1
          style={{
            fontSize: "64px",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          Welcome to Cosy
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "18px",
          }}
        >
          Premium Smart Ride Pooling Platform
        </p>

      </div>

    </motion.div>
  )
}

export default Home
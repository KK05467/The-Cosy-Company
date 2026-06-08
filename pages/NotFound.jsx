import { motion } from "framer-motion"
import { Link } from "react-router-dom"

function NotFound({ darkMode }) {

  return (

    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
        padding: "40px",
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
          top: "-220px",
          right: "-180px",
        }}
      />

      {/* SECOND GLOW */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#60a5fa",
          filter: "blur(150px)",
          opacity: 0.08,
          bottom: "-180px",
          left: "-100px",
        }}
      />

      {/* CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        style={{
          position: "relative",
          zIndex: 5,
          textAlign: "center",
          maxWidth: "900px",
        }}
      >

        {/* PSYDUCK */}
        <motion.img
          animate={{
            y: [0, -12, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png"
          alt="psyduck"
          style={{
            width: "240px",
            imageRendering: "pixelated",
            marginBottom: "20px",
            filter: "drop-shadow(0 0 40px rgba(37,99,235,0.4))",
          }}
        />

        {/* 404 */}
        <h1
          style={{
            fontSize: "150px",
            lineHeight: 1,
            marginBottom: "20px",
            fontWeight: "800",
            background:
              "linear-gradient(135deg, #3b82f6, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </h1>

        {/* TITLE */}
        <h2
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "52px",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          Psyduck got confused.
        </h2>

        {/* DESC */}
        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            lineHeight: 1.8,
            maxWidth: "720px",
            margin: "0 auto 45px",
          }}
        >
          The page you’re looking for vanished somewhere
          between Pallet Town and the Cosy servers.
        </p>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "22px",
            flexWrap: "wrap",
          }}
        >

          {/* HOME */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >

            <motion.button
              whileHover={{
                y: -4,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              style={{
                padding: "18px 34px",
                borderRadius: "20px",
                border: "none",
                background:
                  "linear-gradient(135deg, #2563eb, #3b82f6)",
                color: "white",
                fontSize: "17px",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow:
                  "0 0 50px rgba(37,99,235,0.4)",
              }}
            >
              Back To Home
            </motion.button>

          </Link>

          {/* GO BACK */}
          <motion.button
            whileHover={{
              y: -4,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => window.history.back()}
            style={{
              padding: "18px 34px",
              borderRadius: "20px",
              border:
                darkMode
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(15,23,42,0.08)",
              background:
                darkMode
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              color: darkMode ? "white" : "#0f172a",
              fontSize: "17px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Go Back
          </motion.button>

        </div>

      </motion.div>

    </div>

  )
}

export default NotFound
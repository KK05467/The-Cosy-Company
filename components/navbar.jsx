import { motion } from "framer-motion"
import { Link } from "react-router-dom"

import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa"

function Navbar({ darkMode, setDarkMode }) {

  const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "How it works", path: "/how-it-works" },
  { title: "FAQ", path: "/faq" },
  { title: "Pricing", path: "/pricing" },
  { title: "Contact", path: "/contact" },
]

const isLoggedIn = !!localStorage.getItem("token")
  return (

    <nav
      style={{
        width: "100%",
        padding: "26px 80px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        background: darkMode
          ? "rgba(2, 6, 23, 0.55)"
          : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(22px)",
        borderBottom: darkMode
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid rgba(15,23,42,0.08)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.18)",
      }}
    >

      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
        }}
      >

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >

          <h1
            style={{
              color: darkMode ? "white" : "#0f172a",
              fontSize: "42px",
              fontWeight: "700",
              margin: 0,
              lineHeight: 1,
            }}
          >
            Cosy
          </h1>

          <p
            style={{
              color: "#3b82f6",
              fontSize: "11px",
              letterSpacing: "5px",
              marginTop: "6px",
              fontWeight: "500",
            }}
          >
            TRAVEL TOGETHER
          </p>

        </div>

      </Link>

      {/* NAV LINKS */}
      <div
        style={{
          display: "flex",
          gap: "36px",
          alignItems: "center",
        }}
      >

        {navLinks.map((link, index) => (

  <Link
    key={index}
    to={link.path}
    style={{
      textDecoration: "none",
    }}
  >
    <motion.p
      whileHover={{
        color: "#3b82f6",
        y: -2,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        color: darkMode ? "white" : "#0f172a",
        fontSize: "16px",
        fontWeight: "500",
        cursor: "pointer",
        margin: 0,
      }}
    >
      {link.title}
    </motion.p>
  </Link>

))}

      </div>

      {/* BUTTONS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >

        {/* THEME TOGGLE */}
        <motion.button
          whileHover={{
            y: -3,
          }}
          whileTap={{
            scale: 0.95,
          }}
          onClick={() => setDarkMode(!darkMode)}
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "18px",
            border: darkMode
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(15,23,42,0.08)",
            background: darkMode
              ? "rgba(255,255,255,0.05)"
              : "rgba(255,255,255,0.75)",
            color: darkMode ? "white" : "#0f172a",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            backdropFilter: "blur(20px)",
          }}
        >

          {darkMode ? <FaSun /> : <FaMoon />}

        </motion.button>

        {/* PROFILE BUTTON */}
        <Link
  to="/profile"
  style={{
    textDecoration: "none",
  }}
>
  <motion.div
    whileHover={{
      y: -3,
      scale: 1.05,
    }}
    whileTap={{
      scale: 0.95,
    }}
    style={{
      width: "56px",
      height: "56px",
      borderRadius: "18px",
      border: darkMode
        ? "1px solid rgba(255,255,255,0.08)"
        : "1px solid rgba(15,23,42,0.08)",
      background: darkMode
        ? "rgba(255,255,255,0.05)"
        : "rgba(255,255,255,0.75)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#3b82f6",
      fontSize: "24px",
      cursor: "pointer",
      backdropFilter: "blur(20px)",
    }}
  >
    <FaUserCircle />
  </motion.div>
</Link>

        {!isLoggedIn ? (
  <>
    {/* LOGIN BUTTON */}
    <Link to="/login" style={{ textDecoration: "none" }}>
      <motion.button
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25 }}
        style={{
          padding: "14px 30px",
          borderRadius: "16px",
          background: darkMode
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.75)",
          border: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(15,23,42,0.08)",
          backdropFilter: "blur(20px)",
          color: darkMode ? "#e2e8f0" : "#0f172a",
          fontSize: "15px",
          fontWeight: "500",
          cursor: "pointer",
        }}
      >
        Log in
      </motion.button>
    </Link>

    {/* SIGNUP BUTTON */}
    <Link to="/signup" style={{ textDecoration: "none" }}>
      <motion.button
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.25 }}
        style={{
          padding: "14px 32px",
          borderRadius: "18px",
          background:
            "linear-gradient(135deg, #2563eb, #3b82f6)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "white",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 0 40px rgba(37,99,235,0.35)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {/* SHINE EFFECT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
            transform: "translateX(-100%)",
          }}
        />

        <span style={{ position: "relative", zIndex: 2 }}>
          Sign up
        </span>
      </motion.button>
    </Link>
  </>
) : (
  <>
    {/* PROFILE BUTTON */}
    <Link to="/profile" style={{ textDecoration: "none" }}>
      <motion.div
        whileHover={{ y: -3, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(15,23,42,0.08)",
          background: darkMode
            ? "rgba(255,255,255,0.05)"
            : "rgba(255,255,255,0.75)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#3b82f6",
          fontSize: "24px",
          cursor: "pointer",
          backdropFilter: "blur(20px)",
        }}
      >
        👤
      </motion.div>
    </Link>

    {/* LOGOUT BUTTON */}
    <motion.button
      onClick={() => {
        localStorage.removeItem("token")
        window.location.href = "/"
      }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      style={{
        padding: "14px 30px",
        borderRadius: "16px",
        background: "#ef4444",
        border: "none",
        color: "white",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      Logout
    </motion.button>
  </>
)}
        

      </div>

    </nav>

  )
}

export default Navbar
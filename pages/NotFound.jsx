// src/pages/NotFound.jsx

import { Link } from "react-router-dom"

function NotFound({ darkMode }) {

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        padding: "40px",
      }}
    >

      <h1
        style={{
          fontSize: "180px",
          color: "#2563eb",
          marginBottom: "20px",
        }}
      >
        404
      </h1>

      <h2
        style={{
          color: darkMode ? "white" : "#0f172a",
          fontSize: "48px",
          marginBottom: "20px",
        }}
      >
        Page Not Found
      </h2>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "18px",
          marginBottom: "40px",
        }}
      >
        The page you are looking for does not exist.
      </p>

      <Link to="/">

        <button
          style={{
            padding: "18px 38px",
            borderRadius: "18px",
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: "17px",
            cursor: "pointer",
          }}
        >
          Back To Home
        </button>

      </Link>

    </div>

  )
}

export default NotFound
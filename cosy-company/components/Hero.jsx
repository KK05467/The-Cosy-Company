// src/pages/Home.jsx
//
// The single CTA shown depends on the logged-in user's mode:
// - Not logged in → shows both options (they haven't chosen yet)
// - Driver mode    → only "Start a Ride" is shown
// - Rider mode     → only "Book a Ride" is shown
//
// Mode is read from localStorage("userMode"), set by the Dashboard's
// Rider/Driver toggle. This is a UI preference (not derived from backend
// ownership like RideDetails) since Home is a landing page, not tied to
// a specific ride.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaStar,
  FaUsers,
  FaCar,
} from "react-icons/fa";

function Home({ darkMode }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // null = not logged in / no mode chosen
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedMode = localStorage.getItem("userMode"); // "rider" | "driver"

    setLoggedIn(!!token);
    // Default to "rider" if logged in but no mode has been chosen yet,
    // so the user always sees at least one clear CTA instead of none.
    setMode(token ? (savedMode || "rider") : null);
  }, []);

  const showBookRide = !loggedIn || mode === "rider";
  const showStartRide = !loggedIn || mode === "driver";

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
          ? "linear-gradient(135deg,#0F1115,#171923)"
          : "linear-gradient(135deg,#F5F1E8,#EAE3D2)",
      }}
    >
      {/* BMW IMAGE */}
      <img
        src="/BMW.jpg"
        alt="Premium ride"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.15,
          zIndex: 1,
        }}
      />

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: darkMode ? "rgba(10,12,16,.82)" : "rgba(245,241,232,.84)",
          zIndex: 2,
        }}
      />

      {/* FLOATING GREEN GLOW */}
      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: darkMode ? "#2D6A4F" : "#1F4D3A",
          filter: "blur(220px)",
          opacity: 0.12,
          top: "-180px",
          right: "-250px",
          zIndex: 2,
        }}
      />

      {/* GOLD GLOW */}
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#C9A96E",
          filter: "blur(180px)",
          opacity: 0.08,
          left: "-100px",
          bottom: "-100px",
          zIndex: 2,
        }}
      />

      {/* CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        style={{ position: "relative", zIndex: 5, maxWidth: "760px" }}
      >
        {/* TOP TAG — reflects current mode when logged in */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px 22px",
            borderRadius: "999px",
            background: darkMode ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.65)",
            border: darkMode
              ? "1px solid rgba(255,255,255,.08)"
              : "1px solid rgba(31,77,58,.12)",
            backdropFilter: "blur(25px)",
            marginBottom: "35px",
            boxShadow: darkMode
              ? "0 10px 40px rgba(0,0,0,.4)"
              : "0 10px 40px rgba(31,77,58,.08)",
          }}
        >
          <FaUsers color={darkMode ? "#D4AF37" : "#C9A96E"} />
          <span style={{ color: darkMode ? "#fff" : "#1D1D1D", fontSize: "15px", fontWeight: "500" }}>
            {!loggedIn && "Smart rides. Better cities. Together."}
            {loggedIn && mode === "driver" && "Driver mode — start earning today."}
            {loggedIn && mode === "rider" && "Rider mode — find your next ride."}
          </span>
        </div>

        {/* HEADING */}
        <h1
          style={{
            fontSize: "96px",
            lineHeight: "1",
            fontWeight: "800",
            letterSpacing: "-3px",
            color: darkMode ? "#fff" : "#1D1D1D",
            marginBottom: "35px",
          }}
        >
          Travel{" "}
          <span style={{ color: darkMode ? "#D4AF37" : "#1F4D3A" }}>Together.</span>
          <br />
          Arrive{" "}
          <span style={{ color: darkMode ? "#D4AF37" : "#1F4D3A" }}>Better.</span>
        </h1>

        {/* DESCRIPTION */}
        <p
          style={{
            color: darkMode ? "#d1d5db" : "#444",
            fontSize: "22px",
            lineHeight: "1.9",
            maxWidth: "680px",
          }}
        >
          The Cosy Company connects you with verified travelers going your way.
          Save money, reduce traffic, enjoy premium rides, and help build a greener tomorrow.
        </p>

        {/* BUTTONS — mode-aware, single CTA when logged in */}
        <div style={{ display: "flex", gap: "24px", marginTop: "50px" }}>
          {showBookRide && (
            <motion.button
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/search-rides")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "20px 38px",
                border: "none",
                borderRadius: "18px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "600",
                color: "#fff",
                background: "linear-gradient(135deg,#1F4D3A,#2D6A4F)",
                boxShadow: "0 20px 50px rgba(31,77,58,.25)",
              }}
            >
              Book a Ride
              <FaArrowRight />
            </motion.button>
          )}

          {showStartRide && (() => {
            const isPrimary = loggedIn && mode === "driver";

            const startRideStyle = isPrimary
              ? {
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "20px 38px",
                  border: "none",
                  borderRadius: "18px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#fff",
                  background: "linear-gradient(135deg,#1F4D3A,#2D6A4F)",
                  boxShadow: "0 20px 50px rgba(31,77,58,.25)",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "20px 38px",
                  borderRadius: "18px",
                  cursor: "pointer",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: darkMode ? "#fff" : "#1D1D1D",
                  background: darkMode ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.65)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,.08)"
                    : "1px solid rgba(31,77,58,.15)",
                  backdropFilter: "blur(30px)",
                };

            return (
              <motion.button
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/driver-create-ride")}
                style={startRideStyle}
              >
                Start a Ride
                <FaArrowRight />
                <FaCar />
              </motion.button>
            );
          })()}
        </div>

        {/* TRUST SECTION */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "55px" }}>
          <div style={{ display: "flex" }}>
            {[11, 12, 13].map((imgId) => (
              <img
                key={imgId}
                src={`https://i.pravatar.cc/100?img=${imgId}`}
                alt=""
                style={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "50%",
                  border: `3px solid ${darkMode ? "#171923" : "#F5F1E8"}`,
                  marginLeft: "-10px",
                }}
              />
            ))}
          </div>

          <div>
            <p style={{ color: darkMode ? "#fff" : "#1D1D1D", marginBottom: "8px", fontSize: "17px" }}>
              Trusted by commuters across the city
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#D4AF37" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <FaStar key={s} />
              ))}
              <span style={{ color: darkMode ? "#fff" : "#1D1D1D", marginLeft: "5px" }}>
                Verified ride-sharing platform
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;

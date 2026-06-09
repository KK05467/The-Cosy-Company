import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaSearch,
  FaUsers,
  FaLeaf,
  FaShieldAlt,
  FaCar,
  FaArrowRight,
} from "react-icons/fa";

function SearchRides({ darkMode }) {
  const navigate = useNavigate();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSearch = () => {
    if (!from || !to) {
      alert("Please enter pickup and destination");
      return;
    }

    navigate(
      `/ride-results?from=${encodeURIComponent(
        from
      )}&to=${encodeURIComponent(to)}`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "140px 60px 80px",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
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
          opacity: 0.15,
          top: "-200px",
          right: "-250px",
        }}
      />

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "4px",
            fontSize: "13px",
            marginBottom: "20px",
          }}
        >
          FIND YOUR PERFECT RIDE
        </p>

        <h1
          style={{
            fontSize: "72px",
            lineHeight: "1.1",
            color: darkMode ? "white" : "#0f172a",
            marginBottom: "24px",
          }}
        >
          Travel Smarter.
          <br />
          Travel Together.
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "20px",
            lineHeight: "1.8",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Find verified drivers heading your way,
          reduce travel costs, and make every ride
          more sustainable.
        </p>
      </motion.div>

      {/* SEARCH CARD */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gap: "20px",
            alignItems: "end",
          }}
        >
          {/* FROM */}
          <div>
            <label
              style={{
                color: "#94a3b8",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Pickup Location
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <FaMapMarkerAlt color="#3b82f6" />

              <input
                type="text"
                placeholder="Enter pickup location"
                value={from}
                onChange={(e) =>
                  setFrom(e.target.value)
                }
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          {/* TO */}
          <div>
            <label
              style={{
                color: "#94a3b8",
                display: "block",
                marginBottom: "10px",
              }}
            >
              Destination
            </label>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "18px",
                borderRadius: "18px",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <FaMapMarkerAlt color="#3b82f6" />

              <input
                type="text"
                placeholder="Enter destination"
                value={to}
                onChange={(e) =>
                  setTo(e.target.value)
                }
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: darkMode
                    ? "white"
                    : "#0f172a",
                  fontSize: "16px",
                }}
              />
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSearch}
            style={{
              height: "58px",
              padding: "0 32px",
              borderRadius: "18px",
              border: "none",
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              boxShadow:
                "0 0 30px rgba(37,99,235,0.4)",
            }}
          >
            <FaSearch />
            Search
          </button>
        </div>
      </motion.div>

      {/* FEATURES */}
      <div
        style={{
          marginTop: "70px",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "24px",
        }}
      >
        {[
          {
            icon: <FaShieldAlt />,
            title: "Verified Drivers",
          },
          {
            icon: <FaUsers />,
            title: "Ride Together",
          },
          {
            icon: <FaLeaf />,
            title: "Eco Friendly",
          },
          {
            icon: <FaCar />,
            title: "Comfortable Travel",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: "28px",
              borderRadius: "24px",
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                color: "#3b82f6",
                marginBottom: "16px",
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                color: darkMode
                  ? "white"
                  : "#0f172a",
              }}
            >
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchRides;
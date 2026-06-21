// src/pages/Profile.jsx
//
// REDESIGN NOTES:
// - Replaced glass-card-on-gradient with flat paper/ink surfaces and hairline
//   borders (s.line), matching Home's ticket language.
// - Membership card keeps a solid fill (forest/gold) since it's the one place
//   a strong color block earns its keep — everything else stays flat.
// - Headline uses Fraunces (display), labels use IBM Plex Mono (route-label
//   feel), body copy stays Inter.
// - Role switch now writes "userMode" (not "role") to match the key Home.jsx
//   and Dashboard read — previously this page used a different localStorage
//   key than the rest of the app, so switching roles here wouldn't actually
//   affect Home's CTA.

import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCog,
  FaShieldAlt,
  FaStar,
  FaCar,
  FaWallet,
  FaLeaf,
  FaEdit,
  FaExchangeAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { colors, fonts, surface } from "../styles/tokens";

function Profile({ darkMode }) {
  const [user, setUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(
    localStorage.getItem("userMode") || "rider"
  );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error.response?.data);
      }
    };
    fetchProfile();
  }, []);

  const switchRole = () => {
    const newRole = currentRole === "rider" ? "driver" : "rider";
    setCurrentRole(newRole);
    localStorage.setItem("userMode", newRole);
  };

  const s = surface(darkMode);

  const stats = [
    { icon: <FaCar />, value: user?.totalTrips || 0, label: "Trips" },
    { icon: <FaWallet />, value: `₹${user?.totalSaved || 0}`, label: "Saved" },
    { icon: <FaLeaf />, value: `${user?.co2Saved || 0}kg`, label: "CO₂ Saved" },
  ];

  const infoRows = [
    { icon: <FaEnvelope />, label: "Email", value: user?.email },
    { icon: <FaPhone />, label: "Phone", value: user?.phone },
    { icon: <FaMapMarkerAlt />, label: "Location", value: user?.location },
    { icon: <FaUser />, label: "Mode", value: currentRole === "driver" ? "Driver" : "Rider" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 90px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: "1180px", margin: "0 auto" }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
            marginBottom: "48px",
            paddingBottom: "40px",
            borderBottom: `1px solid ${s.line}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
            <div style={{ position: "relative" }}>
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "20px",
                    objectFit: "cover",
                    border: `1px solid ${s.line}`,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "20px",
                    background: darkMode ? colors.inkSoft : colors.paperSoft,
                    border: `1px solid ${s.line}`,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FaUser style={{ color: s.accent, fontSize: "38px" }} />
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  bottom: "-6px",
                  right: "-6px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: s.accent,
                  border: `3px solid ${s.bg}`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaShieldAlt style={{ color: darkMode ? colors.ink : "#fff", fontSize: "12px" }} />
              </div>
            </div>

            <div>
              <p
                style={{
                  fontFamily: fonts.mono,
                  color: s.accent,
                  letterSpacing: "2.5px",
                  fontSize: "11px",
                  marginBottom: "10px",
                  textTransform: "uppercase",
                }}
              >
                PREMIUM MEMBER
              </p>

              <h1
                style={{
                  fontFamily: fonts.display,
                  color: s.text,
                  fontSize: "46px",
                  fontWeight: "600",
                  marginBottom: "10px",
                  lineHeight: 1,
                }}
              >
                {user?.name || "Loading..."}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <FaStar color={colors.gold} size={13} />
                <span style={{ color: s.textMuted, fontSize: "14px" }}>
                  {user?.rating || 5} Rating · Elite Rider & Driver
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div style={{ display: "flex", gap: "12px" }}>
            <Link to="/edit-profile" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "13px 22px",
                  borderRadius: "12px",
                  background: "transparent",
                  border: `1px solid ${s.line}`,
                  color: s.text,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <FaEdit size={13} /> Edit
              </motion.button>
            </Link>

            <Link to="/settings" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "13px 22px",
                  borderRadius: "12px",
                  background: darkMode ? colors.goldSoft : colors.forest,
                  color: darkMode ? colors.ink : "#fff",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                <FaCog size={13} /> Settings
              </motion.button>
            </Link>

            <motion.button
              onClick={switchRole}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              style={{
                padding: "13px 22px",
                borderRadius: "12px",
                border: "none",
                background: currentRole === "driver" ? colors.rust : (darkMode ? colors.goldSoft : colors.forest),
                color: currentRole === "driver" ? "#fff" : (darkMode ? colors.ink : "#fff"),
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "9px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              <FaExchangeAlt size={13} />
              Switch to {currentRole === "rider" ? "Driver" : "Rider"}
            </motion.button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "28px" }}>
          {/* LEFT — personal info */}
          <div
            style={{
              padding: "36px",
              borderRadius: "20px",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
            }}
          >
            <p
              style={{
                fontFamily: fonts.mono,
                color: s.accent,
                fontSize: "11px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              PERSONAL INFORMATION
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              {infoRows.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                    padding: "20px 4px",
                    borderBottom: i < infoRows.length - 1 ? `1px solid ${s.line}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: darkMode ? colors.inkDark : colors.paperSoft,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: s.accent,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: s.textMuted, fontSize: "12px", marginBottom: "4px" }}>
                      {item.label}
                    </p>
                    <h3 style={{ color: s.text, fontSize: "16px", fontWeight: "600", margin: 0 }}>
                      {item.value || "Not added"}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — membership + stats */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* MEMBERSHIP — the one solid color block */}
            <div
              style={{
                padding: "32px",
                borderRadius: "20px",
                background: darkMode
                  ? `linear-gradient(135deg, ${colors.forestDeep}, ${colors.forest})`
                  : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                color: colors.paper,
              }}
            >
              <p style={{ fontFamily: fonts.mono, opacity: 0.7, letterSpacing: "2.5px", fontSize: "11px", marginBottom: "12px" }}>
                COSY PREMIUM
              </p>
              <h1 style={{ fontFamily: fonts.display, fontSize: "34px", fontWeight: "600", marginBottom: "12px" }}>
                {user?.membership || "Gold Member"}
              </h1>
              <p style={{ opacity: 0.85, fontSize: "14px", lineHeight: "1.6" }}>
                Premium ride experience with savings &amp; priority support.
              </p>
            </div>

            {/* STATS */}
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "22px",
                  borderRadius: "16px",
                  background: s.bgSoft,
                  border: `1px solid ${s.line}`,
                  display: "flex",
                  gap: "18px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "10px",
                    background: darkMode ? colors.inkDark : colors.paperSoft,
                    color: s.accent,
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <h2 style={{ color: s.text, fontSize: "22px", fontWeight: "700", margin: 0 }}>
                    {stat.value}
                  </h2>
                  <p style={{ color: s.textMuted, fontSize: "13px", margin: 0 }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;

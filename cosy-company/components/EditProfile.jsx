import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa"

import { useState, useEffect } from "react"
import axios from "axios"

import { motion } from "framer-motion"

import { Link } from "react-router-dom"

function EditProfile({ darkMode }) {
  const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  location: "",
  accountType: "",
  bio: "",
})


const [loading, setLoading] = useState(false)
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  fetchProfile();
}, []);

const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
};

const saveProfile = async () => {
  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    await axios.put(
      "http://localhost:5000/api/auth/profile",
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        accountType: user.accountType,
        bio: user.bio,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Profile Updated Successfully");
  } catch (err) {
    console.log(err);
    alert("Failed To Update Profile");
  } finally {
    setLoading(false);
  }
};

  const inputStyle = {
    width: "100%",
    padding: "18px 20px",
    borderRadius: "18px",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.08)"
      : "1px solid rgba(15,23,42,0.08)",
    background: darkMode
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.7)",
    color: darkMode ? "white" : "#0f172a",
    fontSize: "16px",
    outline: "none",
    backdropFilter: "blur(20px)",
    boxSizing: "border-box",
  }

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "120px",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
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
          top: "-250px",
          right: "-200px",
        }}
      />

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
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >

        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >

          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >

            <Link
              to="/profile"
              style={{
                textDecoration: "none",
              }}
            >

              <motion.button
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "18px",
                  border: "none",
                  background: "rgba(255,255,255,0.05)",
                  color: darkMode ? "white" : "#0f172a",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                  backdropFilter: "blur(20px)",
                }}
              >

                <FaArrowLeft />

              </motion.button>

            </Link>

            <div>

              <p
                style={{
                  color: "#3b82f6",
                  letterSpacing: "3px",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              >
                ACCOUNT SETTINGS
              </p>

              <h1
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  fontSize: "58px",
                  lineHeight: 1,
                }}
              >
                Edit Profile
              </h1>

            </div>

          </div>

          {/* SAVE BUTTON */}
          <motion.button
          onClick={saveProfile}
            whileHover={{
              y: -4,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.96,
            }}
            style={{
              padding: "18px 34px",
              borderRadius: "20px",
              border: "none",
              background:
                "linear-gradient(135deg,#2563eb,#3b82f6)",
              color: "white",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              boxShadow:
                "0 0 40px rgba(37,99,235,0.35)",
            }}
          >

            <FaSave />

            Save Changes

          </motion.button>

        </div>

        {/* MAIN GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "420px 1fr",
            gap: "30px",
          }}
        >

          {/* LEFT CARD */}
          <div
            style={{
              padding: "40px",
              borderRadius: "36px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
              height: "fit-content",
            }}
          >

            {/* PROFILE IMAGE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >

              <div
                style={{
                  position: "relative",
                  marginBottom: "28px",
                }}
              >

                <div
                  style={{
                    width: "170px",
                    height: "170px",
                    borderRadius: "40px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow:
                      "0 0 60px rgba(37,99,235,0.35)",
                  }}
                >

                  <FaUser
                    style={{
                      color: "white",
                      fontSize: "64px",
                    }}
                  />

                </div>

                {/* CAMERA BUTTON */}
                <motion.button
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  style={{
                    position: "absolute",
                    right: "-5px",
                    bottom: "-5px",
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    border: "none",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "18px",
                    boxShadow:
                      "0 0 30px rgba(37,99,235,0.35)",
                  }}
                >

                  <FaCamera />

                </motion.button>

              </div>

              <h2
                style={{
                  color: darkMode ? "white" : "#0f172a",
                  fontSize: "34px",
                  marginBottom: "10px",
                }}
              >
                {user.name}
               
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "17px",
                  marginBottom: "35px",
                }}
              >
                {user.accountType}
               
              </p>

            </div>

            {/* QUICK STATS */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >

              {[
                {
                  icon: <FaCar />,
                  title: "Total Trips",
                  value: "148",
                },
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Cities Covered",
                  value: "12",
                },
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    padding: "22px",
                    borderRadius: "24px",
                    background: "rgba(255,255,255,0.03)",
                    border:
                      "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >

                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "18px",
                      background:
                        "rgba(37,99,235,0.15)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#3b82f6",
                      fontSize: "22px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <div>

                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </p>

                    <h3
                      style={{
                        color: darkMode
                          ? "white"
                          : "#0f172a",
                        fontSize: "28px",
                      }}
                    >
                      {item.value}
                    </h3>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT FORM */}
          <div
            style={{
              padding: "40px",
              borderRadius: "36px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >

            <h2
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "34px",
                marginBottom: "40px",
              }}
            >
              Personal Information
            </h2>

            {/* FORM GRID */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gap: "28px",
              }}
            >

              {/* FULL NAME */}
              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "14px",
                  }}
                >
                  Full Name
                </p>

                <input
                  type="text"
                  name = "name"
                  value = {user.name}
                  onChange={handleChange}
                  style={inputStyle}
                />

              </div>

              {/* EMAIL */}
              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "14px",
                  }}
                >
                  Email Address
                </p>

                <input
                  type="email"
                  name = "email"
                  value = {user.email}
                  style={inputStyle}
                  onChange={handleChange}
                />

              </div>

              {/* PHONE */}
              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "14px",
                  }}
                >
                  Phone Number
                </p>

                <input
                  type="text"
                  name = "phone"
                  value = {user.phone}
                  style={inputStyle}
                  onChange={handleChange}
                />

              </div>

              {/* LOCATION */}
              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "14px",
                  }}
                >
                  Location
                </p>

                <input
                  type="text"
                  name = "location"
                  value = {user.location}
                  style={inputStyle}
                  onChange={handleChange}
                />

              </div>

              {/* ACCOUNT TYPE */}
              <div>

                <p
                  style={{
                    color: "#cbd5e1",
                    marginBottom: "14px",
                  }}
                >
                  Account Type
                </p>

                <select
                  style={inputStyle}
                  name="accountType"
                  onChange={handleChange}
                  value = {user.accountType}
                >

                  <option>Rider</option>
                  <option>Driver</option>
                  <option>Rider + Driver</option>

                </select>

              </div>

            </div>

            {/* BIO */}
            <div
              style={{
                marginTop: "34px",
              }}
            >

              <p
                style={{
                  color: "#cbd5e1",
                  marginBottom: "14px",
                }}
              >
                Bio
              </p>

              <textarea
                rows="6"
                value = {user.bio}
                name = "bio"
                style={{
                  ...inputStyle,
                  resize: "none",
                  lineHeight: "1.8",
                }}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

      </motion.div>

    </div>

  )
}

export default EditProfile
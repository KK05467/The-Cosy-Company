// /components/EditProfile.jsx
//
// PATH NOTE: App.jsx imports this from "../components/EditProfile", the
// same root-level /components/ location as LoginForm.jsx and
// SignupForm.jsx — not src/pages/. The tokens import below follows that
// same "../src/styles/tokens" pattern. If this file actually lives inside
// src/, change the import back to "../styles/tokens".
//
// REDESIGN NOTES (visual only — handleChange, handleImageUpload's actual
// upload call, and saveProfile's actual save call are unchanged):
// - Replaced the glow blob + glass cards with the manifest-row form
//   pattern from DriverCreateRide.jsx (label left, hairline-rule rows)
//   for Personal Information, and a clean ticket-stub card for the left
//   profile panel.
//
// BUG FIXES (functional, not just visual):
// - fetchProfile previously only console.logged on failure, leaving the
//   form silently empty with no indication anything went wrong. Combined
//   with no validation on save, a user could hit "Save Changes" on a
//   blank form and overwrite their real profile with empty strings. Added
//   a visible load-error state that disables the form (not just the save
//   button) until the profile actually loads.
// - Added a `uploading` state so the camera/upload button disables while
//   a request is in flight — previously nothing stopped someone from
//   firing multiple simultaneous uploads.
// - saveProfile now validates name/email aren't empty before sending.
// - Replaced hardcoded http://localhost:5000 with the same API_BASE
//   pattern used across the rest of the project.
// - Surfaced real error messages instead of generic alerts where the
//   server provides one.

import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function EditProfile({ darkMode }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    accountType: "",
    bio: "",
    profilePicture: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  const fileInputRef = useRef(null);
  const s = surface(darkMode);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API_BASE}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setProfileLoaded(true);
      } catch (err) {
        console.log(err);
        // CHANGE: previously silent — the form would just sit empty with
        // no indication the load failed, and saving over it could wipe a
        // real profile. Now surfaced visibly and the form stays disabled.
        setLoadError("Couldn't load your profile. Please refresh or try again.");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_BASE}/api/auth/upload-profile-picture`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prev) => ({ ...prev, profilePicture: res.data.profilePicture }));
    } catch (err) {
      console.log(err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    setSaveError("");

    // CHANGE: don't let an empty/never-loaded form get saved over a real
    // profile.
    if (!user.name.trim() || !user.email.trim()) {
      setSaveError("Name and email can't be empty.");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      await axios.put(
        `${API_BASE}/api/auth/profile`,
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
          accountType: user.accountType,
          bio: user.bio,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully.");
    } catch (err) {
      console.log(err);
      setSaveError(err?.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: s.text,
    fontFamily: fonts.body,
    fontSize: "15px",
    textAlign: "right",
    padding: 0,
  };

  const row = (label, field, isLast) => (
    <div
      key={label}
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        alignItems: "center",
        gap: "20px",
        padding: "20px 0",
        borderBottom: isLast ? "none" : `1px solid ${s.line}`,
      }}
    >
      <label
        style={{
          fontFamily: fonts.mono,
          fontSize: "12px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: s.textMuted,
        }}
      >
        {label}
      </label>
      {field}
    </div>
  );

  const disabled = !profileLoaded;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 100px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "12px",
                  border: `1px solid ${s.line}`,
                  background: s.bgSoft,
                  color: s.text,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "16px",
                }}
              >
                <FaArrowLeft />
              </motion.button>
            </Link>

            <div>
              <p
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "11px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: s.accent,
                  marginBottom: "10px",
                }}
              >
                Account settings
              </p>
              <h1
                style={{
                  fontFamily: fonts.display,
                  color: s.text,
                  fontSize: "40px",
                  fontWeight: "600",
                  letterSpacing: "-1px",
                  margin: 0,
                }}
              >
                Edit profile
              </h1>
            </div>
          </div>

          <motion.button
            onClick={saveProfile}
            whileHover={{ y: loading || disabled ? 0 : -2 }}
            whileTap={{ scale: loading || disabled ? 1 : 0.97 }}
            disabled={loading || disabled}
            style={{
              padding: "15px 28px",
              borderRadius: "12px",
              border: "none",
              background:
                loading || disabled
                  ? s.line
                  : darkMode
                    ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                    : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
              color: loading || disabled ? s.textMuted : darkMode ? colors.ink : "#fff",
              cursor: loading || disabled ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: fonts.body,
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaSave size={14} />
            {loading ? "Saving..." : "Save changes"}
          </motion.button>
        </div>

        {loadError && (
          <p
            style={{
              color: colors.rust,
              fontSize: "14px",
              marginBottom: "24px",
              padding: "14px 18px",
              borderRadius: "12px",
              background: darkMode ? "rgba(168,69,47,0.1)" : "rgba(168,69,47,0.06)",
              border: `1px solid ${darkMode ? "rgba(168,69,47,0.3)" : "rgba(168,69,47,0.2)"}`,
            }}
          >
            {loadError}
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "24px" }}>
          {/* LEFT — profile card */}
          <div
            style={{
              padding: "36px",
              borderRadius: "22px",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
              height: "fit-content",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "relative", marginBottom: "24px" }}>
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt=""
                    style={{ width: "144px", height: "144px", objectFit: "cover", borderRadius: "20px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "144px",
                      height: "144px",
                      borderRadius: "20px",
                      background: s.bg,
                      border: `1px solid ${s.line}`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaUser style={{ color: s.textMuted, fontSize: "50px" }} />
                  </div>
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />

                <motion.button
                  whileHover={{ scale: uploading ? 1 : 1.06 }}
                  whileTap={{ scale: uploading ? 1 : 0.94 }}
                  disabled={uploading}
                  onClick={() => fileInputRef.current.click()}
                  style={{
                    position: "absolute",
                    right: "-6px",
                    bottom: "-6px",
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    border: "none",
                    background: uploading
                      ? s.line
                      : darkMode
                        ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                        : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                    color: darkMode ? colors.ink : "#fff",
                    cursor: uploading ? "not-allowed" : "pointer",
                    fontSize: "14px",
                  }}
                >
                  <FaCamera />
                </motion.button>
              </div>

              <h2
                style={{
                  fontFamily: fonts.display,
                  color: s.text,
                  fontSize: "26px",
                  fontWeight: "600",
                  marginBottom: "6px",
                  textAlign: "center",
                }}
              >
                {user.name || "—"}
              </h2>
              <p style={{ color: s.textMuted, fontSize: "14px", marginBottom: "28px" }}>
                {user.accountType || "Account type not set"}
              </p>
            </div>

            {/* QUICK STATS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: <FaCar />, title: "Total trips", value: "148" },
                { icon: <FaMapMarkerAlt />, title: "Cities covered", value: "12" },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    padding: "16px",
                    borderRadius: "14px",
                    background: s.bg,
                    border: `1px solid ${s.line}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "10px",
                      background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(31,77,58,0.08)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: s.accent,
                      fontSize: "16px",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: s.textMuted, fontSize: "12.5px", marginBottom: "3px" }}>{item.title}</p>
                    <h3 style={{ color: s.text, fontSize: "20px", fontFamily: fonts.display, margin: 0 }}>
                      {item.value}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — manifest form */}
          <div
            style={{
              padding: "36px",
              borderRadius: "22px",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
              opacity: disabled ? 0.5 : 1,
              pointerEvents: disabled ? "none" : "auto",
            }}
          >
            <h2
              style={{
                fontFamily: fonts.display,
                color: s.text,
                fontSize: "26px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Personal information
            </h2>
            {disabled && (
              <p style={{ color: s.textMuted, fontSize: "13.5px", marginBottom: "20px" }}>
                Form is locked until your profile loads.
              </p>
            )}

            <div style={{ marginTop: "16px" }}>
              {row(
                "Full name",
                <input name="name" value={user.name} onChange={handleChange} style={fieldStyle} />
              )}
              {row(
                "Email",
                <input name="email" value={user.email} onChange={handleChange} style={fieldStyle} />
              )}
              {row(
                "Phone",
                <input name="phone" value={user.phone} onChange={handleChange} style={fieldStyle} />
              )}
              {row(
                "Location",
                <input name="location" value={user.location} onChange={handleChange} style={fieldStyle} />
              )}
              {row(
                "Account type",
                <select
                  name="accountType"
                  value={user.accountType}
                  onChange={handleChange}
                  style={{ ...fieldStyle, cursor: "pointer" }}
                >
                  <option>Rider</option>
                  <option>Driver</option>
                  <option>Rider + Driver</option>
                </select>,
                true
              )}
            </div>

            <div style={{ marginTop: "28px" }}>
              <p
                style={{
                  fontFamily: fonts.mono,
                  fontSize: "12px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  color: s.textMuted,
                  marginBottom: "12px",
                }}
              >
                Bio
              </p>
              <textarea
                rows="5"
                name="bio"
                value={user.bio}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: "12px",
                  border: `1px solid ${s.line}`,
                  background: s.bg,
                  color: s.text,
                  fontFamily: fonts.body,
                  fontSize: "14.5px",
                  resize: "none",
                  outline: "none",
                  lineHeight: "1.7",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {saveError && (
              <p style={{ color: colors.rust, fontSize: "13.5px", marginTop: "18px" }}>{saveError}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

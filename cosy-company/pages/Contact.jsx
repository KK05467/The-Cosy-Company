// src/pages/Contact.jsx
//
// REDESIGN NOTES:
// - Dropped the dual blurred glow blobs and glass cards for the same flat
//   ink/paper ticket system used across Home/SearchRides/Footer.
// - Contact details are now a manifest list (mono label, hairline rows)
//   inside the ticket's left stub; the message form is the right stub,
//   divided by the same perforation motif.
// - Added a small "before you write in" link row pointing at Help/Safety —
//   ASSUMPTION: I'm guessing these routes are /help and /safety based on
//   common conventions and the Footer links I built earlier ("Help center",
//   "Safety standards"). If your actual routes differ, just change the two
//   `navigate(...)` calls near the bottom of the contact-details column.
//
// BUG FIXES (functional, not just visual):
// - Submit button now actually disables while loading — previously you
//   could double-click and fire two POSTs.
// - Added minimal required-field validation before hitting the network at
//   all, so empty submissions don't round-trip to the server for no reason.
// - Wrapped res.json() in its own try/catch — previously a non-JSON error
//   response (502, proxy error, etc.) would throw inside the try block in a
//   way that masked the real failure reason.
// - Replaced hardcoded http://localhost:5000 with the same API_BASE pattern
//   used in Bookings.jsx / DriverMyRides.jsx / DriverCreateRide.jsx.

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function Contact({ darkMode }) {
  const navigate = useNavigate();
  const s = surface(darkMode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async () => {
    setFormError("");

    // CHANGE: validate before making a network call at all.
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError("Name, email, and message are required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/contact/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, rating }),
      });

      // CHANGE: don't assume the error body is JSON.
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.message || `Could not send message (status ${res.status}).`);
      }

      alert("Message sent. We'll get back to you shortly.");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setRating(5);
    } catch (err) {
      setFormError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldStyle = {
    width: "100%",
    padding: "13px 16px",
    marginBottom: "14px",
    borderRadius: "12px",
    border: `1px solid ${s.line}`,
    background: s.bgSoft,
    color: s.text,
    fontFamily: fonts.body,
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const contactRows = [
    { icon: <FaEnvelope />, label: "Email", value: "keertanreads@gmail.com" },
    { icon: <FaPhone />, label: "Phone", value: "+91 79055 14564" },
    { icon: <FaMapMarkerAlt />, label: "Office", value: "Bhubaneswar, Odisha, India" },
    { icon: <FaClock />, label: "Hours", value: "Mon – Sat, 9:00 AM – 8:00 PM" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 100px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "60px" }}
        >
          <p
            style={{
              fontFamily: fonts.mono,
              fontSize: "13px",
              letterSpacing: "2.5px",
              color: s.accent,
              marginBottom: "20px",
              textTransform: "uppercase",
            }}
          >
            GET IN TOUCH
          </p>

          <h1
            style={{
              fontFamily: fonts.display,
              fontSize: "58px",
              fontWeight: "600",
              letterSpacing: "-1.5px",
              color: s.text,
              marginBottom: "18px",
            }}
          >
            Talk to Cosy.
          </h1>

          <p style={{ color: s.textMuted, fontSize: "17px", maxWidth: "560px", margin: "0 auto", lineHeight: "1.7" }}>
            Questions, feedback, or a partnership idea — write in and a real
            person on our team will reply.
          </p>
        </motion.div>

        {/* TICKET — details stub | perforation | form stub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          style={{
            display: "flex",
            background: s.bgSoft,
            border: `1px solid ${s.line}`,
            borderRadius: "22px",
            overflow: "hidden",
          }}
        >
          {/* LEFT STUB — contact manifest */}
          <div style={{ flex: "0 0 360px", padding: "40px" }}>
            <p
              style={{
                fontFamily: fonts.mono,
                fontSize: "11px",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: s.textMuted,
                marginBottom: "24px",
              }}
            >
              Reach us directly
            </p>

            {contactRows.map((item, i) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                  padding: "18px 0",
                  borderBottom: i < contactRows.length - 1 ? `1px solid ${s.line}` : "none",
                }}
              >
                <div style={{ color: s.accent, fontSize: "16px", marginTop: "2px" }}>{item.icon}</div>
                <div>
                  <p style={{ color: s.textMuted, fontSize: "12.5px", marginBottom: "4px" }}>{item.label}</p>
                  <p style={{ color: s.text, fontSize: "15px", fontWeight: "600", margin: 0 }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* CHANGE: links into the rest of the site — adjust paths if
                /help or /safety aren't your real route names. */}
            <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => navigate("/help")}
                style={{
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: s.accent,
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Looking for help instead? Visit the help center →
              </button>
              <button
                onClick={() => navigate("/safety")}
                style={{
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: s.textMuted,
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Report a safety concern →
              </button>
            </div>
          </div>

          {/* PERFORATION */}
          <div style={{ position: "relative", width: "1px", background: s.line, flex: "0 0 auto" }}>
            <div style={{ position: "absolute", top: "-9px", left: "-9px", width: "18px", height: "18px", borderRadius: "50%", background: s.bg }} />
            <div style={{ position: "absolute", bottom: "-9px", left: "-9px", width: "18px", height: "18px", borderRadius: "50%", background: s.bg }} />
          </div>

          {/* RIGHT STUB — form */}
          <div style={{ flex: "1 1 auto", padding: "40px" }}>
            <h2
              style={{
                fontFamily: fonts.display,
                fontSize: "26px",
                fontWeight: "600",
                color: s.text,
                marginBottom: "22px",
              }}
            >
              Send a message
            </h2>

            <input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={fieldStyle}
            />

            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={fieldStyle}
            />

            <input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={fieldStyle}
            />

            {/* RATING */}
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontFamily: fonts.mono, fontSize: "11.5px", letterSpacing: "1px", textTransform: "uppercase", color: s.textMuted, marginBottom: "10px" }}>
                How would you rate Cosy?
              </p>
              <div style={{ display: "flex", gap: "6px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} out of 5`}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontSize: "20px",
                      lineHeight: 1,
                      color: star <= rating ? colors.gold : s.line,
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <textarea
              rows="5"
              placeholder="Your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...fieldStyle, resize: "none" }}
            />

            {formError && (
              <p style={{ color: colors.rust, fontSize: "13.5px", marginBottom: "14px" }}>{formError}</p>
            )}

            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              whileHover={{ y: loading ? 0 : -2 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                padding: "15px 28px",
                borderRadius: "12px",
                border: "none",
                background: loading
                  ? s.line
                  : darkMode
                    ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                    : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                color: loading ? s.textMuted : darkMode ? colors.ink : "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                fontSize: "14.5px",
                fontWeight: "700",
                fontFamily: fonts.body,
              }}
            >
              <FaPaperPlane size={13} />
              {loading ? "Sending..." : "Send message"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Contact;

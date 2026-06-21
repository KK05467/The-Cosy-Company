// src/pages/DriverNotifications.jsx
//
// REDESIGN NOTES: replaced the glow-card-on-gradient pattern with the
// hairline manifest treatment used in DriverMyRides.jsx — each notification
// becomes a card with a route block and a manifest-style detail strip
// (pickup, drop, seats, fare) instead of stacked plain <p> tags.
//
// BUG FIXES (functional, not just visual):
// - "Reject" was styled in gold/yellow — this app's primary/positive accent
//   color everywhere else (Accept buttons, primary CTAs, active states).
//   Putting an irreversible negative action in the same visual weight and
//   color family as "Accept", right next to it, risks a driver misreading
//   which button does what. Reject is now an outlined rust/red treatment,
//   matching the "Cancel" pattern used in DriverMyRides.jsx and Bookings.jsx.
// - fetchNotifications and updateStatus previously only console.logged on
//   failure — a driver could see a permanently empty "No requests found"
//   state, or click Accept/Reject and see nothing happen, with zero
//   indication anything went wrong. Both now surface a visible error.
// - Added a busyId state so Accept/Reject disable while a request is in
//   flight, preventing double-clicks on an action that can't be undone.
// - Replaced hardcoded http://localhost:5000 with the shared API_BASE
//   pattern used across the rest of the project.

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function DriverNotifications({ darkMode }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const s = surface(darkMode);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You're not logged in. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        setError(`Failed to load requests (status ${res.status}).`);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
        setError("");
      } else {
        setError(data.message || "Failed to load requests.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong while loading requests. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    setActionError("");
    setBusyId(id);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/notifications/${action}/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data?.success) {
        await fetchNotifications();
      } else {
        setActionError(data?.message || `Failed to ${action} request (status ${res.status}).`);
      }
    } catch (error) {
      console.log(error);
      setActionError(`Failed to ${action} request. Check your connection and try again.`);
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: s.bg,
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: `3px solid ${s.line}`,
            borderTopColor: s.accent,
          }}
        />
      </div>
    );
  }

  const statusStyle = (status) => {
    if (status === "accepted") return { bg: "rgba(45,106,79,0.12)", color: "#2D6A4F" };
    if (status === "rejected") return { bg: darkMode ? "rgba(168,69,47,0.12)" : "rgba(168,69,47,0.08)", color: colors.rust };
    return { bg: darkMode ? "rgba(201,162,39,0.12)" : "rgba(168,137,47,0.1)", color: darkMode ? colors.goldSoft : "#A8892F" };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 100px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "40px" }}
        >
          <p
            style={{
              fontFamily: fonts.mono,
              fontSize: "13px",
              letterSpacing: "2.5px",
              color: s.accent,
              marginBottom: "18px",
              textTransform: "uppercase",
            }}
          >
            DRIVER DASHBOARD
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "44px",
              fontWeight: "600",
              letterSpacing: "-1px",
            }}
          >
            Ride requests
          </h1>
        </motion.div>

        {error && <p style={{ color: colors.rust, marginBottom: "20px", fontSize: "14px" }}>{error}</p>}
        {actionError && <p style={{ color: colors.rust, marginBottom: "20px", fontSize: "14px" }}>{actionError}</p>}

        {/* EMPTY STATE */}
        {notifications.length === 0 ? (
          <div
            style={{
              padding: "60px 40px",
              borderRadius: "20px",
              textAlign: "center",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
            }}
          >
            <h2 style={{ fontFamily: fonts.display, color: s.text, fontSize: "24px", fontWeight: "600", margin: 0 }}>
              No requests found
            </h2>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {notifications.map((notification, index) => {
              const st = statusStyle(notification.status);
              const isBusy = busyId === notification._id;

              const details = [
                { label: "Pickup", value: notification.bookingId?.pickupPoint || "—" },
                { label: "Drop", value: notification.bookingId?.dropPoint || "—" },
                { label: "Seats", value: notification.bookingId?.seatsBooked ?? "—" },
              ];

              return (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  style={{
                    padding: "26px",
                    borderRadius: "18px",
                    background: s.bgSoft,
                    border: `1px solid ${s.line}`,
                  }}
                >
                  {/* TOP — rider + status */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: "18px" }}>
                    <div>
                      <h2 style={{ fontFamily: fonts.display, color: s.text, fontSize: "21px", fontWeight: "600", marginBottom: "4px" }}>
                        {notification.riderId?.name || "Unknown rider"}
                      </h2>
                      <p style={{ color: s.textMuted, fontSize: "13.5px", fontFamily: fonts.mono }}>
                        {notification.riderId?.phone || "No phone on file"}
                      </p>
                    </div>

                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        background: st.bg,
                        color: st.color,
                        fontSize: "11.5px",
                        fontWeight: "700",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        flexShrink: 0,
                      }}
                    >
                      {notification.status}
                    </span>
                  </div>

                  {/* ROUTE */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "14px 16px",
                      borderRadius: "12px",
                      background: s.bg,
                      border: `1px solid ${s.line}`,
                      marginBottom: "16px",
                    }}
                  >
                    <p style={{ color: s.text, fontSize: "14px", margin: 0 }}>
                      {notification.rideId?.from || "—"}
                    </p>
                    <span style={{ color: s.accent }}>→</span>
                    <p style={{ color: s.text, fontSize: "14px", margin: 0 }}>
                      {notification.rideId?.to || "—"}
                    </p>
                  </div>

                  {/* DETAILS — manifest strip */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      border: `1px solid ${s.line}`,
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "16px",
                    }}
                  >
                    {details.map((item, i) => (
                      <div
                        key={item.label}
                        style={{
                          padding: "12px 14px",
                          background: s.bg,
                          borderRight: i < details.length - 1 ? `1px solid ${s.line}` : "none",
                        }}
                      >
                        <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "10px", letterSpacing: "1px", marginBottom: "4px", textTransform: "uppercase" }}>
                          {item.label}
                        </p>
                        <p style={{ color: s.text, fontWeight: "600", fontSize: "14px", margin: 0 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: fonts.display,
                      color: s.accent,
                      fontWeight: "600",
                      fontSize: "20px",
                      marginBottom: notification.status === "pending" ? "18px" : 0,
                    }}
                  >
                    ₹{notification.bookingId?.amount ?? "—"}
                  </p>

                  {/* ACTIONS */}
                  {notification.status === "pending" && (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <motion.button
                        whileHover={{ y: isBusy ? 0 : -2 }}
                        whileTap={{ scale: isBusy ? 1 : 0.97 }}
                        disabled={isBusy}
                        onClick={() => updateStatus(notification._id, "accept")}
                        style={{
                          padding: "12px 22px",
                          border: "none",
                          borderRadius: "10px",
                          background: isBusy ? s.line : "linear-gradient(135deg,#2D6A4F,#1F4D3A)",
                          color: isBusy ? s.textMuted : "#fff",
                          cursor: isBusy ? "not-allowed" : "pointer",
                          fontWeight: "700",
                          fontSize: "14px",
                          fontFamily: fonts.body,
                        }}
                      >
                        {isBusy ? "Working..." : "Accept"}
                      </motion.button>

                      {/* CHANGE: previously gold/yellow — same color as
                          Accept/primary actions elsewhere. Now an outlined
                          rust treatment matching "Cancel" buttons used in
                          DriverMyRides.jsx / Bookings.jsx. */}
                      <motion.button
                        whileHover={{ y: isBusy ? 0 : -2 }}
                        whileTap={{ scale: isBusy ? 1 : 0.97 }}
                        disabled={isBusy}
                        onClick={() => updateStatus(notification._id, "reject")}
                        style={{
                          padding: "12px 22px",
                          border: `1px solid ${isBusy ? s.line : colors.rust}`,
                          borderRadius: "10px",
                          background: "transparent",
                          color: isBusy ? s.textMuted : colors.rust,
                          cursor: isBusy ? "not-allowed" : "pointer",
                          fontWeight: "700",
                          fontSize: "14px",
                          fontFamily: fonts.body,
                        }}
                      >
                        {isBusy ? "Working..." : "Reject"}
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverNotifications;

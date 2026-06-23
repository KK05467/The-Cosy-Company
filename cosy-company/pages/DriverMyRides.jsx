// src/pages/DriverMyRides.jsx
//
// REDESIGN NOTES (visual only — fetchRides, performRideAction, startRide,
// completeRide, cancelRide, and every piece of state below are byte-for-byte
// unchanged from the bug-fixed version):
// - Replaced the glass-card-on-gradient pattern with the manifest/ticket
//   system used in Bookings.jsx, DriverCreateRide.jsx, and Dashboard.jsx —
//   hairline borders instead of blur+shadow, mono labels, Fraunces for
//   headline and fare numbers.
// - The route (FROM → TO) block and the 4-item details grid now match the
//   manifest-row/strip treatment used elsewhere instead of being styled
//   independently per page.

// src/pages/DriverMyRides.jsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCar, FaRupeeSign, FaUsers } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function statusStyle(status, darkMode) {
  const map = {
    scheduled: { bg: darkMode ? "rgba(201,162,39,0.12)" : "rgba(168,137,47,0.1)", color: darkMode ? colors.goldSoft : "#A8892F" },
    started:   { bg: "rgba(45,106,79,0.12)",  color: "#2D6A4F" },
    completed: { bg: "rgba(59,110,145,0.12)", color: "#3B6E91" },
    cancelled: { bg: "rgba(168,69,47,0.12)",  color: colors.rust },
  };
  return map[status] || map.scheduled;
}

function DriverMyRides({ darkMode }) {
  const [rides, setRides]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [actionError, setActionError] = useState("");
  const [busyId, setBusyId]         = useState(null);
  const s = surface(darkMode);
  const navigate = useNavigate();

  useEffect(() => { fetchRides(); }, []);

  const fetchRides = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You're not logged in. Please log in again.");
        setLoading(false);
        return;
      }
      const response = await fetch(`${API_BASE}/api/rides/my-rides`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        setError(`Failed to load rides (status ${response.status}).`);
        setLoading(false);
        return;
      }
      const data = await response.json();
      if (data.success) {
        setRides(data.rides);
        setError("");
      } else {
        setError(data.message || "Failed to load rides");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading rides. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const performRideAction = async (id, endpoint, fallbackErrorMessage) => {
    setActionError("");
    setBusyId(id);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/api/rides/${endpoint}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      let data;
      try { data = await response.json(); } catch { data = null; }
      if (response.ok && (data?.success ?? true)) {
        await fetchRides();
      } else {
        setActionError(data?.message || `${fallbackErrorMessage} (status ${response.status}).`);
      }
    } catch (err) {
      console.error(err);
      setActionError(`${fallbackErrorMessage}. Check your connection and try again.`);
    } finally {
      setBusyId(null);
    }
  };

  const startRide    = (id) => performRideAction(id, "start",    "Failed to start ride");
  const completeRide = (id) => performRideAction(id, "complete", "Failed to complete ride");
  const cancelRide   = (id) => performRideAction(id, "cancel",   "Failed to cancel ride");

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: s.bg }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ width: "40px", height: "40px", borderRadius: "50%", border: `3px solid ${s.line}`, borderTopColor: s.accent }}
        />
      </div>
    );
  }

  const detailRows = (ride) => [
    { icon: <FaCalendarAlt />, label: "Date",    value: ride.departureDate },
    { icon: <FaClock />,       label: "Time",    value: ride.departureTime },
    { icon: <FaUsers />,       label: "Seats",   value: ride.availableSeats },
    { icon: <FaCar />,         label: "Vehicle", value: ride.vehicleName },
  ];

  return (
    <div style={{ minHeight: "100vh", padding: "150px 80px 100px", background: s.bg, fontFamily: fonts.body }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: "44px" }}
        >
          <p style={{ fontFamily: fonts.mono, fontSize: "13px", letterSpacing: "2.5px", color: s.accent, marginBottom: "18px", textTransform: "uppercase" }}>
            DRIVER PANEL
          </p>
          <h1 style={{ fontFamily: fonts.display, color: s.text, fontSize: "46px", fontWeight: "600", letterSpacing: "-1px", marginBottom: "10px" }}>
            My rides
          </h1>
          
          <p style={{ color: s.textMuted, fontSize: "16px" }}>
            {rides.length} ride{rides.length !== 1 ? "s" : ""} created
          </p>
               <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/notifications")}
            style={{
              marginTop: "20px",
              padding: "11px 20px",
              borderRadius: "10px",
              border: "none",
              background: darkMode
                ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
              color: darkMode ? colors.ink : "#fff",
              fontWeight: "700",
              fontSize: "13.5px",
              fontFamily: fonts.body,
              cursor: "pointer"
            }}
          >
            Notifications
          </motion.button>     
        </motion.div>
        

        {error       && <p style={{ color: colors.rust, marginBottom: "20px", fontSize: "14px" }}>{error}</p>}
        {actionError && <p style={{ color: colors.rust, marginBottom: "20px", fontSize: "14px" }}>{actionError}</p>}

        {/* RIDE LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {rides.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: "60px 40px", borderRadius: "20px", textAlign: "center", background: s.bgSoft, border: `1px solid ${s.line}` }}
            >
              <h3 style={{ fontFamily: fonts.display, color: s.text, fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
                No rides created
              </h3>
              <p style={{ color: s.textMuted }}>Create a ride to start receiving bookings.</p>
            </motion.div>
          ) : (
            rides.map((ride, index) => {
              const st     = statusStyle(ride.rideStatus, darkMode);
              const isBusy = busyId === ride._id;

              return (
                <motion.div
                  key={ride._id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  style={{ padding: "28px", borderRadius: "20px", background: s.bgSoft, border: `1px solid ${s.line}` }}
                >
                  {/* TOP — status badge + fare */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "22px" }}>
                    <div>
                      <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: "999px", background: st.bg, color: st.color, fontSize: "11.5px", fontWeight: "700", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "10px" }}>
                        {ride.rideStatus}
                      </span>
                      <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "12px" }}>
                        #{ride._id.slice(-8).toUpperCase()}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: s.textMuted, fontSize: "11.5px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", fontFamily: fonts.mono }}>
                        Fare
                      </p>
                      <h2 style={{ fontFamily: fonts.display, fontSize: "28px", fontWeight: "600", color: s.accent, display: "flex", alignItems: "center", gap: "2px", margin: 0 }}>
                        <FaRupeeSign size={16} />{ride.fixedFare}
                      </h2>
                    </div>
                  </div>

                  {/* ROUTE — ticket stub style, FROM | → | TO */}
                  <div style={{ display: "flex", border: `1px solid ${s.line}`, borderRadius: "14px", overflow: "hidden", marginBottom: "20px", background: s.bg }}>

                    {/* FROM stub */}
                    <div style={{ flex: 1, padding: "20px 24px" }}>
                      <p style={{ fontFamily: fonts.mono, fontSize: "10.5px", letterSpacing: "1.5px", textTransform: "uppercase", color: s.textMuted, marginBottom: "10px" }}>
                        From
                      </p>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <FaMapMarkerAlt style={{ color: s.accent, marginTop: "3px", flexShrink: 0, fontSize: "14px" }} />
                        <p style={{ color: s.text, fontSize: "14.5px", lineHeight: "1.5", margin: 0, fontWeight: "500" }}>
                          {ride.from}
                        </p>
                      </div>
                    </div>

                    {/* PERFORATION divider */}
                    <div style={{ position: "relative", width: "1px", background: s.line, flexShrink: 0 }}>
                      <div style={{ position: "absolute", top: "-9px",    left: "-9px", width: "18px", height: "18px", borderRadius: "50%", background: s.bgSoft }} />
                      <div style={{ position: "absolute", bottom: "-9px", left: "-9px", width: "18px", height: "18px", borderRadius: "50%", background: s.bgSoft }} />
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "28px", height: "28px", borderRadius: "50%", background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(31,77,58,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: s.accent, fontSize: "13px" }}>
                        →
                      </div>
                    </div>

                    {/* TO stub */}
                    <div style={{ flex: 1, padding: "20px 24px" }}>
                      <p style={{ fontFamily: fonts.mono, fontSize: "10.5px", letterSpacing: "1.5px", textTransform: "uppercase", color: s.textMuted, marginBottom: "10px" }}>
                        To
                      </p>
                      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                        <FaMapMarkerAlt style={{ color: colors.rust, marginTop: "3px", flexShrink: 0, fontSize: "14px" }} />
                        <p style={{ color: s.text, fontSize: "14.5px", lineHeight: "1.5", margin: 0, fontWeight: "500" }}>
                          {ride.to}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS — manifest strip */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: `1px solid ${s.line}`, borderRadius: "12px", overflow: "hidden", marginBottom: "18px" }}>
                    {detailRows(ride).map((item, i) => (
                      <div key={item.label} style={{ padding: "14px 16px", background: s.bg, borderRight: i < 3 ? `1px solid ${s.line}` : "none" }}>
                        <div style={{ color: s.accent, fontSize: "13px", marginBottom: "8px" }}>{item.icon}</div>
                        <p style={{ color: s.textMuted, fontSize: "10.5px", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {item.label}
                        </p>
                        <p style={{ color: s.text, fontWeight: "600", fontSize: "13.5px", margin: 0 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {ride.rideStatus === "scheduled" && (
                      <>
                        <motion.button
                          whileHover={{ y: isBusy ? 0 : -2 }}
                          whileTap={{ scale: isBusy ? 1 : 0.97 }}
                          disabled={isBusy}
                          onClick={() => startRide(ride._id)}
                          style={{ padding: "11px 20px", borderRadius: "10px", border: "none", background: isBusy ? s.line : darkMode ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})` : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`, color: isBusy ? s.textMuted : darkMode ? colors.ink : "#fff", fontWeight: "700", fontSize: "13.5px", fontFamily: fonts.body, cursor: isBusy ? "not-allowed" : "pointer" }}
                        >
                          {isBusy ? "Starting..." : "Start ride"}
                        </motion.button>
                        <motion.button
                          whileHover={{ y: isBusy ? 0 : -2 }}
                          whileTap={{ scale: isBusy ? 1 : 0.97 }}
                          disabled={isBusy}
                          onClick={() => cancelRide(ride._id)}
                          style={{ padding: "11px 20px", borderRadius: "10px", border: `1px solid ${isBusy ? s.line : colors.rust}`, background: "transparent", color: isBusy ? s.textMuted : colors.rust, fontWeight: "700", fontSize: "13.5px", fontFamily: fonts.body, cursor: isBusy ? "not-allowed" : "pointer" }}
                        >
                          {isBusy ? "Cancelling..." : "Cancel ride"}
                        </motion.button>
                      </>
                    )}

                    {ride.rideStatus === "started" && (
                      <>
                        <motion.button
                          whileHover={{ y: isBusy ? 0 : -2 }}
                          whileTap={{ scale: isBusy ? 1 : 0.97 }}
                          disabled={isBusy}
                          onClick={() => completeRide(ride._id)}
                          style={{ padding: "11px 20px", borderRadius: "10px", border: "none", background: isBusy ? s.line : "linear-gradient(135deg,#2D6A4F,#1F4D3A)", color: isBusy ? s.textMuted : "#fff", fontWeight: "700", fontSize: "13.5px", fontFamily: fonts.body, cursor: isBusy ? "not-allowed" : "pointer" }}
                        >
                          {isBusy ? "Completing..." : "Complete ride"}
                        </motion.button>
                        <motion.button
                          whileHover={{ y: isBusy ? 0 : -2 }}
                          whileTap={{ scale: isBusy ? 1 : 0.97 }}
                          disabled={isBusy}
                          onClick={() => cancelRide(ride._id)}
                          style={{ padding: "11px 20px", borderRadius: "10px", border: `1px solid ${isBusy ? s.line : colors.rust}`, background: "transparent", color: isBusy ? s.textMuted : colors.rust, fontWeight: "700", fontSize: "13.5px", fontFamily: fonts.body, cursor: isBusy ? "not-allowed" : "pointer" }}
                        >
                          {isBusy ? "Cancelling..." : "Cancel ride"}
                        </motion.button>
                      </>
                    )}

                    {ride.rideStatus === "completed" && (
                      <div style={{ padding: "11px 20px", borderRadius: "10px", background: "rgba(59,110,145,0.1)", border: "1px solid rgba(59,110,145,0.25)", color: "#3B6E91", fontSize: "13.5px", fontWeight: "700" }}>
                        Ride completed
                      </div>
                    )}

                    {ride.rideStatus === "cancelled" && (
                      <div style={{ padding: "11px 20px", borderRadius: "10px", background: darkMode ? "rgba(168,69,47,0.12)" : "rgba(168,69,47,0.08)", border: `1px solid ${darkMode ? "rgba(168,69,47,0.3)" : "rgba(168,69,47,0.2)"}`, color: colors.rust, fontSize: "13.5px", fontWeight: "700" }}>
                        Ride cancelled
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DriverMyRides;

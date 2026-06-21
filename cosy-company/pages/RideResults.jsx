// src/pages/RideResults.jsx
//
// FIX from the version you pasted: pickupPoint/dropPoint were defaulting to
// ride.from / ride.to (the driver's own route endpoints), not what the rider
// actually searched for. Now uses the `from`/`to` query params straight from
// the search bar — that's the literal location the rider typed, which is
// what "same as searched location" means.
//
// - Confirm → books using searched from/to + 1 seat → on success, /my-bookings
// - Cancel  → navigate(-1), back to wherever the search came from
// - Each card tracks its own busy/error state independently

import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaUser, FaCar, FaClock } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function RideResults({ darkMode }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const s = surface(darkMode);

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [bookingState, setBookingState] = useState({});

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await fetch(
        `${API_BASE}/api/rides/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
      );
      const data = await response.json();

      if (data.success) {
        setRides(data.rides || []);
      } else {
        setError(data.message || "Could not search rides");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  const confirmRide = async (ride) => {
    setBookingState((prev) => ({ ...prev, [ride._id]: { busy: true, error: "" } }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setBookingState((prev) => ({
          ...prev,
          [ride._id]: { busy: false, error: "You're not logged in. Please log in again." },
        }));
        return;
      }

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rideId: ride._id,
          // Pickup/drop = exactly what the rider searched for, not the
          // driver's full route endpoints.
          pickupPoint: from,
          dropPoint: to,
          seatsBooked: 1,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data?.success) {
        navigate("/my-bookings");
      } else {
        setBookingState((prev) => ({
          ...prev,
          [ride._id]: { busy: false, error: data?.message || `Could not book this ride (status ${res.status}).` },
        }));
      }
    } catch (err) {
      console.error(err);
      setBookingState((prev) => ({
        ...prev,
        [ride._id]: { busy: false, error: "Something went wrong. Check your connection and try again." },
      }));
    }
  };

  const cancelRide = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 60px 90px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "48px" }}
        >
          <p
            style={{
              fontFamily: fonts.mono,
              color: s.accent,
              letterSpacing: "2.5px",
              fontSize: "11px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            AVAILABLE RIDES
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "44px",
              fontWeight: "600",
              marginBottom: "10px",
              letterSpacing: "-1px",
            }}
          >
            {from} → {to}
          </h1>
          <p style={{ color: s.textMuted, fontSize: "16px" }}>
            Verified drivers travelling your route.
          </p>
        </motion.div>

        {/* LOADING */}
        {loading && (
          <p style={{ color: s.textMuted, fontFamily: fonts.mono, fontSize: "13px", letterSpacing: "1px" }}>
            Searching routes...
          </p>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div
            style={{
              padding: "32px",
              borderRadius: "18px",
              background: s.bgSoft,
              border: `1px solid ${colors.rust}33`,
            }}
          >
            <p style={{ color: colors.rust, fontSize: "15px" }}>{error}</p>
          </div>
        )}

        {/* NO RIDES */}
        {!loading && !error && rides.length === 0 && (
          <div
            style={{
              padding: "48px",
              borderRadius: "18px",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
              textAlign: "center",
            }}
          >
            <h2 style={{ fontFamily: fonts.display, color: s.text, fontSize: "26px", marginBottom: "10px" }}>
              No rides found
            </h2>
            <p style={{ color: s.textMuted, fontSize: "15px" }}>
              Try a nearby pickup point or a different time.
            </p>
          </div>
        )}

        {/* RIDE TICKETS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {rides.map((ride, i) => {
            const state = bookingState[ride._id] || { busy: false, error: "" };

            return (
              <motion.div
                key={ride._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                style={{
                  borderRadius: "18px",
                  background: s.bgSoft,
                  border: `1px solid ${s.line}`,
                  overflow: "hidden",
                }}
              >
                {/* TOP — driver + fare */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "26px 30px",
                  }}
                >
                  <div>
                    <h3 style={{ color: s.text, fontSize: "18px", fontWeight: "600", margin: 0, marginBottom: "4px" }}>
                      {ride.driverId?.name || "Driver"}
                    </h3>
                    <p style={{ color: s.textMuted, fontSize: "13px", margin: 0 }}>Verified Driver</p>
                  </div>
                  <h2
                    style={{
                      fontFamily: fonts.display,
                      color: s.accent,
                      fontSize: "30px",
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    ₹{ride.fixedFare}
                  </h2>
                </div>

                {/* PERFORATION */}
                <div style={{ position: "relative", height: "1px", background: s.line, margin: "0 30px" }}>
                  <div style={{ position: "absolute", top: "-9px", left: "-39px", width: "18px", height: "18px", borderRadius: "50%", background: s.bg }} />
                  <div style={{ position: "absolute", top: "-9px", right: "-39px", width: "18px", height: "18px", borderRadius: "50%", background: s.bg }} />
                </div>

                {/* ROUTE — shows what the rider searched for, since that's
                    exactly what will be booked */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto 1fr",
                    gap: "16px",
                    alignItems: "center",
                    padding: "26px 30px",
                  }}
                >
                  <div>
                    <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                      PICKUP
                    </p>
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <FaMapMarkerAlt size={13} style={{ color: s.accent, marginTop: "3px", flexShrink: 0 }} />
                      <p style={{ color: s.text, fontSize: "14.5px", margin: 0, lineHeight: "1.4" }}>{from}</p>
                    </div>
                  </div>

                  <div style={{ color: s.textMuted, fontSize: "18px" }}>→</div>

                  <div>
                    <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "8px" }}>
                      DESTINATION
                    </p>
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                      <FaMapMarkerAlt size={13} style={{ color: colors.rust, marginTop: "3px", flexShrink: 0 }} />
                      <p style={{ color: s.text, fontSize: "14.5px", margin: 0, lineHeight: "1.4" }}>{to}</p>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}
                <div
                  style={{
                    display: "flex",
                    gap: "28px",
                    padding: "0 30px 20px",
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    { icon: <FaCar size={12} />, label: ride.vehicleName },
                    { icon: <FaUser size={12} />, label: `${ride.availableSeats} seats` },
                    { icon: <FaClock size={12} />, label: ride.departureTime },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "7px", color: s.textMuted, fontSize: "13px" }}>
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>

                {state.error && (
                  <p style={{ color: colors.rust, fontSize: "13px", padding: "0 30px 14px", margin: 0 }}>
                    {state.error}
                  </p>
                )}

                {/* CONFIRM / CANCEL */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "20px 30px 26px",
                    borderTop: `1px solid ${s.line}`,
                  }}
                >
                  <motion.button
                    whileHover={{ y: state.busy ? 0 : -2 }}
                    whileTap={{ scale: state.busy ? 1 : 0.97 }}
                    disabled={state.busy}
                    onClick={() => confirmRide(ride)}
                    style={{
                      flex: 1,
                      padding: "13px 22px",
                      borderRadius: "10px",
                      border: "none",
                      background: state.busy
                        ? s.line
                        : darkMode
                          ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                          : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                      color: state.busy ? s.textMuted : darkMode ? colors.ink : "#fff",
                      fontWeight: "700",
                      fontSize: "14px",
                      fontFamily: fonts.body,
                      cursor: state.busy ? "not-allowed" : "pointer",
                    }}
                  >
                    {state.busy ? "Confirming..." : "Confirm"}
                  </motion.button>

                  <motion.button
                    whileHover={{ y: state.busy ? 0 : -2 }}
                    whileTap={{ scale: state.busy ? 1 : 0.97 }}
                    disabled={state.busy}
                    onClick={cancelRide}
                    style={{
                      flex: 1,
                      padding: "13px 22px",
                      borderRadius: "10px",
                      border: `1px solid ${state.busy ? s.line : colors.rust}`,
                      background: "transparent",
                      color: state.busy ? s.textMuted : colors.rust,
                      fontWeight: "700",
                      fontSize: "14px",
                      fontFamily: fonts.body,
                      cursor: state.busy ? "not-allowed" : "pointer",
                    }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RideResults;

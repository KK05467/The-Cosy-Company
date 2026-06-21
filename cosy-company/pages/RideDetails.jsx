// src/pages/RideDetails.jsx
//
// BUG FIX (confirmed via screenshot — this was the actual reported issue):
// goToManagement() called navigate("/my-rides"), which isn't a real route.
// App.jsx registers /driver/my-rides for DriverMyRides.jsx. Fixed below.
// No other navigate() calls in this file needed changes — /my-bookings and
// navigate(-1) are both already correct.
//
// REDESIGN NOTES (visual only — fetchRide, fetchCurrentUser,
// isDriverOfThisRide, handleBooking, goToManagement, and every piece of
// state are otherwise unchanged): restyled into the shared ticket/manifest
// system used across the rest of the app instead of the glass-card pattern.

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaClock,
  FaRupeeSign,
  FaCalendarAlt,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

function RideDetails({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const s = surface(darkMode);

  const [ride, setRide] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [pickupPoint, setPickupPoint] = useState("");
  const [dropPoint, setDropPoint] = useState("");
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [booking, setBooking] = useState(false);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    fetchRide();
    fetchCurrentUser();
  }, [id]);

  const fetchRide = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/rides/${id}`);
      const data = await res.json();
      if (data.success) {
        setRide(data.ride);
      } else {
        setError(data.message || "Ride not found");
      }
    } catch (err) {
      console.error(err);
      setError("Could not load ride details");
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUserId(data.user._id);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isDriverOfThisRide =
    ride && currentUserId && ride.driverId?._id === currentUserId;

  const handleBooking = async () => {
    setBookingError("");

    if (!pickupPoint.trim() || !dropPoint.trim()) {
      setBookingError("Please enter both pickup and drop points.");
      return;
    }
    if (!seatsBooked || seatsBooked <= 0) {
      setBookingError("Please select at least 1 seat.");
      return;
    }

    setBooking(true);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rideId: ride._id,
          pickupPoint,
          dropPoint,
          seatsBooked: Number(seatsBooked),
        }),
      });

      const data = await res.json();

      if (data.success) {
        navigate("/my-bookings");
      } else {
        setBookingError(data.message || "Failed to book this ride");
      }
    } catch (err) {
      console.error(err);
      setBookingError("Something went wrong while booking");
    } finally {
      setBooking(false);
    }
  };

  const goToManagement = () => {
    // CHANGE: was navigate("/my-rides") — not a real route, confirmed by
    // screenshot showing a live 404. Real route per App.jsx is
    // /driver/my-rides.
    navigate("/driver/my-rides");
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

  if (error || !ride) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          background: s.bg,
        }}
      >
        <p style={{ color: colors.rust, fontSize: "16px" }}>{error || "Ride not found"}</p>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: "12px 22px",
            borderRadius: "12px",
            border: "none",
            background: darkMode
              ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
              : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
            color: darkMode ? colors.ink : "#fff",
            cursor: "pointer",
            fontWeight: "700",
            fontFamily: fonts.body,
            fontSize: "14px",
          }}
        >
          Go back
        </button>
      </div>
    );
  }

  const detailItems = [
    { icon: <FaCar />, label: "Vehicle", value: `${ride.vehicleName} · ${ride.vehicleNumber}` },
    { icon: <FaUsers />, label: "Available seats", value: ride.availableSeats },
    { icon: <FaCalendarAlt />, label: "Date", value: ride.departureDate },
    { icon: <FaClock />, label: "Time", value: ride.departureTime },
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
        {/* BACK */}
        <motion.button
          whileHover={{ x: -3 }}
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: s.textMuted,
            fontSize: "14px",
            marginBottom: "28px",
            fontFamily: fonts.body,
          }}
        >
          <FaArrowLeft size={12} /> Back
        </motion.button>

        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: "36px" }}>
          <p
            style={{
              fontFamily: fonts.mono,
              fontSize: "13px",
              letterSpacing: "2.5px",
              color: s.accent,
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            {isDriverOfThisRide ? "YOUR RIDE" : "RIDE DETAILS"}
          </p>
          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "42px",
              fontWeight: "600",
              letterSpacing: "-1px",
            }}
          >
            {ride.from} → {ride.to}
          </h1>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isDriverOfThisRide ? "1fr" : "1.2fr 1fr",
            gap: "24px",
          }}
        >
          {/* RIDE INFO */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "30px",
              borderRadius: "20px",
              background: s.bgSoft,
              border: `1px solid ${s.line}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "26px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: darkMode
                    ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                    : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaUser color={darkMode ? colors.ink : "#fff"} size={18} />
              </div>
              <div>
                <h3 style={{ fontFamily: fonts.display, color: s.text, margin: 0, fontSize: "18px", fontWeight: "600" }}>
                  {ride.driverId?.name || "Driver"}
                </h3>
                <p style={{ color: s.textMuted, margin: 0, fontSize: "12.5px" }}>
                  {ride.driverId?.rating ? `${ride.driverId.rating} rating` : "Verified driver"}
                </p>
              </div>
            </div>

            {/* DETAILS — manifest strip */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                border: `1px solid ${s.line}`,
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "20px",
              }}
            >
              {detailItems.map((item, i) => (
                <div
                  key={item.label}
                  style={{
                    padding: "14px 16px",
                    background: s.bg,
                    borderRight: i % 2 === 0 ? `1px solid ${s.line}` : "none",
                    borderBottom: i < 2 ? `1px solid ${s.line}` : "none",
                  }}
                >
                  <div style={{ color: s.accent, fontSize: "13px", marginBottom: "8px" }}>{item.icon}</div>
                  <p style={{ color: s.textMuted, fontSize: "10.5px", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {item.label}
                  </p>
                  <p style={{ color: s.text, fontWeight: "600", fontSize: "13.5px", margin: 0 }}>{item.value}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 20px",
                borderRadius: "14px",
                background: darkMode ? "rgba(201,162,39,0.08)" : "rgba(31,77,58,0.06)",
              }}
            >
              <span style={{ color: s.textMuted, fontSize: "13.5px" }}>Estimated fare (full route)</span>
              <h2
                style={{
                  fontFamily: fonts.display,
                  color: s.accent,
                  fontSize: "26px",
                  fontWeight: "600",
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}
              >
                <FaRupeeSign size={15} />
                {ride.fixedFare}
              </h2>
            </div>

            {isDriverOfThisRide && (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={goToManagement}
                style={{
                  width: "100%",
                  marginTop: "22px",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none",
                  background: darkMode
                    ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                    : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                  color: darkMode ? colors.ink : "#fff",
                  fontWeight: "700",
                  fontSize: "14.5px",
                  fontFamily: fonts.body,
                  cursor: "pointer",
                }}
              >
                Manage this ride
              </motion.button>
            )}
          </motion.div>

          {/* BOOKING FORM */}
          {!isDriverOfThisRide && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                padding: "30px",
                borderRadius: "20px",
                background: s.bgSoft,
                border: `1px solid ${s.line}`,
                height: "fit-content",
              }}
            >
              <h3 style={{ fontFamily: fonts.display, color: s.text, fontSize: "20px", fontWeight: "600", marginBottom: "20px" }}>
                Book this ride
              </h3>

              <div style={{ marginBottom: "14px" }}>
                <p style={{ color: s.textMuted, marginBottom: "8px", fontSize: "12.5px" }}>Pickup point</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: `1px solid ${s.line}`,
                    background: s.bg,
                  }}
                >
                  <FaMapMarkerAlt color={s.accent} size={13} />
                  <input
                    type="text"
                    placeholder="e.g. Fire Station"
                    value={pickupPoint}
                    onChange={(e) => setPickupPoint(e.target.value)}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: s.text, fontSize: "14px", fontFamily: fonts.body }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <p style={{ color: s.textMuted, marginBottom: "8px", fontSize: "12.5px" }}>Drop point</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: `1px solid ${s.line}`,
                    background: s.bg,
                  }}
                >
                  <FaMapMarkerAlt color={colors.rust} size={13} />
                  <input
                    type="text"
                    placeholder="e.g. Master Canteen"
                    value={dropPoint}
                    onChange={(e) => setDropPoint(e.target.value)}
                    style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: s.text, fontSize: "14px", fontFamily: fonts.body }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <p style={{ color: s.textMuted, marginBottom: "8px", fontSize: "12.5px" }}>Seats</p>
                <input
                  type="number"
                  min="1"
                  max={ride.availableSeats}
                  value={seatsBooked}
                  onChange={(e) => setSeatsBooked(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "12px",
                    border: `1px solid ${s.line}`,
                    background: s.bg,
                    color: s.text,
                    fontSize: "14px",
                    fontFamily: fonts.body,
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {bookingError && (
                <p style={{ color: colors.rust, fontSize: "13px", marginBottom: "16px" }}>{bookingError}</p>
              )}

              <motion.button
                whileHover={{ y: booking ? 0 : -2 }}
                whileTap={{ scale: booking ? 1 : 0.97 }}
                onClick={handleBooking}
                disabled={booking || ride.availableSeats <= 0}
                style={{
                  width: "100%",
                  padding: "15px",
                  borderRadius: "12px",
                  border: "none",
                  background:
                    ride.availableSeats <= 0
                      ? s.line
                      : darkMode
                        ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                        : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                  color: ride.availableSeats <= 0 ? s.textMuted : darkMode ? colors.ink : "#fff",
                  fontWeight: "700",
                  fontSize: "14.5px",
                  fontFamily: fonts.body,
                  cursor: booking || ride.availableSeats <= 0 ? "not-allowed" : "pointer",
                }}
              >
                {ride.availableSeats <= 0 ? "Fully booked" : booking ? "Booking..." : "Confirm booking"}
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RideDetails;

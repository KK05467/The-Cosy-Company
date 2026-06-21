// src/pages/Bookings.jsx
//
// REDESIGN NOTES (visual only — fetchBookings, cancelBooking,
// geocodeAddress + its module-level cache, BookingMiniMap, and every piece
// of state below are byte-for-byte unchanged from the bug-fixed version):
// - Replaced the glass-card-on-gradient pattern with the manifest/ticket
//   system used in DriverMyRides.jsx, DriverCreateRide.jsx, and
//   Dashboard.jsx — hairline borders instead of blur+shadow, mono labels,
//   Fraunces for headline and fare numbers.
// - Filter tabs, route block, and the 4-item details grid now match the
//   manifest-row/strip treatment used elsewhere instead of being styled
//   independently per page.
// - ROUTE NOTE: "Pay Now" still navigates to "/payment" (singular) per the
//   confirmed App.jsx fix from earlier in this conversation — not /payments.

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaCar, FaClock, FaRupeeSign } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const geocodeCache = new Map();

const geocodeAddress = async (address) => {
  if (!address) return null;
  if (geocodeCache.has(address)) return geocodeCache.get(address);

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      { headers: { Accept: "application/json", "Accept-Language": "en" } }
    );

    if (!res.ok) {
      console.error("Geocode request failed:", res.status);
      geocodeCache.set(address, null);
      return null;
    }

    const data = await res.json();
    if (!data || data.length === 0) {
      geocodeCache.set(address, null);
      return null;
    }

    const coords = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
    geocodeCache.set(address, coords);
    return coords;
  } catch (err) {
    console.error("Geocode error:", err);
    geocodeCache.set(address, null);
    return null;
  }
};

function statusStyle(status, darkMode) {
  const map = {
    pending: { bg: darkMode ? "rgba(201,162,39,0.12)" : "rgba(168,137,47,0.1)", color: darkMode ? colors.goldSoft : "#A8892F" },
    confirmed: { bg: "rgba(45,106,79,0.12)", color: "#2D6A4F" },
    paid: { bg: "rgba(45,106,79,0.12)", color: "#2D6A4F" },
    cancelled: { bg: darkMode ? "rgba(168,69,47,0.12)" : "rgba(168,69,47,0.08)", color: colors.rust },
    completed: { bg: "rgba(59,110,145,0.12)", color: "#3B6E91" },
  };
  return map[status] || map.pending;
}

function BookingMiniMap({ pickupPoint, dropPoint, darkMode }) {
  const s = surface(darkMode);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [ready, setReady] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    setMapError(false);

    Promise.all([geocodeAddress(pickupPoint), geocodeAddress(dropPoint)]).then(([p, d]) => {
      if (cancelled) return;
      setPickupCoords(p);
      setDropCoords(d);
      setReady(true);
      if (!p && !d) setMapError(true);
    });

    return () => {
      cancelled = true;
    };
  }, [pickupPoint, dropPoint]);

  if (!ready) {
    return (
      <div
        style={{
          height: "190px",
          borderRadius: "14px",
          background: s.bg,
          border: `1px solid ${s.line}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: s.textMuted,
          fontSize: "13px",
          marginTop: "18px",
        }}
      >
        Loading map...
      </div>
    );
  }

  if (mapError) {
    return (
      <div
        style={{
          height: "190px",
          borderRadius: "14px",
          background: darkMode ? "rgba(168,69,47,0.08)" : "rgba(168,69,47,0.05)",
          border: `1px solid ${darkMode ? "rgba(168,69,47,0.25)" : "rgba(168,69,47,0.18)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: colors.rust,
          fontSize: "13px",
          marginTop: "18px",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        Couldn't locate these addresses on the map.
      </div>
    );
  }

  const center = pickupCoords || dropCoords || { lat: 20.2961, lng: 85.8245 };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "190px" }}
      exit={{ opacity: 0, height: 0 }}
      style={{
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${s.line}`,
        marginTop: "18px",
      }}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: "190px", width: "100%" }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {pickupCoords && (
          <Marker position={[pickupCoords.lat, pickupCoords.lng]}>
            <Popup>Pickup: {pickupPoint}</Popup>
          </Marker>
        )}
        {dropCoords && (
          <Marker position={[dropCoords.lat, dropCoords.lng]} icon={redIcon}>
            <Popup>Drop: {dropPoint}</Popup>
          </Marker>
        )}
      </MapContainer>
    </motion.div>
  );
}

function Bookings({ darkMode }) {
  const navigate = useNavigate();
  const s = surface(darkMode);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [expandedMaps, setExpandedMaps] = useState({});
  const [filter, setFilter] = useState("all");
  const [busyId, setBusyId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You're not logged in. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/bookings/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError(`Failed to load bookings (status ${res.status}).`);
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
        setError("");
      } else {
        setError(data.message || "Failed to load bookings");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading bookings. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    setActionError("");
    setBusyId(id);
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/bookings/cancel/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (res.ok && data?.success) {
        await fetchBookings();
      } else {
        setActionError(data?.message || `Failed to cancel booking (status ${res.status}).`);
      }
    } catch (err) {
      console.error(err);
      setActionError("Failed to cancel booking. Check your connection and try again.");
    } finally {
      setBusyId(null);
    }
  };

  const toggleMap = (id) => setExpandedMaps((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.bookingStatus === filter);

  const filterTabs = ["all", "pending", "confirmed", "paid", "completed", "cancelled"];

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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

  const detailRows = (booking) => [
    {
      icon: <FaCalendarAlt />,
      label: "Booked on",
      value: new Date(booking.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    },
    { icon: <FaClock />, label: "Seats", value: `${booking.seatsBooked} seat${booking.seatsBooked > 1 ? "s" : ""}` },
    { icon: <FaUser />, label: "Passenger", value: "You" },
    { icon: <FaCar />, label: "Vehicle", value: booking.rideId?.vehicleName || "N/A" },
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
            MY BOOKINGS
          </p>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <h1
                style={{
                  fontFamily: fonts.display,
                  color: s.text,
                  fontSize: "46px",
                  fontWeight: "600",
                  letterSpacing: "-1px",
                  marginBottom: "8px",
                }}
              >
                Your rides
              </h1>
              <p style={{ color: s.textMuted, fontSize: "16px" }}>
                {bookings.length} booking{bookings.length !== 1 ? "s" : ""} total
              </p>
            </div>

            {/* FILTER TABS */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                padding: "4px",
                borderRadius: "12px",
                background: s.bgSoft,
                border: `1px solid ${s.line}`,
                flexWrap: "wrap",
              }}
            >
              {filterTabs.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "9px",
                    border: "none",
                    background:
                      filter === f
                        ? darkMode
                          ? colors.goldSoft
                          : colors.forest
                        : "transparent",
                    color: filter === f ? (darkMode ? colors.ink : "#fff") : s.textMuted,
                    fontSize: "12.5px",
                    fontWeight: "700",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    fontFamily: fonts.body,
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {error && <p style={{ color: colors.rust, marginBottom: "20px", fontSize: "14px" }}>{error}</p>}
        {actionError && <p style={{ color: colors.rust, marginBottom: "20px", fontSize: "14px" }}>{actionError}</p>}

        {/* CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                padding: "60px 40px",
                borderRadius: "20px",
                textAlign: "center",
                background: s.bgSoft,
                border: `1px solid ${s.line}`,
              }}
            >
              <h3 style={{ fontFamily: fonts.display, color: s.text, fontSize: "24px", fontWeight: "600", marginBottom: "10px" }}>
                No bookings found
              </h3>
              <p style={{ color: s.textMuted, marginBottom: "24px" }}>
                {filter === "all" ? "Start by searching for a ride on your route." : `You have no ${filter} bookings.`}
              </p>
              {filter === "all" && (
                <button
                  onClick={() => navigate("/search-rides")}
                  style={{
                    padding: "13px 28px",
                    borderRadius: "12px",
                    border: "none",
                    background: darkMode
                      ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                      : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
                    color: darkMode ? colors.ink : "#fff",
                    fontWeight: "700",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: fonts.body,
                  }}
                >
                  Find a ride
                </button>
              )}
            </motion.div>
          ) : (
            filtered.map((booking, i) => {
              const st = statusStyle(booking.bookingStatus, darkMode);
              const isBusy = busyId === booking._id;
              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  style={{
                    padding: "26px",
                    borderRadius: "18px",
                    background: s.bgSoft,
                    border: `1px solid ${s.line}`,
                  }}
                >
                  {/* TOP */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "22px", flexWrap: "wrap", gap: "16px" }}>
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          background: st.bg,
                          color: st.color,
                          fontSize: "11.5px",
                          fontWeight: "700",
                          letterSpacing: "0.5px",
                          textTransform: "uppercase",
                          marginBottom: "10px",
                        }}
                      >
                        {booking.bookingStatus}
                      </span>
                      <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "12px" }}>
                        #{booking._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: s.textMuted, fontSize: "11.5px", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", fontFamily: fonts.mono }}>
                        Total fare
                      </p>
                      <h2
                        style={{
                          fontFamily: fonts.display,
                          fontSize: "28px",
                          fontWeight: "600",
                          color: s.accent,
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "2px",
                        }}
                      >
                        <FaRupeeSign size={16} />
                        {booking.amount}
                      </h2>
                    </div>
                  </div>

                  {/* ROUTE */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto 1fr",
                      gap: "16px",
                      alignItems: "center",
                      marginBottom: "20px",
                      padding: "18px",
                      borderRadius: "14px",
                      background: s.bg,
                      border: `1px solid ${s.line}`,
                    }}
                  >
                    <div>
                      <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "10.5px", letterSpacing: "1px", marginBottom: "6px" }}>
                        PICKUP
                      </p>
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <FaMapMarkerAlt style={{ color: s.accent, marginTop: "3px", flexShrink: 0, fontSize: "13px" }} />
                        <p style={{ color: s.text, fontSize: "14px", lineHeight: "1.4", margin: 0 }}>{booking.pickupPoint}</p>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(31,77,58,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: s.accent,
                        fontSize: "13px",
                      }}
                    >
                      →
                    </div>

                    <div>
                      <p style={{ fontFamily: fonts.mono, color: s.textMuted, fontSize: "10.5px", letterSpacing: "1px", marginBottom: "6px" }}>
                        DROP
                      </p>
                      <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                        <FaMapMarkerAlt style={{ color: colors.rust, marginTop: "3px", flexShrink: 0, fontSize: "13px" }} />
                        <p style={{ color: s.text, fontSize: "14px", lineHeight: "1.4", margin: 0 }}>{booking.dropPoint}</p>
                      </div>
                    </div>
                  </div>

                  {/* DETAILS — manifest strip */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      border: `1px solid ${s.line}`,
                      borderRadius: "12px",
                      overflow: "hidden",
                      marginBottom: "18px",
                    }}
                  >
                    {detailRows(booking).map((item, idx) => (
                      <div
                        key={item.label}
                        style={{
                          padding: "14px 16px",
                          background: s.bg,
                          borderRight: idx < 3 ? `1px solid ${s.line}` : "none",
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

                  {/* MAP */}
                  <AnimatePresence>
                    {expandedMaps[booking._id] && (
                      <BookingMiniMap pickupPoint={booking.pickupPoint} dropPoint={booking.dropPoint} darkMode={darkMode} />
                    )}
                  </AnimatePresence>

                  {/* ACTIONS */}
                  <div style={{ display: "flex", gap: "10px", marginTop: "18px", flexWrap: "wrap" }}>
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate(`/booking/${booking._id}`)}
                      style={{
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
                        cursor: "pointer",
                      }}
                    >
                      View details
                    </motion.button>

                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => toggleMap(booking._id)}
                      style={{
                        padding: "11px 20px",
                        borderRadius: "10px",
                        border: `1px solid ${s.line}`,
                        background: "transparent",
                        color: s.text,
                        fontWeight: "700",
                        fontSize: "13.5px",
                        fontFamily: fonts.body,
                        cursor: "pointer",
                      }}
                    >
                      {expandedMaps[booking._id] ? "Hide map" : "Show on map"}
                    </motion.button>

                    {booking.bookingStatus === "pending" && (
                      <>
                        <div
                          style={{
                            padding: "11px 20px",
                            borderRadius: "10px",
                            background: darkMode ? "rgba(201,162,39,0.1)" : "rgba(168,137,47,0.08)",
                            border: `1px solid ${darkMode ? "rgba(201,162,39,0.25)" : "rgba(168,137,47,0.2)"}`,
                            color: darkMode ? colors.goldSoft : "#A8892F",
                            fontSize: "13.5px",
                            fontWeight: "700",
                          }}
                        >
                          Waiting for driver to confirm
                        </div>

                        <motion.button
                          whileHover={{ y: isBusy ? 0 : -2 }}
                          whileTap={{ scale: isBusy ? 1 : 0.97 }}
                          disabled={isBusy}
                          onClick={() => cancelBooking(booking._id)}
                          style={{
                            padding: "11px 20px",
                            borderRadius: "10px",
                            border: `1px solid ${isBusy ? s.line : colors.rust}`,
                            background: "transparent",
                            color: isBusy ? s.textMuted : colors.rust,
                            fontWeight: "700",
                            fontSize: "13.5px",
                            fontFamily: fonts.body,
                            cursor: isBusy ? "not-allowed" : "pointer",
                          }}
                        >
                          {isBusy ? "Cancelling..." : "Cancel booking"}
                        </motion.button>
                      </>
                    )}

                    {booking.bookingStatus === "confirmed" && (
                      <>
                        <motion.button
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() =>
                            navigate("/payment", {
                              state: { bookingId: booking._id, amount: booking.amount },
                            })
                          }
                          style={{
                            padding: "11px 20px",
                            borderRadius: "10px",
                            border: "none",
                            background: "linear-gradient(135deg,#2D6A4F,#1F4D3A)",
                            color: "#fff",
                            fontWeight: "700",
                            fontSize: "13.5px",
                            fontFamily: fonts.body,
                            cursor: "pointer",
                          }}
                        >
                          Pay now
                        </motion.button>

                        <motion.button
                          whileHover={{ y: isBusy ? 0 : -2 }}
                          whileTap={{ scale: isBusy ? 1 : 0.97 }}
                          disabled={isBusy}
                          onClick={() => cancelBooking(booking._id)}
                          style={{
                            padding: "11px 20px",
                            borderRadius: "10px",
                            border: `1px solid ${isBusy ? s.line : colors.rust}`,
                            background: "transparent",
                            color: isBusy ? s.textMuted : colors.rust,
                            fontWeight: "700",
                            fontSize: "13.5px",
                            fontFamily: fonts.body,
                            cursor: isBusy ? "not-allowed" : "pointer",
                          }}
                        >
                          {isBusy ? "Cancelling..." : "Cancel booking"}
                        </motion.button>
                      </>
                    )}

                    {booking.bookingStatus === "paid" && (
                      <div
                        style={{
                          padding: "11px 20px",
                          borderRadius: "10px",
                          background: "rgba(45,106,79,0.1)",
                          border: "1px solid rgba(45,106,79,0.25)",
                          color: "#2D6A4F",
                          fontSize: "13.5px",
                          fontWeight: "700",
                        }}
                      >
                        Payment received
                      </div>
                    )}

                    {booking.bookingStatus === "cancelled" && (
                      <div
                        style={{
                          padding: "11px 20px",
                          borderRadius: "10px",
                          background: darkMode ? "rgba(168,69,47,0.12)" : "rgba(168,69,47,0.08)",
                          border: `1px solid ${darkMode ? "rgba(168,69,47,0.3)" : "rgba(168,69,47,0.2)"}`,
                          color: colors.rust,
                          fontSize: "13.5px",
                          fontWeight: "700",
                        }}
                      >
                        Request rejected
                      </div>
                    )}

                    {booking.bookingStatus === "completed" && (
                      <div
                        style={{
                          padding: "11px 20px",
                          borderRadius: "10px",
                          background: "rgba(59,110,145,0.1)",
                          border: "1px solid rgba(59,110,145,0.25)",
                          color: "#3B6E91",
                          fontSize: "13.5px",
                          fontWeight: "700",
                        }}
                      >
                        Ride completed
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

export default Bookings;

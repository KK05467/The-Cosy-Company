// src/pages/Bookings.jsx
//
// CHANGES FROM ORIGINAL:
// - Added a small Leaflet map inside each booking card showing the pickup (blue)
//   and drop (red) pins, geocoded from the stored address strings.
// - Map is lazy-loaded only when booking cards are rendered.
// - Everything else (UI structure, styles, actions) is unchanged.
//
// CHANGE (this pass, per explicit instruction "just change the background
// and nothing"): only the two `background:` values below now use the
// shared surface(darkMode).bg token instead of the inline gradient
// strings, so this page's background matches the rest of the redesigned
// app. No other styling, structure, or logic was touched.
//
// INSTALL REQUIRED (run once, same as DriverCreateRide):
//   npm install leaflet react-leaflet

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaCar,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { surface } from "../styles/tokens";

// Fix Leaflet default icon in Vite/CRA
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Geocode an address string → { lat, lng } using Nominatim
const geocodeAddress = async (address) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      { headers: { "User-Agent": "Cosy/1.0", "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (!data || data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
};

// ── Small map showing pickup (blue) and drop (red) pins ──
function BookingMiniMap({ pickupPoint, dropPoint }) {
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const [p, d] = await Promise.all([
        geocodeAddress(pickupPoint),
        geocodeAddress(dropPoint),
      ]);
      if (!cancelled) {
        setPickupCoords(p);
        setDropCoords(d);
        setMapReady(true);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [pickupPoint, dropPoint]);

  if (!mapReady) {
    return (
      <div
        style={{
          height: "200px",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#64748b",
          fontSize: "13px",
        }}
      >
        Loading map...
      </div>
    );
  }

  const center =
    pickupCoords || dropCoords || { lat: 20.2961, lng: 85.8245 };

  return (
    <div
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        height: "200px",
        marginTop: "20px",
      }}
    >
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />

        {pickupCoords && (
          <Marker position={[pickupCoords.lat, pickupCoords.lng]}>
            <Popup>📍 Pickup: {pickupPoint}</Popup>
          </Marker>
        )}

        {dropCoords && (
          <Marker position={[dropCoords.lat, dropCoords.lng]} icon={redIcon}>
            <Popup>🔴 Drop: {dropPoint}</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

// ── Main Bookings page ──
function Bookings({ darkMode }) {
  const navigate = useNavigate();
  const s = surface(darkMode);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMaps, setExpandedMaps] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setBookings(data.bookings);
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMap = (bookingId) => {
    setExpandedMaps((prev) => ({
      ...prev,
      [bookingId]: !prev[bookingId],
    }));
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

          color: darkMode ? "white" : "#1F2937",
          fontSize: "22px",
        }}
      >
        Loading bookings...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "130px 80px",
        position: "relative",
        overflow: "hidden",

        background: s.bg,
      }}
    >
      {/* Emerald Glow */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "#1F4D3A",
          filter: "blur(180px)",
          opacity: 0.12,
          right: "-250px",
          top: "-250px",
        }}
      />

      {/* Gold Glow */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#D4AF37",
          filter: "blur(160px)",
          opacity: 0.08,
          left: "-100px",
          bottom: "-100px",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* HEADER */}

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
            marginBottom: "55px",
          }}
        >
          <p
            style={{
              color: "#C9A96E",
              letterSpacing: "5px",
              fontSize: "13px",
              marginBottom: "12px",
            }}
          >
            COSY BOOKINGS
          </p>

          <h1
            style={{
              color: darkMode ? "white" : "#1F2937",
              fontSize: "68px",
              marginBottom: "15px",
            }}
          >
            My Bookings
          </h1>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "18px",
            }}
          >
            Manage your upcoming and previous rides.
          </p>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
                  {bookings.length === 0 ? (
            <div
              style={{
                padding: "60px",
                borderRadius: "35px",

                background: darkMode
                  ? "rgba(255,255,255,.05)"
                  : "rgba(255,255,255,.65)",

                border: darkMode
                  ? "1px solid rgba(255,255,255,.08)"
                  : "1px solid rgba(31,77,58,.1)",

                textAlign: "center",

                color: "#94a3b8",
              }}
            >
              No bookings found
            </div>
          ) : (
            bookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -5,
                }}
                style={{
                  padding: "35px",

                  borderRadius: "38px",

                  background: darkMode
                    ? "rgba(255,255,255,.05)"
                    : "rgba(255,255,255,.65)",

                  border: darkMode
                    ? "1px solid rgba(255,255,255,.08)"
                    : "1px solid rgba(31,77,58,.12)",

                  backdropFilter: "blur(25px)",

                  boxShadow: darkMode
                    ? "0 20px 60px rgba(0,0,0,.35)"
                    : "0 20px 60px rgba(31,77,58,.08)",
                }}
              >
                {/* TOP */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "35px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                        marginBottom: "15px",
                      }}
                    >
                      {booking._id}
                    </h2>

                    <span
                      style={{
                        padding: "10px 18px",
                        borderRadius: "999px",

                        background:
                          booking.bookingStatus === "pending"
                            ? "rgba(212,175,55,.12)"
                            : booking.bookingStatus === "confirmed"
                            ? "rgba(34,197,94,.12)"
                            : "rgba(239,68,68,.12)",

                        color:
                          booking.bookingStatus === "pending"
                            ? "#D4AF37"
                            : booking.bookingStatus === "confirmed"
                            ? "#22c55e"
                            : "#ef4444",

                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      {booking.bookingStatus}
                    </span>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "8px",
                      }}
                    >
                      Amount
                    </p>

                    <h1
                      style={{
                        color: "#1F4D3A",
                        fontSize: "40px",
                      }}
                    >
                      ₹{booking.amount}
                    </h1>
                  </div>
                </div>

                {/* ROUTE */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "30px",
                    marginBottom: "35px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      Pickup Point
                    </p>

                    <h3
                      style={{
                        color: darkMode ? "white" : "#1F2937",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaMapMarkerAlt color="#1F4D3A" />

                      {booking.pickupPoint}
                    </h3>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      Destination
                    </p>

                    <h3
                      style={{
                        color: darkMode ? "white" : "#1F2937",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <FaMapMarkerAlt color="#D4AF37" />

                      {booking.dropPoint}
                    </h3>
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: "25px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      <FaCalendarAlt />

                      Date
                    </p>

                    <h4
                      style={{
                        color: darkMode ? "white" : "#1F2937",
                      }}
                    >
                      {new Date(
                        booking.createdAt
                      ).toDateString()}
                    </h4>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      <FaClock />

                      Seats
                    </p>

                    <h4
                      style={{
                        color: darkMode ? "white" : "#1F2937",
                      }}
                    >
                      {booking.seatsBooked}
                    </h4>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      <FaUser />

                      Passenger
                    </p>

                    <h4
                      style={{
                        color: darkMode ? "white" : "#1F2937",
                      }}
                    >
                      You
                    </h4>
                  </div>

                  <div>
                    <p
                      style={{
                        color: "#94a3b8",
                        marginBottom: "10px",
                      }}
                    >
                      <FaCar />

                      Vehicle
                    </p>

                    <h4
                      style={{
                        color: darkMode ? "white" : "#1F2937",
                      }}
                    >
                      {booking.rideId?.vehicleName ||
                        "Vehicle"}
                    </h4>
                  </div>
                </div>

                           {/* MINI MAP */}
              {expandedMaps[booking._id] && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                >
                  <BookingMiniMap
                    pickupPoint={booking.pickupPoint}
                    dropPoint={booking.dropPoint}
                  />
                </motion.div>
              )}

              {/* ACTION BUTTONS */}
              <div
                style={{
                  display: "flex",
                  gap: "18px",
                  flexWrap: "wrap",
                  marginTop: "35px",
                }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    navigate(`/booking/${booking._id}`)
                  }
                  style={{
                    padding: "14px 24px",
                    border: "none",
                    borderRadius: "18px",

                    background:
                      "linear-gradient(135deg,#1F4D3A,#2C6B53)",

                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",

                    boxShadow:
                      "0 15px 40px rgba(31,77,58,.25)",
                  }}
                >
                  View Details
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={() =>
                    toggleMap(booking._id)
                  }
                  style={{
                    padding: "14px 24px",
                    borderRadius: "18px",

                    background: darkMode
                      ? "rgba(255,255,255,.05)"
                      : "rgba(255,255,255,.75)",

                    border: darkMode
                      ? "1px solid rgba(255,255,255,.08)"
                      : "1px solid rgba(31,77,58,.12)",

                    color: darkMode
                      ? "white"
                      : "#1F2937",

                    cursor: "pointer",
                  }}
                >
                  {expandedMaps[booking._id]
                    ? "Hide Map"
                    : "Show on Map"}
                </motion.button>

                {booking.bookingStatus ===
                  "pending" && (
                  <button
                    style={{
                      padding: "14px 24px",
                      border: "none",
                      borderRadius: "18px",

                      background:
                        "rgba(212,175,55,.12)",

                      color: "#D4AF37",

                      fontWeight: "600",
                    }}
                  >
                    Waiting For Driver
                  </button>
                )}

                {booking.bookingStatus ===
                  "confirmed" && (
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() =>
                      navigate("/payment", {
                        state: {
                          bookingId:
                            booking._id,
                          amount:
                            booking.amount,
                        },
                      })
                    }
                    style={{
                      padding: "14px 24px",
                      border: "none",
                      borderRadius: "18px",

                      background:
                        "linear-gradient(135deg,#C9A96E,#E6C98F)",

                      color: "#1F2937",

                      fontWeight: "700",

                      cursor: "pointer",

                      boxShadow:
                        "0 15px 40px rgba(201,169,110,.25)",
                    }}
                  >
                    Pay Now
                  </motion.button>
                )}

                {booking.bookingStatus ===
                  "cancelled" && (
                  <button
                    style={{
                      padding: "14px 24px",
                      border: "none",
                      borderRadius: "18px",

                      background:
                        "rgba(239,68,68,.12)",

                      color: "#ef4444",

                      fontWeight: "600",
                    }}
                  >
                    Request Rejected
                  </button>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Bookings;

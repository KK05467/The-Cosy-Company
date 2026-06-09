import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import { motion } from "framer-motion";

import {
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaClock,
  FaRupeeSign,
  FaArrowRight,
} from "react-icons/fa";

function RideResults({ darkMode }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const from = searchParams.get("from");
  const to = searchParams.get("to");

  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/rides/search?from=${from}&to=${to}`
      );

      const data = await response.json();

      setRides(data.rides || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        padding: "140px 60px 80px",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
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
          opacity: 0.15,
          top: "-250px",
          right: "-250px",
        }}
      />

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "4px",
            marginBottom: "10px",
          }}
        >
          AVAILABLE RIDES
        </p>

        <h1
          style={{
            fontSize: "60px",
            marginBottom: "12px",
            color: darkMode
              ? "white"
              : "#0f172a",
          }}
        >
          {from} → {to}
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginBottom: "50px",
          }}
        >
          Discover verified drivers
          travelling your route.
        </p>
      </motion.div>

      {/* LOADING */}

      {loading && (
        <div
          style={{
            textAlign: "center",
            color: darkMode
              ? "white"
              : "#0f172a",
            fontSize: "22px",
          }}
        >
          Searching rides...
        </div>
      )}

      {/* NO RIDES */}

      {!loading &&
        rides.length === 0 && (
          <div
            style={{
              padding: "40px",
              borderRadius: "28px",
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(20px)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                color: darkMode
                  ? "white"
                  : "#0f172a",
              }}
            >
              No rides found
            </h2>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Try a different route.
            </p>
          </div>
        )}

      {/* RIDE CARDS */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {rides.map((ride) => (
          <motion.div
            key={ride._id}
            whileHover={{
              y: -5,
            }}
            style={{
              padding: "30px",
              borderRadius: "28px",
              background:
                "rgba(255,255,255,0.04)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              backdropFilter:
                "blur(20px)",
            }}
          >
            {/* TOP */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                    marginBottom: "6px",
                  }}
                >
                  {ride.driver?.name ||
                    "Driver"}
                </h2>

                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Verified Driver
                </p>
              </div>

              <h2
                style={{
                  color: "#3b82f6",
                  fontSize: "34px",
                }}
              >
                ₹{ride.fixedFare}
              </h2>
            </div>

            {/* ROUTE */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "20px",
                marginBottom: "24px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Pickup
                </p>

                <h3
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{
                      marginRight: "8px",
                    }}
                  />
                  {ride.from}
                </h3>
              </div>

              <div>
                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  Destination
                </p>

                <h3
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{
                      marginRight: "8px",
                    }}
                  />
                  {ride.to}
                </h3>
              </div>
            </div>

            {/* DETAILS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(4,1fr)",
                gap: "20px",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  <FaCar /> Vehicle
                </p>

                <h4
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  {ride.vehicleName}
                </h4>
              </div>

              <div>
                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  <FaUser /> Seats
                </p>

                <h4
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  {ride.availableSeats}
                </h4>
              </div>

              <div>
                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  <FaClock /> Time
                </p>

                <h4
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  {ride.departureTime}
                </h4>
              </div>

              <div>
                <p
                  style={{
                    color: "#94a3b8",
                  }}
                >
                  <FaRupeeSign /> Fare
                </p>

                <h4
                  style={{
                    color: darkMode
                      ? "white"
                      : "#0f172a",
                  }}
                >
                  ₹{ride.fixedFare}
                </h4>
              </div>
            </div>

            {/* BUTTON */}

            <button
              onClick={() =>
                navigate(
                  `/ride/${ride._id}`
                )
              }
              style={{
                marginTop: "28px",
                padding:
                  "14px 24px",
                border: "none",
                borderRadius:
                  "18px",
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              View Ride
              <FaArrowRight />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default RideResults;
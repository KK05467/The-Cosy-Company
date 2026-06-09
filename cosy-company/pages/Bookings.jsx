import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaCar,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Bookings({ darkMode }) {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          padding: "150px",
          color: darkMode ? "white" : "#0f172a",
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
        padding: "40px",
        background: darkMode
          ? "linear-gradient(to bottom right,#020617,#050816)"
          : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "40px" }}>
        <p
          style={{
            color: "#3b82f6",
            letterSpacing: "4px",
            fontSize: "12px",
            marginBottom: "10px",
          }}
        >
          COSY BOOKINGS
        </p>

        <h1
          style={{
            color: darkMode ? "white" : "#0f172a",
            fontSize: "48px",
            marginBottom: "10px",
          }}
        >
          My Bookings
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "17px" }}>
          Manage your upcoming and previous rides.
        </p>
      </div>

      {/* BOOKINGS */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {bookings.length === 0 ? (
          <div
            style={{
              color: "#94a3b8",
              textAlign: "center",
              padding: "40px",
            }}
          >
            No bookings found
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                padding: "28px",
                borderRadius: "28px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* TOP */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h2
                    style={{
                      color: darkMode ? "white" : "#0f172a",
                      marginBottom: "8px",
                    }}
                  >
                    {booking._id}
                  </h2>

                  <span
                    style={{
                      padding: "8px 16px",
                      borderRadius: "999px",
                      background:
                        booking.bookingStatus === "pending"
                          ? "rgba(59,130,246,0.15)"
                          : "rgba(34,197,94,0.15)",
                      color:
                        booking.bookingStatus === "pending"
                          ? "#3b82f6"
                          : "#22c55e",
                      fontSize: "13px",
                    }}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>

                <h2 style={{ color: "#3b82f6", fontSize: "28px" }}>
                  ₹{booking.amount}
                </h2>
              </div>

              {/* ROUTE */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <p style={{ color: "#94a3b8" }}>Pickup</p>
                  <h3 style={{ color: darkMode ? "white" : "#0f172a" }}>
                    <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                    {booking.pickupPoint}
                  </h3>
                </div>

                <div>
                  <p style={{ color: "#94a3b8" }}>Destination</p>
                  <h3 style={{ color: darkMode ? "white" : "#0f172a" }}>
                    <FaMapMarkerAlt style={{ marginRight: "8px" }} />
                    {booking.dropPoint}
                  </h3>
                </div>
              </div>

              {/* DETAILS */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "20px",
                }}
              >
                <div>
                  <p style={{ color: "#94a3b8" }}>
                    <FaCalendarAlt /> Date
                  </p>
                  <h4 style={{ color: darkMode ? "white" : "#0f172a" }}>
                    {new Date(booking.createdAt).toDateString()}
                  </h4>
                </div>

                <div>
                  <p style={{ color: "#94a3b8" }}>
                    <FaClock /> Seats
                  </p>
                  <h4 style={{ color: darkMode ? "white" : "#0f172a" }}>
                    {booking.seatsBooked}
                  </h4>
                </div>

                <div>
                  <p style={{ color: "#94a3b8" }}>
                    <FaUser /> Passenger
                  </p>
                  <h4 style={{ color: darkMode ? "white" : "#0f172a" }}>
                    You
                  </h4>
                </div>

                <div>
                  <p style={{ color: "#94a3b8" }}>
                    <FaCar /> Ride
                  </p>
                  <h4 style={{ color: darkMode ? "white" : "#0f172a" }}>
                    {booking.rideId?.vehicleName || "Vehicle"}
                  </h4>
                </div>
              </div>

              {/* ACTIONS */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "24px",
                }}
              >
                  <button
                    onClick={() => navigate(`/booking/${booking._id}`)}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "14px",
                      border: "none",
                      background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>

                {booking.bookingStatus === "pending" && (
                  <button
                    onClick={() =>
                      navigate("/payment", {
                        state: {
                          bookingId: booking._id,
                          amount: booking.amount,
                        },
                      })
                    }
                    style={{
                      padding: "12px 20px",
                      borderRadius: "14px",
                      border: "none",
                      background:
                        "linear-gradient(135deg,#16a34a,#22c55e)",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Bookings;
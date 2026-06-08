import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaCar,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Bookings({ darkMode }) {
    const navigate = useNavigate()
  const bookings = [
    {
      id: "COSY-2847",
      from: "IIIT Bhubaneswar",
      to: "Railway Station",
      date: "12 Aug 2026",
      time: "09:30 AM",
      driver: "Aman Sharma",
      vehicle: "Hyundai i20",
      fare: 120,
      status: "Upcoming",
    },
    {
      id: "COSY-2815",
      from: "Patia",
      to: "Infocity",
      date: "10 Aug 2026",
      time: "08:00 AM",
      driver: "Rahul Singh",
      vehicle: "Swift Dzire",
      fare: 90,
      status: "Completed",
    },
  ]

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

        <p
          style={{
            color: "#94a3b8",
            fontSize: "17px",
          }}
        >
          Manage your upcoming and previous rides.
        </p>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "24px",
          marginBottom: "35px",
        }}
      >
        {[
          {
            title: "Upcoming Rides",
            value: "03",
          },
          {
            title: "Completed",
            value: "28",
          },
          {
            title: "Money Saved",
            value: "₹4,240",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: "30px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(20px)",
            }}
          >
            <h1
              style={{
                color: darkMode ? "white" : "#0f172a",
                fontSize: "42px",
                marginBottom: "10px",
              }}
            >
              {item.value}
            </h1>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* BOOKINGS LIST */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
        }}
      >
        {bookings.map((booking) => (
          <div
            key={booking.id}
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
                  {booking.id}
                </h2>

                <span
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background:
                      booking.status === "Upcoming"
                        ? "rgba(59,130,246,0.15)"
                        : "rgba(34,197,94,0.15)",
                    color:
                      booking.status === "Upcoming"
                        ? "#3b82f6"
                        : "#22c55e",
                    fontSize: "13px",
                  }}
                >
                  {booking.status}
                </span>
              </div>

              <h2
                style={{
                  color: "#3b82f6",
                  fontSize: "28px",
                }}
              >
                ₹{booking.fare}
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
                <p style={{ color: "#94a3b8" }}>
                  Pickup
                </p>

                <h3
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ marginRight: "8px" }}
                  />
                  {booking.from}
                </h3>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>
                  Destination
                </p>

                <h3
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  <FaMapMarkerAlt
                    style={{ marginRight: "8px" }}
                  />
                  {booking.to}
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
                <h4
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  {booking.date}
                </h4>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>
                  <FaClock /> Time
                </p>
                <h4
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  {booking.time}
                </h4>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>
                  <FaUser /> Driver
                </p>
                <h4
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  {booking.driver}
                </h4>
              </div>

              <div>
                <p style={{ color: "#94a3b8" }}>
                  <FaCar /> Vehicle
                </p>
                <h4
                  style={{
                    color: darkMode ? "white" : "#0f172a",
                  }}
                >
                  {booking.vehicle}
                </h4>
              </div>
            </div>

            {/* ACTIONS */}
            <div
  style={{
    display: "flex",
    gap: "16px",
    marginTop: "24px",
    flexWrap: "wrap",
  }}
>
  <button
    style={{
      padding: "12px 20px",
      borderRadius: "14px",
      border: "none",
      background:
        "linear-gradient(135deg,#2563eb,#3b82f6)",
      color: "white",
      cursor: "pointer",
    }}
  >
    Track Ride
  </button>

  {booking.status === "Upcoming" && (
    <button
      onClick={() =>
        navigate("/payment", {
          state: {
            bookingId: booking.id,
            amount: booking.fare,
            from: booking.from,
            to: booking.to,
            driver: booking.driver,
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

  <button
    style={{
      padding: "12px 20px",
      borderRadius: "14px",
      border:
        "1px solid rgba(255,255,255,0.1)",
      background: "transparent",
      color: darkMode ? "white" : "#0f172a",
      cursor: "pointer",
    }}
  >
    Cancel Booking
  </button>
</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bookings
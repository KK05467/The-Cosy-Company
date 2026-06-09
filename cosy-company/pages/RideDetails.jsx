
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

function RideDetails({ darkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleBooking = () => {
  navigate("/bookings"); // or payment later
};

  useEffect(() => {
    fetchRide();
  }, []);

  const fetchRide = async () => {
    try {
      console.log("Fetching ride:", id);

      const response = await fetch(
        `http://localhost:5000/api/rides/${id}`
      );

      console.log("Response:", response);

      const data = await response.json();

      console.log("Data:", data);

      setRide(data.ride);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ paddingTop: "150px", color: "white" }}>
        Loading...
      </div>
    );
  }

    return (
  <div
    style={{
      minHeight: "100vh",
      padding: "140px 60px 80px",
      background: darkMode
        ? "linear-gradient(to bottom right,#020617,#050816)"
        : "linear-gradient(to bottom right,#f8fafc,#e2e8f0)",
      color: darkMode ? "white" : "#0f172a",
    }}
  >
    {/* HEADER */}
    <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
      Ride Details
    </h1>

    <p style={{ color: "#94a3b8", marginBottom: "40px" }}>
      {ride?.from} → {ride?.to}
    </p>

    {/* MAIN CARD */}
    <div
      style={{
        padding: "30px",
        borderRadius: "24px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* DRIVER */}
      <h2 style={{ marginBottom: "20px" }}>
        Driver: {ride?.driverId?.name}
      </h2>

      {/* INFO GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "20px",
        }}
      >
        <div>
          <p style={{ color: "#94a3b8" }}>Vehicle</p>
          <h3>{ride?.vehicleName}</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Vehicle Number</p>
          <h3>{ride?.vehicleNumber}</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Available Seats</p>
          <h3>{ride?.availableSeats}</h3>
        </div>

        <div>
          <p style={{ color: "#94a3b8" }}>Fare</p>
          <h3>₹{ride?.fixedFare}</h3>
        </div>
      </div>

      {/* BUTTON */}
      <button
  onClick={handleBooking}
  style={{
    marginTop: "30px",
    padding: "14px 24px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg,#2563eb,#3b82f6)",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Book This Ride
</button>
    </div>
  </div>
);

}

export default RideDetails;
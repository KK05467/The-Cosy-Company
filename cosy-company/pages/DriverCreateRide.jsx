// src/pages/DriverCreateRide.jsx

import { useState } from "react";
import { motion } from "framer-motion";

function DriverCreateRide({ darkMode }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [seats, setSeats] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");

  const inputStyle = {
    width: "100%",
    padding: "18px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: darkMode
      ? "rgba(255,255,255,0.04)"
      : "rgba(255,255,255,0.75)",
    color: darkMode ? "white" : "#0f172a",
    fontSize: "16px",
    outline: "none",
    marginTop: "10px",
  };

  const publishRide = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/rides",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            from,
            to,

            startLocation: {},
            destinationLocation: {},
            routeCoordinates: [],

            distance: 10,

            departureDate,
            departureTime,

            vehicleName,
            vehicleNumber,
            vehicleType,

            totalSeats: Number(seats),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Ride Published Successfully!");

        setFrom("");
        setTo("");
        setSeats("");
        setVehicleName("");
        setVehicleNumber("");
        setVehicleType("car");
        setDepartureDate("");
        setDepartureTime("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "140px 80px 60px",
        background: darkMode
          ? "linear-gradient(to bottom right, #020617, #050816)"
          : "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1
        style={{
          color: darkMode ? "white" : "#0f172a",
          fontSize: "68px",
          marginBottom: "50px",
        }}
      >
        Create Ride
      </h1>

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        style={{
          maxWidth: "850px",
          padding: "50px",
          borderRadius: "34px",
          background: darkMode
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.75)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Pickup */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Pickup Location
          </p>

          <input
            type="text"
            placeholder="Enter pickup point"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Destination */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Destination
          </p>

          <input
            type="text"
            placeholder="Enter destination"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Seats */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Available Seats
          </p>

          <input
            type="number"
            placeholder="Number of seats"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Vehicle Name */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Vehicle Name
          </p>

          <input
            type="text"
            placeholder="Swift, Creta, i20..."
            value={vehicleName}
            onChange={(e) => setVehicleName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Vehicle Number */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Vehicle Number
          </p>

          <input
            type="text"
            placeholder="OD02AB1234"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Vehicle Type */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Vehicle Type
          </p>

          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            style={inputStyle}
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="suv">SUV</option>
          </select>
        </div>

        {/* Date */}
        <div style={{ marginBottom: "28px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Departure Date
          </p>

          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Time */}
        <div style={{ marginBottom: "40px" }}>
          <p
            style={{
              color: darkMode ? "white" : "#0f172a",
            }}
          >
            Departure Time
          </p>

          <input
            type="time"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Publish Button */}
        <button
          onClick={publishRide}
          style={{
            width: "100%",
            padding: "20px",
            borderRadius: "20px",
            border: "none",
            background:
              "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow:
              "0 0 40px rgba(37,99,235,0.35)",
          }}
        >
          Publish Ride
        </button>
      </motion.div>
    </div>
  );
}

export default DriverCreateRide;
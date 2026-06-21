// src/pages/DriverCreateRide.jsx
//
// INSTALL REQUIRED (run once):
//   npm install leaflet react-leaflet react-icons framer-motion react-router-dom
//
// CHANGE (this pass): added a "My Rides" button on the right side of the
// header, navigating to /driver/my-rides — lets a driver jump straight to
// their ride list without publishing first.

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaSearch, FaCar, FaList } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

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

const API_BASE = import.meta.env?.VITE_API_URL || "http://localhost:5000";

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    return data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
};

const forwardGeocode = async (address) => {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    if (!data || data.length === 0) return null;
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch {
    return null;
  }
};

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

function LocationStub({ label, isRed, location, onLocationChange, darkMode }) {
  const s = surface(darkMode);
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const markerRef = useRef(null);
  const mapRef = useRef(null);

  const defaultCenter = [20.1489, 85.6731];

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    setSearching(true);
    const coords = await forwardGeocode(searchText);
    setSearching(false);

    if (!coords) {
      alert("Location not found. Try a more specific address.");
      return;
    }

    onLocationChange({ lat: coords.lat, lng: coords.lng, address: searchText });

    if (mapRef.current) {
      mapRef.current.flyTo([coords.lat, coords.lng], 15);
    }
  };

  const handleMapClick = async ({ lat, lng }) => {
    const address = await reverseGeocode(lat, lng);
    onLocationChange({ lat, lng, address });
    setSearchText(address);
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], 15);
    }
  };

  const handleDragEnd = async () => {
    const marker = markerRef.current;
    if (marker) {
      const { lat, lng } = marker.getLatLng();
      const address = await reverseGeocode(lat, lng);
      onLocationChange({ lat, lng, address });
      setSearchText(address);
    }
  };

  return (
    <div style={{ padding: "30px", flex: "1 1 0" }}>
      <p
        style={{
          fontFamily: fonts.mono,
          fontSize: "11px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          color: s.textMuted,
          marginBottom: "14px",
        }}
      >
        {label}
      </p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "12px",
            border: `1px solid ${s.line}`,
            background: s.bgSoft,
          }}
        >
          <FaMapMarkerAlt size={13} color={isRed ? colors.rust : s.accent} />
          <input
            type="text"
            placeholder={`Search ${label.toLowerCase()}...`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "transparent",
              color: s.text,
              fontFamily: fonts.body,
              fontSize: "14.5px",
            }}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={searching}
          style={{
            padding: "0 18px",
            borderRadius: "12px",
            border: "none",
            background: searching ? s.line : s.accent,
            color: darkMode ? colors.ink : "#fff",
            fontWeight: 600,
            fontSize: "13px",
            cursor: searching ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            gap: "7px",
          }}
        >
          <FaSearch size={12} />
          {searching ? "..." : "Search"}
        </button>
      </div>

      {location ? (
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: "12.5px",
            color: s.textMuted,
            marginBottom: "12px",
            lineHeight: "1.5",
          }}
        >
          {location.address}
          <span style={{ opacity: 0.7 }}>
            {" "}
            ({location.lat.toFixed(5)}, {location.lng.toFixed(5)})
          </span>
        </p>
      ) : (
        <p style={{ color: s.textMuted, fontSize: "13px", marginBottom: "12px", lineHeight: "1.5" }}>
          Search above, or click directly on the map. Drag the pin to fine-tune.
        </p>
      )}

      <div
        style={{
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${s.line}`,
          height: "230px",
        }}
      >
        <MapContainer
          center={location ? [location.lat, location.lng] : defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          />
          <MapClickHandler onMapClick={handleMapClick} />
          {location && (
            <Marker
              position={[location.lat, location.lng]}
              icon={isRed ? redIcon : new L.Icon.Default()}
              draggable={true}
              ref={markerRef}
              eventHandlers={{ dragend: handleDragEnd }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

function DriverCreateRide({ darkMode }) {
  const s = surface(darkMode);
  const navigate = useNavigate();

  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [seats, setSeats] = useState("");
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("car");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [loading, setLoading] = useState(false);

  const fieldInputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: s.text,
    fontFamily: fonts.body,
    fontSize: "15px",
    textAlign: "right",
    padding: 0,
  };

  const row = (label, field, isLast) => (
    <div
      key={label}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        alignItems: "center",
        gap: "20px",
        padding: "20px 0",
        borderBottom: isLast ? "none" : `1px solid ${s.line}`,
      }}
    >
      <label
        style={{
          fontFamily: fonts.mono,
          fontSize: "12px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          color: s.textMuted,
        }}
      >
        {label}
      </label>
      {field}
    </div>
  );

  const publishRide = async () => {
    if (!startLocation || !destinationLocation) {
      alert("Please set both pickup and destination locations.");
      return;
    }
    if (!seats || !vehicleName || !vehicleNumber || !departureDate || !departureTime) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE}/api/rides`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          from: startLocation.address,
          to: destinationLocation.address,
          startLocation,
          destinationLocation,
          departureDate,
          departureTime,
          vehicleName,
          vehicleNumber,
          vehicleType,
          totalSeats: Number(seats),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Ride Published Successfully!");
        setStartLocation(null);
        setDestinationLocation(null);
        setSeats("");
        setVehicleName("");
        setVehicleNumber("");
        setVehicleType("car");
        setDepartureDate("");
        setDepartureTime("");
      } else {
        alert(data.message || "Failed to publish ride");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "150px 80px 100px",
        background: s.bg,
        fontFamily: fonts.body,
      }}
    >
      {/* HEADER ROW — eyebrow/title on the left, "My Rides" on the right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "48px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: fonts.mono,
              fontSize: "13px",
              letterSpacing: "2.5px",
              color: s.accent,
              marginBottom: "24px",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaCar size={13} />
            DRIVER PORTAL
          </p>

          <h1
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "54px",
              fontWeight: "600",
              letterSpacing: "-1.5px",
              margin: 0,
            }}
          >
            Issue a <span style={{ color: s.accent }}>ride</span>
          </h1>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/driver/my-rides")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "13px 22px",
            borderRadius: "12px",
            border: `1px solid ${s.line}`,
            background: s.bgSoft,
            color: s.text,
            fontWeight: "600",
            fontSize: "14px",
            fontFamily: fonts.body,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <FaList size={13} color={s.accent} />
          My Rides
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "880px",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
          borderRadius: "22px",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", borderBottom: `1px solid ${s.line}` }}>
          <LocationStub
            label="Pickup location"
            isRed={false}
            location={startLocation}
            onLocationChange={setStartLocation}
            darkMode={darkMode}
          />

          <div style={{ position: "relative", width: "1px", background: s.line, flex: "0 0 auto" }}>
            <div
              style={{
                position: "absolute",
                top: "-9px",
                left: "-9px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: s.bgSoft,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-9px",
                left: "-9px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: s.bgSoft,
              }}
            />
          </div>

          <LocationStub
            label="Destination"
            isRed={true}
            location={destinationLocation}
            onLocationChange={setDestinationLocation}
            darkMode={darkMode}
          />
        </div>

        <div style={{ padding: "8px 30px 0" }}>
          {row(
            "Seats",
            <input
              type="number"
              placeholder="e.g. 3"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              style={fieldInputStyle}
            />
          )}
          {row(
            "Vehicle name",
            <input
              type="text"
              placeholder="Swift, Creta, i20..."
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
              style={fieldInputStyle}
            />
          )}
          {row(
            "Vehicle number",
            <input
              type="text"
              placeholder="OD02AB1234"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              style={fieldInputStyle}
            />
          )}
          {row(
            "Vehicle type",
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              style={{ ...fieldInputStyle, textAlign: "right", cursor: "pointer" }}
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
          )}
          {row(
            "Departure date",
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              style={fieldInputStyle}
            />
          )}
          {row(
            "Departure time",
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              style={fieldInputStyle}
            />,
            true
          )}
        </div>

        <div style={{ padding: "30px" }}>
          <motion.button
            whileHover={{ y: loading ? 0 : -2 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            onClick={publishRide}
            disabled={loading}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: "14px",
              border: "none",
              background: loading
                ? s.line
                : darkMode
                  ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                  : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
              color: loading ? s.textMuted : darkMode ? colors.ink : "#fff",
              fontSize: "15.5px",
              fontWeight: "700",
              fontFamily: fonts.body,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Publishing..." : "Publish ride"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default DriverCreateRide;

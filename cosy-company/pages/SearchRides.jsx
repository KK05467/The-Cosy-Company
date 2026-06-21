// src/pages/SearchRides.jsx
//
// REDESIGN NOTES (visual only — every function below is unchanged):
// - getTheme() replaced with the shared surface()/colors/fonts from
//   ../styles/tokens, so this page matches Home/Features/Footer instead of
//   carrying its own one-off theme object copied from "Hero.jsx".
// - The two LocationPickerMap cards are now framed as one ticket split by a
//   perforation (pickup stub | destination stub) instead of two separate
//   floating glass cards — continues the vocabulary from the hero's
//   rider/driver ticket.
// - The 4-icon feature row is now a single manifest strip with hairline
//   dividers instead of 4 duplicate blurred-glow cards.
// - forwardGeocode, reverseGeocode, MapClickHandler, handleSearch,
//   handleMapClick, handleDragEnd, and all state (from/to/searchText/etc.)
//   are untouched.

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { FaMapMarkerAlt, FaSearch, FaUsers, FaLeaf, FaShieldAlt, FaCar } from "react-icons/fa";
import { colors, fonts, surface } from "../styles/tokens";

/* Leaflet fix */
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

// Reverse geocode lat/lng → address string
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

// Forward geocode address string → { lat, lng }
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

/* ---------- MAP HANDLER ---------- */
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

/* ---------- LOCATION STUB (one half of the ticket) ---------- */
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
      {/* LABEL */}
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

      {/* INPUT */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
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
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={`Search ${label.toLowerCase()}`}
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
          aria-label={`Search ${label}`}
          style={{
            width: "44px",
            borderRadius: "12px",
            border: "none",
            background: searching ? s.line : s.accent,
            color: darkMode ? colors.ink : "#fff",
            cursor: searching ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FaSearch size={13} />
        </button>
      </div>

      {/* CONFIRMED LOCATION */}
      {location && (
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: "12.5px",
            color: s.textMuted,
            marginBottom: "14px",
            lineHeight: "1.5",
          }}
        >
          {location.address}
        </p>
      )}

      {/* MAP */}
      <div
        style={{
          height: "210px",
          borderRadius: "14px",
          overflow: "hidden",
          border: `1px solid ${s.line}`,
        }}
      >
        <MapContainer
          center={location ? [location.lat, location.lng] : defaultCenter}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

/* ---------- MAIN PAGE ---------- */
function SearchRides({ darkMode }) {
  const s = surface(darkMode);
  const navigate = useNavigate();

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handleSearch = () => {
    if (!from || !to) return alert("Select both pickup and destination first.");

    navigate(
      `/ride-results?from=${encodeURIComponent(from.address)}&to=${encodeURIComponent(to.address)}`
    );
  };

  const manifest = [
    { icon: <FaShieldAlt />, text: "Verified drivers" },
    { icon: <FaUsers />, text: "Shared rides" },
    { icon: <FaLeaf />, text: "Eco friendly" },
    { icon: <FaCar />, text: "Comfort travel" },
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
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 56px" }}
      >
        <p
          style={{
            fontFamily: fonts.mono,
            fontSize: "13px",
            letterSpacing: "2.5px",
            color: s.accent,
            marginBottom: "22px",
            textTransform: "uppercase",
          }}
        >
          BOOK A SEAT
        </p>

        <h1
          style={{
            fontFamily: fonts.display,
            fontSize: "54px",
            fontWeight: "600",
            letterSpacing: "-1.5px",
            color: s.text,
            marginBottom: "16px",
            lineHeight: "1.08",
          }}
        >
          Where are you headed?
        </h1>

        <p style={{ color: s.textMuted, fontSize: "17px", lineHeight: "1.7" }}>
          Drop a pin or search an address for both ends of your trip.
        </p>
      </motion.div>

      {/* TICKET — pickup stub | perforation | destination stub */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: s.bgSoft,
          border: `1px solid ${s.line}`,
          borderRadius: "22px",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex" }}>
          <LocationStub label="Pickup" location={from} onLocationChange={setFrom} darkMode={darkMode} />

          {/* PERFORATION */}
          <div style={{ position: "relative", width: "1px", background: s.line, flex: "0 0 auto" }}>
            <div
              style={{
                position: "absolute",
                top: "-9px",
                left: "-9px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: s.bg,
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
                background: s.bg,
              }}
            />
          </div>

          <LocationStub label="Destination" isRed location={to} onLocationChange={setTo} darkMode={darkMode} />
        </div>

        {/* SEARCH ACTION */}
        <div style={{ padding: "0 30px 30px" }}>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            style={{
              width: "100%",
              padding: "17px",
              borderRadius: "14px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              background: darkMode
                ? `linear-gradient(135deg, ${colors.goldSoft}, ${colors.gold})`
                : `linear-gradient(135deg, ${colors.forest}, ${colors.forestDeep})`,
              color: darkMode ? colors.ink : "#fff",
              fontSize: "15.5px",
              fontWeight: "700",
              fontFamily: fonts.body,
              cursor: "pointer",
            }}
          >
            <FaSearch size={14} />
            Search rides
          </motion.button>
        </div>
      </motion.div>

      {/* MANIFEST STRIP — replaces 4 duplicate glow cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: "1100px",
          margin: "44px auto 0",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          border: `1px solid ${s.line}`,
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        {manifest.map((f, i) => (
          <div
            key={f.text}
            style={{
              padding: "26px 20px",
              textAlign: "center",
              borderRight: i < manifest.length - 1 ? `1px solid ${s.line}` : "none",
              background: s.bgSoft,
            }}
          >
            <div style={{ color: s.accent, fontSize: "19px", marginBottom: "10px" }}>{f.icon}</div>
            <p style={{ color: s.text, fontSize: "14px", fontWeight: "600", margin: 0 }}>{f.text}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default SearchRides;

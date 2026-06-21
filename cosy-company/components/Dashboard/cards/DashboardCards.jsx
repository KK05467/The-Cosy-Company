// src/components/dashboard/cards/DashboardCards.jsx
//
// REDESIGN NOTES: replaced the 4 duplicate glow-radial cards with a single
// manifest strip (hairline-divided columns), same pattern used in
// Stats.jsx / SearchRides.jsx's feature row — keeps every "4 stat tiles"
// moment in the app reading as one design system instead of three.
//
// BUG FIX: this component takes a `darkMode` prop, but neither
// RiderDashboard.jsx nor DriverDashboard.jsx (below) were passing it down
// — so `darkMode` was always undefined here, meaning these cards were
// permanently stuck rendering as if darkMode={false} regardless of the
// app's actual theme. Fixed in both wrapper components.

import { motion } from "framer-motion";
import { FaWallet, FaCar, FaLeaf, FaUsers } from "react-icons/fa";
import { fonts, surface } from "../../../styles/tokens";

function DashboardCards({ driver, darkMode }) {
  const s = surface(darkMode);

  const cards = driver
    ? [
        { icon: <FaWallet />, title: "Today's earnings", value: "₹4,820" },
        { icon: <FaCar />, title: "Trips completed", value: "148" },
        { icon: <FaUsers />, title: "Passengers", value: "328" },
        { icon: <FaLeaf />, title: "Fuel saved", value: "120 L" },
      ]
    : [
        { icon: <FaWallet />, title: "Wallet balance", value: "₹2,400" },
        { icon: <FaCar />, title: "Booked rides", value: "42" },
        { icon: <FaUsers />, title: "Shared trips", value: "16" },
        { icon: <FaLeaf />, title: "CO₂ reduced", value: "82 kg" },
      ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        border: `1px solid ${s.line}`,
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      {cards.map((card, index) => (
        <div
          key={card.title}
          style={{
            padding: "28px 26px",
            background: s.bgSoft,
            borderRight: index < cards.length - 1 ? `1px solid ${s.line}` : "none",
          }}
        >
          <div style={{ color: s.accent, fontSize: "19px", marginBottom: "18px" }}>{card.icon}</div>

          <h3
            style={{
              fontFamily: fonts.display,
              color: s.text,
              fontSize: "32px",
              fontWeight: "600",
              marginBottom: "8px",
              letterSpacing: "-0.5px",
            }}
          >
            {card.value}
          </h3>

          <p style={{ color: s.textMuted, fontSize: "14px", margin: 0 }}>{card.title}</p>
        </div>
      ))}
    </motion.div>
  );
}

export default DashboardCards;

// src/components/dashboard/DriverDashboard.jsx
//
// BUG FIX: previously took no props at all and rendered <DashboardCards
// driver /> with no darkMode passed through — so the cards inside were
// always stuck in light-mode styling. Now accepts and forwards darkMode.

import DashboardCards from "./cards/DashboardCards";

function DriverDashboard({ darkMode }) {
  return (
    <div>
      <DashboardCards driver darkMode={darkMode} />
    </div>
  );
}

export default DriverDashboard;

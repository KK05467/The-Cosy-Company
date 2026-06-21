// src/components/dashboard/RiderDashboard.jsx
//
// BUG FIX: same issue as DriverDashboard.jsx — darkMode was never passed
// down to DashboardCards, so it was always undefined there.

import DashboardCards from "./cards/DashboardCards";

function RiderDashboard({ darkMode }) {
  return (
    <div>
      <DashboardCards darkMode={darkMode} />
    </div>
  );
}

export default RiderDashboard;

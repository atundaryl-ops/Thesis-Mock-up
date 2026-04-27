import React, { useState } from 'react';
import LoginScreen from './dashboards/LoginScreen';
import VehicleOwnerPortal from './dashboards/VehicleOwnerPortal';
import EnforcerDashboard from './dashboards/EnforcerDashboard';
import SupervisorDashboard from './dashboards/SupervisorDashboard';
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────

export default function TrafficViolationSystem() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('driver');

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) return <LoginScreen onLogin={handleLogin} />;

  switch (userType) {
    case 'driver': return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
    case 'enforcer': return <EnforcerDashboard onLogout={() => setIsLoggedIn(false)} />;
    case 'supervisor': return <SupervisorDashboard onLogout={() => setIsLoggedIn(false)} />;
    default: return <VehicleOwnerPortal onLogout={() => setIsLoggedIn(false)} />;
  }
}

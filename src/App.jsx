import React, { useState } from 'react';
import LoginScreen from './dashboards/LoginScreen';
import VehicleOwnerPortal from './dashboards/VehicleOwnerPortal';
import EnforcerDashboard from './dashboards/EnforcerDashboard';
import SupervisorDashboard from './dashboards/SupervisorDashboard';

// ─────────────────────────────────────────────────────────────
// SMART TRAFFIC VIOLATION MONITORING SYSTEM (STVMS)
// Main Application Router
// ─────────────────────────────────────────────────────────────

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  // Handle login from LoginScreen
  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  // Handle logout - return to login screen
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
  };

  // Render appropriate dashboard based on user type
  const renderDashboard = () => {
    switch (userType) {
      case 'driver':
        return <VehicleOwnerPortal onLogout={handleLogout} />;
      case 'enforcer':
        return <EnforcerDashboard onLogout={handleLogout} />;
      case 'supervisor':
        return <SupervisorDashboard onLogout={handleLogout} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  // If not logged in, show login screen
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Render the appropriate dashboard
  return renderDashboard();
};

export default App;

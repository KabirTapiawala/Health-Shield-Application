// Inside /client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import DirectMessaging from './pages/DirectMessaging';
import ScheduleAppointment from './pages/ScheduleAppointment'
import './styles/global.css';

function AppContent() {
  const location = useLocation();

  // Define routes where Sidebar should be hidden
  const hideSidebarPaths = ['/', '/login', '/signup'];

  return (
    <div className="app">
      {/* Render Sidebar only if the current path is not in hideSidebarPaths */}
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} /> {/* Default route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/inbox" element={<DirectMessaging />} />
          <Route path="/calendar" element={<ScheduleAppointment />} />
          {/* Add other routes later */}
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

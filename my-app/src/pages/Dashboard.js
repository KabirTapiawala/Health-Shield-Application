// /src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Appointments from '../components/Appointments';
import Calendar from '../components/Calendar';
import './Dashboard.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth

function Dashboard() {
  const { user } = useAuth(); // Get the user from context

  return (
    <div className="dashboard">
      <Header userName={user?.fullName || 'User'} /> {/* Pass user name to Header */}
      <Banner />
      <div className="main-content">
        <Appointments />
        <Calendar />
      </div>
    </div>
  );
}

export default Dashboard;

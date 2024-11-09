// /src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Appointments from '../components/Appointments';
import Calendar from '../components/Calendar';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <Header />
      <Banner />
      <div className="main-content">
        <Appointments />
        <Calendar />
      </div>
    </div>
  );
}

export default Dashboard;

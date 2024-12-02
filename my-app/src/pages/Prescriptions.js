import React, { useState, useEffect } from 'react';
import './Prescriptions.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import axios from 'axios'; // Import axios

const API_URL = 'http://localhost:5000/api';

function Prescriptions() {
  const [isCurrentTab, setIsCurrentTab] = useState(true);
  const [renewalStatus, setRenewalStatus] = useState(null);
  const { user } = useAuth(); // Access logged-in user's information
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({ name: '', dosage: '' });

  // Fetch prescriptions for the logged-in user by email
  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/prescriptions/${user.email}`);
      setPrescriptions(response.data);
    } catch (error) {
      alert('An error occurred while fetching prescriptions.');
    }
  };

  useEffect(() => {
    if (user && user.email) {
      fetchPrescriptions(); // Fetch prescriptions when the user is logged in
    }
  }, [user]);

  // Add prescription function
  const addPrescription = async (e) => {
    e.preventDefault();

    if (!newPrescription.name || !newPrescription.dosage) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      console.log('prescriptions...');
      const response = await axios.post(`${API_URL}/prescriptions`, {
        email: user.email, // Send user's email
        name: newPrescription.name,
        dosage: newPrescription.dosage,
      });

      setPrescriptions([...prescriptions, response.data.prescription]);
      setNewPrescription({ name: '', dosage: '' }); // Reset form
    } catch (error) {
      alert('An error occurred while adding the prescription.');
    }
  };

  const renderPrescriptionList = () => (
    <section className="prescription-list">
      {prescriptions.map((p) => (
        <div key={p._id} className="prescription-item">
          <span className="prescription-name">{p.name} {p.dosage}</span>
          <a href="#" className="view-details">View Details</a>
          <button className="renew-button" onClick={() => renewPrescription(p._id)}>
            Renew
          </button>
        </div>
      ))}
    </section>
  );

  const renewPrescription = (id) => {
    if (id === 1) {
      setRenewalStatus({
        success: false,
        message: "We're sorry, but your prescription renewal could not be processed at this time.",
      });
    } else if (id === 2) {
      setRenewalStatus({
        success: true,
        message: 'Thank you, your prescription renewal has been processed.',
      });
    }
  };

  const renderRenewalSuccess = () => (
    <div className="renewal-success">
      <h2>Prescription Renewal</h2>
      <p className="success-message">{renewalStatus.message}</p>
      <div className="renewal-details">
        <p>Fluoxetine 20 mg</p>
        <p>Dr. John Smith</p>
        <p>Date of Renewal: 10/22/2024</p>
        <p><strong>Pick-up time:</strong> 10:00 AM, 10/23/2024</p>
        <p><strong>Pick-up location:</strong> Walgreens, 7399 Chesnut Road</p>
      </div>
      <button onClick={() => setRenewalStatus(null)} className="renew-button">
        Back to Prescriptions
      </button>
    </div>
  );

  const renderRenewalFailure = () => (
    <div className="renewal-failure">
      <h2>Prescription Renewal</h2>
      <p className="error-message">{renewalStatus.message}</p>
      <button onClick={() => setRenewalStatus(null)} className="renew-button">
        Back to Prescriptions
      </button>
    </div>
  );

  return (
    <div className="prescriptions-page">
      <header>
        <h1>Prescriptions</h1>
        <div className="tabs">
          <button
            className={`tab ${isCurrentTab ? 'active' : ''}`}
            onClick={() => setIsCurrentTab(true)}
          >
            Current
          </button>
          <button
            className={`tab ${!isCurrentTab ? 'active' : ''}`}
            onClick={() => setIsCurrentTab(false)}
          >
            Past
          </button>
        </div>
      </header>
      {renewalStatus ? (
        renewalStatus.success ? renderRenewalSuccess() : renderRenewalFailure()
      ) : (
        isCurrentTab ? (
          <>
            {renderPrescriptionList()}
            <form className="add-prescription-form" onSubmit={addPrescription}>
              <h2>Add Prescription</h2>
              <input
                type="text"
                placeholder="Prescription Name"
                value={newPrescription.name}
                onChange={(e) => setNewPrescription({ ...newPrescription, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Dosage (e.g., 20 mg)"
                value={newPrescription.dosage}
                onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
              />
              <button type="submit" className="add-button">Add</button>
            </form>
          </>
        ) : (
          <p>No past prescriptions available.</p>
        )
      )}
    </div>
  );
}

export default Prescriptions;

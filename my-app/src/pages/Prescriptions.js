// /src/pages/Prescriptions.js
import React, { useState } from 'react';
import './Prescriptions.css';

function Prescriptions() {
  const [isCurrentTab, setIsCurrentTab] = useState(true);

  const prescriptions = [
    { id: 1, name: 'Amoxicillin', dosage: '20 mg' },
    { id: 2, name: 'Fluoxetine', dosage: '20 mg' },
  ];

  const renderPrescriptionList = () => (
    <section className="prescription-list">
      {prescriptions.map((p) => (
        <div key={p.id} className="prescription-item">
          <span className="prescription-name">{p.name} {p.dosage}</span>
          <a href="#" className="view-details">View Details</a>
          <button className="renew-button" onClick={() => renewPrescription(p.id)}>Renew</button>
        </div>
      ))}
    </section>
  );

  const renewPrescription = (id) => {
    const isSuccess = true;
    if (isSuccess) {
      renderRenewalSuccess();
    } else {
      renderRenewalFailure();
    }
  };

  const renderRenewalSuccess = () => (
    <div className="renewal-success">
      <h2>Prescription Renewal</h2>
      <p className="success-message">Thank you, your prescription renewal has been processed.</p>
      <div className="renewal-details">
        <p>Fluoxetine 20 mg</p>
        <p>Dr. John Smith</p>
        <p>Date of Renewal: 10/22/2024</p>
        <p><strong>Pick-up time:</strong> 10:00 AM, 10/23/2024</p>
        <p><strong>Pick-up location:</strong> Walgreens, 7399 Chesnut Road</p>
      </div>
    </div>
  );

  const renderRenewalFailure = () => (
    <div className="renewal-failure">
      <h2>Prescription Renewal</h2>
      <p className="error-message">We're sorry, but your prescription renewal could not be processed at this time.</p>
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
      {isCurrentTab ? renderPrescriptionList() : <p>No past prescriptions available.</p>}
    </div>
  );
}

export default Prescriptions;

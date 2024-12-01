import React from 'react';

function HealthProfile() {
    // In a real app, fetch this data from the backend
    const userProfile = {
        name: 'John Doe',
        conditions: ['Diabetes', 'Hypertension'],
        medications: ['Metformin', 'Lisinopril'],
    };

    return (
        <div className="health-profile">
            <h2>{userProfile.name}'s Health Profile</h2>
            <h3>Conditions</h3>
            <ul>
                {userProfile.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                ))}
            </ul>
            <h3>Medications</h3>
            <ul>
                {userProfile.medications.map((medication, index) => (
                    <li key={index}>{medication}</li>
                ))}
            </ul>
        </div>
    );
}

export default HealthProfile;

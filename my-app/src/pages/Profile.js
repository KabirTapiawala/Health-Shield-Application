import React, { useState } from 'react';
import './Profile.css';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editMode, setEditMode] = useState(false); // Track if in edit mode
  const [changePasswordMode, setChangePasswordMode] = useState(false); // Track if in change password mode
  const { user } = useAuth(); // Get the user from context

  // State variables for profile information
  const [profileInfo, setProfileInfo] = useState({
    name: user?.fullName || 'User',
    dob: user?.dob || "03/04/1996",
    phone: user?.phone || "+1 0000000000",
    email: user?.email || "name@email.com",
    bio: "General Patient",
    speechDisease: "None",
    physicalDisease: "None"
  });

  // State variables for change password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // Error state for validation
  const [phoneError, setPhoneError] = useState(''); // Error state for phone validation

  const medicalHistory = [
    {
      date: "August 15, 2023",
      description: "Strep throat, Treated",
      details: "Patient was diagnosed with strep throat and was treated with antibiotics."
    },
    {
      date: "June 10, 2023",
      description: "Flu, Treated",
      details: "Patient was treated for flu symptoms with rest and hydration."
    }
  ];

  // State to track the expanded state of details for each history item
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };


  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const toggleChangePasswordMode = () => {
    setChangePasswordMode(!changePasswordMode);
  };

  const handleMedicalHistoryDetailsToggle = (index) => {
    // Toggle the expanded state for the clicked history item
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const isNumeric = /^\d+$/.test(value);
      if (!isNumeric && value !== "") {
        setPhoneError("Phone number must contain only digits.");
        return;
      }
      if (value.length > 10) {
        setPhoneError("Phone number must be exactly 10 digits.");
        return;
      }
      setPhoneError(value.length === 10 ? "" : "Phone number must be exactly 10 digits.");
    }
    
    setProfileInfo({
      ...profileInfo,
      [name]: value
    });
  };

  const saveProfileInfo = async () => {
    if (phoneError) {
      alert('Please correct phone number before saving.');
      return;
    }

    const selectedDate = new Date(profileInfo.dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      alert('Date of birth cannot be in the future.');
      return;
    }

    setEditMode(false);

    try {
      const response = await axios.put(`${API_URL}/profile/update-profile`, {
        email: user.email,
        name: profileInfo.name,
        dob: profileInfo.dob,
        phone: profileInfo.phone,
        bio: profileInfo.bio,
      });

      if (response.data.success) {
        console.log('Profile updated successfully');
      } else {
        console.error('Failed to update profile:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Here you can add logic to handle the password change
    if (newPassword === confirmPassword) {
      try {
        const response = await axios.put(`${API_URL}/profile/change-password`, {
          email: profileInfo.email,
          password: newPassword
        });
  
        if (response.data.success) {
          console.log('Profile updated successfully');
          alert('Password changed successfully');
        } else {
          alert('Failed to change password.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
      
      // Reset fields after successful change
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setChangePasswordMode(false);
    } else {
      alert('New passwords do not match');
    }
  };

  return (
    <div className="main-content">
      {/* Header */}
      <div className="header">
        <h1>Profile</h1>
        <div className="user-nav">
          {/* <div className="lang-select">EN ▼</div>
          <span>🔔</span> */}
          <div className="avatar"></div>
          <span>{profileInfo.name}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>General</button>
        <button className={`tab ${activeTab === 'medical' ? 'active' : ''}`} onClick={() => handleTabClick('medical')}>Medical History</button>
        <button className={`tab ${activeTab === 'documents' ? 'active' : ''}`} onClick={() => handleTabClick('documents')}>Documents</button>
      </div>

      {/* Profile Page Content */}
      {activeTab === 'profile' && (
        <div id="profile-page" className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>
          </div>

          <div className="profile-info">
            <div className="profile-avatar"></div>
            <div>
              <h3>{profileInfo.name}</h3>
              <p>General Patient</p>
              <p>United States</p>
            </div>
            <button className="edit-btn" onClick={toggleEditMode}>{editMode ? "Cancel" : "✏️ Edit"}</button>
          </div>

          <div className="section">
            <h3 className="section-title">Personal Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Name</div>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={profileInfo.name}
                    onChange={handleInputChange}
                    maxLength={30} // Limit name to 30 characters
                  />
                ) : (
                  <div>{profileInfo.name}</div>
                )}
              </div>
              
              {/* View-only fields */}
              {/* <div className="info-item">
                <div className="info-label">Date Of Birth</div>
                <div>{profileInfo.dob}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Phone Number</div>
                <div>{profileInfo.phone}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Bio</div>
                <div>{profileInfo.bio}</div> */}
              <div className="info-item">
                <div className="info-label">Email Address</div>
                <div>{profileInfo.email}</div>
              </div>


              {/* Change view only into editablbe: */}

              <div className="info-item">
                <div className="info-label">Date Of Birth</div>
                {editMode ? (
                  <input
                    type="date"
                    name="dob"
                    value={profileInfo.dob}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>{profileInfo.dob}</div>
                )}
              </div>
              <div className="info-item">
                <div className="info-label">Phone Number</div>
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={profileInfo.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>{profileInfo.phone}</div>
                )}
              </div>
              {/* <div className="info-item">
                <div className="info-label">Email Address</div>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={profileInfo.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  <div>{profileInfo.email}</div>
                )}
              </div> */}
              <div className="info-item">
                <div className="info-label">Bio</div>
                {editMode ? (
                  <textarea
                    name="bio"
                    value={profileInfo.bio}
                    onChange={handleInputChange}
                    maxLength={300} // Limit bio to 300 characters
                  />
                ) : (
                  <div>{profileInfo.bio}</div>
                )}
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">Pre-existing Diseases</h3>
            <div className="diseases-grid">
              <div className="info-item">
                <div className="info-label">Speech</div>
                  <div>{profileInfo.speechDisease}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Physical</div>
                  <div>{profileInfo.physicalDisease}</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h3 className="section-title">General</h3>
            <div className="general-settings">
              <div>
                <p onClick={toggleChangePasswordMode} style={{ cursor: 'pointer', color: 'blue' }}>Change Password</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <p>Notifications</p>
                  <p>Enable Notifications</p>
                </div>
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                />
              </div>
            </div>
          </div>

          {editMode && (
            <button className="save-btn" onClick={saveProfileInfo}>Save</button>
          )}

          {/* Change Password Section */}
          {changePasswordMode && (
            <div className="change-password-section">
              <h3>Change Password</h3>
              <form onSubmit={handleChangePassword}>
                <div>
                  <label>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="change-password-btn">Change Password</button>
              </form>
              <button className="cancel-btn" onClick={toggleChangePasswordMode}>Cancel</button>
            </div>
          )}
        </div>
      )}

       {/* Medical History Tab Content */}
       {activeTab === 'medical' && (
        <div id="medical-history-page" className="medical-history">
          {medicalHistory.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-summary">
                <span>{item.date}: {item.description}</span>
                <button className="history-details-btn" onClick={() => toggleDetails(index)}>
                  {expandedIndex === index ? 'Hide Details ▲' : 'Details ▼'}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="details-section">
                  <p>{item.details}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Documents Tab Content */}
      {activeTab === 'documents' && (
        <div id="documents-page">
          <div className="documents-grid">
            <div className="document-card">
              <img src="/api/placeholder/300/200" alt="Blood report" />
              <h3>Blood report</h3>
              <p>May 14, 2023</p>
            </div>
            {/* Repeat for other documents */}
          </div>
          <button className="upload-btn">Upload new</button>
        </div>
      )}
    </div>
  );
}

export default Profile;

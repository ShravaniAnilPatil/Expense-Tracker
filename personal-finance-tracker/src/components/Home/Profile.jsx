import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    gender: 'Male',
    workProf: 'Software Engineer',
    dob: '1994-05-15',
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Profile</h2>
      </div>
      <div style={styles.profileContainer}>
        <div style={styles.gridContainer}>
          {/* Left Column */}
          <div style={styles.fieldContainer}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          </div>

          {/* Right Column */}
          <div style={styles.fieldContainer}>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label>Work Profile:</label>
            <input
              type="text"
              name="workProf"
              value={profileData.workProf}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={profileData.dob}
              onChange={handleChange}
              style={styles.input}
              disabled={!isEditing}
            />
          </div>
        </div>
        <button onClick={handleEditClick} style={styles.editButton}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    background: 'linear-gradient(135deg, #3D52A0, #ADBBDA)',
    padding: '20px',
    borderRadius: '8px',
    color: 'white',
    textAlign: 'center',
  },
  headerText: {
    margin: 0,
    fontSize: '2rem',
  },
  profileContainer: {
    marginTop: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // 2 columns
    gap: '20px',
  },
  fieldContainer: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginTop: '5px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1.1rem',
    backgroundColor: '#f0f0f0', // Make the disabled fields visually different
  },
  editButton: {
    padding: '12px 24px',
    backgroundColor: '#2575fc',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    marginTop: '20px',
  },
};

export default Profile;

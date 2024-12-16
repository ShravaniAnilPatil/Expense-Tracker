import React, { useState,useContext,  useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext.js";
const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [edituser, setUser] = useState({
    username: '',
    email: '',
    age: '',
    gender: '',
    dob: '',
    workingStatus: '',
  });
const { user } = useContext(AuthContext);
console.log("**")
console.log(user)
  const loggedInUserEmail = localStorage.getItem('email'); // Assuming email is stored here after login
  const genderOptions = ['Male', 'Female', 'Other'];
  const workingStatusOptions = ['Student', 'Housewife', 'Working Professional'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile/:${user.id}", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("all")
        console.log(data.username)
        if (response.ok) {
          setUser({
            username: data.username || '',
            email: data.email || '',
            age: data.age || '',
            gender: data.gender || '',
            dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
            workingStatus: data.workingStatus || '',
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (loggedInUserEmail) {
      fetchUserData();
    }
  }, [loggedInUserEmail]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = () => {
    setEditMode((prev) => !prev); // Toggle edit mode
  };

  const handleSave = async () => {
    if (editMode) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/update/${loggedInUserEmail}", {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user), // Send the updated user data
        });

        if (response.ok) {
          console.log('Profile updated successfully');
        } else {
          console.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    setEditMode(false); // Turn off edit mode after saving
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
              name="username"
              value={edituser.username}
              onChange={handleChange}
              style={styles.input}
              disabled={!editMode}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={edituser.age}
              onChange={handleChange}
              style={styles.input}
              disabled={!editMode}
            />
          </div>
          <div style={styles.fieldContainer}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={edituser.email}
              onChange={handleChange}
              style={styles.input}
              disabled
            />
          </div>

          {/* Right Column */}
          <div style={styles.fieldContainer}>
            <label>Gender:</label>
            <select
              name="gender"
              value={edituser.gender}
              onChange={handleChange}
              style={styles.input}
              disabled={!editMode}
            >
              {genderOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldContainer}>
            <label>Work Profile:</label>
            <select
              name="workingStatus"
              value={user.workingStatus}
              onChange={handleChange}
              style={styles.input}
              disabled={!editMode}
            >
              {workingStatusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div style={styles.fieldContainer}>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={edituser.dob}
              onChange={handleChange}
              style={styles.input}
              disabled={!editMode}
            />
          </div>
        </div>
        <button onClick={handleEditClick} style={styles.editButton}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && (
          <button onClick={handleSave} style={styles.saveButton}>
            Save
          </button>
        )}
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
  saveButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    marginTop: '20px',
  },
};

export default Profile;
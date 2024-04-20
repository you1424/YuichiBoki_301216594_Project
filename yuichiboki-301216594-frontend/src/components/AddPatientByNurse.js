import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { PATIENT_SIGNUP } from '../graphql';
import '../Styles/AddPatientByNurse.css';

const AddPatientByNurse = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [patientName, setPatientName] = useState('');
  const [patientUserName, setPatientUserName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [patientSignup] = useMutation(PATIENT_SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patientSignup({
        variables: {
          patientInput: {
            patientName,
            patientUserName,
            patientEmail,
            patientPassword
          }
        }
      });
      // Redirect back to the dashboard after successful registration
      navigate('/nurse-dashboard');
    } catch (error) {
      console.error('Error during patient registration:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Add Patient</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <label>Username:</label>
        <input
          type="text"
          value={patientUserName}
          onChange={(e) => setPatientUserName(e.target.value)}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={patientPassword}
          onChange={(e) => setPatientPassword(e.target.value)}
          required
        />
        <button type="submit">Register Patient</button>
      </form>
    </div>
  );
};

export default AddPatientByNurse;

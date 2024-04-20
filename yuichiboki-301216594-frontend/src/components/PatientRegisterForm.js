import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { PATIENT_SIGNUP } from '../graphql';
import '../Styles/PatientRegisterForm.css';

const PatientRegisterForm = () => {
  const [patientName, setPatientName] = useState('');
  const [patientUserName, setPatientUserName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPassword, setPatientPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const [patientSignup] = useMutation(PATIENT_SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting patient registration form...');

    try {
      console.log('Form data:', {
        patientName,
        patientUserName,
        patientEmail,
        patientPassword
      });

      const { data } = await patientSignup({
        variables: {
          patientInput: {
            patientName,
            patientUserName,
            patientEmail,
            patientPassword
          }
        }
      });
            
      // Navigate to the patient dashboard with patient ID
      navigate(`/patient-login`);
    } catch (error) {
      console.error('Patient signup error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Patient Registration</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default PatientRegisterForm;

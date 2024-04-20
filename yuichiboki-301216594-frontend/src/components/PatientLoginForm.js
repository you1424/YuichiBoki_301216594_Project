import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { PATIENT_LOGIN } from '../graphql';
import '../Styles/PatientLoginForm.css';

const PatientLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const [patientLogin] = useMutation(PATIENT_LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await patientLogin({
        variables: { email, password }
      });
      const { token, patientId } = data.patientLogin;
      // Navigate to the patient dashboard with patient ID
      navigate(`/patient-dashboard/${patientId}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Patient Login</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/patient-register">Register</Link></p>
    </div>
  );
};

export default PatientLoginForm;

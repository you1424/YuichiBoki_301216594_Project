import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { NURSE_SIGNUP } from '../graphql';
import '../Styles/NurseRegisterForm.css';

const NurseRegisterForm = () => {
  const [nurseInfo, setNurseInfo] = useState({
    nurseName: '',
    nurseUserName: '',
    nurseEmail: '',
    nursePassword: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const [nurseSignup] = useMutation(NURSE_SIGNUP);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nurseSignup({ variables: { nurseInput: nurseInfo } });
      const { token } = data.nurseSignup;
      // Save token to localStorage or state for authentication
      console.log('Registration successful! Token:', token);
      // Navigate to the nurse dashboard page after successful registration
      navigate('/nurse-login');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e) => {
    setNurseInfo({ ...nurseInfo, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Nurse Registration</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="nurseName"
          value={nurseInfo.nurseName}
          onChange={handleChange}
          required
        />
        <label>Username:</label>
        <input
          type="text"
          name="nurseUserName"
          value={nurseInfo.nurseUserName}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="nurseEmail"
          value={nurseInfo.nurseEmail}
          onChange={handleChange}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="nursePassword"
          value={nurseInfo.nursePassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default NurseRegisterForm;

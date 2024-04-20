import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { NURSE_LOGIN } from '../graphql';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../Styles/NurseLoginForm.css';

const NurseLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [nurseLogin] = useMutation(NURSE_LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await nurseLogin({ variables: { email, password } });
      const { token } = data.nurseLogin;
      console.log('Login successful! Token:', token);
      localStorage.setItem('nurseToken', token); // Store token in localStorage
      navigate('/nurse-dashboard'); // Redirect to nurse dashboard
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage(error.message);
    }
  };
  
  return (
    <div>
      <h2>Nurse Login</h2>
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
      <Link to="/nurse-register">Register as Nurse</Link>
    </div>
  );
};

export default NurseLoginForm;

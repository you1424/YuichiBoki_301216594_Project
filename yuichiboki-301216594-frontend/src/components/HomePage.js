import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="container"> {/* Apply container class */}
    <h1>Welcome to the Hospital System</h1>
    <div className="link-container"> {/* Apply link-container class */}
      <div>
        <h2>Nurse Login</h2>
        <Link to="/nurse-login" className="link">Login as Nurse</Link> {/* Apply link class */}
      </div>
      <div>
        <h2>Patient Login</h2>
        <Link to="/patient-login" className="link">Login as Patient</Link> {/* Apply link class */}
      </div>
    </div>
  </div>

  );
};

export default HomePage;

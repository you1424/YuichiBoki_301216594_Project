import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../Styles/PatientDashboard.css';

const PatientDashboard = () => {
  // Retrieve the patientId from URL params
  const { patientId } = useParams();

  return (
    <div>
      <h2>Welcome to Patient Dashboard</h2>
      <ul>
        <li>
          <Link to={`/add-vitals/${patientId}`}>Add Vitals</Link>
        </li>
        <li>
          <Link to={`/covid-checklist/${patientId}`}>COVID Checklist</Link>
        </li>
        <li>
          <Link to={`/patient-game-page`}>Patient Game Page</Link>
        </li>
      </ul>
    </div>
  );
};

export default PatientDashboard;

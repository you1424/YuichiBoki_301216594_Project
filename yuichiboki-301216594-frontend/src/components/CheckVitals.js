import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { GET_PATIENT_VITAL_SIGNS } from '../graphql';
import '../Styles/CheckVitals.css';

function CheckVitals() {
  const { patientId } = useParams();
  const [getAllPatientVitalSigns, { loading, error, data, refetch }] = useLazyQuery(GET_PATIENT_VITAL_SIGNS);
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    getAllPatientVitalSigns({ variables: { patientId } });
  }, [getAllPatientVitalSigns, patientId]);

  useEffect(() => {
    if (data && data.getPatientVitalSigns) {
      setVitals(data.getPatientVitalSigns);
      refetch();
    }
  }, [data]);

  return (
    <div>
      <h2>Check Vitals</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {vitals && vitals.length > 0 && (
        <div>
          <h3>Vitals Information</h3>
          <table>
            <thead>
              <tr>
                <th>Heart Rate</th>
                <th>Body Temperature</th>
                <th>Blood Pressure</th>
                <th>Respiratory Rate</th>
                <th>Pulse Rate</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {vitals.map((vital, index) => (
                <tr key={index}>
                  <td>{vital.heartRate}</td>
                  <td>{vital.bodyTemperature}</td>
                  <td>{vital.bloodPressure}</td>
                  <td>{vital.respiratoryRate}</td>
                  <td>{vital.pulseRate}</td>
                  <td>{vital.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Link to={`/add-vitals/${patientId}`}>
        <button>Add Vitals</button>
      </Link>
    </div>
  );
}

export default CheckVitals;

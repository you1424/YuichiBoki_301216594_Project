import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_VITAL_SIGNS } from '../graphql'; // Import the GraphQL mutation for adding vitals
import '../Styles/AddVitals.css';

function AddVitals() {
  const { patientId } = useParams(); // Access the patientId parameter from the URL
  const [vitalsInput, setVitalsInput] = useState({
    heartRate: '',
    bodyTemperature: '',
    bloodPressure: '',
    respiratoryRate: '',
    pulseRate: '',
    weight: ''
  });

  // Define useMutation hook to execute the ADD_VITALS mutation
  const [addVitals, { loading, error }] = useMutation(ADD_VITAL_SIGNS);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVitalsInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    console.log(vitalsInput);
    e.preventDefault();
    try {
      await addVitals({
        variables: {
          patientId : patientId,
          vitalSignsInput: vitalsInput
        }
      });
      // Clear the input fields after successful submission
      setVitalsInput({
        heartRate: '',
        bodyTemperature: '',
        bloodPressure: '',
        respiratoryRate: '',
        pulseRate: '',
        weight: ''
      });
      navigate(`/check-vitals/${patientId}`);
    } catch (error) {
      console.error('Error adding vitals:', error);
    }
  };

  return (
    <div>
      <h2>Add Vitals</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Heart Rate:
          <input type="text" name="heartRate" value={vitalsInput.heartRate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Body Temperature:
          <input type="text" name="bodyTemperature" value={vitalsInput.bodyTemperature} onChange={handleChange} />
        </label>
        <br />
        <label>
          Blood Pressure:
          <input type="text" name="bloodPressure" value={vitalsInput.bloodPressure} onChange={handleChange} />
        </label>
        <br />
        <label>
          Respiratory Rate:
          <input type="text" name="respiratoryRate" value={vitalsInput.respiratoryRate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Pulse Rate:
          <input type="text" name="pulseRate" value={vitalsInput.pulseRate} onChange={handleChange} />
        </label>
        <br />
        <label>
          Weight:
          <input type="text" name="weight" value={vitalsInput.weight} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Adding vitals...</p>}
    </div>
  );
}

export default AddVitals;

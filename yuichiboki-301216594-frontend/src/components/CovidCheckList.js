import React, { useState } from 'react';
import '../Styles/CovidCheckList.css';

const CovidChecklist = () => {
  const [symptoms, setSymptoms] = useState({
    fever: false,
    cough: false,
    shortnessOfBreath: false,
    soreThroat: false,
    lossOfTasteOrSmell: false
  });

  const handleSymptomChange = (e) => {
    const { name, checked } = e.target;
    setSymptoms(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic to handle the checklist submission here
    console.log('Symptoms:', symptoms);
    // Reset the form after submission
    setSymptoms({
      fever: false,
      cough: false,
      shortnessOfBreath: false,
      soreThroat: false,
      lossOfTasteOrSmell: false
    });
  };

  return (
    <div>
      <h2>COVID-19 Checklist</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="checkbox"
            name="fever"
            checked={symptoms.fever}
            onChange={handleSymptomChange}
          />
          Fever
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="cough"
            checked={symptoms.cough}
            onChange={handleSymptomChange}
          />
          Cough
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="shortnessOfBreath"
            checked={symptoms.shortnessOfBreath}
            onChange={handleSymptomChange}
          />
          Shortness of Breath
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="soreThroat"
            checked={symptoms.soreThroat}
            onChange={handleSymptomChange}
          />
          Sore Throat
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="lossOfTasteOrSmell"
            checked={symptoms.lossOfTasteOrSmell}
            onChange={handleSymptomChange}
          />
          Loss of Taste or Smell
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CovidChecklist;

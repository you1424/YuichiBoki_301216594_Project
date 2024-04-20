import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import NurseLoginForm from './components/NurseLoginForm';
import NurseRegisterForm from './components/NurseRegisterForm';
import PatientLoginForm from './components/PatientLoginForm';
import PatientRegisterForm from './components/PatientRegisterForm';
import NurseDashboard from './components/NurseDashboard';
import AddPatientByNurse from './components/AddPatientByNurse';
import CheckVitals from './components/CheckVitals';
import AddVitals from './components/AddVitals';
import PatientDashboard from './components/PatientDashboard';
import PatientGamePage from './components/PatientGamePage';
import CovidCheckList from './components/CovidCheckList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route path="/nurse-login" element={<NurseLoginForm/>} />
        <Route path="/patient-login" element={<PatientLoginForm/>} />
        <Route path="/nurse-register" element={<NurseRegisterForm/>} />
        <Route path="/patient-register" element={<PatientRegisterForm/>} />
        <Route path="/nurse-dashboard" element={<NurseDashboard/>} />
        <Route path="/add-patient" element={<AddPatientByNurse/>} />
        <Route path="/check-vitals/:patientId" element={<CheckVitals/>} />
        <Route path="/add-vitals/:patientId" element={<AddVitals/>} />
        <Route path="/patient-dashboard/:patientId" element={<PatientDashboard/>} />
        <Route path="/covid-checklist/:patientId" element={<CovidCheckList/>} />
        <Route path="/patient-game-page" element={<PatientGamePage/>} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation
import { GET_PATIENT_BY_ID, GET_ALL_PATIENTS } from "../graphql"; // Import the GraphQL queries
import "../Styles/NurseDashboard.css";

function NurseDashboard() {
  const [patientId, setPatientId] = useState("");
  const [searchedPatient, setSearchedPatient] = useState(null);
  const [getAllPatients, { loading, error, data, refetch }] =
    useLazyQuery(GET_ALL_PATIENTS);
  const [
    getPatientById,
    { loading: searchLoading, error: searchError, data: searchData },
  ] = useLazyQuery(GET_PATIENT_BY_ID);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    // Fetch all patients on component mount
    getAllPatients();
    refetch();
  }, [getAllPatients]);

  const handleSearch = () => {
    getPatientById({ variables: { patientId } });
    console.log(searchData)
    setSearchedPatient(searchData)
  };

  const handleClear = () => {
    // Clear the search and fetch all patients again
    setPatientId("");
    getAllPatients();
    setSearchedPatient(null);
  };

  const handleCheckVitals = (id) => {
    // Navigate to the check vitals page with patientId as a parameter
    navigate(`/check-vitals/${id}`);
  };


  return (
    <div>
      <h2>Welcome to Nurse Dashboard</h2>
      <div>
        {/* Button to add a new patient */}
        <Link to="/add-patient">
          <button>Add Patient</button>
        </Link>
        <label>Enter Patient ID: </label>
        <input
          type="text"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {loading || searchLoading ? <p>Loading...</p> : null}
      {error || searchError ? (
        <p>Error: {error?.message || searchError?.message}</p>
      ) : null}
      {!searchedPatient && data && (
        <div>
          <h3>Patient List</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.getAllPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.patientName}</td>
                  <td>{patient.patientUserName}</td>
                  <td>{patient.patientEmail}</td>
                  <td>
                    <button onClick={() => handleCheckVitals(patient._id)}>
                      Check Vitals
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {searchedPatient && (
        <div>
          <h3>Searched Patient Information</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{searchData?.getPatientById.patientName}</td>
                <td>{searchData?.getPatientById.patientUserName}</td>
                <td>{searchData?.getPatientById.patientEmail}</td>
                <td>
                  <button onClick={() => handleCheckVitals(patientId)}>
                    Check Vitals
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default NurseDashboard;

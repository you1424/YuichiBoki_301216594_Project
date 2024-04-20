import { gql } from '@apollo/client';

// Nurse mutations
export const NURSE_SIGNUP = gql`
  mutation NurseSignup($nurseInput: NurseInput!) {
    nurseSignup(nurseInput: $nurseInput) {
      token
      role
    }
  }
`;

export const NURSE_LOGIN = gql`
  mutation NurseLogin($email: String!, $password: String!) {
    nurseLogin(email: $email, password: $password) {
      token
      role
    }
  }
`;

// Patient mutations
export const PATIENT_SIGNUP = gql`
  mutation PatientSignup($patientInput: PatientInput!) {
    patientSignup(patientInput: $patientInput) {
      token
      role
      patientId
    }
  }
`;

export const PATIENT_LOGIN = gql`
  mutation PatientLogin($email: String!, $password: String!) {
    patientLogin(email: $email, password: $password) {
      token
      role
      patientId
    }
  }
`;

export const ADD_VITAL_SIGNS = gql`
  mutation AddVitalSigns($patientId: ID!, $vitalSignsInput: VitalSignsInput!) {
    addVitalSigns(patientId: $patientId, vitalSignsInput: $vitalSignsInput) {
      patientName
      patientUserName
      patientEmail
      vitalSigns {
        heartRate
        bodyTemperature
        bloodPressure
        respiratoryRate
        pulseRate
        weight
      }
    }
  }
`;

export const UPDATE_VITAL_SIGNS = gql`
  mutation UpdateVitalSigns($patientId: ID!, $vitalSignsInput: VitalSignsInput!) {
    updateVitalSigns(patientId: $patientId, vitalSignsInput: $vitalSignsInput) {
      patientName
      patientUserName
      patientEmail
      vitalSigns {
        heartRate
        bodyTemperature
        bloodPressure
        respiratoryRate
        pulseRate
        weight
      }
    }
  }
`;

export const DELETE_VITAL_SIGNS = gql`
  mutation DeleteVitalSigns($patientId: ID!) {
    deleteVitalSigns(patientId: $patientId) {
      patientName
      patientUserName
      patientEmail
      vitalSigns {
        heartRate
        bodyTemperature
        bloodPressure
        respiratoryRate
        pulseRate
        weight
      }
    }
  }
`;

// Nurse queries
export const GET_NURSE_BY_ID = gql`
  query GetNurseById($nurseId: ID!) {
    getNurseById(nurseId: $nurseId) {
      nurseName
      nurseUserName
      nurseEmail
    }
  }
`;

// Patient queries
export const GET_PATIENT_BY_ID = gql`
  query GetPatientById($patientId: ID!) {
    getPatientById(patientId: $patientId) {
      patientName
      patientUserName
      patientEmail
      vitalSigns {
        heartRate
        bodyTemperature
        bloodPressure
        respiratoryRate
        pulseRate
        weight
      }
    }
  }
`;

export const GET_PATIENT_VITAL_SIGNS = gql`
  query GetPatientVitalSigns($patientId: ID!) {
    getPatientVitalSigns(patientId: $patientId) {
      heartRate
      bodyTemperature
      bloodPressure
      respiratoryRate
      pulseRate
      weight
    }
  }
`;

export const GET_ALL_PATIENTS = gql`
  query GetAllPatients {
    getAllPatients {
      _id
      patientName
      patientUserName
      patientEmail
      vitalSigns {
        heartRate
        bodyTemperature
        bloodPressure
        respiratoryRate
        pulseRate
        weight
      }
    }
  }
`;

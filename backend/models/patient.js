const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define schema for the vital signs of the patient
const patientVitalSignsSchema = new Schema({
  heartRate: {
    type: String,
  },
  bodyTemperature: {
    type: String,
  },
  bloodPressure: {
    type: String,
  },
  respiratoryRate: {
    type: String,
  },
  pulseRate: {
    type: String,
  },
  weight: {
    type: String,
  }
});

// Define schema for the core details of the patient
const patientCoreSchema = new Schema({
  patientName: {
    type: String,
    required: true
  },
  patientUserName: {
    type: String,
    required: true
  },
  patientEmail: {
    type: String,
    required: true,
    unique: true
  },
  patientPassword: {
    type: String,
    required: true
  },
  // Reference to multiple vital signs schema
  vitalSigns: [{
    type: Schema.Types.ObjectId,
    ref: 'PatientVitalSigns'
  }]
});

// Create models for both schemas
const PatientCore = mongoose.model('PatientCore', patientCoreSchema);
const PatientVitalSigns = mongoose.model('PatientVitalSigns', patientVitalSignsSchema);

module.exports = { PatientCore, PatientVitalSigns };

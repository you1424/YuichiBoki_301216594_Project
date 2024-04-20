const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { isEmail, isLength } = require('validator');
const cors = require("cors")

// Load environment variables
dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Nurse model
const Nurse = require('./models/nurse');

// PatientCore model
const { PatientCore, PatientVitalSigns } = require('./models/patient');


// Define GraphQL schema
const typeDefs = gql`
  type Nurse {
    nurseName: String!
    nurseUserName: String!
    nurseEmail: String!
  }

  type PatientCore {
    _id: ID!
    patientName: String!
    patientUserName: String!
    patientEmail: String!
    vitalSigns: [VitalSigns]
  }

  type VitalSigns {
    heartRate: String
    bodyTemperature: String
    bloodPressure: String
    respiratoryRate: String
    pulseRate: String
    weight: String
  }

  type AuthPayload {
    token: String!
    role: String!
    patientId: ID! 
  }

  type Query {
    getNurseById(nurseId: ID!): Nurse
    getPatientById(patientId: ID!): PatientCore
    getAllPatients: [PatientCore!]!
    getPatientVitalSigns(patientId: ID!): [VitalSigns]
  }

  type Mutation {
    nurseSignup(nurseInput: NurseInput!): AuthPayload!
    nurseLogin(email: String!, password: String!): AuthPayload!
    patientSignup(patientInput: PatientInput!): AuthPayload!
    patientLogin(email: String!, password: String!): AuthPayload!
    addVitalSigns(patientId: ID!, vitalSignsInput: VitalSignsInput!): PatientCore
    updateVitalSigns(patientId: ID!, vitalSignsInput: VitalSignsInput!): PatientCore
    deleteVitalSigns(patientId: ID!): PatientCore
  }

  input NurseInput {
    nurseName: String!
    nurseUserName: String!
    nurseEmail: String!
    nursePassword: String!
  }

  input PatientInput {
    patientName: String!
    patientUserName: String!
    patientEmail: String!
    patientPassword: String!
  }

  input VitalSignsInput {
    heartRate: String
    bodyTemperature: String
    bloodPressure: String
    respiratoryRate: String
    pulseRate: String
    weight: String
  }
`;


// Define resolvers
const resolvers = {
  Query: {
    getNurseById: async (_, { nurseId }) => {
      return await Nurse.findById(nurseId);
    },
    
    getPatientById: async (_, { patientId }) => {
      return await PatientCore.findById(patientId).populate('vitalSigns');
    },
    // In the backend resolver
    getAllPatients: async () => {
      console.log("Fetching all patients...");
      const patients = await PatientCore.find().populate('vitalSigns');
      console.log("Fetched patients:", patients);
      return patients;
    },

   getPatientVitalSigns: async (_, { patientId }) => {
      try {
        // Find the patient by ID
        const patient = await PatientCore.findById(patientId);
        if (!patient) {
          throw new Error('Patient not found');
        }

        // Populate and return the vital signs
        return await PatientVitalSigns.find({ _id: { $in: patient.vitalSigns } }); // Fetch all vital signs for the patient
      } catch (error) {
        console.error('Error getting patient vital signs:', error);
        throw new Error('Failed to get patient vital signs');
      }
    },
  },
  Mutation: {
    nurseSignup: async (_, { nurseInput }) => {
      const { nurseEmail, nursePassword } = nurseInput;

      // Validate email format and password length
      if (!isEmail(nurseEmail)) {
        throw new Error('Invalid email format');
      }
      if (!isLength(nursePassword, { min: 6 })) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Check if nurse with the same email already exists
      const existingNurse = await Nurse.findOne({ nurseEmail });
      if (existingNurse) {
        throw new Error('Nurse with this email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(nursePassword, 10);

      // Create a new nurse
      const newNurse = new Nurse({ ...nurseInput, nursePassword: hashedPassword });
      await newNurse.save();

      // Generate JWT token
      const token = jwt.sign({ nurseId: newNurse._id, nurseId: newNurse._id, role: 'nurse' }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return { token, role: 'nurse', nurseId: newNurse._id };
    },
    nurseLogin: async (_, { email, password }) => {
        console.log('Attempting nurse login with email:', email); // Add this line for logging
        try {
          // Find nurse by email
          const nurse = await Nurse.findOne({ nurseEmail: email });
          if (!nurse) {
            throw new Error('Invalid email');
          }
          console.log(password)
          console.log(nurse.nursePassword)
          // Check if password matches
          const isPasswordValid = await bcrypt.compare(password, nurse.nursePassword);
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
          // Generate JWT token
          const token = jwt.sign({ nurseId: nurse._id, nurseId: nurse._id, role: 'nurse' }, process.env.JWT_SECRET, { expiresIn: '1h' });
          console.log('Nurse login successful!');
          return { token, role: 'nurse' , nurseId: nurse._id};
        } catch (error) {
          console.error('Nurse login error:', error);
          throw error;
        }
      },
      patientSignup: async (_, { patientInput }) => {
        try {
          const { patientEmail, patientPassword } = patientInput;
      
          // Validate email format and password length
          if (!isEmail(patientEmail)) {
            throw new Error('Invalid email format');
          }
          if (!isLength(patientPassword, { min: 6 })) {
            throw new Error('Password must be at least 6 characters long');
          }
      
          const existingPatient = await PatientCore.findOne({ patientEmail });
          if (existingPatient) {
            throw new Error('Patient with this email already exists');
          }
      
          // Hash the password
          const hashedPassword = await bcrypt.hash(patientPassword, 10);
      
          // Create a new patient instance
          const newPatientCore = new PatientCore({ ...patientInput, patientPassword: hashedPassword });
      
          // Save the new patient to the database
          await newPatientCore.save();
      
          // Inside the patientSignup resolver
          console.log('Newly created patient ID:', newPatientCore._id);
      
          // Generate JWT token
          const token = jwt.sign({ patientId: newPatientCore._id , role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
          return { token, role: 'patient', patientId: newPatientCore._id };
        } catch (error) {
          console.error('Patient signup error:', error);
          throw new Error('Failed to register patient');
        }
      },
      
      patientLogin: async (_, { email, password }) => {
        // Find patient by email
        const patient = await PatientCore.findOne({ patientEmail: email });
        if (!patient) {
          throw new Error('Invalid email or password');
        }
        // Check if password matches
        const isPasswordValid = await bcrypt.compare(password, patient.patientPassword);
        if (!isPasswordValid) {
          throw new Error('Invalid email or password');
        }
        // Generate JWT token
        const token = jwt.sign({ patientId: patient._id, patientId: patient._id, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { token, role: 'patient',patientId: patient._id};
      },
      
      addVitalSigns: async (_, { patientId, vitalSignsInput }) => {
        console.log('Received request to add vitals for patient:', patientId);
        console.log('Received vitals data:', vitalSignsInput);
        
        try {
          // Find the patient by ID
          const patient = await PatientCore.findById(patientId);
          if (!patient) {
            console.error('PatientCore not found');
            throw new Error('PatientCore not found');
          }
        
          // Create a new PatientVitalSigns instance with all vital sign fields
          const vitalSigns = new PatientVitalSigns({
            heartRate: vitalSignsInput.heartRate,
            bodyTemperature: vitalSignsInput.bodyTemperature,
            bloodPressure: vitalSignsInput.bloodPressure,
            respiratoryRate: vitalSignsInput.respiratoryRate,
            pulseRate: vitalSignsInput.pulseRate,
            weight: vitalSignsInput.weight
          });
        
          // Save the vital signs document separately
          await vitalSigns.save();
        
          // Update the patient's vitalSigns reference with the ID of the newly created vital signs document
          // If the patient already has vital signs, push the new vital signs to the existing array
          if (!patient.vitalSigns) {
            patient.vitalSigns = [vitalSigns._id];
          } else {
            patient.vitalSigns.push(vitalSigns._id);
          }
        
          // Save the patient
          await patient.save();
        
          console.log('Vital signs added successfully for patient:', patientId);
          
          return patient;
        } catch (error) {
          console.error('Error adding vital signs:', error);
          throw new Error('Failed to add vital signs');
        }
      },
      
      updateVitalSigns: async (_, { patientId, vitalSignsInput }) => {
        try {
          const patient = await PatientCore.findById(patientId);
          if (!patient) {
            throw new Error('PatientCore not found');
          }
      
          // If you want to update all the vital signs, you can simply set the array to the new value
          // This assumes that vitalSignsInput is an array of new vital signs
          patient.vitalSigns = vitalSignsInput;
          await patient.save();
      
          return patient;
        } catch (error) {
          console.error('Error updating vital signs:', error);
          throw new Error('Failed to update vital signs');
        }
      },
      
      deleteVitalSigns: async (_, { patientId }) => {
        try {
          const patient = await PatientCore.findById(patientId);
          if (!patient) {
            throw new Error('PatientCore not found');
          }
      
          // Clear the array of vital signs
          patient.vitalSigns = [];
          await patient.save();
      
          return patient;
        } catch (error) {
          console.error('Error deleting vital signs:', error);
          throw new Error('Failed to delete vital signs');
        }
      },
    }
};

// Create an ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Create an Express app
const app = express();

// Start the ApolloServer and apply middleware
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app });
}

app.use(cors());

// Start the server
startApolloServer().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

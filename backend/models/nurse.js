const mongoose = require('mongoose');
const { Schema } = mongoose;

const nurseSchema = new Schema({
  nurseName: {
    type: String,
    required: true
  },
  nurseUserName: {
    type: String,
    required: true
  },
  nurseEmail: {
    type: String,
    required: true,
    unique: true
  },
  nursePassword: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Nurse', nurseSchema);

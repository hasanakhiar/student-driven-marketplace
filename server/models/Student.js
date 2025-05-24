const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  university: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  program: {
    type: String,
    required: true
  },
  yearOfStudy: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    select: false // This ensures the phone number is not exposed by default
  },
  dateOfBirth: {
    type: Date,
    required: true,
    select: false // This ensures the date of birth is not exposed by default
  },
  password: {
    type: String,
    required: true,
    select: false // This ensures the password is not exposed by default
  }
});

// Create the model
const User = mongoose.model('User', userSchema);

module.exports = User;

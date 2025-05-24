const mongoose = require('mongoose');

const meetupLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  type: {
    type: String,
    enum: ['library', 'cafeteria', 'student_center', 'campus_entrance', 'other'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  safetyFeatures: [{
    type: String,
    enum: ['well_lit', 'security_cameras', 'security_personnel', 'high_traffic', 'public_space']
  }],
  operatingHours: {
    open: String,
    close: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a 2dsphere index for geospatial queries
meetupLocationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('MeetupLocation', meetupLocationSchema); 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  wallet: {
    type: String,
    required: true
  }
});

module.exports = Organization = mongoose.model('organizations', OrganizationSchema);

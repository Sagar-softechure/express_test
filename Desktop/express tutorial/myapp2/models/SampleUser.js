// models/SampleUser.js
const mongoose = require('mongoose');

const sampleUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const SampleUser = mongoose.model('SampleUser', sampleUserSchema, 'users');
// Note: 3rd arg forces collection name = "users"

module.exports = SampleUser;

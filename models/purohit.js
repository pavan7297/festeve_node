// models/Festival.js
const mongoose = require("mongoose");

const purohitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String, // URL for the profile picture
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  languages: {
    type: [String], // Array of languages they speak
    required: false,
  },
  yearsOfExperience: {
    type: Number,
    required: false,
  },
  services: {
    type: [String], // List of services offered
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  availability: {
    type: String, // Text description of availability
    required: false,
  },
  pricing: {
    type: String, // General pricing information
    required: false,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
    },
  ],
  socialLinks: {
    facebook: String,
    instagram: String,
  },
});

module.exports = mongoose.model("Purohit", purohitSchema);

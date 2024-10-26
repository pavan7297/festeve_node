// models/Festival.js
const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
    date: { type: String, required: true }, // Store as YYYY-MM-DD
    name: { type: String, required: true },
    shortdescription: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Festival', festivalSchema);

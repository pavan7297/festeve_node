const mongoose = require('mongoose');

const essentilas = new mongoose.Schema({
  category: { type: String, required: true },
  collection: { type: String, required: true },
  productname: { type: String, required: true },
  sizes: { type: [String], required: true },
  price: { type: Number, required: true },
  vendor: { type: String, required: true }
});

module.exports = mongoose.model('essentilas', essentilas);

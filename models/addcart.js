// models/Festival.js
const mongoose = require('mongoose');

const addcartSchema = new mongoose.Schema({
    productId: { type: String, required: true }, 
    addquantity: { type: Number, required: true },
    
});

module.exports = mongoose.model('addcart', addcartSchema);

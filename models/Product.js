const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, // Explicitly define the _id field
    default: mongoose.Types.ObjectId,    // Automatically generate an ObjectId
  },
  category: { type: String, required: true },
  collection: { type: String, required: true },
  productname: { type: String, required: true },
  sizes: {
    type: [String], // Array of sizes (e.g., ['S', 'M', 'L', 'XL', 'XXL'])
    required: true,
  },
  price: { type: Number, required: true }, // Price in numbers (e.g., 999)
  vendor: { type: String, required: true }, // Vendor name or ID
});

module.exports = mongoose.model('Product', productSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    emailid: { type: String, required: true, unique: true },
    phonenumber: { type: String, required: true },
    password: { type: String, required: true },
    specialday: { type: String, required: true },
    nameofspecialperson: { type: String, required: true },
    dateoftheday: { type: Date, required: true },
    relation: { type: String, required: true },
    whatcanweremindyou: { type: String, required: true },
  });


  module.exports = mongoose.model("userSchema", userSchema);
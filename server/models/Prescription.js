const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Store user email instead of ObjectId
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);

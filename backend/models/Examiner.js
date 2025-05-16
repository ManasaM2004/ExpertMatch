const mongoose = require('mongoose');

const examinerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  identityNumber: { type: String, unique: true, required: true },
  specialization: { type: [String], required: true }, // e.g., ['AI', 'DSA']
  email: { type: String, required: true },
  phone: { type: String },
  availableDates: { type: [Date] }, // Dates they are free
});

module.exports = mongoose.model('Examiner', examinerSchema);

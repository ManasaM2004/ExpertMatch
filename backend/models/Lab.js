const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  labDate: { type: Date, required: true },
  timeSlot: { type: String }, // e.g., '9 AM - 12 PM'
  college: { type: String },  // e.g., 'Ramaiah College'
  assignedExaminer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Examiner'
  }
});

module.exports = mongoose.model('Lab', labSchema);
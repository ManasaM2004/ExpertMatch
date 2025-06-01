const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  professorId: { type: String, required: true },
  professorName: { type: String, required: true },
  labSubject: { type: String, required: true },
  labDate: { type: String, required: true }, // Store as string or Date
  labTime: { type: String, required: true },
  feedback: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
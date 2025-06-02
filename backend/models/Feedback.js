import mongoose from 'mongoose'; // ✅ use import instead of require

const feedbackSchema = new mongoose.Schema({
  professorId: { type: String, required: true },
  professorName: { type: String, required: true },
  labSubject: { type: String, required: true },
  labDate: { type: String, required: true },
  labTime: { type: String, required: true },
  feedback: { type: String, required: true },
  submittedAt: { type: Date, default: Date.now }
});

// ✅ ES Module export
const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
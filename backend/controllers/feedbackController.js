import Feedback from '../models/Feedback.js'; // ✅ use .js extension with ESM

// ➕ CREATE feedback
export const submitFeedback = async (req, res) => {
  try {
    const { professorId, professorName, labSubject, labDate, labTime, feedback } = req.body;

    if (!professorId || !professorName || !labSubject || !labDate || !labTime || !feedback) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = new Feedback({
      professorId,
      professorName,
      labSubject,
      labDate,
      labTime,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ message: '✅ Feedback submitted successfully!' });
  } catch (err) {
    console.error('❌ Feedback Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// 📥 READ all feedback
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('❌ Fetch Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
};

// ✏️ UPDATE feedback
export const updateFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Feedback.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: '✅ Feedback updated!', updated });
  } catch (err) {
    console.error('❌ Update Error:', err.message);
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

// 🗑️ DELETE feedback
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.status(200).json({ message: '🗑️ Feedback deleted successfully' });
  } catch (err) {
    console.error('❌ Delete Error:', err.message);
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
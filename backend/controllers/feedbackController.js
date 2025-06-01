const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
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
      feedback
    });

    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Feedback Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
import express from 'express';

const router = express.Router();

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    data.submittedAt = new Date().toISOString();
    await req.feedbackCollection.insertOne(data);
    res.status(201).json({ message: '✅ Feedback stored successfully!' });
  } catch (e) {
    console.error('❌ Error saving feedback:', e);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await req.feedbackCollection.find({}).toArray();
    res.json(feedbacks);
  } catch (e) {
    console.error('❌ Error fetching feedback:', e);
    res.status(500).json({ error: 'Failed to fetch feedback' });
  }
});

export default router;
const express = require('express');
const router = express.Router();
const Examiner = require('../models/Examiner');

// Create a new examiner
router.post('/', async (req, res) => {
  try {
    const examiner = new Examiner(req.body);
    await examiner.save();
    res.status(201).json(examiner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all examiners
router.get('/', async (req, res) => {
  try {
    const examiners = await Examiner.find();
    res.json(examiners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Match available examiners for a specific date and subject
router.post('/match', async (req, res) => {
  const { subject, date } = req.body;

  try {
    const availableExaminers = await Examiner.find({
      specialization: subject,
      availableDates: { $in: [new Date(date)] }
    });

    res.json(availableExaminers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

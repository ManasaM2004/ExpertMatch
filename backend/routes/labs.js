const express = require('express');
const router = express.Router();
const Lab = require('../models/Lab');
const Examiner = require('../models/Examiner');

// Schedule a new lab
router.post('/', async (req, res) => {
  try {
    const lab = new Lab(req.body);
    await lab.save();
    res.status(201).json(lab);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all scheduled labs
router.get('/', async (req, res) => {
  try {
    const labs = await Lab.find().populate('assignedExaminer');
    res.json(labs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign examiner to a lab
router.post('/assign', async (req, res) => {
  const { labId, examinerId } = req.body;

  try {
    const lab = await Lab.findByIdAndUpdate(
      labId,
      { assignedExaminer: examinerId },
      { new: true }
    ).populate('assignedExaminer');

    res.json(lab);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
import express from 'express';
import {
    deleteFeedback,
    getAllFeedback,
    submitFeedback,
    updateFeedback
} from '../controllers/feedbackController.js'; // Also use .js here

const router = express.Router();

router.post('/', submitFeedback);
router.get('/', getAllFeedback);
router.put('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

export default router; // ✅ this fixes the error!
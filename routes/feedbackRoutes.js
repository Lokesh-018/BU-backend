import express from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit', authMiddleware, submitFeedback);

export default router;
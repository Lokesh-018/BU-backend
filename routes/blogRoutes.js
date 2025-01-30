import express from 'express';
import { getBlogs, createBlog, addReply } from '../controllers/BlogController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getBlogs);
router.post('/', authMiddleware, createBlog);
router.post('/:blogId/reply', authMiddleware, addReply);

export default router;
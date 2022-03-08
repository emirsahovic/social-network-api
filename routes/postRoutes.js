import express from "express";
import { createPost, getPostById, getPosts, getUserPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/me', protect, getUserPosts);
router.get('/:postId', protect, getPostById);

export default router;

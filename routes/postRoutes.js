import express from "express";
import { createPost, deletePost, getPostById, getPosts, getUserPosts, updatePost } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/me', protect, getUserPosts);
router.get('/:postId', protect, getPostById);
router.delete('/:postId', protect, deletePost);
router.put('/:postId', protect, updatePost);

export default router;

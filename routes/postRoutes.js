import express from "express";
import { createPost, getPosts, getUserPosts } from "../controllers/postController.js";
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createPost);
router.get('/', getPosts);
router.get('/', protect, getUserPosts);

export default router;

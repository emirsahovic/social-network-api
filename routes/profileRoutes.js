import express from "express";
import { protect } from '../middleware/authMiddleware.js';
import { createProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post('/', protect, createProfile);

export default router;

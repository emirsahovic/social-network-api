import express from "express";
import { protect } from '../middleware/authMiddleware.js';
import { createProfile, getProfiles } from "../controllers/profileController.js";

const router = express.Router();

router.post('/', protect, createProfile);
router.get('/', getProfiles);

export default router;

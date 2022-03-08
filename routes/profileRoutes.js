import express from "express";
import { protect } from '../middleware/authMiddleware.js';
import { createProfile, getProfile, getProfiles, getProfileByUser, deleteProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post('/', protect, createProfile);
router.get('/', getProfiles);
router.get('/me', protect, getProfile);
router.get('/user/:userId', getProfileByUser);
router.delete('/', protect, deleteProfile);

export default router;

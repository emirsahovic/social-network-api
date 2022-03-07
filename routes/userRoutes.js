import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { registerValidateUser } from '../validators/registerValidator.js';
import { loginValidateUser } from '../validators/loginValidator.js';
const router = express.Router();

router.post('/register', registerValidateUser, registerUser);
router.post('/login', loginValidateUser, loginUser);

export default router;

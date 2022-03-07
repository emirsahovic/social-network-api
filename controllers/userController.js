import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// @desc    Register user
// @method  POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please provide name, email and password' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
})

// @desc    Login user
// @method  POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please provide an email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }
})

export { registerUser, loginUser }

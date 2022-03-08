import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @route POST api/posts
// @desc Create a post
// @access Private
const createPost = asyncHandler(async (req, res, next) => {
    const user = await User.findById({ _id: req.user.id }).select('-password');
    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Please provide text');
    }

    const post = await Post.create({
        text,
        user: req.user.id,
        name: user.name
    })

    res.status(201).json(post);
})

export { createPost }

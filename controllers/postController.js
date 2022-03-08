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

// @route GET api/posts
// @desc Get all posts
// @access Public
const getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
})

// @route GET api/posts/me
// @desc Get current user posts
// @access Private
const getUserPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find({ user: req.user.id });
    res.status(200).json(posts);
})

export { createPost, getPosts, getUserPosts }

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

// @route GET api/posts/:postId
// @desc Get post by id
// @access Private
const getPostById = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    res.status(200).json(post);
})

// @route DELETE api/posts/:postId
// @desc Delete post
// @access Private
const deletePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await post.remove();

    res.status(200).json({ msg: 'Post deleted' });
})

// @route PUT api/posts/:postId
// @desc Update post
// @access Private
const updatePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    if (post.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });

    res.status(200).json(updatedPost);
})

// @route PUT api/posts/like/:postId
// @desc Like a post
// @access Private
const likePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
})

// @route PUT api/posts/unlike/:postId
// @desc Unike a post
// @access Private
const unlikePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    if (!post) {
        res.status(400);
        throw new Error('Post not found');
    }

    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
})

// @route POST api/posts/comment/:postId
// @desc Comment on a post
// @access Private
const addComment = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.postId);

    const { text } = req.body;

    if (!text) {
        res.status(400);
        throw new Error('Please provide text');
    }

    const newComment = {
        text,
        name: user.name,
        user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
})

export {
    createPost,
    getPosts,
    getUserPosts,
    getPostById,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
    addComment
}

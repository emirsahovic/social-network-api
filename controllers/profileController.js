import asyncHandler from 'express-async-handler';
import Profile from '../models/profileModel.js';

// @desc    Create or update profile
// @method  POST /api/profile
// @access  Private
const createProfile = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    const {
        company,
        location,
        bio,
        skills,
        youtube,
        facebook,
        twitter,
        instagram
    } = req.body;

    if (!skills) {
        res.status(400);
        throw new Error('Skills are required');
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
        profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
        return res.json(profile);
    }

    profile = await Profile.create(profileFields);

    res.json(profile);
})

// @desc    Get all profiles
// @method  GET /api/profile
// @access  Public
const getProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await Profile.find().populate('user', ['name', 'email']);

    res.status(200).json(profiles);
})

// @desc    Get current users profile
// @method  GET /api/profile/me
// @access  Private
const getProfile = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'email']);

    if (!profile) {
        res.status(400);
        throw new Error('Profile not found');
    }

    res.status(200).json(profile);
})

// @desc    Get profile by user id
// @method  GET /api/profile/user/:userId
// @access  Public
const getProfileByUser = asyncHandler(async (req, res, next) => {
    const profile = await Profile.findOne({ user: req.params.userId }).populate('user', ['name', 'email']);

    if (!profile) {
        res.status(400);
        throw new Error('Profile not found');
    }

    res.status(200).json(profile);
})

export { createProfile, getProfiles, getProfile, getProfileByUser }

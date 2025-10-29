import mongoose from "mongoose";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import * as userService from '../services/user.service.js';
import { validationResult } from "express-validator";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, email, password } = req.body;
        const alreadyUser = await User.findOne({ email });
        if (alreadyUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userService.createUser({ name, email, password });
        const token = user.generateToken();
        const userResponse = { ...user._doc };
        delete userResponse.password;
        res.status(201).json({
            message: "User created successfully",
            user: userResponse,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: "User Not exists" });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = user.generateToken();
        const userResponse = { ...user._doc };
        delete userResponse.password;

        res.status(200).json({
            message: "User login successfully",
            user: userResponse,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET /api/users/profile - Get user profile (for authentication)
export const getProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        // For authentication purposes, return user data
        // Remove password from response
        const userResponse = { ...user._doc };
        delete userResponse.password;

        res.status(200).json({
            message: "User profile retrieved successfully",
            user: userResponse,
            success: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProfileData = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }
        const profile = await Profile.findOne({ userId: user._id });
        if (!profile) {
            return res.status(404).json({
                message: "Profile not found",
                profileExists: false
            });
        }
        res.status(200).json({
            message: "Profile retrieved successfully",
            profile: profile,
            profileExists: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const createProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        // Check if profile already exists
        const existingProfile = await Profile.findOne({ userId: user._id });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists" });
        }
        const { name, phone, location, bio, avatar } = req.body;
        const newProfile = new Profile({
            userId: user._id,
            name: name || user.name,
            email: user.email,
            phone: phone || '',
            location: location || '',
            bio: bio || '',
            avatar: avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
        });

        const savedProfile = await newProfile.save();

        res.status(201).json({
            message: "Profile created successfully",
            profile: savedProfile,
            profileExists: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const profile = await Profile.findOne({ userId: user._id });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        const { name, phone, location, bio, avatar } = req.body;

        profile.name = name || profile.name;
        profile.phone = phone !== undefined ? phone : profile.phone;
        profile.location = location !== undefined ? location : profile.location;
        profile.bio = bio !== undefined ? bio : profile.bio;
        profile.avatar = avatar || profile.avatar;

        const updatedProfile = await profile.save();

        res.status(200).json({
            message: "Profile updated successfully",
            profile: updatedProfile,
            profileExists: true
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: "User Not Found" });
        }

        const deletedProfile = await Profile.findOneAndDelete({ userId: user._id });
        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.status(200).json({
            message: "Profile deleted successfully",
            profileExists: false
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const profile = async (req, res) => {
    return getProfile(req, res);
}

export const logout = async (req, res) => {
    try {
        res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
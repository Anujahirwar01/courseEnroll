import mongoose from "mongoose";
import User from "../models/user.model.js";
import * as userService from '../services/user.service.js';
import { validationResult } from "express-validator";

export const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const alreadyUser = await User.findOne({ email });
        if (alreadyUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Create new user
        const user = await userService.createUser({ name, email, password });
        const token = user.generateToken();
        
        // Remove password from response
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
        const {email, password } = req.body;
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
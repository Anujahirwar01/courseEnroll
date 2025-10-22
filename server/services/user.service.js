import mongoose from "mongoose";
import User from "../models/user.model.js";

export const createUser = async ({name,email,password}) => {
    if(!name || !email || !password){
        throw new Error("name , email , password is required");
    }
    const hashedPassword = await User.hashPassword(password);
    const newUser = new User({
        name,
        email,
        password:hashedPassword
    });
    return newUser.save();
}
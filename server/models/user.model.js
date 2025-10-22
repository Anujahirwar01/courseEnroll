import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    }
})

userSchema.statics.hashPassword = async function(password){
   return await bcrypt.hash(password,10);
}

userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateToken = function(){
    return  jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '24h'
  });
}


const User = mongoose.model("User", userSchema);

export default User;
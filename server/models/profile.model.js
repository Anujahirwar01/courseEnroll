import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    bio: {
        type: String,
        required: false,
        maxLength: 500,
        trim: true
    },
    avatar: {
        type: String,
        required: false,
        default: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    coursesCompleted: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

profileSchema.index({ userId: 1 });
profileSchema.index({ email: 1 });

profileSchema.virtual('formattedJoinDate').get(function () {
    return this.joinDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    });
});

profileSchema.methods.updateStats = function (courseCompleted = false) {
    if (courseCompleted) {
        this.coursesCompleted += 1;
    }
    return this.save();
};

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
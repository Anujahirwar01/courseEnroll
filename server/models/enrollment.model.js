import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courseId: {
        type: Number,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0, // Percentage of course completed
        min: 0,
        max: 100
    },
    completedLessons: [{
        lessonId: Number,
        completedAt: Date
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });
enrollmentSchema.methods.markAsCompleted = function () {
    this.progress = 100;
    this.completedAt = new Date();
    this.isActive = false;
    return this.save();
};
enrollmentSchema.statics.getUserEnrollments = function (userId) {
    return this.find({ userId, isActive: true })
        .select('courseId courseName enrolledAt progress')
        .sort({ enrolledAt: -1 });
};

// Static method to check if user is enrolled in course
enrollmentSchema.statics.isUserEnrolled = function (userId, courseId) {
    return this.findOne({ userId, courseId, isActive: true });
};

export default mongoose.model('Enrollment', enrollmentSchema);
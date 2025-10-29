import Enrollment from '../models/enrollment.model.js';
import { validationResult } from 'express-validator';

const enrollmentController = {
    // Enroll user in a course
    enrollInCourse: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { courseId, courseName } = req.body;
            const userId = req.user.id;

            // Check if user is already enrolled
            const existingEnrollment = await Enrollment.isUserEnrolled(userId, courseId);
            if (existingEnrollment) {
                return res.status(400).json({
                    message: 'You are already enrolled in this course',
                    enrollment: existingEnrollment
                });
            }

            // Create new enrollment
            const enrollment = new Enrollment({
                userId,
                courseId,
                courseName
            });

            await enrollment.save();

            res.status(201).json({
                message: 'Successfully enrolled in course',
                enrollment: {
                    courseId: enrollment.courseId,
                    courseName: enrollment.courseName,
                    enrolledAt: enrollment.enrolledAt,
                    progress: enrollment.progress
                }
            });
        } catch (error) {
            console.error('Error enrolling in course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get user's enrolled courses
    getUserEnrollments: async (req, res) => {
        try {
            const userId = req.user.id;
            const enrollments = await Enrollment.getUserEnrollments(userId);

            res.status(200).json({
                message: 'Enrollments retrieved successfully',
                enrollments: enrollments.map(enrollment => ({
                    courseId: enrollment.courseId,
                    courseName: enrollment.courseName,
                    enrolledAt: enrollment.enrolledAt,
                    progress: enrollment.progress
                }))
            });
        } catch (error) {
            console.error('Error getting user enrollments:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Check if user is enrolled in specific course
    checkEnrollment: async (req, res) => {
        try {
            const { courseId } = req.params;
            const userId = req.user.id;

            const enrollment = await Enrollment.isUserEnrolled(userId, parseInt(courseId));

            res.status(200).json({
                isEnrolled: !!enrollment,
                enrollment: enrollment ? {
                    courseId: enrollment.courseId,
                    courseName: enrollment.courseName,
                    enrolledAt: enrollment.enrolledAt,
                    progress: enrollment.progress
                } : null
            });
        } catch (error) {
            console.error('Error checking enrollment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Update course progress
    updateProgress: async (req, res) => {
        try {
            const { courseId } = req.params;
            const { progress, lessonId } = req.body;
            const userId = req.user.id;

            const enrollment = await Enrollment.findOne({
                userId,
                courseId: parseInt(courseId),
                isActive: true
            });

            if (!enrollment) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }

            // Update progress
            if (progress !== undefined) {
                enrollment.progress = Math.max(enrollment.progress, progress);
            }

            // Add completed lesson if provided
            if (lessonId) {
                const existingLesson = enrollment.completedLessons.find(
                    lesson => lesson.lessonId === lessonId
                );

                if (!existingLesson) {
                    enrollment.completedLessons.push({
                        lessonId,
                        completedAt: new Date()
                    });
                }
            }

            // Mark as completed if progress is 100%
            if (enrollment.progress >= 100) {
                enrollment.completedAt = new Date();
                enrollment.isActive = false;
            }

            await enrollment.save();

            res.status(200).json({
                message: 'Progress updated successfully',
                enrollment: {
                    courseId: enrollment.courseId,
                    progress: enrollment.progress,
                    completedLessons: enrollment.completedLessons.length,
                    isCompleted: !enrollment.isActive
                }
            });
        } catch (error) {
            console.error('Error updating progress:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Unenroll from course
    unenrollFromCourse: async (req, res) => {
        try {
            const { courseId } = req.params;
            const userId = req.user.id;

            const enrollment = await Enrollment.findOneAndUpdate(
                { userId, courseId: parseInt(courseId), isActive: true },
                { isActive: false },
                { new: true }
            );

            if (!enrollment) {
                return res.status(404).json({ message: 'Enrollment not found' });
            }

            res.status(200).json({
                message: 'Successfully unenrolled from course'
            });
        } catch (error) {
            console.error('Error unenrolling from course:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export default enrollmentController;
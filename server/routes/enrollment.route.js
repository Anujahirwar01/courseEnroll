import express from 'express';
import { body, param } from 'express-validator';
import enrollmentController from '../controller/enrollment.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   POST /api/enrollments
// @desc    Enroll in a course
// @access  Private
router.post(
    '/',
    [
        body('courseId')
            .isNumeric()
            .withMessage('Course ID must be a number'),
        body('courseName')
            .trim()
            .notEmpty()
            .withMessage('Course name is required')
            .isLength({ min: 1, max: 200 })
            .withMessage('Course name must be between 1 and 200 characters')
    ],
    enrollmentController.enrollInCourse
);

// @route   GET /api/enrollments
// @desc    Get user's enrolled courses
// @access  Private
router.get('/', enrollmentController.getUserEnrollments);

// @route   GET /api/enrollments/check/:courseId
// @desc    Check if user is enrolled in specific course
// @access  Private
router.get(
    '/check/:courseId',
    [
        param('courseId')
            .isNumeric()
            .withMessage('Course ID must be a number')
    ],
    enrollmentController.checkEnrollment
);

// @route   PUT /api/enrollments/:courseId/progress
// @desc    Update course progress
// @access  Private
router.put(
    '/:courseId/progress',
    [
        param('courseId')
            .isNumeric()
            .withMessage('Course ID must be a number'),
        body('progress')
            .optional()
            .isFloat({ min: 0, max: 100 })
            .withMessage('Progress must be between 0 and 100'),
        body('lessonId')
            .optional()
            .isNumeric()
            .withMessage('Lesson ID must be a number')
    ],
    enrollmentController.updateProgress
);

// @route   DELETE /api/enrollments/:courseId
// @desc    Unenroll from course
// @access  Private
router.delete(
    '/:courseId',
    [
        param('courseId')
            .isNumeric()
            .withMessage('Course ID must be a number')
    ],
    enrollmentController.unenrollFromCourse
);

export default router;
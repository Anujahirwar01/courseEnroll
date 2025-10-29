import * as userController from '../controller/user.controller.js';
import { Router } from 'express';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router();

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.register)

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], userController.login)

// Auth route - returns user data for authentication persistence
router.get('/profile', authMiddleware, userController.getProfile)

// Profile data route - returns profile document for profile page
router.get('/profile-data', authMiddleware, userController.getProfileData)

router.post('/profile', authMiddleware, [
  body('name').notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
    .trim(),
  body('phone').optional()
    .isLength({ min: 0 }).withMessage('Phone number format invalid'),
  body('location').optional()
    .isLength({ max: 100 }).withMessage('Location must be less than 100 characters')
    .trim(),
  body('bio').optional()
    .isLength({ max: 500 }).withMessage('Bio must be less than 500 characters')
    .trim(),
  body('avatar').optional()
    .isURL().withMessage('Avatar must be a valid URL')
], userController.createProfile)

router.put('/profile', authMiddleware, [
  body('name').optional()
    .notEmpty().withMessage('Name cannot be empty')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
    .trim(),
  body('phone').optional()
    .isLength({ min: 0 }).withMessage('Phone number format invalid'),
  body('location').optional()
    .isLength({ max: 100 }).withMessage('Location must be less than 100 characters')
    .trim(),
  body('bio').optional()
    .isLength({ max: 500 }).withMessage('Bio must be less than 500 characters')
    .trim(),
  body('avatar').optional()
    .isURL().withMessage('Avatar must be a valid URL')
], userController.updateProfile)

router.delete('/profile', authMiddleware, userController.deleteProfile)

router.get('/profile-legacy', authMiddleware, userController.profile)

router.get('/logout', userController.logout)

export default router;
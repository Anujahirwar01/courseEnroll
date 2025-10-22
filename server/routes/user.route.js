import * as userController from '../controller/user.controller.js';
import { Router } from 'express';
import { body } from 'express-validator';
const router = Router();

router.post('/register',[
    body('name').notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],userController.register)

router.post('/login',[,
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],userController.login)

export default router;
import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validate.js';

const router = Router();
router.post('/register', [body('email').isEmail(), body('password').isLength({ min: 8 })], validate, register);
router.post('/login', login);
router.get('/me', protect, me);
export default router;

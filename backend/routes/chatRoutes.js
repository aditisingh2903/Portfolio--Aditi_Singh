import { Router } from 'express';
import { chat } from '../controllers/chatController.js';
import rateLimit from 'express-rate-limit';
const router = Router();
const limiter = rateLimit({ windowMs: 60 * 1000, max: 30 });
router.post('/', limiter, chat);
export default router;

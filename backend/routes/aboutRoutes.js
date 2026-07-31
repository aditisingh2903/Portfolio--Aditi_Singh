import { Router } from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', getAbout);
router.put('/', protect, updateAbout);
export default router;

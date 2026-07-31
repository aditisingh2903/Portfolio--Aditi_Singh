import { Router } from 'express';
import { getSeo, updateSeo } from '../controllers/seoController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = Router();
router.get('/', getSeo);
router.put('/', protect, updateSeo);
export default router;

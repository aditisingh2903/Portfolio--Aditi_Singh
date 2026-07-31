import { Router } from 'express';
import { getContact } from '../controllers/contactController.js';
const router = Router();
router.get('/', getContact);
export default router;

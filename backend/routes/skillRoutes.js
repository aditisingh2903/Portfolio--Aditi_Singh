import { Router } from 'express';
import Skill from '../models/Skill.js';
import { makeCrud } from '../utils/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';

const crud = makeCrud(Skill, { textFields: ['items'] });
const router = Router();
router.get('/', crud.list);
router.get('/:id', crud.get);
router.post('/', protect, crud.create);
router.put('/:id', protect, crud.update);
router.delete('/:id', protect, crud.remove);
router.put('/reorder', protect, crud.reorder);
export default router;


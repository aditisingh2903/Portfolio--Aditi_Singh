import { Router } from 'express';
import Project from '../models/Project.js';
import { makeCrud } from '../utils/crudFactory.js';
import { protect } from '../middleware/authMiddleware.js';

const crud = makeCrud(Project, { textFields: ['longDescription','techStack','links'] });
const router = Router();
router.get('/', crud.list);
router.get('/:id', crud.get);
router.post('/', protect, crud.create);
router.put('/:id', protect, crud.update);
router.delete('/:id', protect, crud.remove);
router.put('/reorder', protect, crud.reorder);
export default router;


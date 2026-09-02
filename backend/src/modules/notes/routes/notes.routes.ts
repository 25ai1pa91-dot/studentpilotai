import { Router } from 'express';
import { notesController } from '../controller/notes.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, (req, res, next) => notesController.getNotes(req, res, next));
router.post('/', authenticate, (req, res, next) => notesController.create(req, res, next));
router.put('/:id', authenticate, (req, res, next) => notesController.update(req, res, next));
router.delete('/:id', authenticate, (req, res, next) => notesController.delete(req, res, next));

export const notesRoutes = router;

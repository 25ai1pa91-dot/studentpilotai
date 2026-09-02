import { Router } from 'express';
import { revisionController } from '../controller/revision.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, (req, res, next) => revisionController.getQueue(req, res, next));
router.patch('/:id', authenticate, (req, res, next) => revisionController.reviewTopic(req, res, next));

export const revisionRoutes = router;

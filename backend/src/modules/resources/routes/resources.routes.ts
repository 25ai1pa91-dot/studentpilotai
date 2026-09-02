import { Router } from 'express';
import { resourcesController } from '../controller/resources.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, (req, res, next) => resourcesController.getResources(req, res, next));
router.get('/:id', authenticate, (req, res, next) => resourcesController.getById(req, res, next));

export const resourcesRoutes = router;

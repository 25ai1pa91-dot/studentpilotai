import { Router } from 'express';
import { progressController } from '../controller/progress.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/progress:
 *   get:
 *     summary: Fetch progress analytics, skill graph, and learning velocity
 *     tags: [Progress]
 */
router.get('/', authenticate, (req, res, next) =>
  progressController.getProgress(req, res, next)
);

export const progressRoutes = router;

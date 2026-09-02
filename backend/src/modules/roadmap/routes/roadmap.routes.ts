import { Router } from 'express';
import { roadmapController } from '../controller/roadmap.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/roadmap:
 *   get:
 *     summary: Fetch complete personalized learning roadmap graph
 *     tags: [Roadmap]
 */
router.get('/', authenticate, (req, res, next) =>
  roadmapController.getRoadmap(req, res, next)
);

/**
 * @swagger
 * /api/v1/roadmap/node/{id}/complete:
 *   patch:
 *     summary: Complete a roadmap node, unlock prerequisites and recalculate placement vector
 *     tags: [Roadmap]
 */
router.patch('/node/:id/complete', authenticate, (req, res, next) =>
  roadmapController.completeNode(req, res, next)
);

export const roadmapRoutes = router;

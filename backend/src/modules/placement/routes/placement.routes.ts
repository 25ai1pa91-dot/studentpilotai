import { Router } from 'express';
import { placementController } from '../controller/placement.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/placement/intelligence:
 *   get:
 *     summary: Fetch placement readiness ETA, hiring probability, and score breakdown
 *     tags: [PlacementIntelligence]
 */
router.get('/intelligence', authenticate, (req, res, next) =>
  placementController.getIntelligence(req, res, next)
);

export const placementRoutes = router;

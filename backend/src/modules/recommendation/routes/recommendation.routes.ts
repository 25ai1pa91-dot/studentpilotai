import { Router } from 'express';
import { recommendationController } from '../controller/recommendation.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/recommendations:
 *   get:
 *     summary: Fetch AI personalized recommendations for Next Topic, Project, Quiz, and Revision
 *     tags: [Recommendations]
 */
router.get('/', authenticate, (req, res, next) =>
  recommendationController.getRecommendations(req, res, next)
);

export const recommendationRoutes = router;

import { Router } from 'express';
import { jobRecommendationController } from '../controller/job-recommendation.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/job-recommendations:
 *   get:
 *     summary: Fetch AI job and internship recommendations based on student readiness score
 *     tags: [JobRecommendations]
 */
router.get('/', authenticate, (req, res, next) =>
  jobRecommendationController.getRecommendations(req, res, next)
);

export const jobRecommendationRoutes = router;

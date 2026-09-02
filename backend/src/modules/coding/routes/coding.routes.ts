import { Router } from 'express';
import { codingController } from '../controller/coding.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/coding/problems:
 *   get:
 *     summary: Fetch coding problems list with filters (difficulty, tags, company)
 *     tags: [Coding]
 */
router.get('/problems', authenticate, (req, res, next) =>
  codingController.getProblems(req, res, next)
);

/**
 * @swagger
 * /api/v1/coding/analytics:
 *   get:
 *     summary: Fetch coding analytics, solved count, acceptance rate & heatmap
 *     tags: [Coding]
 */
router.get('/analytics', authenticate, (req, res, next) =>
  codingController.getAnalytics(req, res, next)
);

/**
 * @swagger
 * /api/v1/coding/problem/{slug}:
 *   get:
 *     summary: Fetch single coding problem statement, starter code & testcases
 *     tags: [Coding]
 */
router.get('/problem/:slug', authenticate, (req, res, next) =>
  codingController.getProblemBySlug(req, res, next)
);

export const codingRoutes = router;

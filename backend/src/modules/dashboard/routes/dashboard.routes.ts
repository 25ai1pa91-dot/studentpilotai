import { Router } from 'express';
import { dashboardController } from '../controller/dashboard.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/dashboard:
 *   get:
 *     summary: Fetch personalized student dashboard metrics and daily mission
 *     tags: [Dashboard]
 */
router.get('/', authenticate, (req, res, next) =>
  dashboardController.getDashboard(req, res, next)
);

export const dashboardRoutes = router;

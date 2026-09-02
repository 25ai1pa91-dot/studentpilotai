import { Router } from 'express';
import { careerController } from '../controller/career.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/career/dashboard:
 *   get:
 *     summary: Fetch master career hub dashboard metrics and deadlines
 *     tags: [CareerHub]
 */
router.get('/dashboard', authenticate, (req, res, next) =>
  careerController.getDashboard(req, res, next)
);

export const careerRoutes = router;

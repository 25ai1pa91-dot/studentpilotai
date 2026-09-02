import { Router } from 'express';
import { studyPlanController } from '../controller/study-plan.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/study-plan/today:
 *   get:
 *     summary: Fetch today's mission cards and tasks
 *     tags: [StudyPlan]
 */
router.get('/today', authenticate, (req, res, next) =>
  studyPlanController.getToday(req, res, next)
);

/**
 * @swagger
 * /api/v1/study-plan/week:
 *   get:
 *     summary: Fetch 7-day weekly schedule
 *     tags: [StudyPlan]
 */
router.get('/week', authenticate, (req, res, next) =>
  studyPlanController.getWeek(req, res, next)
);

/**
 * @swagger
 * /api/v1/study-plan/task/{id}:
 *   patch:
 *     summary: Mark study task as complete, skipped, or rescheduled
 *     tags: [StudyPlan]
 */
router.patch('/task/:id', authenticate, (req, res, next) =>
  studyPlanController.updateTask(req, res, next)
);

export const studyPlanRoutes = router;

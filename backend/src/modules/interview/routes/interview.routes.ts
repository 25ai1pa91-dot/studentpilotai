import { Router } from 'express';
import { interviewController } from '../controller/interview.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/interview/start:
 *   post:
 *     summary: Start AI Mock Interview session
 *     tags: [AIInterview]
 */
router.post('/start', authenticate, (req, res, next) =>
  interviewController.start(req, res, next)
);

/**
 * @swagger
 * /api/v1/interview/message:
 *   post:
 *     summary: Send candidate answer to AI interviewer
 *     tags: [AIInterview]
 */
router.post('/message', authenticate, (req, res, next) =>
  interviewController.message(req, res, next)
);

/**
 * @swagger
 * /api/v1/interview/end:
 *   post:
 *     summary: End mock interview and generate performance report & hiring bar score
 *     tags: [AIInterview]
 */
router.post('/end', authenticate, (req, res, next) =>
  interviewController.end(req, res, next)
);

/**
 * @swagger
 * /api/v1/interview/history:
 *   get:
 *     summary: List candidate past interview sessions
 *     tags: [AIInterview]
 */
router.get('/history', authenticate, (req, res, next) =>
  interviewController.getHistory(req, res, next)
);

/**
 * @swagger
 * /api/v1/interview/{id}:
 *   get:
 *     summary: Load specific mock interview session details
 *     tags: [AIInterview]
 */
router.get('/:id', authenticate, (req, res, next) =>
  interviewController.getById(req, res, next)
);

export const interviewRoutes = router;

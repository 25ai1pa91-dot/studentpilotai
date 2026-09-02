import { Router } from 'express';
import { submissionController } from '../controller/submission.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/submissions:
 *   get:
 *     summary: Fetch user submission history
 *     tags: [Submissions]
 */
router.get('/', authenticate, (req, res, next) =>
  submissionController.getSubmissions(req, res, next)
);

/**
 * @swagger
 * /api/v1/submission/{id}:
 *   get:
 *     summary: Fetch full submission code, testcase results & AI feedback
 *     tags: [Submissions]
 */
router.get('/submission/:id', authenticate, (req, res, next) =>
  submissionController.getSubmissionById(req, res, next)
);

export const submissionRoutes = router;

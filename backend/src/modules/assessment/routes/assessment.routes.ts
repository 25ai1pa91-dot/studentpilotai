import { Router } from 'express';
import { assessmentController } from '../controller/assessment.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/assessment/list:
 *   get:
 *     summary: Fetch company technical assessments list
 *     tags: [Assessment]
 */
router.get('/list', authenticate, (req, res, next) =>
  assessmentController.getList(req, res, next)
);

/**
 * @swagger
 * /api/v1/assessment/start:
 *   post:
 *     summary: Start assessment attempt session
 *     tags: [Assessment]
 */
router.post('/start', authenticate, (req, res, next) =>
  assessmentController.start(req, res, next)
);

/**
 * @swagger
 * /api/v1/assessment/submit:
 *   post:
 *     summary: Submit assessment attempt answers for evaluation
 *     tags: [Assessment]
 */
router.post('/submit', authenticate, (req, res, next) =>
  assessmentController.submit(req, res, next)
);

/**
 * @swagger
 * /api/v1/assessment/{id}:
 *   get:
 *     summary: Fetch assessment details
 *     tags: [Assessment]
 */
router.get('/:id', authenticate, (req, res, next) =>
  assessmentController.getById(req, res, next)
);

export const assessmentRoutes = router;

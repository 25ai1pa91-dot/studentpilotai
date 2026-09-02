import { Router } from 'express';
import { resumeController } from '../controller/resume.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/resume:
 *   get:
 *     summary: Fetch current student ATS resume configuration
 *     tags: [Resume]
 */
router.get('/', authenticate, (req, res, next) =>
  resumeController.getResume(req, res, next)
);

/**
 * @swagger
 * /api/v1/resume:
 *   put:
 *     summary: Update student ATS resume section payload
 *     tags: [Resume]
 */
router.put('/', authenticate, (req, res, next) =>
  resumeController.updateResume(req, res, next)
);

/**
 * @swagger
 * /api/v1/resume/analyze:
 *   post:
 *     summary: Run ATS compatibility analyzer on resume
 *     tags: [Resume]
 */
router.post('/analyze', authenticate, (req, res, next) =>
  resumeController.analyzeResume(req, res, next)
);

export const resumeRoutes = router;

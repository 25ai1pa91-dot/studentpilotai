import { Router } from 'express';
import { resumeAnalyzerController } from '../controller/resume-analyzer.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/resume/analyze:
 *   post:
 *     summary: Analyze resume ATS match score, missing keywords & optimization suggestions
 *     tags: [ResumeAnalyzer]
 */
router.post('/analyze', authenticate, (req, res, next) =>
  resumeAnalyzerController.analyze(req, res, next)
);

export const resumeAnalyzerRoutes = router;

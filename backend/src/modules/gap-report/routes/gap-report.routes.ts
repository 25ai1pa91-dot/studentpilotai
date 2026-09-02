import { Router } from 'express';
import { gapReportController } from '../controller/gap-report.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/gap-report:
 *   get:
 *     summary: Fetch overall placement gap report vs target company
 *     tags: [GapReport]
 */
router.get('/', authenticate, (req, res, next) =>
  gapReportController.getOverallGapReport(req, res, next)
);

/**
 * @swagger
 * /api/v1/gap-report/company/{slug}:
 *   get:
 *     summary: Fetch target company-specific readiness gap report (e.g. google, amazon, meta)
 *     tags: [GapReport]
 */
router.get('/company/:slug', authenticate, (req, res, next) =>
  gapReportController.getCompanyGapReport(req, res, next)
);

export const gapReportRoutes = router;

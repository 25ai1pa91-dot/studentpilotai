import { Router } from 'express';
import { jobsController } from '../controller/jobs.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/jobs:
 *   get:
 *     summary: Discover job opportunities filtered by company, salary, and remote status
 *     tags: [Jobs]
 */
router.get('/', authenticate, (req, res, next) =>
  jobsController.getJobs(req, res, next)
);

/**
 * @swagger
 * /api/v1/jobs/apply:
 *   post:
 *     summary: Apply for job and log entry in Application Tracker
 *     tags: [Jobs]
 */
router.post('/apply', authenticate, (req, res, next) =>
  jobsController.apply(req, res, next)
);

/**
 * @swagger
 * /api/v1/jobs/{id}:
 *   get:
 *     summary: Fetch job details & required skills
 *     tags: [Jobs]
 */
router.get('/:id', authenticate, (req, res, next) =>
  jobsController.getJobById(req, res, next)
);

export const jobsRoutes = router;

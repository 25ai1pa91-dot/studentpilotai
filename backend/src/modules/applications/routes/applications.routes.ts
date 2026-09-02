import { Router } from 'express';
import { applicationsController } from '../controller/applications.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/applications:
 *   get:
 *     summary: Fetch candidate application tracker history
 *     tags: [Applications]
 *   post:
 *     summary: Create new application entry in tracker
 *     tags: [Applications]
 */
router.get('/', authenticate, (req, res, next) =>
  applicationsController.getApplications(req, res, next)
);

router.post('/', authenticate, (req, res, next) =>
  applicationsController.create(req, res, next)
);

/**
 * @swagger
 * /api/v1/applications/{id}:
 *   get:
 *     summary: Fetch single application details & interview status
 *     tags: [Applications]
 *   patch:
 *     summary: Update application stage (e.g. Applied -> OA Completed -> Interview 1 -> Offer)
 *     tags: [Applications]
 *   delete:
 *     summary: Delete application entry
 *     tags: [Applications]
 */
router.get('/:id', authenticate, (req, res, next) =>
  applicationsController.getById(req, res, next)
);

router.patch('/:id', authenticate, (req, res, next) =>
  applicationsController.update(req, res, next)
);

router.delete('/:id', authenticate, (req, res, next) =>
  applicationsController.delete(req, res, next)
);

export const applicationsRoutes = router;

import { Router } from 'express';
import { internshipsController } from '../controller/internships.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/internships:
 *   get:
 *     summary: Discover active internship opportunities
 *     tags: [Internships]
 */
router.get('/', authenticate, (req, res, next) =>
  internshipsController.getInternships(req, res, next)
);

/**
 * @swagger
 * /api/v1/internships/apply:
 *   post:
 *     summary: Apply for internship opportunity
 *     tags: [Internships]
 */
router.post('/apply', authenticate, (req, res, next) =>
  internshipsController.apply(req, res, next)
);

/**
 * @swagger
 * /api/v1/internships/{id}:
 *   get:
 *     summary: Fetch internship details
 *     tags: [Internships]
 */
router.get('/:id', authenticate, (req, res, next) =>
  internshipsController.getById(req, res, next)
);

export const internshipsRoutes = router;

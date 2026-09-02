import { Router } from 'express';
import { portfolioController } from '../controller/portfolio.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/portfolio:
 *   get:
 *     summary: Fetch current student portfolio site configuration
 *     tags: [Portfolio]
 */
router.get('/', authenticate, (req, res, next) =>
  portfolioController.getPortfolio(req, res, next)
);

/**
 * @swagger
 * /api/v1/portfolio:
 *   put:
 *     summary: Update portfolio sections, themes and links
 *     tags: [Portfolio]
 */
router.put('/', authenticate, (req, res, next) =>
  portfolioController.updatePortfolio(req, res, next)
);

/**
 * @swagger
 * /api/v1/portfolio/export:
 *   post:
 *     summary: Deploy portfolio to student sub-domain
 *     tags: [Portfolio]
 */
router.post('/export', authenticate, (req, res, next) =>
  portfolioController.exportPortfolio(req, res, next)
);

export const portfolioRoutes = router;

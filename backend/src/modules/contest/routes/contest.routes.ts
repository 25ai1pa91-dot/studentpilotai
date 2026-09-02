import { Router } from 'express';
import { contestController } from '../controller/contest.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/contest:
 *   get:
 *     summary: Fetch active weekly and daily programming contests
 *     tags: [Contest]
 */
router.get('/', authenticate, (req, res, next) =>
  contestController.getList(req, res, next)
);

/**
 * @swagger
 * /api/v1/contest/register:
 *   post:
 *     summary: Register candidate for upcoming contest
 *     tags: [Contest]
 */
router.post('/register', authenticate, (req, res, next) =>
  contestController.register(req, res, next)
);

/**
 * @swagger
 * /api/v1/contest/{id}:
 *   get:
 *     summary: Fetch contest details & problems list
 *     tags: [Contest]
 */
router.get('/:id', authenticate, (req, res, next) =>
  contestController.getById(req, res, next)
);

export const contestRoutes = router;

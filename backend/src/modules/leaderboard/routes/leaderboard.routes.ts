import { Router } from 'express';
import { leaderboardController } from '../controller/leaderboard.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/leaderboard:
 *   get:
 *     summary: Fetch global candidate leaderboard standings
 *     tags: [Leaderboard]
 */
router.get('/', authenticate, (req, res, next) =>
  leaderboardController.getLeaderboard(req, res, next)
);

export const leaderboardRoutes = router;

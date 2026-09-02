import { Router } from 'express';
import { judgeController } from '../controller/judge.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/code/submit:
 *   post:
 *     summary: Submit solution to Online Judge for full hidden testcases evaluation
 *     tags: [Judge]
 */
router.post('/submit', authenticate, (req, res, next) =>
  judgeController.submitSolution(req, res, next)
);

export const judgeRoutes = router;

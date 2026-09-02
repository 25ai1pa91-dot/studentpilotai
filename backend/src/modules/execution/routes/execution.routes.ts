import { Router } from 'express';
import { executionController } from '../controller/execution.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/code/run:
 *   post:
 *     summary: Run code snippet in isolated sandbox against sample testcases
 *     tags: [Execution]
 */
router.post('/run', authenticate, (req, res, next) =>
  executionController.executeCode(req, res, next)
);

export const executionRoutes = router;

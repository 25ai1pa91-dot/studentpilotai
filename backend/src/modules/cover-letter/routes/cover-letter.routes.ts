import { Router } from 'express';
import { coverLetterController } from '../controller/cover-letter.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/cover-letter/generate:
 *   post:
 *     summary: Generate company-specific editable cover letter
 *     tags: [CoverLetter]
 */
router.post('/generate', authenticate, (req, res, next) =>
  coverLetterController.generate(req, res, next)
);

export const coverLetterRoutes = router;

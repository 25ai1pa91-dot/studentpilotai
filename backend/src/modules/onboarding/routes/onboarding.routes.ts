import { Router } from 'express';
import { onboardingController } from '../controller/onboarding.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { validateRequest } from '../../../middleware/validation.middleware';
import { saveAnswerValidator } from '../validator/onboarding.validator';

const router = Router();

/**
 * @swagger
 * /api/v1/onboarding/questions:
 *   get:
 *     summary: Fetch conversational onboarding questions configuration
 *     tags: [Onboarding]
 */
router.get('/questions', authenticate, (req, res, next) =>
  onboardingController.getQuestions(req, res, next)
);

/**
 * @swagger
 * /api/v1/onboarding/answer:
 *   patch:
 *     summary: Store a single onboarding answer and update profile
 *     tags: [Onboarding]
 */
router.patch('/answer', authenticate, validateRequest(saveAnswerValidator), (req, res, next) =>
  onboardingController.saveAnswer(req, res, next)
);

/**
 * @swagger
 * /api/v1/onboarding/progress:
 *   get:
 *     summary: Fetch current student onboarding progress percentage and completion status
 *     tags: [Onboarding]
 */
router.get('/progress', authenticate, (req, res, next) =>
  onboardingController.getProgress(req, res, next)
);

/**
 * @swagger
 * /api/v1/onboarding/complete:
 *   post:
 *     summary: Finalize onboarding and trigger Profile Intelligence, Roadmap Generator & AI Mentor
 *     tags: [Onboarding]
 */
router.post('/complete', authenticate, (req, res, next) =>
  onboardingController.completeOnboarding(req, res, next)
);

export const onboardingRoutes = router;

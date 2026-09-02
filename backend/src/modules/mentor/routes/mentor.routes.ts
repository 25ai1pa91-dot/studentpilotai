import { Router } from 'express';
import { mentorController } from '../controller/mentor.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';
import { validateRequest } from '../../../middleware/validation.middleware';
import { createMentorMessageValidator } from '../validator/mentor.validator';

const router = Router();

/**
 * @swagger
 * /api/v1/mentor/chat:
 *   post:
 *     summary: Interact with AI Mentor (RAG Fused Context & Tool Calling)
 *     tags: [AIMentor]
 */
router.post('/chat', authenticate, validateRequest(createMentorMessageValidator), (req, res, next) =>
  mentorController.handleChat(req, res, next)
);

/**
 * @swagger
 * /api/v1/mentor/conversations:
 *   get:
 *     summary: List all user AI mentor conversations
 *     tags: [AIMentor]
 */
router.get('/conversations', authenticate, (req, res, next) =>
  mentorController.getConversations(req, res, next)
);

/**
 * @swagger
 * /api/v1/mentor/conversation/{id}:
 *   get:
 *     summary: Load full chat history for a specific conversation
 *     tags: [AIMentor]
 */
router.get('/conversation/:id', authenticate, (req, res, next) =>
  mentorController.getConversationById(req, res, next)
);

/**
 * @swagger
 * /api/v1/mentor/conversation/{id}:
 *   delete:
 *     summary: Soft delete conversation
 *     tags: [AIMentor]
 */
router.delete('/conversation/:id', authenticate, (req, res, next) =>
  mentorController.deleteConversation(req, res, next)
);

/**
 * @swagger
 * /api/v1/mentor/conversation/{id}/title:
 *   patch:
 *     summary: Rename conversation title
 *     tags: [AIMentor]
 */
router.patch('/conversation/:id/title', authenticate, (req, res, next) =>
  mentorController.renameConversation(req, res, next)
);

export const mentorRoutes = router;

import { Router } from 'express';
import { knowledgeController } from '../controller/knowledge.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

router.get('/tree', authenticate, (req, res, next) => knowledgeController.getTree(req, res, next));
router.get('/node/:id', authenticate, (req, res, next) => knowledgeController.getNode(req, res, next));
router.patch('/node/:id', authenticate, (req, res, next) => knowledgeController.updateNode(req, res, next));

export const knowledgeRoutes = router;

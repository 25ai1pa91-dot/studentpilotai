import { Router } from 'express';
import { adminController } from '../controller/admin.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

router.get('/dashboard', authenticate, (req, res, next) => adminController.getDashboard(req, res, next));
router.get('/students', authenticate, (req, res, next) => adminController.getStudents(req, res, next));
router.patch('/students/:id/status', authenticate, (req, res, next) => adminController.updateStudentStatus(req, res, next));
router.get('/logs', authenticate, (req, res, next) => adminController.getLogs(req, res, next));

export const adminRoutes = router;

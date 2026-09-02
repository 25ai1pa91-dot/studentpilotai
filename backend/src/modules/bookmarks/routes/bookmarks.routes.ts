import { Router } from 'express';
import { bookmarksController } from '../controller/bookmarks.controller';
import { authenticate } from '../../auth/middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, (req, res, next) => bookmarksController.getBookmarks(req, res, next));
router.post('/', authenticate, (req, res, next) => bookmarksController.create(req, res, next));
router.delete('/:id', authenticate, (req, res, next) => bookmarksController.delete(req, res, next));

export const bookmarksRoutes = router;

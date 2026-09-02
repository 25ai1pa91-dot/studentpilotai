import { Response, NextFunction } from 'express';
import { bookmarksService } from '../service/bookmarks.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class BookmarksController {
  public async getBookmarks(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const list = await bookmarksService.getBookmarks(req.user._id.toString());
      ApiResponse.success(res, list, 'Bookmarks fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const bookmark = await bookmarksService.createBookmark(req.user._id.toString(), req.body);
      ApiResponse.success(res, bookmark, 'Bookmark created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      await bookmarksService.deleteBookmark(req.user._id.toString(), req.params.id);
      ApiResponse.success(res, null, 'Bookmark deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const bookmarksController = new BookmarksController();

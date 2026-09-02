import { Response, NextFunction } from 'express';
import { progressService } from '../service/progress.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ProgressController {
  public async getProgress(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const data = await progressService.getProgressAnalytics(req.user._id.toString());
      ApiResponse.success(res, data, 'Progress analytics fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const progressController = new ProgressController();

import { Response, NextFunction } from 'express';
import { dashboardService } from '../service/dashboard.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class DashboardController {
  public async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const data = await dashboardService.getDashboardData(req.user._id.toString());
      ApiResponse.success(res, data, 'Dashboard data fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();

import { Response, NextFunction } from 'express';
import { careerService } from '../service/career.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class CareerController {
  public async getDashboard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const data = await careerService.getDashboardData(req.user._id.toString());
      ApiResponse.success(res, data, 'Career dashboard metrics fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const careerController = new CareerController();

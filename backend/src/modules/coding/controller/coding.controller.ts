import { Response, NextFunction } from 'express';
import { codingService } from '../service/coding.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class CodingController {
  public async getProblems(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const problems = await codingService.getProblems(req.query);
      ApiResponse.success(res, problems, 'Coding problems list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getProblemBySlug(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      const problem = await codingService.getProblemBySlug(slug);
      ApiResponse.success(res, problem, 'Coding problem details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getAnalytics(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const analytics = await codingService.getCodingAnalytics(req.user._id.toString());
      ApiResponse.success(res, analytics, 'Coding analytics fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const codingController = new CodingController();

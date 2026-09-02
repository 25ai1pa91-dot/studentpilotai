import { Response, NextFunction } from 'express';
import { jobRecommendationService } from '../service/job-recommendation.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class JobRecommendationController {
  public async getRecommendations(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const result = await jobRecommendationService.getRecommendations(req.user._id.toString());
      ApiResponse.success(res, result, 'Job & internship recommendations generated');
    } catch (error) {
      next(error);
    }
  }
}

export const jobRecommendationController = new JobRecommendationController();

import { Response, NextFunction } from 'express';
import { recommendationService } from '../service/recommendation.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class RecommendationController {
  public async getRecommendations(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const recommendations = await recommendationService.getRecommendations(req.user._id.toString());
      ApiResponse.success(res, recommendations, 'AI recommendations generated');
    } catch (error) {
      next(error);
    }
  }
}

export const recommendationController = new RecommendationController();

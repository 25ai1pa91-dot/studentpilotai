import { Response, NextFunction } from 'express';
import { roadmapService } from '../service/roadmap.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class RoadmapController {
  public async getRoadmap(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const data = await roadmapService.getRoadmap(req.user._id.toString());
      ApiResponse.success(res, data, 'Personalized roadmap fetched');
    } catch (error) {
      next(error);
    }
  }

  public async completeNode(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const updated = await roadmapService.completeNode(req.user._id.toString(), id);
      ApiResponse.success(res, updated, 'Knowledge node completed & next nodes unlocked');
    } catch (error) {
      next(error);
    }
  }
}

export const roadmapController = new RoadmapController();

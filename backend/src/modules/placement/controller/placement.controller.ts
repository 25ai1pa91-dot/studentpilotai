import { Response, NextFunction } from 'express';
import { placementService } from '../service/placement.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class PlacementController {
  public async getIntelligence(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const intelligence = await placementService.getPlacementIntelligence(req.user._id.toString());
      ApiResponse.success(res, intelligence, 'Placement intelligence analytics fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const placementController = new PlacementController();

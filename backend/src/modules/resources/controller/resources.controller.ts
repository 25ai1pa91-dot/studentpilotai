import { Response, NextFunction } from 'express';
import { resourcesService } from '../service/resources.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ResourcesController {
  public async getResources(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await resourcesService.getResources();
      ApiResponse.success(res, list, 'Resources fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const item = await resourcesService.getById(req.params.id);
      ApiResponse.success(res, item, 'Resource item fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const resourcesController = new ResourcesController();

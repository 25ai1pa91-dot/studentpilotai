import { Response, NextFunction } from 'express';
import { applicationsService } from '../service/applications.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ApplicationsController {
  public async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const app = await applicationsService.createApplication(req.user._id.toString(), req.body);
      ApiResponse.success(res, app, 'Application added to tracker', 201);
    } catch (error) {
      next(error);
    }
  }

  public async getApplications(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const apps = await applicationsService.getApplications(req.user._id.toString());
      ApiResponse.success(res, apps, 'Applications list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const app = await applicationsService.getApplicationById(req.user._id.toString(), id);
      ApiResponse.success(res, app, 'Application details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const updated = await applicationsService.updateApplication(req.user._id.toString(), id, req.body);
      ApiResponse.success(res, updated, 'Application updated');
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const result = await applicationsService.deleteApplication(req.user._id.toString(), id);
      ApiResponse.success(res, result, 'Application deleted');
    } catch (error) {
      next(error);
    }
  }
}

export const applicationsController = new ApplicationsController();

import { Response, NextFunction } from 'express';
import { internshipsService } from '../service/internships.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class InternshipsController {
  public async getInternships(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const internships = await internshipsService.getInternships(req.query);
      ApiResponse.success(res, internships, 'Internships list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const internship = await internshipsService.getInternshipById(id);
      ApiResponse.success(res, internship, 'Internship details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async apply(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { internshipId } = req.body;
      const app = await internshipsService.applyInternship(req.user._id.toString(), internshipId);
      ApiResponse.success(res, app, 'Internship application logged');
    } catch (error) {
      next(error);
    }
  }
}

export const internshipsController = new InternshipsController();

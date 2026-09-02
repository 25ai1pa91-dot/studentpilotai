import { Response, NextFunction } from 'express';
import { resumeService } from '../service/resume.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ResumeController {
  public async getResume(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const resume = await resumeService.getResume(req.user._id.toString());
      ApiResponse.success(res, resume, 'Resume fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  public async updateResume(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const updated = await resumeService.updateResume(req.user._id.toString(), req.body);
      ApiResponse.success(res, updated, 'Resume updated successfully');
    } catch (error) {
      next(error);
    }
  }

  public async analyzeResume(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const analysis = await resumeService.analyzeResume(req.user._id.toString(), req.body);
      ApiResponse.success(res, analysis, 'ATS Analysis generated');
    } catch (error) {
      next(error);
    }
  }
}

export const resumeController = new ResumeController();

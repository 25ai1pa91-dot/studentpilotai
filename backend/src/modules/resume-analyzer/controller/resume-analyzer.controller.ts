import { Response, NextFunction } from 'express';
import { resumeAnalyzerService } from '../service/resume-analyzer.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class ResumeAnalyzerController {
  public async analyze(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { resumeText, targetCompany } = req.body;
      const result = await resumeAnalyzerService.analyzeResume(resumeText || '', targetCompany || 'Google');
      ApiResponse.success(res, result, 'Resume ATS analysis completed');
    } catch (error) {
      next(error);
    }
  }
}

export const resumeAnalyzerController = new ResumeAnalyzerController();

import { Response, NextFunction } from 'express';
import { assessmentService } from '../service/assessment.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class AssessmentController {
  public async getList(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const list = await assessmentService.getAssessmentList();
      ApiResponse.success(res, list, 'Assessments list fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const assessment = await assessmentService.getAssessmentById(id);
      ApiResponse.success(res, assessment, 'Assessment details fetched');
    } catch (error) {
      next(error);
    }
  }

  public async start(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { assessmentId } = req.body;
      const attempt = await assessmentService.startAssessment(req.user._id.toString(), assessmentId);
      ApiResponse.success(res, attempt, 'Assessment attempt started');
    } catch (error) {
      next(error);
    }
  }

  public async submit(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { attemptId, answers } = req.body;
      const result = await assessmentService.submitAssessment(req.user._id.toString(), attemptId, answers);
      ApiResponse.success(res, result, 'Assessment submitted successfully');
    } catch (error) {
      next(error);
    }
  }
}

export const assessmentController = new AssessmentController();

import { Response, NextFunction } from 'express';
import { submissionService } from '../service/submission.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class SubmissionController {
  public async getSubmissions(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const submissions = await submissionService.getUserSubmissions(req.user._id.toString());
      ApiResponse.success(res, submissions, 'User submission history fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getSubmissionById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const submission = await submissionService.getSubmissionById(req.user._id.toString(), id);
      ApiResponse.success(res, submission, 'Submission details fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const submissionController = new SubmissionController();

import { Response, NextFunction } from 'express';
import { codeReviewService } from '../service/code-review.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class CodeReviewController {
  public async reviewCode(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { language, solution } = req.body;
      const review = await codeReviewService.reviewCode(language, solution);
      ApiResponse.success(res, review, 'AI Code Review completed');
    } catch (error) {
      next(error);
    }
  }
}

export const codeReviewController = new CodeReviewController();

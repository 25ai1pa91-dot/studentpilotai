import { Response, NextFunction } from 'express';
import { judgeService } from '../service/judge.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class JudgeController {
  public async submitSolution(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { problemId, language, code } = req.body;
      const submission = await judgeService.submitSolution(req.user._id.toString(), problemId, language, code);
      ApiResponse.success(res, submission, `Solution submitted. Verdict: ${submission.verdict}`);
    } catch (error) {
      next(error);
    }
  }
}

export const judgeController = new JudgeController();

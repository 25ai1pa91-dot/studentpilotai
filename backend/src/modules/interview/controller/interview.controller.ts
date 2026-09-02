import { Response, NextFunction } from 'express';
import { interviewService } from '../service/interview.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class InterviewController {
  public async start(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const interviewType = req.body.interviewType || req.body.role || 'Frontend & Systems';
      const targetCompany = req.body.targetCompany || 'Google';
      const session = await interviewService.startInterview(req.user._id.toString(), interviewType, targetCompany);
      ApiResponse.success(res, session, 'AI Mock Interview session started');
    } catch (error) {
      next(error);
    }
  }

  public async message(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const interviewId = req.body.interviewId || req.body.sessionId;
      const message = req.body.message || req.body.answer || '';
      const session = await interviewService.sendMessage(req.user._id.toString(), interviewId, message);
      ApiResponse.success(res, session, 'Interviewer response received');
    } catch (error) {
      next(error);
    }
  }

  public async end(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const interviewId = req.body.interviewId || req.body.sessionId;
      const report = await interviewService.endInterview(req.user._id.toString(), interviewId);
      ApiResponse.success(res, report, 'Interview completed & performance report generated');
    } catch (error) {
      next(error);
    }
  }

  public async getHistory(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const history = await interviewService.getHistory(req.user._id.toString());
      ApiResponse.success(res, history, 'Interview history fetched');
    } catch (error) {
      next(error);
    }
  }

  public async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const { id } = req.params;
      const session = await interviewService.getById(req.user._id.toString(), id);
      ApiResponse.success(res, session, 'Interview session details fetched');
    } catch (error) {
      next(error);
    }
  }
}

export const interviewController = new InterviewController();

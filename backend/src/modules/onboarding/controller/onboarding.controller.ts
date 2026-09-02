import { Response, NextFunction } from 'express';
import { onboardingService } from '../service/onboarding.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class OnboardingController {
  public async getQuestions(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = onboardingService.getQuestions();
      ApiResponse.success(res, questions, 'Onboarding questions fetched');
    } catch (error) {
      next(error);
    }
  }

  public async saveAnswer(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const updatedProfile = await onboardingService.saveAnswer(req.user._id.toString(), req.body);
      ApiResponse.success(res, updatedProfile, 'Answer saved successfully');
    } catch (error) {
      next(error);
    }
  }

  public async getProgress(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const progress = await onboardingService.getProgress(req.user._id.toString());
      ApiResponse.success(res, progress, 'Onboarding progress fetched');
    } catch (error) {
      next(error);
    }
  }

  public async completeOnboarding(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user?._id) return;
      const result = await onboardingService.completeOnboarding(req.user._id.toString());
      ApiResponse.success(res, result, 'Onboarding completed and AI engines initialized');
    } catch (error) {
      next(error);
    }
  }
}

export const onboardingController = new OnboardingController();

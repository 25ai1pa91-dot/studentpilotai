import { Response, NextFunction } from 'express';
import { coverLetterService } from '../service/cover-letter.service';
import { ApiResponse } from '../../../utils/api-response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';

export class CoverLetterController {
  public async generate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { companyName, jobTitle } = req.body;
      const result = await coverLetterService.generateCoverLetter(companyName, jobTitle, req.user?.name);
      ApiResponse.success(res, result, 'Personalized cover letter generated');
    } catch (error) {
      next(error);
    }
  }
}

export const coverLetterController = new CoverLetterController();

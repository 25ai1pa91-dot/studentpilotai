import { Router, Request, Response, NextFunction } from 'express';
import { codeReviewService } from '../service/code-review.service';
import { ApiResponse } from '../../../utils/api-response';

const router = Router();

router.post('/review', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { language = 'javascript', solution, code } = req.body;
    const codeToReview = solution || code || '';
    const review = await codeReviewService.reviewCode(language, codeToReview);
    ApiResponse.success(res, review, 'AI Code Review completed');
  } catch (error) {
    next(error);
  }
});

export const codeReviewRoutes = router;

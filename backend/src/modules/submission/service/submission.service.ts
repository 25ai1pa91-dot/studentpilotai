import { submissionRepository } from '../repository/submission.repository';
import { NotFoundError } from '../../../core/api-error';

export class SubmissionService {
  public async getUserSubmissions(userId: string) {
    return await submissionRepository.findByOwnerId(userId);
  }

  public async getSubmissionById(userId: string, submissionId: string) {
    const submission = await submissionRepository.findById(submissionId);
    if (!submission || submission.ownerId.toString() !== userId) {
      throw new NotFoundError('Submission record not found or unauthorized');
    }
    return submission;
  }
}

export const submissionService = new SubmissionService();

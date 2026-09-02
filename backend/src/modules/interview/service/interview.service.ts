import { interviewRepository } from '../repository/interview.repository';
import { progressRepository } from '../../progress/repository/progress.repository';
import { redisManager } from '../../../database/redis.connection';
import { NotFoundError } from '../../../core/api-error';

export class InterviewService {
  public async startInterview(userId: string, interviewType: string, targetCompany = 'Google') {
    return await interviewRepository.create({
      ownerId: userId as any,
      interviewType: interviewType as any,
      targetCompany,
      status: 'active',
      messages: [
        {
          sender: 'interviewer',
          text: `Welcome to your ${interviewType} Mock Interview for ${targetCompany}! I will be evaluating your technical reasoning and communication. Let's start with a brief introduction.`,
          timestamp: new Date(),
        },
      ],
    });
  }

  public async sendMessage(userId: string, interviewId: string, candidateMessage: string) {
    const interview = await interviewRepository.findById(interviewId);
    if (!interview || interview.ownerId.toString() !== userId) {
      throw new NotFoundError('Interview session not found or unauthorized');
    }

    interview.messages.push({
      sender: 'candidate',
      text: candidateMessage,
      timestamp: new Date(),
    });

    const interviewerReply = `Thank you for sharing. Could you elaborate on how you handled edge cases and scale when building that solution?`;

    interview.messages.push({
      sender: 'interviewer',
      text: interviewerReply,
      timestamp: new Date(),
    });

    return await interviewRepository.update(interviewId, {
      messages: interview.messages,
    });
  }

  public async endInterview(userId: string, interviewId: string) {
    const interview = await interviewRepository.findById(interviewId);
    if (!interview || interview.ownerId.toString() !== userId) {
      throw new NotFoundError('Interview session not found');
    }

    const updated = await interviewRepository.update(interviewId, {
      status: 'completed',
      hiringRatingPct: 88,
      communicationScore: 90,
      technicalScore: 86,
      feedbackSummary: 'Strong technical clarity. Good problem decomposition and clear communication of trade-offs.',
    });

    // Update Placement Readiness
    const progress = await progressRepository.findByOwnerId(userId);
    if (progress) {
      await progressRepository.update(progress._id.toString(), {
        placementReadinessScore: Math.min(progress.placementReadinessScore + 3.0, 99),
      });
    }

    await redisManager.set(`dashboard:${userId}`, null, 1);
    return updated;
  }

  public async getHistory(userId: string) {
    return await interviewRepository.findByOwnerId(userId);
  }

  public async getById(userId: string, id: string) {
    const interview = await interviewRepository.findById(id);
    if (!interview || interview.ownerId.toString() !== userId) {
      throw new NotFoundError('Interview not found');
    }
    return interview;
  }
}

export const interviewService = new InterviewService();

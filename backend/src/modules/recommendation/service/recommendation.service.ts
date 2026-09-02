import { profileRepository } from '../../profile/repository/profile.repository';
import { revisionRepository } from '../../revision/repository/revision.repository';

export class RecommendationService {
  public async getRecommendations(userId: string) {
    const profile = await profileRepository.findByUserId(userId);
    const dueRevisions = await revisionRepository.findDueRevisions(userId);

    const targetCompany = profile?.dreamCompany || 'Google';

    return {
      nextTopic: {
        title: 'Custom Hooks & Async Data Fetching',
        category: 'Step 1: Practice',
        priority: 'High',
        roi: 'High ROI (+15% Placement Impact)',
        reason: `Directly tested in 80% of ${targetCompany} frontend & full-stack technical rounds.`,
      },
      nextProject: {
        title: 'Real-World Internship Form Automation App',
        category: 'Step 2: Real Problem',
        priority: 'High',
        roi: 'Maximum ROI',
        reason: 'Solves real human workflow friction and strengthens GitHub portfolio.',
      },
      nextQuiz: {
        title: 'JavaScript Closures & Event Loop Screening Quiz',
        questionsCount: 10,
        estimatedMinutes: 15,
        reason: 'Validates baseline core knowledge before starting Step 2 project.',
      },
      nextRevision: {
        title: dueRevisions.length > 0 ? 'Memory Refresh: Async Promises' : 'HTML5 Semantic Accessibility',
        dueCount: dueRevisions.length || 1,
        reason: 'Spaced repetition queue trigger to prevent memory decay.',
      },
      nextCodingQuestion: {
        title: 'LeetCode #146: LRU Cache Implementation',
        difficulty: 'Medium',
        company: targetCompany,
        reason: `Frequently asked question in ${targetCompany} technical interview rounds.`,
      },
      nextResource: {
        title: 'MDN Web Docs: Asynchronous JavaScript Guide',
        type: 'Doc',
        url: 'https://developer.mozilla.org',
        reason: 'Official documentation reference for production-grade async patterns.',
      },
    };
  }
}

export const recommendationService = new RecommendationService();

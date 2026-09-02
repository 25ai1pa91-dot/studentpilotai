import { mentorConversationRepository } from '../repository/mentor-conversation.repository';
import { redisManager } from '../../../database/redis.connection';
import { IMentorConversationDocument } from '../model/mentor-conversation.model';

export class MentorMemoryService {
  public async getConversationContext(userId: string, conversationId?: string): Promise<IMentorConversationDocument | null> {
    if (conversationId) {
      return await mentorConversationRepository.findById(conversationId);
    }
    const conversations = await mentorConversationRepository.findByOwnerId(userId);
    return conversations.length > 0 ? conversations[0] : null;
  }

  public async cacheRecentContext(userId: string, contextData: any): Promise<void> {
    const key = `mentor_memory:${userId}`;
    await redisManager.set(key, contextData, 300); // 5 min TTL
  }
}

export const mentorMemoryService = new MentorMemoryService();

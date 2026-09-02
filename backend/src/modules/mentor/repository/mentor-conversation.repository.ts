import { BaseRepository } from '../../../core/base.repository';
import { MentorConversationModel, IMentorConversationDocument } from '../model/mentor-conversation.model';

export class MentorConversationRepository extends BaseRepository<IMentorConversationDocument> {
  constructor() {
    super(MentorConversationModel);
  }

  public async findByOwnerId(ownerId: string): Promise<IMentorConversationDocument[]> {
    return await this.findMany({ ownerId }, { sort: { updatedAt: -1 } });
  }
}

export const mentorConversationRepository = new MentorConversationRepository();

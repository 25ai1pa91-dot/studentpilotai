import { BaseRepository } from '../../../core/base.repository';
import { NotificationModel, INotificationDocument } from '../model/notification.model';

export class NotificationRepository extends BaseRepository<INotificationDocument> {
  constructor() {
    super(NotificationModel);
  }

  public async findUnreadByOwnerId(ownerId: string): Promise<INotificationDocument[]> {
    return await this.findMany({ ownerId, isRead: false }, { sort: { createdAt: -1 } });
  }
}

export const notificationRepository = new NotificationRepository();

import { BaseRepository } from '../../../core/base.repository';
import { AuthSessionModel, IAuthSessionDocument } from '../model/auth-session.model';

export class AuthSessionRepository extends BaseRepository<IAuthSessionDocument> {
  constructor() {
    super(AuthSessionModel);
  }

  public async findActiveSession(userId: string, tokenHash: string): Promise<IAuthSessionDocument | null> {
    return await this.findOne({
      userId,
      refreshTokenHash: tokenHash,
      isRevoked: false,
      expiresAt: { $gt: new Date() },
    });
  }

  public async revokeSession(sessionId: string): Promise<IAuthSessionDocument | null> {
    return await this.update(sessionId, { isRevoked: true });
  }

  public async revokeAllUserSessions(userId: string): Promise<void> {
    await AuthSessionModel.updateMany({ userId }, { isRevoked: true }).exec();
  }
}

export const authSessionRepository = new AuthSessionRepository();

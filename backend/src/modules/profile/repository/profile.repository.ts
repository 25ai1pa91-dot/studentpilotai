import { BaseRepository } from '../../../core/base.repository';
import { ProfileModel, IProfileDocument } from '../model/profile.model';

export class ProfileRepository extends BaseRepository<IProfileDocument> {
  constructor() {
    super(ProfileModel);
  }

  public async findByUserId(userId: string): Promise<IProfileDocument | null> {
    return await this.findOne({ userId });
  }
}

export const profileRepository = new ProfileRepository();

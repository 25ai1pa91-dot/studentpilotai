import { BaseRepository } from '../../../core/base.repository';
import { UserModel, IUserDocument } from '../model/user.model';

export class UserRepository extends BaseRepository<IUserDocument> {
  constructor() {
    super(UserModel);
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    return await this.findOne({ email: email.toLowerCase(), isDeleted: false });
  }
}

export const userRepository = new UserRepository();

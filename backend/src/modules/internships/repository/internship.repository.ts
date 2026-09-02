import { BaseRepository } from '../../../core/base.repository';
import { InternshipModel, IInternshipDocument } from '../model/internship.model';

export class InternshipRepository extends BaseRepository<IInternshipDocument> {
  constructor() {
    super(InternshipModel);
  }
}

export const internshipRepository = new InternshipRepository();

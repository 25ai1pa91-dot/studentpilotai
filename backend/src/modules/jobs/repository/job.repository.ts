import { BaseRepository } from '../../../core/base.repository';
import { JobModel, IJobDocument } from '../model/job.model';

export class JobRepository extends BaseRepository<IJobDocument> {
  constructor() {
    super(JobModel);
  }
}

export const jobRepository = new JobRepository();

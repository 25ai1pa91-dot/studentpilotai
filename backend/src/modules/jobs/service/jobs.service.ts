import { jobRepository } from '../repository/job.repository';
import { applicationRepository } from '../../applications/repository/application.repository';

export class JobsService {
  public async getJobs(query: any = {}) {
    return await jobRepository.findMany({ status: 'active' });
  }

  public async getJobById(id: string) {
    return await jobRepository.findById(id);
  }

  public async applyJob(userId: string, jobId: string) {
    const job = await jobRepository.findById(jobId);
    if (!job) return null;

    return await applicationRepository.create({
      ownerId: userId as any,
      companyName: job.company,
      jobTitle: job.title,
      status: 'Applied',
      appliedDate: new Date(),
    });
  }
}

export const jobsService = new JobsService();

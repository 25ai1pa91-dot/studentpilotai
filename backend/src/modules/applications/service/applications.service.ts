import { applicationRepository } from '../repository/application.repository';
import { redisManager } from '../../../database/redis.connection';
import { NotFoundError } from '../../../core/api-error';

export class ApplicationsService {
  public async createApplication(userId: string, data: any) {
    const app = await applicationRepository.create({
      ownerId: userId as any,
      companyName: data.companyName,
      jobTitle: data.jobTitle,
      status: data.status || 'Applied',
      appliedDate: new Date(),
    });
    await redisManager.set(`career_dashboard:${userId}`, null, 1);
    return app;
  }

  public async getApplications(userId: string) {
    return await applicationRepository.findByOwnerId(userId);
  }

  public async getApplicationById(userId: string, id: string) {
    const app = await applicationRepository.findById(id);
    if (!app || app.ownerId.toString() !== userId) {
      throw new NotFoundError('Application record not found');
    }
    return app;
  }

  public async updateApplication(userId: string, id: string, updateData: any) {
    const app = await this.getApplicationById(userId, id);
    const updated = await applicationRepository.update(app._id.toString(), updateData);
    await redisManager.set(`career_dashboard:${userId}`, null, 1);
    return updated;
  }

  public async deleteApplication(userId: string, id: string) {
    const app = await this.getApplicationById(userId, id);
    await applicationRepository.delete(app._id.toString());
    await redisManager.set(`career_dashboard:${userId}`, null, 1);
    return { success: true };
  }
}

export const applicationsService = new ApplicationsService();

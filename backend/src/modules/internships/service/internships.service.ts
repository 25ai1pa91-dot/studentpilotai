import { internshipRepository } from '../repository/internship.repository';
import { applicationRepository } from '../../applications/repository/application.repository';

export class InternshipsService {
  public async getInternships(query: any = {}) {
    return await internshipRepository.findMany({ status: 'active' });
  }

  public async getInternshipById(id: string) {
    return await internshipRepository.findById(id);
  }

  public async applyInternship(userId: string, internshipId: string) {
    const internship = await internshipRepository.findById(internshipId);
    if (!internship) return null;

    return await applicationRepository.create({
      ownerId: userId as any,
      companyName: internship.company,
      jobTitle: `${internship.title} (Internship)`,
      status: 'Applied',
      appliedDate: new Date(),
    });
  }
}

export const internshipsService = new InternshipsService();

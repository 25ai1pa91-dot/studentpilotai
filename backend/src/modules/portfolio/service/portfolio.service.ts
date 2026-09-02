import { portfolioRepository } from '../repository/portfolio.repository';

export class PortfolioService {
  public async getPortfolio(userId: string) {
    let portfolio = await portfolioRepository.findByOwnerId(userId);
    if (!portfolio) {
      portfolio = await portfolioRepository.create({
        ownerId: userId as any,
        theme: 'Linear',
        name: 'Paras Jain',
        role: 'Full Stack & AI Engineer',
        bio: 'Building scalable learning operating systems, distributed services, and high-performance React web interfaces.',
        githubUrl: 'github.com/paras-jain',
        projects: [
          { title: 'StudentPilot AI OS', desc: 'Dynamic DAG knowledge graph learning platform', tech: ['React 19', 'TypeScript', 'Zustand'] },
          { title: 'PostgreSQL Microservice', desc: 'High-throughput REST API with JWT security', tech: ['Node.js', 'Express', 'PostgreSQL'] },
        ],
        deployUrl: 'https://paras.studentpilot.ai',
      });
    }
    return portfolio;
  }

  public async updatePortfolio(userId: string, data: any) {
    let portfolio = await portfolioRepository.findByOwnerId(userId);
    if (!portfolio) {
      return await portfolioRepository.create({
        ownerId: userId as any,
        name: data.name || 'Paras Jain',
        role: data.role || 'Full Stack & AI Engineer',
        ...data,
      });
    }
    return await portfolioRepository.update(portfolio._id.toString(), data);
  }

  public async exportPortfolio(userId: string, data: any) {
    const portfolio = await this.getPortfolio(userId);
    const domain = `paras.studentpilot.ai`;
    return {
      deployUrl: `https://${domain}`,
      subdomain: 'paras',
      exportedAt: new Date(),
      status: 'Live on Edge CDN',
    };
  }
}

export const portfolioService = new PortfolioService();

import { resumeRepository } from '../repository/resume.repository';

export class ResumeService {
  public async getResume(userId: string) {
    const resumes = await resumeRepository.findByOwnerId(userId);
    if (resumes.length > 0) {
      return resumes[0];
    }
    return await resumeRepository.create({
      ownerId: userId as any,
      personalInfo: {
        fullName: 'Paras Jain',
        email: 'paras@studentpilot.ai',
        phone: '+91 98765 43210',
        linkedin: 'linkedin.com/in/paras-jain',
        github: 'github.com/paras-jain',
        summary: 'Computer Science & AI undergraduate with strong foundations in React 19, TypeScript, Node.js, and PostgreSQL.',
      },
      experience: [
        {
          company: 'StudentPilot AI',
          role: 'Frontend Systems Engineer Intern',
          duration: 'Jun 2025 - Present',
          bullets: ['Engineered React 19 Custom Hooks & Async Data Fetching abstractions.'],
        },
      ],
      projects: [{ name: 'StudentPilot AI OS', tech: 'React 19, TypeScript, PostgreSQL', description: 'Dynamic DAG knowledge graph learning platform' }],
      skills: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'System Design'],
      atsScore: 88,
      template: 'FAANG',
      versionName: 'Primary Resume',
    });
  }

  public async updateResume(userId: string, data: any) {
    const resumes = await resumeRepository.findByOwnerId(userId);
    if (resumes.length === 0) {
      return await resumeRepository.create({
        ownerId: userId as any,
        ...data,
      });
    }
    return await resumeRepository.update(resumes[0]._id.toString(), data);
  }

  public async analyzeResume(userId: string, data: any) {
    const resumeText = data?.resumeText || '';
    const targetCompany = data?.targetCompany || 'Google';

    const wordCount = resumeText.split(/\s+/).length;
    const hasGithub = resumeText.toLowerCase().includes('github');
    const hasMetrics = /\d+%|\$\d+/.test(resumeText);

    let atsScore = 82;
    if (hasGithub) atsScore += 6;
    if (hasMetrics) atsScore += 8;

    return {
      atsScore: Math.min(atsScore, 98),
      targetCompany,
      wordCount,
      missingKeywords: ['Distributed Systems', 'CI/CD Pipeline', 'GraphQL', 'Kubernetes'],
      formattingScore: 94,
      readabilityScore: 90,
      suggestions: [
        'Add quantitative impact metrics to project bullet points.',
        'Include target keywords: Distributed Systems, GraphQL, Docker.',
      ],
      bulletImprovements: [
        'Engineered an isolated microservice architecture handling 50k req/sec.',
      ],
    };
  }
}

export const resumeService = new ResumeService();

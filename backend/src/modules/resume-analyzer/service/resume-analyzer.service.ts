export class ResumeAnalyzerService {
  public async analyzeResume(resumeText: string, targetCompany = 'Google') {
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
        'Add quantitative impact metrics to project bullet points (e.g. reduced latency by 35%).',
        'Include target keywords: Distributed Systems, GraphQL, Docker.',
      ],
      optimizedBulletPoints: [
        'Engineered an isolated microservice architecture handling 50k requests/sec with 99.9% uptime.',
        'Automated CI/CD deployment pipelines reducing build times by 40%.',
      ],
    };
  }
}

export const resumeAnalyzerService = new ResumeAnalyzerService();

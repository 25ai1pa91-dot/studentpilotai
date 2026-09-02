export class CoverLetterService {
  public async generateCoverLetter(companyName: string, jobTitle: string, applicantName = 'Candidate') {
    return {
      companyName,
      jobTitle,
      coverLetterText: `Dear Hiring Team at ${companyName},

I am writing to express my strong enthusiasm for the ${jobTitle} position at ${companyName}. With a solid foundation in computer science and full-stack software development, I have engineered scalable web applications and solved complex algorithmic problems.

My experience aligns directly with ${companyName}'s commitment to engineering excellence. I look forward to contributing to your engineering team.

Sincerely,
${applicantName}`,
    };
  }
}

export const coverLetterService = new CoverLetterService();

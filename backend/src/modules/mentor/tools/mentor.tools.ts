export interface ToolExecutionResult {
  toolName: string;
  payload: any;
}

export class MentorToolRegistry {
  public static explainTopic(topic: string, company: string): ToolExecutionResult {
    return {
      toolName: 'explain_topic',
      payload: {
        topic,
        company,
        whyItExists: `${topic} is critical for building high-concurrency systems at ${company}.`,
        problemItSolves: `Prevents unhandled runtime crashes and race conditions in production.`,
        analogy: `Think of ${topic} as an automated air-traffic controller ensuring requests land safely.`,
      },
    };
  }

  public static generateQuiz(topic: string): ToolExecutionResult {
    return {
      toolName: 'generate_quiz',
      payload: {
        topic,
        questionsCount: 3,
        passingScorePct: 80,
      },
    };
  }

  public static recommendProject(targetRole: string): ToolExecutionResult {
    return {
      toolName: 'recommend_project',
      payload: {
        title: 'Full-Stack Automated Form Injection & RPA Suite',
        targetRole,
        expectedXp: 600,
        estimatedHours: 12,
      },
    };
  }

  public static findWeakSkills(weakSubjects: string[]): ToolExecutionResult {
    return {
      toolName: 'find_weak_skills',
      payload: {
        weakSkills: weakSubjects,
        remediationPlan: 'Allocate 30 minutes daily to Spaced Repetition Queue.',
      },
    };
  }

  public static reviewCode(codeSnippet: string): ToolExecutionResult {
    return {
      toolName: 'review_code',
      payload: {
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        optimizationAdvice: 'Consider handling empty input edge cases before array iterations.',
      },
    };
  }
}

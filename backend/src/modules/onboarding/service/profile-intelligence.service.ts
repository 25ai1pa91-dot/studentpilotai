import { IProfileDocument } from '../../profile/model/profile.model';

export interface ProfileIntelligenceResult {
  placementReadiness: number;
  learningVelocity: number;
  confidenceScore: number;
  riskScore: number;
  estimatedMonthsToPlacement: number;
  recommendedTrack: string;
  primaryWeakAreas: string[];
  primaryStrengths: string[];
  learningStyle: string;
  studyCapacityHoursPerWeek: number;
}

export class ProfileIntelligenceService {
  /**
   * Analyzes student profile and calculates placement metrics
   */
  public analyzeProfile(profile: IProfileDocument): ProfileIntelligenceResult {
    const cgpa = profile.cgpa || 7.5;
    const weeklyHours = profile.weeklyHours || 14;
    const languagesCount = profile.programmingLanguages?.length || 1;
    const strongSubjects = profile.strongSubjects || ['Problem Solving'];
    const weakSubjects = profile.weakSubjects || ['Data Structures', 'System Design'];

    // 1. Placement Readiness (0-100)
    let baseReadiness = 50;
    if (cgpa >= 8.5) baseReadiness += 15;
    else if (cgpa >= 7.5) baseReadiness += 10;

    baseReadiness += Math.min(languagesCount * 5, 20);
    if (profile.github) baseReadiness += 10;
    if (profile.portfolio) baseReadiness += 5;

    const placementReadiness = Math.min(Math.max(baseReadiness, 20), 98);

    // 2. Learning Velocity (Scale 1.0 - 3.0)
    const learningVelocity = Number((1.0 + (weeklyHours / 20) * 1.5).toFixed(1));

    // 3. Confidence & Risk Scores
    const confidenceScore = Math.min(Math.round(baseReadiness * 0.9 + languagesCount * 2), 95);
    const riskScore = Math.max(100 - confidenceScore, 10);

    // 4. Estimated Months to Placement Target
    const totalRemainingSkills = Math.max(12 - languagesCount * 2, 3);
    const estimatedMonths = Math.max(Math.ceil(totalRemainingSkills / (weeklyHours / 7)), 2);

    // 5. Recommended Track Allocation
    let recommendedTrack = 'Full-Stack Software Engineer';
    if (profile.dreamRole) {
      recommendedTrack = profile.dreamRole;
    } else if (profile.technologyInterests?.includes('AI/ML')) {
      recommendedTrack = 'AI/ML & Data Engineering';
    }

    return {
      placementReadiness,
      learningVelocity,
      confidenceScore,
      riskScore,
      estimatedMonthsToPlacement: estimatedMonths,
      recommendedTrack,
      primaryWeakAreas: weakSubjects,
      primaryStrengths: strongSubjects,
      learningStyle: profile.learningStyle || 'Hands-on Coding',
      studyCapacityHoursPerWeek: weeklyHours,
    };
  }
}

export const profileIntelligenceService = new ProfileIntelligenceService();

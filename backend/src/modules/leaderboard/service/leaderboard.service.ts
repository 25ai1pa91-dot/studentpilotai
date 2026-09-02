import { redisManager } from '../../../database/redis.connection';

export class LeaderboardService {
  public async getLeaderboard() {
    const cacheKey = 'global_leaderboard';
    const cached = await redisManager.get<any>(cacheKey);
    if (cached) return cached;

    const data = [
      { rank: 1, name: 'Aarav Sharma', xp: 4850, readiness: 94, solvedCount: 142, college: 'IIT Bombay' },
      { rank: 2, name: 'Priya Verma', xp: 4200, readiness: 91, solvedCount: 128, college: 'MITS Gwalior' },
      { rank: 3, name: 'Rohan Gupta', xp: 3950, readiness: 88, solvedCount: 115, college: 'DTU Delhi' },
      { rank: 4, name: 'Ananya Patel', xp: 3600, readiness: 85, solvedCount: 98, college: 'BITS Pilani' },
      { rank: 5, name: 'Devansh Roy', xp: 3400, readiness: 82, solvedCount: 89, college: 'NIT Trichy' },
    ];

    await redisManager.set(cacheKey, data, 120);
    return data;
  }
}

export const leaderboardService = new LeaderboardService();

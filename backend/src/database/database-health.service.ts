import mongoose from 'mongoose';
import { redisManager } from './redis.connection';
import { mongoManager } from './mongo.connection';

export class DatabaseHealthService {
  public async getComprehensiveHealth() {
    const mongoHealth = mongoManager.checkHealth();
    const redisHealth = redisManager.checkHealth();

    const collections = Object.keys(mongoose.connection.collections);
    let totalDocuments = 0;

    try {
      if (mongoHealth.isHealthy) {
        const stats = await mongoose.connection.db?.stats();
        totalDocuments = stats?.objects || 0;
      }
    } catch {
      totalDocuments = 0;
    }

    return {
      status: mongoHealth.isHealthy && redisHealth.isHealthy ? 'HEALTHY' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      mongoDB: {
        state: mongoHealth.state,
        isHealthy: mongoHealth.isHealthy,
        maxPoolSize: mongoHealth.poolSize,
        totalCollections: collections.length,
        totalDocuments,
      },
      redis: {
        isHealthy: redisHealth.isHealthy,
        namespace: 'studentpilot:',
      },
      memoryUsage: process.memoryUsage(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }
}

export const databaseHealthService = new DatabaseHealthService();

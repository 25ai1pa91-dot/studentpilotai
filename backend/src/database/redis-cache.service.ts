import { redisManager } from './redis.connection';
import { logger } from '../core/logger';

export class RedisCacheService {
  private readonly namespace = 'studentpilot:';

  private getFullKey(key: string): string {
    return `${this.namespace}${key}`;
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      return await redisManager.get<T>(this.getFullKey(key));
    } catch {
      return null;
    }
  }

  public async set(key: string, value: any, ttlSeconds = 300): Promise<void> {
    try {
      await redisManager.set(this.getFullKey(key), value, ttlSeconds);
    } catch {
      // Fallback
    }
  }

  public async invalidatePattern(pattern: string): Promise<void> {
    try {
      const client = redisManager.getClient();
      const keys = await client.keys(`${this.namespace}${pattern}*`);
      if (keys.length > 0) {
        await client.del(...keys);
        logger.info(`[Redis Cache] Invalidated ${keys.length} keys matching pattern '${pattern}'`);
      }
    } catch {
      // Fallback
    }
  }

  public async acquireLock(lockKey: string, ttlSeconds = 10): Promise<boolean> {
    try {
      const client = redisManager.getClient();
      const fullKey = `${this.namespace}lock:${lockKey}`;
      const result = await client.set(fullKey, 'locked', 'EX', ttlSeconds, 'NX');
      return result === 'OK';
    } catch {
      return true; // Grant lock fallback
    }
  }

  public async releaseLock(lockKey: string): Promise<void> {
    try {
      const client = redisManager.getClient();
      const fullKey = `${this.namespace}lock:${lockKey}`;
      await client.del(fullKey);
    } catch {
      // Fallback
    }
  }
}

export const redisCacheService = new RedisCacheService();

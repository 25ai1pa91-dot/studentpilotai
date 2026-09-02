import Redis from 'ioredis';
import { env } from '../config/env.config';
import { logger } from '../core/logger';

export class RedisConnectionManager {
  private static instance: RedisConnectionManager;
  private client: Redis | null = null;

  private constructor() {}

  public static getInstance(): RedisConnectionManager {
    if (!RedisConnectionManager.instance) {
      RedisConnectionManager.instance = new RedisConnectionManager();
    }
    return RedisConnectionManager.instance;
  }

  public getClient(): Redis {
    if (!this.client) {
      this.client = new Redis(env.REDIS_URI, {
        maxRetriesPerRequest: 1,
        enableOfflineQueue: false,
        retryStrategy(times) {
          if (times > 2) return null; // Stop retrying if Redis is not available
          return 500;
        },
      });

      this.client.on('connect', () => {
        logger.info('Redis Client Connected.');
      });

      this.client.on('error', (err) => {
        // Silently log Redis fallback notice
      });
    }

    return this.client;
  }

  public async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const redis = this.getClient();
      const strValue = typeof value === 'string' ? value : JSON.stringify(value);
      if (ttlSeconds) {
        await redis.setex(key, ttlSeconds, strValue);
      } else {
        await redis.set(key, strValue);
      }
    } catch {
      // Fallback silently if Redis is offline
    }
  }

  public async get<T>(key: string): Promise<T | null> {
    try {
      const redis = this.getClient();
      const data = await redis.get(key);
      if (!data) return null;
      try {
        return JSON.parse(data) as T;
      } catch {
        return data as unknown as T;
      }
    } catch {
      return null; // Fallback to DB
    }
  }

  public checkHealth(): { isHealthy: boolean } {
    return {
      isHealthy: this.client ? this.client.status === 'ready' : false,
    };
  }
}

export const redisManager = RedisConnectionManager.getInstance();

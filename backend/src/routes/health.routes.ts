import { Router, Request, Response } from 'express';
import { ApiResponse } from '../utils/api-response';
import { mongoManager } from '../database/mongo.connection';
import { redisManager } from '../database/redis.connection';
import { databaseHealthService } from '../database/database-health.service';

const router = Router();

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     summary: System Health Check
 *     description: Returns current operational status of API, MongoDB, and Redis.
 */
router.get('/', (req: Request, res: Response) => {
  const mongoHealth = mongoManager.checkHealth();
  const redisHealth = redisManager.checkHealth();

  const isFullyHealthy = mongoHealth.isHealthy && redisHealth.isHealthy;

  ApiResponse.success(
    res,
    {
      status: isFullyHealthy ? 'UP' : 'DEGRADED',
      environment: process.env.NODE_ENV || 'development',
      version: 'v1.0.0-foundation',
      services: {
        database: mongoHealth,
        cache: redisHealth,
      },
    },
    isFullyHealthy ? 'All services operational' : 'System running with degraded services',
    isFullyHealthy ? 200 : 207
  );
});

/**
 * @swagger
 * /api/v1/health/database:
 *   get:
 *     summary: Comprehensive Enterprise Database & Redis Health Metrics
 *     description: Returns collection stats, connection pool utilization, document counts, and memory usage.
 */
router.get('/database', async (req: Request, res: Response) => {
  const healthData = await databaseHealthService.getComprehensiveHealth();
  ApiResponse.success(res, healthData, 'Enterprise database health metrics fetched');
});

export const healthRoutes = router;

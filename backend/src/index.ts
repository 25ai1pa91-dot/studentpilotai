import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.config';
import { logger } from './core/logger';
import { mongoManager } from './database/mongo.connection';
import { requestIdMiddleware } from './middleware/request-id.middleware';
import { globalRateLimiter } from './middleware/rate-limit.middleware';
import { errorHandler } from './middleware/error.middleware';
import { v1Routes } from './routes';
import { NotFoundError } from './core/api-error';

class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    logger.info('Initializing security and core middlewares...');

    this.app.use(helmet());
    this.app.use(
      cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
      })
    );
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(cookieParser());
    this.app.use(requestIdMiddleware);
    this.app.use(globalRateLimiter);

    this.app.use(
      morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: {
          write: (message: string) => logger.http(message.trim()),
        },
      })
    );
  }

  private configureRoutes(): void {
    logger.info('Mounting API routes...');

    // Root Welcome Endpoint
    this.app.get('/', (req: Request, res: Response) => {
      res.json({
        app: 'StudentPilot AI Enterprise Backend',
        status: 'UP',
        documentation: `/docs`,
        version: 'v1.0.0-foundation',
      });
    });

    // Mount v1 API Router
    this.app.use('/api/v1', v1Routes);

    // Handle 404 Routes
    this.app.use('*', (req: Request, res: Response, next) => {
      next(new NotFoundError(`Route ${req.originalUrl} not found on server`));
    });
  }

  private configureErrorHandling(): void {
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    try {
      // Connect Database Connections asynchronously
      await mongoManager.connect();

      const server = this.app.listen(env.PORT, () => {
        logger.info(`==================================================`);
        logger.info(`🚀 StudentPilot AI Backend running on port ${env.PORT}`);
        logger.info(`🌍 Environment: ${env.NODE_ENV}`);
        logger.info(`==================================================`);
      });

      // Graceful Shutdown Handler
      const shutdown = async (signal: string) => {
        logger.info(`Received ${signal}. Shutting down gracefully...`);
        server.close(async () => {
          await mongoManager.disconnect();
          logger.info('Process terminated safely.');
          process.exit(0);
        });
      };

      process.on('SIGTERM', () => shutdown('SIGTERM'));
      process.on('SIGINT', () => shutdown('SIGINT'));
    } catch (error) {
      logger.error(`Failed to start backend server: ${error}`);
      process.exit(1);
    }
  }
}

const server = new Server();
server.start();

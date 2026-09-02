import { logger } from '../core/logger';

export interface BackgroundJob<T = any> {
  id: string;
  queueName: 'ai-tasks' | 'email' | 'roadmap-generator' | 'resume-analyzer' | 'dead-letter';
  payload: T;
  createdAt: Date;
}

export class QueueManager {
  private static instance: QueueManager;
  private jobRegistry: Map<string, BackgroundJob> = new Map();

  private constructor() {}

  public static getInstance(): QueueManager {
    if (!QueueManager.instance) {
      QueueManager.instance = new QueueManager();
    }
    return QueueManager.instance;
  }

  public async addJob<T>(queueName: BackgroundJob['queueName'], payload: T): Promise<string> {
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const job: BackgroundJob<T> = {
      id: jobId,
      queueName,
      payload,
      createdAt: new Date(),
    };

    this.jobRegistry.set(jobId, job);
    logger.info(`[Queue Manager] Enqueued job ${jobId} on queue '${queueName}'`);

    return jobId;
  }

  public getJob(jobId: string): BackgroundJob | undefined {
    return this.jobRegistry.get(jobId);
  }
}

export const queueManager = QueueManager.getInstance();

import mongoose from 'mongoose';
import dns from 'dns';
import { env } from '../config/env.config';
import { logger } from '../core/logger';

// Set DNS servers to resolve SRV records on Windows Node.js runtimes
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch {
  // Ignore DNS override errors if in restricted environment
}

export class MongoConnectionManager {
  private static instance: MongoConnectionManager;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): MongoConnectionManager {
    if (!MongoConnectionManager.instance) {
      MongoConnectionManager.instance = new MongoConnectionManager();
    }
    return MongoConnectionManager.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info('MongoDB is already connected.');
      return;
    }

    try {
      mongoose.set('strictQuery', true);

      // Enterprise Production MongoDB Atlas Options
      const conn = await mongoose.connect(env.MONGO_URI, {
        maxPoolSize: 50,
        minPoolSize: 10,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        retryWrites: true,
        retryReads: true,
        w: 'majority',
      });

      this.isConnected = true;
      logger.info(`✅ Enterprise MongoDB Atlas Connected: ${conn.connection.host}/${conn.connection.name}`);

      mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB Replica Set Error: ${err}`);
      });

      mongoose.connection.on('disconnected', () => {
        logger.warn('MongoDB Disconnected. Initiating automatic retry connection...');
        this.isConnected = false;
      });
    } catch (error) {
      logger.error(`Failed to establish MongoDB Enterprise Connection: ${error}`);
    }
  }

  public async disconnect(): Promise<void> {
    if (this.isConnected) {
      await mongoose.disconnect();
      this.isConnected = false;
      logger.info('MongoDB Disconnected gracefully.');
    }
  }

  public checkHealth(): { isHealthy: boolean; state: string; poolSize: number } {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const stateIndex = mongoose.connection.readyState;
    return {
      isHealthy: stateIndex === 1,
      state: states[stateIndex] || 'unknown',
      poolSize: (mongoose.connection as any).client?.topology?.s?.options?.maxPoolSize || 50,
    };
  }
}

export const mongoManager = MongoConnectionManager.getInstance();

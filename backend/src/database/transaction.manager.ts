import mongoose, { ClientSession } from 'mongoose';
import { logger } from '../core/logger';

export class TransactionManager {
  /**
   * Executes callback inside an isolated atomic MongoDB ClientSession transaction
   */
  public static async executeTransaction<T>(
    callback: (session: ClientSession) => Promise<T>
  ): Promise<T> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const result = await callback(session);
      await session.commitTransaction();
      return result;
    } catch (error) {
      await session.abortTransaction();
      logger.error(`[Transaction Aborted] Error executing atomic operation: ${error}`);
      throw error;
    } finally {
      session.endSession();
    }
  }
}

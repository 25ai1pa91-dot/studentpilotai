import { Schema, model, Document, Types } from 'mongoose';

export interface IAuthSessionDocument extends Document {
  userId: Types.ObjectId;
  refreshTokenHash: string;
  device: string;
  ipAddress: string;
  isRevoked: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AuthSessionSchema = new Schema<IAuthSessionDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    refreshTokenHash: { type: String, required: true, index: true },
    device: { type: String, default: 'Unknown Device' },
    ipAddress: { type: String, default: '127.0.0.1' },
    isRevoked: { type: Boolean, default: false, index: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);

AuthSessionSchema.index({ userId: 1, isRevoked: 1 });

export const AuthSessionModel = model<IAuthSessionDocument>('AuthSession', AuthSessionSchema);

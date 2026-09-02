import { Schema, model, Document } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  oauthAccounts?: { provider: string; providerId: string }[];
  isEmailVerified: boolean;
  avatar?: string;
  role: 'student' | 'admin' | 'mentor';
  status: 'active' | 'suspended' | 'pending';
  subscription: { plan: 'free' | 'pro' | 'enterprise'; expiresAt?: Date };
  preferences: { timezone: string; language: string; theme: string };
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String },
    oauthAccounts: [{ provider: String, providerId: String }],
    isEmailVerified: { type: Boolean, default: false },
    avatar: { type: String },
    role: { type: String, enum: ['student', 'admin', 'mentor'], default: 'student' },
    status: { type: String, enum: ['active', 'suspended', 'pending'], default: 'active' },
    subscription: {
      plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
      expiresAt: { type: Date },
    },
    preferences: {
      timezone: { type: String, default: 'UTC' },
      language: { type: String, default: 'en' },
      theme: { type: String, default: 'dark' },
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });
UserSchema.index({ role: 1, status: 1 });

export const UserModel = model<IUserDocument>('User', UserSchema);

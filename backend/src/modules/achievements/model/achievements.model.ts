import { Schema, model, Document, Types } from 'mongoose';

export interface IAchievementDocument extends Document {
  ownerId: Types.ObjectId;
  title: string;
  badge: string;
  xpEarned: number;
  unlockedAt: Date;
  milestoneType: string;
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievementDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    badge: { type: String, required: true },
    xpEarned: { type: Number, default: 100 },
    unlockedAt: { type: Date, default: Date.now },
    milestoneType: { type: String, required: true },
  },
  { timestamps: true }
);

AchievementSchema.index({ ownerId: 1 });

export const AchievementModel = model<IAchievementDocument>('Achievement', AchievementSchema);

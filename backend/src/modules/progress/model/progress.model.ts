import { Schema, model, Document, Types } from 'mongoose';

export interface IProgressDocument extends Document {
  ownerId: Types.ObjectId;
  dailyHours: { date: string; hours: number }[];
  weeklyHoursTotal: number;
  monthlyHoursTotal: number;
  solvedQuestionsCount: number;
  completedProjectsCount: number;
  placementReadinessScore: number;
  growthRatePct: number;
  streakDays: number;
  focusScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProgressSchema = new Schema<IProgressDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    dailyHours: [{ date: String, hours: Number }],
    weeklyHoursTotal: { type: Number, default: 0 },
    monthlyHoursTotal: { type: Number, default: 0 },
    solvedQuestionsCount: { type: Number, default: 0 },
    completedProjectsCount: { type: Number, default: 0 },
    placementReadinessScore: { type: Number, default: 68.5 },
    growthRatePct: { type: Number, default: 12.4 },
    streakDays: { type: Number, default: 1 },
    focusScore: { type: Number, default: 85 },
  },
  { timestamps: true }
);

ProgressSchema.index({ ownerId: 1 });

export const ProgressModel = model<IProgressDocument>('Progress', ProgressSchema);

import { Schema, model, Document, Types } from 'mongoose';

export interface IContestDocument extends Document {
  title: string;
  type: 'Weekly' | 'Daily' | 'Company' | 'Hackathon';
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  problemIds: Types.ObjectId[];
  participantsCount: number;
  status: 'upcoming' | 'live' | 'ended';
  createdAt: Date;
  updatedAt: Date;
}

const ContestSchema = new Schema<IContestDocument>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['Weekly', 'Daily', 'Company', 'Hackathon'], default: 'Weekly' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    durationMinutes: { type: Number, default: 90 },
    problemIds: [{ type: Schema.Types.ObjectId, ref: 'CodingProblem' }],
    participantsCount: { type: Number, default: 0 },
    status: { type: String, enum: ['upcoming', 'live', 'ended'], default: 'upcoming' },
  },
  { timestamps: true }
);

export const ContestModel = model<IContestDocument>('Contest', ContestSchema);

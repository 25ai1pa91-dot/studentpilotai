import { Schema, model, Document, Types } from 'mongoose';

export interface IInterviewDocument extends Document {
  ownerId: Types.ObjectId;
  interviewType: 'HR' | 'Technical' | 'Behavioral' | 'SystemDesign' | 'Frontend' | 'Backend' | 'DSA';
  targetCompany: string;
  status: 'active' | 'completed' | 'abandoned';
  messages: { sender: 'interviewer' | 'candidate'; text: string; timestamp: Date }[];
  hiringRatingPct: number;
  communicationScore: number;
  technicalScore: number;
  feedbackSummary: string;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema = new Schema<IInterviewDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    interviewType: { type: String, required: true },
    targetCompany: { type: String, default: 'Google' },
    status: { type: String, enum: ['active', 'completed', 'abandoned'], default: 'active' },
    messages: [
      {
        sender: { type: String, enum: ['interviewer', 'candidate'], required: true },
        text: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
    hiringRatingPct: { type: Number, default: 85 },
    communicationScore: { type: Number, default: 88 },
    technicalScore: { type: Number, default: 82 },
    feedbackSummary: String,
  },
  { timestamps: true }
);

InterviewSchema.index({ ownerId: 1, createdAt: -1 });

export const InterviewModel = model<IInterviewDocument>('Interview', InterviewSchema);

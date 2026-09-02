import { Schema, model, Document, Types } from 'mongoose';

export interface IApplicationDocument extends Document {
  ownerId: Types.ObjectId;
  companyName: string;
  jobTitle: string;
  status: 'Applied' | 'OA Scheduled' | 'OA Completed' | 'Interview 1' | 'Interview 2' | 'Manager Round' | 'HR Round' | 'Offer' | 'Rejected' | 'Accepted' | 'Withdrawn';
  appliedDate: Date;
  nextInterviewDate?: Date;
  notes?: string;
  salaryOffered?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplicationDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    companyName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    status: {
      type: String,
      enum: ['Applied', 'OA Scheduled', 'OA Completed', 'Interview 1', 'Interview 2', 'Manager Round', 'HR Round', 'Offer', 'Rejected', 'Accepted', 'Withdrawn'],
      default: 'Applied',
    },
    appliedDate: { type: Date, default: Date.now },
    nextInterviewDate: Date,
    notes: String,
    salaryOffered: String,
  },
  { timestamps: true }
);

ApplicationSchema.index({ ownerId: 1, status: 1 });

export const ApplicationModel = model<IApplicationDocument>('Application', ApplicationSchema);

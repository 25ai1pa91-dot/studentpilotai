import { Schema, model, Document } from 'mongoose';

export interface IJobDocument extends Document {
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  salaryRange: string;
  experienceLevel: string;
  requiredSkills: string[];
  description: string;
  applyUrl: string;
  jobType: 'Campus' | 'Off Campus' | 'Referral' | 'Startup' | 'MNC';
  deadline: Date;
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJobDocument>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, index: true },
    location: { type: String, default: 'Remote' },
    isRemote: { type: Boolean, default: true },
    salaryRange: { type: String, default: '$120k - $160k / yr' },
    experienceLevel: { type: String, default: '0-2 Years' },
    requiredSkills: [String],
    description: String,
    applyUrl: { type: String, required: true },
    jobType: { type: String, enum: ['Campus', 'Off Campus', 'Referral', 'Startup', 'MNC'], default: 'MNC' },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
  },
  { timestamps: true }
);

JobSchema.index({ company: 1, jobType: 1 });

export const JobModel = model<IJobDocument>('Job', JobSchema);

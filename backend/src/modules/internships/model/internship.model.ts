import { Schema, model, Document } from 'mongoose';

export interface IInternshipDocument extends Document {
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  stipend: string;
  duration: string;
  requiredSkills: string[];
  description: string;
  applyUrl: string;
  deadline: Date;
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const InternshipSchema = new Schema<IInternshipDocument>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, index: true },
    location: { type: String, default: 'Remote' },
    isRemote: { type: Boolean, default: true },
    stipend: { type: String, default: '$2,500 / month' },
    duration: { type: String, default: '3 Months' },
    requiredSkills: [String],
    description: String,
    applyUrl: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['active', 'closed'], default: 'active' },
  },
  { timestamps: true }
);

InternshipSchema.index({ company: 1 });

export const InternshipModel = model<IInternshipDocument>('Internship', InternshipSchema);

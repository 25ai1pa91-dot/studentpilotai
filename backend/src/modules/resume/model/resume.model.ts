import { Schema, model, Document, Types } from 'mongoose';

export interface IResumeDocument extends Document {
  ownerId: Types.ObjectId;
  personalInfo: { fullName: string; email: string; phone: string; linkedin: string; github: string; summary: string };
  experience: { company: string; role: string; duration: string; bullets: string[] }[];
  projects: { name: string; tech: string; description: string }[];
  skills: string[];
  certificates: { title: string; issuer: string; date: string }[];
  atsScore: number;
  template: 'FAANG' | 'Modern' | 'Minimal' | 'Startup';
  versionName: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResumeSchema = new Schema<IResumeDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    personalInfo: { fullName: String, email: String, phone: String, linkedin: String, github: String, summary: String },
    experience: [{ company: String, role: String, duration: String, bullets: [String] }],
    projects: [{ name: String, tech: String, description: String }],
    skills: [String],
    certificates: [{ title: String, issuer: String, date: String }],
    atsScore: { type: Number, default: 88 },
    template: { type: String, enum: ['FAANG', 'Modern', 'Minimal', 'Startup'], default: 'FAANG' },
    versionName: { type: String, default: 'Primary Resume' },
  },
  { timestamps: true }
);

ResumeSchema.index({ ownerId: 1 });

export const ResumeModel = model<IResumeDocument>('Resume', ResumeSchema);

import { Schema, model, Document } from 'mongoose';

export interface ICompanyDocument extends Document {
  name: string;
  slug: string;
  logo: string;
  requiredSkills: string[];
  interviewPattern: { roundName: string; duration: string; focus: string }[];
  importanceWeight: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  requiredReadinessScore: number;
  createdAt: Date;
  updatedAt: Date;
}

const CompanySchema = new Schema<ICompanyDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    logo: String,
    requiredSkills: [String],
    interviewPattern: [{ roundName: String, duration: String, focus: String }],
    importanceWeight: { type: Number, default: 95 },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Hard' },
    requiredReadinessScore: { type: Number, default: 85 },
  },
  { timestamps: true }
);

CompanySchema.index({ slug: 1 });
CompanySchema.index({ difficulty: 1 });

export const CompanyModel = model<ICompanyDocument>('Company', CompanySchema);

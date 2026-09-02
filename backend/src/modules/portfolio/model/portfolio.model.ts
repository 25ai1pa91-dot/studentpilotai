import { Schema, model, Document, Types } from 'mongoose';

export interface IPortfolioDocument extends Document {
  ownerId: Types.ObjectId;
  theme: 'Linear' | 'Vercel' | 'Apple';
  name: string;
  role: string;
  bio: string;
  githubUrl: string;
  projects: { title: string; desc: string; tech: string[] }[];
  deployUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioSchema = new Schema<IPortfolioDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    theme: { type: String, enum: ['Linear', 'Vercel', 'Apple'], default: 'Linear' },
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: String,
    githubUrl: String,
    projects: [{ title: String, desc: String, tech: [String] }],
    deployUrl: String,
  },
  { timestamps: true }
);

PortfolioSchema.index({ ownerId: 1 });

export const PortfolioModel = model<IPortfolioDocument>('Portfolio', PortfolioSchema);

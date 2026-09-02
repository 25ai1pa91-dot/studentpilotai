import { Schema, model, Document } from 'mongoose';

export interface ICodingProblemDocument extends Document {
  title: string;
  slug: string;
  statement: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  companies: string[];
  hints: string[];
  visibleTestcases: { input: string; output: string; explanation?: string }[];
  hiddenTestcases: { input: string; output: string }[];
  solutionSnippet: string;
  createdAt: Date;
  updatedAt: Date;
}

const CodingProblemSchema = new Schema<ICodingProblemDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    statement: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    tags: [String],
    companies: [String],
    hints: [String],
    visibleTestcases: [{ input: String, output: String, explanation: String }],
    hiddenTestcases: [{ input: String, output: String }],
    solutionSnippet: String,
  },
  { timestamps: true }
);

CodingProblemSchema.index({ slug: 1 });
CodingProblemSchema.index({ difficulty: 1, tags: 1 });

export const CodingProblemModel = model<ICodingProblemDocument>('CodingProblem', CodingProblemSchema);

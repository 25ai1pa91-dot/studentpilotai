import mongoose, { Schema, Document } from 'mongoose';

export interface ISkillUniverseDocument extends Document {
  skillId: string;
  title: string;
  category: string;
  prerequisites: string[];
  totalLevels: number;
  levels: {
    level: number;
    title: string;
    description: string;
    xpReward: number;
    estimatedMinutes: number;
    difficulty: string;
    theory: {
      visualAnalogy: string;
      firstPrinciples: string;
    };
    playground: {
      type: string;
      initialCode: string;
    };
    quiz: {
      question: string;
      options: string[];
      correctIndex: number;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const SkillUniverseSchema = new Schema<ISkillUniverseDocument>(
  {
    skillId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    prerequisites: [{ type: String }],
    totalLevels: { type: Number, default: 10 },
    levels: [
      {
        level: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String },
        xpReward: { type: Number, default: 50 },
        estimatedMinutes: { type: Number, default: 20 },
        difficulty: { type: String, default: 'Beginner' },
        theory: {
          visualAnalogy: { type: String },
          firstPrinciples: { type: String },
        },
        playground: {
          type: { type: String, default: 'dom' },
          initialCode: { type: String },
        },
        quiz: {
          question: { type: String },
          options: [{ type: String }],
          correctIndex: { type: Number, default: 0 },
        },
      },
    ],
  },
  { timestamps: true }
);

export const SkillUniverseModel = mongoose.model<ISkillUniverseDocument>('SkillUniverse', SkillUniverseSchema);

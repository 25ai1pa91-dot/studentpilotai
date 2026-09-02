import { Schema, model, Document, Types } from 'mongoose';

export interface IAssessmentDocument extends Document {
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  company?: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  questions: {
    questionId: string;
    type: 'MCQ' | 'MSQ' | 'CodingMCQ' | 'FillBlank';
    questionText: string;
    options: string[];
    correctAnswer: any;
    marks: number;
    explanation: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentSchema = new Schema<IAssessmentDocument>(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, index: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    company: String,
    durationMinutes: { type: Number, default: 45 },
    totalMarks: { type: Number, default: 100 },
    passingMarks: { type: Number, default: 70 },
    questions: [
      {
        questionId: String,
        type: { type: String, enum: ['MCQ', 'MSQ', 'CodingMCQ', 'FillBlank'], default: 'MCQ' },
        questionText: String,
        options: [String],
        correctAnswer: Schema.Types.Mixed,
        marks: Number,
        explanation: String,
      },
    ],
  },
  { timestamps: true }
);

export const AssessmentModel = model<IAssessmentDocument>('Assessment', AssessmentSchema);

export interface IAssessmentAttemptDocument extends Document {
  ownerId: Types.ObjectId;
  assessmentId: Types.ObjectId;
  answers: { questionId: string; answer: any }[];
  score: number;
  percentage: number;
  isPassed: boolean;
  status: 'in_progress' | 'completed' | 'abandoned';
  timeSpentSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentAttemptSchema = new Schema<IAssessmentAttemptDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    assessmentId: { type: Schema.Types.ObjectId, ref: 'Assessment', required: true },
    answers: [{ questionId: String, answer: Schema.Types.Mixed }],
    score: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    isPassed: { type: Boolean, default: false },
    status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' },
    timeSpentSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const AssessmentAttemptModel = model<IAssessmentAttemptDocument>('AssessmentAttempt', AssessmentAttemptSchema);

import { Schema, model, Document, Types } from 'mongoose';

export interface IQuizQuestion {
  questionId: string;
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface IQuizDocument extends Document {
  nodeId?: Types.ObjectId;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: IQuizQuestion[];
  companies: string[];
  passingScorePct: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuizQuestionSchema = new Schema<IQuizQuestion>({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctOptionIndex: { type: Number, required: true },
  explanation: String,
});

const QuizSchema = new Schema<IQuizDocument>(
  {
    nodeId: { type: Schema.Types.ObjectId, ref: 'KnowledgeNode' },
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    questions: [QuizQuestionSchema],
    companies: [String],
    passingScorePct: { type: Number, default: 70 },
  },
  { timestamps: true }
);

QuizSchema.index({ nodeId: 1 });

export const QuizModel = model<IQuizDocument>('Quiz', QuizSchema);

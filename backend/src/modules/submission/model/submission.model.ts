import { Schema, model, Document, Types } from 'mongoose';

export interface ISubmissionDocument extends Document {
  ownerId: Types.ObjectId;
  problemId: Types.ObjectId;
  language: 'javascript' | 'typescript' | 'python' | 'cpp' | 'java';
  code: string;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Memory Limit Exceeded' | 'Runtime Error' | 'Compilation Error';
  runtimeMs: number;
  memoryKb: number;
  passedTestcases: number;
  totalTestcases: number;
  aiReview?: any;
  createdAt: Date;
  updatedAt: Date;
}

const SubmissionSchema = new Schema<ISubmissionDocument>(
  {
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    problemId: { type: Schema.Types.ObjectId, ref: 'CodingProblem', required: true, index: true },
    language: { type: String, required: true },
    code: { type: String, required: true },
    verdict: {
      type: String,
      enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Memory Limit Exceeded', 'Runtime Error', 'Compilation Error'],
      required: true,
    },
    runtimeMs: { type: Number, default: 0 },
    memoryKb: { type: Number, default: 0 },
    passedTestcases: { type: Number, default: 0 },
    totalTestcases: { type: Number, default: 0 },
    aiReview: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

SubmissionSchema.index({ ownerId: 1, createdAt: -1 });

export const SubmissionModel = model<ISubmissionDocument>('Submission', SubmissionSchema);

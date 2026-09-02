import { Schema, model, Document, Types } from 'mongoose';

export interface IProfileDocument extends Document {
  userId: Types.ObjectId;
  college?: string;
  university?: string;
  degree?: string;
  branch?: string;
  currentYear?: string;
  graduationYear?: number;
  cgpa?: number;
  targetCgpa?: number;
  country?: string;
  state?: string;
  city?: string;
  dob?: Date;
  gender?: string;
  learningStyle?: string;
  dailyHours?: number;
  weeklyHours?: number;
  careerGoal?: string;
  dreamCompany?: string;
  dreamRole?: string;
  currentSkillLevel?: string;
  programmingLanguages?: string[];
  technologyInterests?: string[];
  strongSubjects?: string[];
  weakSubjects?: string[];
  github?: string;
  linkedIn?: string;
  portfolio?: string;
  resumeUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfileDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    college: String,
    university: String,
    degree: String,
    branch: String,
    currentYear: String,
    graduationYear: Number,
    cgpa: Number,
    targetCgpa: Number,
    country: String,
    state: String,
    city: String,
    dob: Date,
    gender: String,
    learningStyle: String,
    dailyHours: { type: Number, default: 2 },
    weeklyHours: { type: Number, default: 14 },
    careerGoal: String,
    dreamCompany: String,
    dreamRole: String,
    currentSkillLevel: String,
    programmingLanguages: [String],
    technologyInterests: [String],
    strongSubjects: [String],
    weakSubjects: [String],
    github: String,
    linkedIn: String,
    portfolio: String,
    resumeUrl: String,
  },
  { timestamps: true }
);

ProfileSchema.index({ userId: 1 });
ProfileSchema.index({ dreamCompany: 1, dreamRole: 1 });

export const ProfileModel = model<IProfileDocument>('Profile', ProfileSchema);

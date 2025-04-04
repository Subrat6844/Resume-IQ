import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  email: string;
  fileName: string;
  uploadDate: Date;
  extractedText: string;
  analysisSummary?: string; // Gemini API result (optional)
  feedback?: string; // Additional feedback from AI
}

const ResumeSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      default: Date.now,
    },
    extractedText: {
      type: String,
      required: true,
    },
    analysisSummary: {
      type: String,
    },
    feedback: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
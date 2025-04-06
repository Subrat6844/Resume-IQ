import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
	email: string;
	fileName: string;
	uploadDate: Date;
	extractedText: string;
	result?: string;
}

const ResumeSchema: Schema = new Schema(
	{
		email: { type: String, required: true },
		fileName: { type: String, required: true },
		uploadDate: { type: Date, default: Date.now },
		extractedText: { type: String, required: true },
		result: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.models.Resume ||
	mongoose.model<IResume>("Resume", ResumeSchema);

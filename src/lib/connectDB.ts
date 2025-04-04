import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
	throw new Error("⚠️ MONGO_URI is not defined in environment variables!");
}

let isConnected = false;

export const connectDb = async () => {
	if (isConnected) {
		console.log("✅ Using existing database connection");
		return;
	}

	try {
		await mongoose.connect(MONGO_URI, {
			dbName: "resumeAnalyzer", // Change as needed
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as any); // To avoid TypeScript errors

		isConnected = true;
		console.log("🚀 Connected to MongoDB");
	} catch (error) {
		console.error("❌ Error connecting to MongoDB:", error);
		throw new Error("Database connection failed");
	}
};

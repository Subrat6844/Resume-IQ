import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Resume from "@/models/Resume"; // adjust path as needed
import { connectDb } from "@/lib/connectDB"; // assumes you have a DB connection helper

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	await connectDb();

	const { id } = params;
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return NextResponse.json(
			{ success: false, error: "Invalid ID" },
			{ status: 400 }
		);
	}

	try {
		const resume = await Resume.findById(id);
		if (!resume) {
			return NextResponse.json(
				{ success: false, error: "Resume not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json({ success: true, resume }, { status: 200 });
	} catch (error) {
		console.error("Error fetching resume:", error);
		return NextResponse.json(
			{ success: false, error: "Server error" },
			{ status: 500 }
		);
	}
}

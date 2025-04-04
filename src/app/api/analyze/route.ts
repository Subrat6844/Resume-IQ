import { NextRequest, NextResponse } from "next/server";
import Resume from "@/models/Resume";
import {connectDb} from "@/lib/connectDB";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const body = await req.json();
    const { email, fileName, extractedText } = body;
    if (!email || !fileName || !extractedText) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
You are a professional resume reviewer. Analyze the following resume text and provide:
- A summary of the candidate's profile.
- Suggestions for improvement.
- Key strengths.
- Potential red flags (if any).
- All in json.

Resume Text:
${extractedText}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiFeedback = response.text();
    const savedResume = await Resume.create({
      email,
      fileName,
      extractedText,
      analysisSummary: aiFeedback,
    });

    return NextResponse.json({ success: true, resume: savedResume });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

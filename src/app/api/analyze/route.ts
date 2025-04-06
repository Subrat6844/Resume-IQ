import { NextRequest, NextResponse } from "next/server";
import Resume, { IResume } from "@/models/Resume";
import { connectDb } from "@/lib/connectDB";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
	try {
		await connectDb();
		const body = await req.json();
		const { email, fileName, extractedText } = body;
		if (!email || !fileName || !extractedText) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}
		const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
		const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `
    You are a professional resume reviewer. Analyze the following resume text and return a valid JSON object with the following structure:
    
    {
      "suggestions_for_improvement": string[],
      "key_strengths": string[],
      "potential_red_flags": string[],
      "resume_score": number (0–100),
      "section_feedback": {
        "<section_name>": string
        // Only include sections that are actually found in the resume.
        // For example: "education", "projects", "skills", "internship", "experience", etc.
      },
      "possible_typos": string[],
      "analysis_confidence": number (0–100),
      "user_message": string
    }
    
    Important Instructions:
    - The JSON must be strictly valid and parsable.
    - Do not format the JSON response in a code block.
    - Only include keys inside "section_feedback" for sections present in the resume.
    - In "user_message", briefly summarize your impression of the resume. If formatting or extraction appears broken or incomplete, mention it clearly.
    - If any section like "internship" or "experience" is missing, you can either omit it from "section_feedback" or add feedback indicating its absence.
    - In "possible_typos", list any spelling or grammar mistakes. If they're possibly due to PDF text extraction issues, mention that in "user_message".
    
    Resume Text:
    ${extractedText}
    `;
    

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const aiFeedback = response.text();
		const pureJson = aiFeedback
			.replace(/^```json\s*/i, "")
			.replace(/^```/, "")
			.replace(/```$/, "")
			.trim();
		const savedResume = await Resume.create({
      email,
      fileName,
      extractedText,
      result:pureJson
    });
    
		return NextResponse.json({ success: true, resume: savedResume },{status:200});
	} catch (error) {
		console.error("Analysis error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}

"use client";
import { useEffect, useState } from "react";
import { Plus, UploadCloud } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // ✅ App Router
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as pdfjsLib from "pdfjs-dist";
import Link from "next/link";
export default function Dashboard() {
	const router = useRouter();
	const user = useUser();
	const [resumes, setResumes] = useState<any[]>([]);
	const [resumeFile, setResumeFile] = useState<File | null>(null);
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setResumeFile(event.target.files[0]);
		}
	};
	const fetchResume = async () => {
		try {
			const response = await fetch("/api/resume", {
				method: "GET",
			});
			const data = await response.json();
			console.log();

			setResumes(data.data);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	useEffect(() => {
		fetchResume();
	}, []);
	const extractTextFromPDF = async (file: File): Promise<string> => {
		const arrayBuffer = await file.arrayBuffer();
		const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
		let text = "";

		for (let i = 1; i <= pdf.numPages; i++) {
			const page = await pdf.getPage(i);
			const content = await page.getTextContent();
			const strings = content.items.map((item: any) => item.str);
			text += strings.join(" ") + " ";
		}

		return text;
	};
	useEffect(() => {
		pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`;
	}, []);

	const handleSubmit = async () => {
		if (!resumeFile) return;
		setIsAnalyzing(true);
		try {
			const extractedText = await extractTextFromPDF(resumeFile);
			const email = user?.user?.primaryEmailAddress?.emailAddress;

			const response = await fetch("/api/analyze", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					fileName: resumeFile.name,
					extractedText,
				}),
			});

			const data = await response.json();
			const resumeId = data?.resume?._id;

			if (response.ok && resumeId) {
				setResumeFile(null);
				router.push(`/dashboard/${resumeId}`);
			} else {
				console.error("Invalid response from server:", data);
			}
		} catch (error) {
			console.error("Error analyzing resume:", error);
		} finally {
			setIsAnalyzing(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
					<div className="flex items-center space-x-4">
						<UserButton />
					</div>
				</div>
			</nav>

			<main className="mx-auto max-w-7xl px-6 py-8">
				<Dialog>
					<DialogTrigger asChild>
						<Button className="flex items-center bg-indigo-600 text-white hover:bg-indigo-700 transition">
							<Plus className="w-5 h-5 mr-2" />
							Create New
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Upload a Resume</DialogTitle>
						</DialogHeader>
						<div className="space-y-4">
							<label className="block text-sm font-medium text-gray-700">
								Select Resume File
							</label>
							<Input type="file" accept=".pdf" onChange={handleFileChange} />
							<Button
								disabled={!resumeFile || isAnalyzing}
								onClick={handleSubmit}
								className="w-full flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700"
							>
								<UploadCloud className="w-5 h-5 mr-2" />
								{isAnalyzing ? "Analyzing..." : "Upload Resume"}
							</Button>
						</div>
					</DialogContent>
				</Dialog>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					{resumes?.map((resume) => (
						<Link
							key={resume._id}
							href={`/dashboard/${resume._id}`}
							className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
						>
							<div className="flex justify-between items-center">
								<div>
									<h2 className="text-lg font-semibold text-gray-900">
										{resume.fileName}
									</h2>
									<p className="text-sm text-gray-500">
										Analyzed on{" "}
										{new Date(resume.uploadDate).toLocaleDateString()}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
}

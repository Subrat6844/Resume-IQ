"use client";

import { useEffect, useState } from "react";

export default function Page({ params: { id } }: any) {
	const [resumeData, setResumeData] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [email, setEmail] = useState("");

	useEffect(() => {
		const fetchResume = async () => {
			try {
				const res = await fetch(`/api/resume/${id}`);
				const data = await res.json();
				const jsonResume = JSON.parse(data.resume.result);
				setEmail(data.resume.email);
				setResumeData(jsonResume);
			} catch (error) {
				console.error("Error fetching resume:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchResume();
	}, [id]);

	if (loading)
		return <div className="p-6 text-center text-gray-500">Loading...</div>;
	if (!resumeData)
		return <div className="p-6 text-center text-red-500">No resume found.</div>;
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-3xl font-bold text-center text-indigo-500">
				Resume Analysis Summary
			</h1>

			<div className="grid grid-cols-1 gap-6">
				<Card title="Email" content={email} />
				<Card title="Resume Score" content={`${resumeData.resume_score}/100`} />
				<Card
					title="Analysis Confidence"
					content={`${resumeData.analysis_confidence}%`}
				/>
				<Card title="User Message" content={resumeData.user_message} />
			</div>

			<Section
				title="Suggestions for Improvement"
				items={resumeData.suggestions_for_improvement}
			/>
			<Section title="Key Strengths" items={resumeData.key_strengths} />
			<Section
				title="Potential Red Flags"
				items={resumeData.potential_red_flags}
			/>

			{resumeData.section_feedback && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{Object.entries(resumeData.section_feedback).map(
						([sectionTitle, feedback]: [any, any]) => (
							<Card
								key={sectionTitle}
								title={formatSectionTitle(sectionTitle)}
								content={feedback}
							/>
						)
					)}
				</div>
			)}

			<Section
				title="Possible Typos"
				items={
					resumeData.possible_typos.length > 0
						? resumeData.possible_typos
						: ["None detected."]
				}
			/>
		</div>
	);
}

function formatSectionTitle(key: string) {
	return key
		.replace(/_/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function Card({ title, content }: { title: string; content: string }) {
	return (
		<div className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition">
			<h2 className="text-lg font-semibold text-indigo-500 mb-2">{title}</h2>
			<p className="text-gray-600 whitespace-pre-wrap">{content}</p>
		</div>
	);
}
function Section({ title, items }: { title: string; items: string[] }) {
	return (
		<div className="bg-white shadow-md rounded-2xl p-6">
			<h2 className="text-xl font-semibold text-indigo-500 mb-4">{title}</h2>
			<ul className="list-disc list-inside space-y-2 text-gray-700">
				{items.map((item, idx) => (
					<li key={idx}>{item}</li>
				))}
			</ul>
			{title === "Possible Typos" && (
				<p className="mt-4 text-sm text-black italic">
					Note: Some listed words may not actually be typos. They could be due to formatting issues or errors in extracting text from the PDF.
				</p>
			)}
		</div>
	);
}

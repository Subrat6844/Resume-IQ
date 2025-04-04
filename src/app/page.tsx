"use client";
import Navbar from "@/components/navbar";
import { FileText, BrainCircuit, CheckCircle, BarChart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const features = [
  {
    name: "AI-Powered Analysis",
    description:
      "Leverage advanced AI to analyze your resume for structure, clarity, and impact.",
    icon: BrainCircuit,
  },
  {
    name: "Instant Feedback",
    description:
      "Receive real-time suggestions to improve your resume and increase your chances of success.",
    icon: CheckCircle,
  },
  {
    name: "ATS Compatibility Check",
    description:
      "Ensure your resume is ATS-friendly and formatted correctly for job applications.",
    icon: FileText,
  },
  {
    name: "Resume Score & Suggestions",
    description:
      "Get a detailed score breakdown with actionable insights for improvement.",
    icon: BarChart,
  },
];

export default function ResumeAnalyzerLanding() {
  return (
    <div className="bg-white min-h-screen relative isolate">
      <Navbar/>
      <section className="relative px-6 pt-20 lg:px-8 isolate">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#4f46e5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="md:text-center max-w-2xl mx-auto py-32">
          <a
            className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground h-8 px-3 text-xs rounded-full"
            href="#"
          >
            🎉{" "}
            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 bg-border w-px mx-2 h-4"
            ></div>
            Introducing AI Resume Analyser
          </a>
          <h1 className="text-5xl pt-2 font-semibold tracking-tight text-gray-900 sm:text-7xl">
            Optimize Your Resume with AI
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            Get real-time AI feedback, ATS compatibility checks, and expert
            suggestions to improve your resume instantly.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/signup"
              className="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-indigo-500"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Bottom Clip Path */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#4f46e5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Deploy faster
          </h2>
          <h2 className="text-4xl font-bold text-gray-900">
            Powerful AI Dashboard
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Gain insights, track resume performance, and improve with AI-driven
            analytics.
          </p>
          <div className="mt-10 flex justify-center">
            <img
              src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
              alt="Dashboard Preview"
              className="rounded-lg shadow-lg w-full max-w-4xl"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-base font-semibold text-indigo-600">
              AI-Powered Resume Optimization
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Improve your resume with AI-driven insights
            </p>
            <p className="mt-6 text-lg text-gray-600">
              Ensure your resume is ATS-friendly and stands out with expert
              feedback and AI-powered recommendations.
            </p>
          </div>

          <div className="mt-16 max-w-2xl mx-auto lg:max-w-4xl">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-lg font-semibold text-gray-900 flex items-center">
                    <feature.icon className="absolute top-0 left-0 h-10 w-10 p-2 bg-indigo-600 text-white rounded-lg" />
                    <span className="ml-2">{feature.name}</span>
                  </dt>
                  <dd className="mt-2 ml-2 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold text-gray-900">
            Trusted by professionals worldwide
          </h2>
          <div className="mt-10 flex justify-center space-x-10">
            <img
              alt="LinkedIn"
              src="/linkedin-logo.svg"
              className="h-12 md:h-24 object-contain"
            />
            <img
              alt="Indeed"
              src="/indeed-logo.svg"
              className="h-12 md:h-24 object-contain"
            />
            <img
              alt="Glassdoor"
              src="/glassdoor-logo.svg"
              className="h-12 md:h-24 object-contain"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Resume Analyzer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
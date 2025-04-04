import Navbar from "@/components/navbar";
import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Signup() {
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
				<div className="flex items-center justify-center mt-16 sm:mt-2">
                    <SignUp appearance={{elements:{
						button:"bg-indigo-600 hover:bg-indigo-500 border-0"
					}}} fallbackRedirectUrl={"/dashboard"} signInUrl="/login" routing="hash" />
                </div>
			</section>
		</div>
	);
}

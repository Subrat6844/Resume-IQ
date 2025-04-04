"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();
  return (
    <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-48">
          <div className="flex">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">ResumeIQ</span>
              <img
                alt="Company Logo"
                src="./logo.svg"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => router.push("/signup")} className="bg-white text-indigo-600 hover:bg-slate-50">
              Signup
            </Button>
            <Button onClick={() => router.push("/login")} className="bg-indigo-600 hover:bg-indigo-500">
              Log in
            </Button>
          </div>
        </nav>
      </header>
  )
}

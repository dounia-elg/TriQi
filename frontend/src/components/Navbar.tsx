'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span className="text-xl font-bold text-indigo-600">TriQi</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">
              How it works
            </Link>
            <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="#why-triqi" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Why TriQi?
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button className="md:hidden p-2 rounded-md text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-4">
            <Link href="#how-it-works" className="text-gray-600 hover:text-indigo-600" onClick={() => setIsOpen(false)}>How it works</Link>
            <Link href="#features" className="text-gray-600 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Features</Link>
            <Link href="#why-triqi" className="text-gray-600 hover:text-indigo-600" onClick={() => setIsOpen(false)}>Why TriQi?</Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link href="/login" className="text-center text-gray-600 font-medium py-2">Login</Link>
              <Link href="/register" className="text-center bg-indigo-600 text-white py-2 rounded-full font-medium">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

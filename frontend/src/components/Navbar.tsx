'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Why TriQi?', href: '#why-triqi' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(13,13,18,0.85)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🧭</span>
              <span className="text-lg font-bold" style={{ color: '#F2F0F5' }}>
                TriQi
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/login" className="nav-link px-4 py-2 rounded-full">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary btn-sm">
                Get Started
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 rounded-md"
              style={{ color: '#8B8996' }}
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center md:hidden"
          style={{ backgroundColor: '#0D0D12' }}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 p-2"
            style={{ color: '#8B8996' }}
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="absolute top-5 left-5 flex items-center gap-2">
            <span className="text-xl">🧭</span>
            <span className="text-base font-bold" style={{ color: '#F2F0F5' }}>TriQi</span>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center gap-8 mb-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-bold"
                style={{ color: '#F2F0F5' }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-3 w-72">
            <Link
              href="/auth/login"
              className="text-center py-3 rounded-full text-base font-medium nav-link"
              style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="btn-primary text-center"
              style={{ display: 'block' }}
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

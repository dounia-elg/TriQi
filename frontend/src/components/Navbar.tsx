'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Why TriQi?', href: '#why-triqi' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled 
            ? 'py-3 bg-[rgba(255,244,215,0.85)] backdrop-blur-md border-b border-[rgba(106,76,147,0.1)] shadow-sm' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl transition-transform group-hover:rotate-12">🧭</span>
              <span 
                className={`text-xl font-bold tracking-tight transition-colors ${
                  scrolled ? 'text-[#2D2B35]' : 'text-white'
                }`}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                TriQi
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-100 ${
                    scrolled ? 'text-[#6E6A7C] opacity-80' : 'text-white opacity-90'
                  }`}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff595e')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-5">
              <Link
                href="/auth/login"
                className={`text-sm font-bold transition-all duration-200 rounded-full ${
                  scrolled ? 'text-[#6a4c93]' : 'text-white hover:text-[#ffca3a]'
                }`}
              >
                Log in
              </Link>
              <Link
                href="/auth/register"
                className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${
                  scrolled 
                    ? 'bg-[#6a4c93] text-white hover:bg-[#ff595e]' 
                    : 'bg-white/90 backdrop-blur-sm text-[#6a4c93] hover:bg-white hover:scale-105'
                }`}
              >
                Get started
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-[#6E6A7C]' : 'text-white'
              }`}
              onClick={() => setIsOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col animate-in fade-in slide-in-from-top duration-300"
          style={{ backgroundColor: 'rgba(255, 244, 215, 0.98)', backdropFilter: 'blur(20px)' }}
        >
          <div className="flex justify-between items-center p-6 border-b border-[rgba(106,76,147,0.1)]">
            <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
              <span className="text-2xl">🧭</span>
              <span className="text-xl font-bold" style={{ color: '#2D2B35' }}>TriQi</span>
            </Link>
            <button
              className="p-2 rounded-full bg-[rgba(106,76,147,0.05)] text-[#6E6A7C]"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-bold tracking-tight text-[#2D2B35] hover:text-[#ff595e] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="p-8 border-t border-[rgba(106,76,147,0.1)] flex flex-col gap-4">
            <Link
              href="/auth/login"
              className="w-full text-center py-4 rounded-full text-base font-bold transition-all"
              style={{ color: '#6a4c93', border: '2px solid rgba(106,76,147,0.2)' }}
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/auth/register"
              className="w-full text-center py-4 rounded-full text-base font-bold text-white transition-all shadow-lg"
              style={{ backgroundColor: '#6a4c93' }}
              onClick={() => setIsOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/Logo';

const navLinks = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Why TriQi?',   href: '#why-triqi' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-400 ${
          scrolled
            ? 'py-3 bg-[#FBF5EC]/90 backdrop-blur-md border-b border-[rgba(232,114,74,0.1)] shadow-sm'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          <Logo light={!scrolled} size="md" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: scrolled ? 'var(--muted)' : 'rgba(251,245,236,0.85)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--muted)' : 'rgba(251,245,236,0.85)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-semibold transition-colors duration-200"
              style={{ color: scrolled ? 'var(--primary)' : 'rgba(251,245,236,0.9)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = scrolled ? 'var(--primary)' : 'rgba(251,245,236,0.9)')}
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className={`btn-primary btn-sm transition-all ${
                !scrolled && 'bg-white/90 !text-[#E8724A] hover:!bg-white'
              }`}
            >
              Get started
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: scrolled ? 'var(--text)' : '#FBF5EC' }}
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col"
          style={{ backgroundColor: '#FBF5EC' }}
        >
          <div className="flex justify-between items-center px-6 py-5 border-b border-[rgba(232,114,74,0.1)]">
            <Logo size="md" />
            <button className="p-2 text-[var(--muted)]" onClick={() => setIsOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-10">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-semibold text-[var(--ink)] hover:text-[var(--primary)] transition-colors"
                style={{ fontFamily: 'Lora, serif' }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="p-8 flex flex-col gap-3 border-t border-[rgba(232,114,74,0.1)]">
            <Link href="/auth/login" className="btn-ghost w-full text-center" onClick={() => setIsOpen(false)}>
              Sign in
            </Link>
            <Link href="/auth/register" className="btn-primary w-full text-center" onClick={() => setIsOpen(false)}>
              Get started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
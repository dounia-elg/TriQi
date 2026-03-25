'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
 
const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Why TriQi?',  href: '#why-triqi' },
  { label: 'Login',        href: '/auth/login' },
  { label: 'Register',     href: '/auth/register' },
];
 
export function Footer() {
  return (
    <footer className="py-16 bg-[#FBF5EC]" style={{ borderTop: '1px solid #F0E6D8' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Logo />
            <p
              className="text-sm text-center md:text-left"
              style={{ color: 'var(--muted)', maxWidth: '200px', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}
            >
              Find your direction with confidence and joy.
            </p>
          </div>
 
          {/* Links */}
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {link.label}
              </Link>
            ))}
          </div>
 
          {/* Copyright */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <p
              className="text-xs font-semibold tracking-widest uppercase"
              style={{ color: 'var(--primary)', fontFamily: 'DM Sans, sans-serif' }}
            >
              Made with ❤️ in Morocco
            </p>
            <p style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'DM Sans, sans-serif' }}>
              © 2026 <strong style={{ color: 'var(--primary)' }}>TriQi</strong> — Dounia Elgarrai
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
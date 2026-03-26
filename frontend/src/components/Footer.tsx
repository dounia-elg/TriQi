'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Why TriQi?', href: '#why-triqi' },
  { label: 'Login', href: '/auth/login' },
  { label: 'Register', href: '/auth/register' },
];

export function Footer() {
  return (
    <footer className="py-14 px-6" style={{ backgroundColor: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

          <div className="flex flex-col items-center md:items-start gap-3">
            <Logo size="md" />
            <p className="text-sm text-center md:text-left" style={{ color: 'var(--muted)', maxWidth: '200px', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif' }}>
              Find your direction with confidence and joy.
            </p>
          </div>

          <div className="flex items-center gap-5 flex-wrap justify-center">
            {links.map(link => (
              <Link
                key={link.href} href={link.href}
                className="text-sm font-medium transition-colors"
                style={{ color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-1.5">
              {['var(--blue)', 'var(--pink)', 'var(--green)', 'var(--lemon)'].map(c => (
                <span key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', fontFamily: 'DM Sans, sans-serif' }}>
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
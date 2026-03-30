'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, LogOut } from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { label: 'How it works', href: '/#how-it-works', dot: '#C2E0F4' },
  { label: 'Features', href: '/#features', dot: '#F9CEDE' },
  { label: 'Why TriQi?', href: '/#why-triqi', dot: '#C8EACC' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role?.toUpperCase() === 'ADMIN';
  const accountHomeHref = isAdmin ? '/admin' : '/dashboard';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'py-3 backdrop-blur-md border-b shadow-sm' : 'py-5 bg-transparent'
          }`}
        style={{
          backgroundColor: scrolled ? 'rgba(240,248,255,0.92)' : 'transparent',
          borderColor: scrolled ? 'rgba(91,170,220,0.12)' : 'transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

          <Logo light={!scrolled} size="md" />

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href, dot }) => (
              <Link
                key={href} href={href}
                className="group flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                style={{ color: scrolled ? 'var(--muted)' : 'rgba(255,255,255,0.88)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: dot }} />
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-5">
                <Link
                  href={accountHomeHref}
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: scrolled ? 'var(--ink)' : '#fff' }}
                >
                  <div className="w-8 h-8 rounded-full bg-(--blue) flex items-center justify-center text-(--primary) text-xs font-bold uppercase">
                    {user?.firstName?.[0]}
                  </div>
                  {user?.firstName}
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold transition-colors"
                  style={{ color: scrolled ? 'var(--primary)' : 'rgba(255,255,255,0.92)' }}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="btn-primary btn-sm"
                  style={!scrolled ? { background: 'rgba(255,255,255,0.92)', color: 'var(--primary)' } : {}}
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg"
            style={{ color: scrolled ? 'var(--text)' : '#fff' }}
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col" style={{ background: 'var(--bg)' }}>
          <div className="flex justify-between items-center px-6 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
            <Logo size="md" />
            <button style={{ color: 'var(--muted)' }} onClick={() => setIsOpen(false)}><X size={22} /></button>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 gap-10">
            {navLinks.map(({ label, href, dot }) => (
              <Link
                key={href} href={href}
                className="flex items-center gap-3 text-2xl font-bold font-serif"
                style={{ color: 'var(--ink)' }}
                onClick={() => setIsOpen(false)}
              >
                <span className="w-3 h-3 rounded-full" style={{ background: dot }} />
                {label}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                href={accountHomeHref}
                className="text-2xl font-bold font-serif"
                style={{ color: 'var(--primary)' }}
                onClick={() => setIsOpen(false)}
              >
                {isAdmin ? 'Admin dashboard' : 'My dashboard'}
              </Link>
            )}
          </div>

          <div className="p-8 flex flex-col gap-3 border-t" style={{ borderColor: 'var(--border)' }}>
            {isAuthenticated ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="btn-primary w-full text-center">Logout</button>
            ) : (
              <>
                <Link href="/auth/login" className="btn-ghost w-full text-center" onClick={() => setIsOpen(false)}>Sign in</Link>
                <Link href="/auth/register" className="btn-primary w-full text-center" onClick={() => setIsOpen(false)}>Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
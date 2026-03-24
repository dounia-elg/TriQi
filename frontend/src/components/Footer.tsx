'use client';

import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Why TriQi?',  href: '#why-triqi' },
  { label: 'Login',        href: '/auth/login' },
  { label: 'Register',     href: '/auth/register' },
];

export default function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{
        backgroundColor: '#fff4d7',
        borderTop: '1px solid rgba(106, 76, 147, 0.1)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">

          {/* Logo & Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl transition-transform group-hover:rotate-12">🧭</span>
              <span 
                className="text-xl font-bold tracking-tight text-[#2D2B35]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                TriQi
              </span>
            </Link>
            <p className="text-sm text-[#6E6A7C] max-w-[200px] text-center md:text-left leading-relaxed">
              Find your direction with confidence and joy.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-sm font-semibold text-[#6E6A7C] hover:text-[#6a4c93] transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#6a4c93')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#6E6A7C')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Status/Copyright */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff595e]">
              <Sparkles size={14} />
              <span>Made with heart in Morocco</span>
              <Heart size={14} />
            </div>
            <p className="text-xs text-[#A9A5B8]">
              © 2026 <span className="font-bold text-[#6a4c93]">TriQi</span> — Dounia Elgarrai
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}

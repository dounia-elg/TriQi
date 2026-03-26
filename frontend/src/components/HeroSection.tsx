'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src="/hero.mp4" />

      {/* Pastel-cool overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(91,170,220,0.55) 0%, rgba(30,41,59,0.65) 50%, rgba(109,196,122,0.4) 100%)' }} />

      {/* Pastel blobs */}
      <div className="absolute top-20 left-[6%]  w-48 h-48 rounded-full blur-2xl opacity-30 pointer-events-none" style={{ background: 'var(--blue)' }} />
      <div className="absolute top-[28%] right-[5%] w-36 h-36 rounded-full blur-2xl opacity-25 pointer-events-none" style={{ background: 'var(--pink)' }} />
      <div className="absolute bottom-[22%] left-[8%] w-40 h-40 rounded-full blur-2xl opacity-25 pointer-events-none" style={{ background: 'var(--green)' }} />
      <div className="absolute bottom-[18%] right-[10%] w-32 h-32 rounded-full blur-xl opacity-30 pointer-events-none" style={{ background: 'var(--lemon)' }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">

        {/* Badge */}
        <div className="fade-up mb-8 flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', backdropFilter: 'blur(8px)', fontFamily: 'DM Sans, sans-serif' }}
          >
            ✦ Career Orientation · Morocco
          </span>
        </div>

        <h1 className="fade-up-1 mb-5" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(40px,6vw,68px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#fff' }}>
          Find your path.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--lemon)' }}>Thrive with confidence.</em>
        </h1>

        <div className="fade-up-1 flex justify-center mb-7">
          <div className="w-14 h-px" style={{ background: 'rgba(253,232,160,0.55)' }} />
        </div>

        <p className="fade-up-2 mb-10 mx-auto" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', lineHeight: 1.8, color: 'rgba(255,255,255,0.82)', maxWidth: '500px' }}>
          TriQi combines an intelligent orientation test, a personalized roadmap, and real opportunities — to help you choose your direction without the guesswork.
        </p>

        <div className="fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary btn-sm">Start Your Journey →</Link>
          <Link
            href="#how-it-works"
            className="btn-sm rounded-full font-medium transition-all"
            style={{ border: '1.5px solid rgba(255,255,255,0.4)', color: '#fff', padding: '10px 22px', fontSize: '14px', fontFamily: 'DM Sans, sans-serif' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            How it works ↓
          </Link>
        </div>

        {/* Stats — each in its pastel color */}
        <div className="fade-up-4 mt-16 flex justify-center gap-12 flex-wrap">
          {[
            { value: '50+', label: 'Career Domains', color: 'var(--blue)' },
            { value: '10 min', label: 'Test Duration', color: 'var(--pink)' },
            { value: '100%', label: 'Free Forever', color: 'var(--green)' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p style={{ fontFamily: 'Lora, serif', fontSize: '26px', fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center bounce-down z-10">
        <ChevronDown size={22} style={{ color: 'var(--lemon)' }} />
      </div>

      <div className="custom-shape-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 72" preserveAspectRatio="none">
          <path fill="#F0F8FF" d="M0,40L60,36C120,32,240,24,360,28C480,32,600,48,720,48C840,48,960,32,1080,28C1200,24,1320,32,1380,36L1440,40L1440,72L0,72Z" />
        </svg>
      </div>
    </section>
  );
}
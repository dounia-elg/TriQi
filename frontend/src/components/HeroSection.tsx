'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';


export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay muted loop playsInline
        src="/hero.mp4"
      />

      {/* Warm overlay — terracotta → amber → sage */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(232,114,74,0.55) 0%, rgba(44,36,22,0.65) 55%, rgba(125,170,146,0.45) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center px-6 py-32">

        {/* Pill badge */}
        <div className="fade-up mb-8 flex justify-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold tracking-widest uppercase"
            style={{
              background: 'rgba(251,245,236,0.15)',
              border: '1px solid rgba(251,245,236,0.3)',
              color: '#FBF5EC',
              backdropFilter: 'blur(8px)',
              fontFamily: 'DM Sans, sans-serif',
              letterSpacing: '0.12em',
            }}
          >
            Orientation · Morocco
          </span>
        </div>

        {/* Headline — Lora italic for warmth */}
        <h1
          className="fade-up-1 mb-6"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: '-0.02em',
            color: '#FBF5EC',
          }}
        >
          Find your path.<br />
          <em style={{ fontStyle: 'italic', color: '#F0B860' }}>Move forward with confidence.</em>
        </h1>

        {/* Thin divider */}
        <div className="fade-up-1 flex justify-center mb-7">
          <div className="w-14 h-px" style={{ background: 'rgba(240,184,96,0.6)' }} />
        </div>

        {/* Subtitle */}
        <p
          className="fade-up-2 mb-10 mx-auto"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '17px',
            lineHeight: 1.8,
            color: 'rgba(251,245,236,0.8)',
            maxWidth: '520px',
          }}
        >
          TriQi combines an intelligent orientation test, a personalized roadmap, and real opportunities — to help you choose without getting lost.
        </p>

        {/* CTAs */}
        <div className="fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary btn-sm">
            Start for free →
          </Link>
          <Link
            href="#how-it-works"
            className="btn-sm rounded-full font-medium transition-all"
            style={{
              border: '1.5px solid rgba(251,245,236,0.4)',
              color: '#FBF5EC',
              padding: '10px 22px',
              fontSize: '14px',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(251,245,236,0.1)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
          >
            How it works ↓
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-up-4 mt-16 flex justify-center gap-12 flex-wrap">
          {[
            { value: '50+', label: 'Domains' },
            { value: '10 min', label: 'Test Duration' },
            { value: '100%', label: 'Free' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <p style={{ fontFamily: 'Lora, serif', fontSize: '26px', fontWeight: 700, color: '#F0B860' }}>
                {s.value}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(251,245,236,0.55)', marginTop: '2px' }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center bounce-down z-10">
        <ChevronDown size={22} style={{ color: 'rgba(240,184,96,0.7)' }} />
      </div>

      {/* Wave */}
      <div className="custom-shape-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 72" preserveAspectRatio="none">
          <path fill="#FBF5EC" fillOpacity="1" d="M0,40L60,36C120,32,240,24,360,28C480,32,600,48,720,48C840,48,960,32,1080,28C1200,24,1320,32,1380,36L1440,40L1440,72L0,72Z" />
        </svg>
      </div>
    </section>
  );
}
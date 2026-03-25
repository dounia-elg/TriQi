import Link from 'next/link';
import { Globe, Sparkles, Target, Shield, Smartphone } from 'lucide-react';

const benefits = [
  { Icon: Globe,      text: 'Built for the Moroccan educational context' },
  { Icon: Sparkles,   text: 'AI explanations and institution matching' },
  { Icon: Target,     text: 'A clear direction in 10 minutes' },
  { Icon: Shield,     text: '100% free — no hidden fees' },
  { Icon: Smartphone, text: 'Works on any device' },
  { Icon: Shield,     text: 'Private and secure — your data stays yours' },
];

const domains = [
  { name: 'Design & UX',   percent: 82, accent: '#E8724A' },
  { name: 'Development',   percent: 71, accent: '#F0B860' },
  { name: 'Business',      percent: 56, accent: '#7DAA92' },
  { name: 'Marketing',     percent: 41, accent: '#B8A898' },
];

export default function WhyTriQi() {
  return (
    <section id="why-triqi" className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--sand)' }}>

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(232,114,74,0.2) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div>
            <span className="section-label">Why TriQi</span>
            <h2
              className="section-title mt-4 mb-5"
              style={{ fontSize: 'clamp(30px, 4vw, 46px)', letterSpacing: '-0.02em' }}
            >
              A different kind of<br />
              <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>orientation.</em>
            </h2>
            <p className="section-body text-base mb-10">
              Most students choose their path based on pressure or habit. TriQi gives you data, clarity, and a concrete plan — so every decision feels right.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 group">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: 'rgba(232,114,74,0.1)' }}
                  >
                    <Icon size={13} style={{ color: 'var(--primary)' }} />
                  </div>
                  <span
                    className="text-sm transition-colors group-hover:text-[var(--text)]"
                    style={{ color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2">
              Start for free <Sparkles size={15} />
            </Link>
          </div>

          {/* Right: mock results card */}
          <div
            className="rounded-3xl p-8"
            style={{
              background: '#FBF5EC',
              border: '1px solid rgba(232,114,74,0.12)',
              boxShadow: '0 8px 40px rgba(44,36,22,0.08)',
            }}
          >
            <h3
              className="mb-1"
              style={{ fontFamily: 'Lora, serif', fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}
            >
              Your results, at a glance
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--dim)', marginBottom: '28px' }}>
              Based on your orientation answers
            </p>

            <div className="space-y-5">
              {domains.map((d, i) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>
                      {d.name}
                    </span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: i === 0 ? d.accent : 'var(--dim)' }}>
                      {d.percent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${d.percent}%`,
                        background: i === 0
                          ? `linear-gradient(90deg, #E8724A, #F0B860)`
                          : `linear-gradient(90deg, ${d.accent}, ${d.accent})`,
                        opacity: i === 0 ? 1 : 0.45,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Top match callout */}
            <div
              className="mt-7 rounded-2xl p-4 flex items-center gap-4"
              style={{ background: 'rgba(232,114,74,0.07)', border: '1px solid rgba(232,114,74,0.15)' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg"
                style={{ background: 'rgba(232,114,74,0.12)' }}
              >
                🎨
              </div>
              <div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Best Match
                </p>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>
                  Design & UX
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5" style={{ borderTop: '1px solid var(--border)' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: 'var(--dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Shield size={12} /> Only you can see your results
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
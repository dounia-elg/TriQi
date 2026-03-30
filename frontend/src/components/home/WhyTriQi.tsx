import Link from 'next/link';
import { Globe, Sparkles, Target, Shield, Smartphone } from 'lucide-react';

const benefits = [
  { Icon: Globe,      text: 'Built for the Moroccan educational context',      bg: 'var(--tint-blue)',   color: 'var(--primary)'   },
  { Icon: Sparkles,   text: 'AI-powered explanations and institution matching', bg: 'var(--tint-pink)',   color: 'var(--secondary)' },
  { Icon: Target,     text: 'Get clear direction in just 10 minutes',          bg: 'var(--tint-green)',  color: 'var(--accent)'    },
  { Icon: Shield,     text: '100% free — no hidden fees, ever',                bg: 'var(--tint-yellow)', color: '#A07A10'           },
  { Icon: Smartphone, text: 'Works on any device, anytime',                    bg: 'var(--tint-blue)',   color: 'var(--primary)'   },
  { Icon: Shield,     text: 'Private and secure — your data stays yours',      bg: 'var(--tint-green)',  color: 'var(--accent)'    },
];

const domains = [
  { name: 'Design & UX',  percent: 82, bar: 'var(--pink)',  text: 'var(--secondary)' },
  { name: 'Software Dev', percent: 71, bar: 'var(--blue)',  text: 'var(--primary)'   },
  { name: 'Business',     percent: 56, bar: 'var(--green)', text: 'var(--accent)'    },
  { name: 'Marketing',    percent: 41, bar: 'var(--lemon)', text: '#A07A10'           },
];

export default function WhyTriQi() {
  return (
    <section id="why-triqi" className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--tint-green)' }}>
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-50" style={{ background: 'var(--lemon)' }} />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-40" style={{ background: 'var(--blue)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="section-label">Why TriQi</span>
            <h2 className="section-title mt-4 mb-5" style={{ fontSize: 'clamp(30px,4vw,46px)', letterSpacing: '-0.02em' }}>
              A different kind<br />
              <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>of orientation.</em>
            </h2>
            <p className="section-body text-base mb-10">
              Most students pick their path under pressure or out of habit. TriQi gives you data, clarity, and a concrete plan — so every decision truly feels like yours.
            </p>

            <ul className="space-y-3.5 mb-10">
              {benefits.map(({ Icon, text, bg, color }) => (
                <li key={text} className="flex items-center gap-3 group">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: bg }}>
                    <Icon size={13} style={{ color }} />
                  </div>
                  <span className="text-sm" style={{ color: 'var(--muted)', fontFamily: 'DM Sans, sans-serif' }}>{text}</span>
                </li>
              ))}
            </ul>

            <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2">
              Start for Free <Sparkles size={15} />
            </Link>
          </div>

          <div className="rounded-3xl p-8" style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(91,170,220,0.1)' }}>
            <h3 className="mb-1" style={{ fontFamily: 'Lora, serif', fontSize: '18px', fontWeight: 700, color: 'var(--ink)' }}>Your results, at a glance</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--dim)', marginBottom: '24px' }}>Based on your orientation answers</p>

            <div className="space-y-5">
              {domains.map((d) => (
                <div key={d.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{d.name}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: d.text }}>{d.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30,41,59,0.07)' }}>
                    <div className="h-full rounded-full" style={{ width: `${d.percent}%`, background: d.bar }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-2xl p-4 flex items-center gap-4" style={{ background: 'var(--tint-pink)', border: '1px solid var(--pink)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg" style={{ background: '#fff' }}>🎨</div>
              <div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Top match</p>
                <p style={{ fontFamily: 'Lora, serif', fontSize: '15px', fontWeight: 600, color: 'var(--ink)' }}>Design & UX</p>
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
import Link from 'next/link';
import { Check, Sparkles, Target, Shield, Globe, Smartphone } from 'lucide-react';

const benefits = [
  { icon: Globe, text: 'Built for the Moroccan educational context' },
  { icon: Sparkles, text: 'AI-powered explanations and institution matching' },
  { icon: Target, text: 'Get clear direction in 10 minutes' },
  { icon: Shield, text: 'Completely free — no hidden fees' },
  { icon: Smartphone, text: 'Works on any device, anytime' },
  { icon: Shield, text: 'Private and secure — your data stays yours' },
];

const mockDomains = [
  { name: 'Design & UX',  percent: 82, color: '#ff595e' },
  { name: 'Software Dev', percent: 71, color: '#ffca3a' },
  { name: 'Business',     percent: 56, color: '#8ac926' },
  { name: 'Marketing',    percent: 41, color: '#1982c4' },
];

export default function WhyTriQi() {
  return (
    <section id="why-triqi" className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#ff595e]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-tr from-[#6a4c93]/5 to-transparent blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={16} className="text-[var(--secondary)]" />
              <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">Why TriQi</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-[var(--text)]">
              A different kind of{' '}
              <span className="gradient-text">orientation.</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10 text-[var(--muted)]">
              Most students choose their path based on pressure or habit.
              TriQi gives you data, clarity, and a concrete plan — so every decision feels right.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 group">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ backgroundColor: 'rgba(106, 76, 147, 0.1)' }}
                  >
                    <benefit.icon size={12} color="#6a4c93" />
                  </div>
                  <span className="text-sm text-[var(--muted)] group-hover:text-[var(--text)] transition-colors">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <Link href="/auth/register" className="btn-primary flex items-center gap-2 w-fit">
              Start for Free <Sparkles size={16} />
            </Link>
          </div>

          {/* Right side: result card with animated bars */}
          <div
            className="rounded-3xl p-8 backdrop-blur-sm bg-white/90 shadow-xl border border-[var(--border)] transition-all duration-300 hover:shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-1 text-[var(--text)]">Your results, at a glance</h3>
            <p className="text-sm mb-8 text-[var(--dim)]">Based on your orientation answers</p>

            <div className="space-y-5">
              {mockDomains.map((domain, i) => (
                <div key={domain.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--text)]">
                      {domain.name}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: i === 0 ? 'var(--secondary)' : 'var(--dim)' }}
                    >
                      {domain.percent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${domain.percent}%`,
                        background: `linear-gradient(90deg, ${domain.color}, ${i === 0 ? '#ff595e' : domain.color})`,
                        opacity: i === 0 ? 1 : 0.6,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <p className="text-xs text-[var(--dim)] flex items-center gap-1">
                <Shield size={12} /> Only you can see your results
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
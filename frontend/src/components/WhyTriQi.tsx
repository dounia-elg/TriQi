import Link from 'next/link';
import { Check } from 'lucide-react';

const benefits = [
  'Built for the Moroccan educational context',
  'AI-powered explanations and recommendations',
  'Get clear results in minutes, not days',
  'Completely free — no hidden fees',
  'Works on any device, anytime',
  'Your data stays private and secure',
];

const mockDomains = [
  { name: 'Design & UX',    percent: 82 },
  { name: 'Software Dev',   percent: 71 },
  { name: 'Business',       percent: 58 },
  { name: 'Marketing',      percent: 44 },
];

export default function WhyTriQi() {
  return (
    <section id="why-triqi" className="py-28 px-4" style={{ backgroundColor: '#0D0D12' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <span className="section-label mb-3">Why TriQi</span>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ letterSpacing: '-0.02em', color: '#F2F0F5' }}
            >
              A clearer path,{' '}
              <span className="gradient-text">backed by data</span>
            </h2>
            <p className="text-lg leading-relaxed mb-10" style={{ color: '#8B8996' }}>
              Most students in Morocco choose their path based on family pressure or chance.
              TriQi gives you a data-driven, personal answer — so you move forward with confidence.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(165,148,249,0.15)' }}
                  >
                    <Check size={11} color="#A594F9" strokeWidth={3} />
                  </div>
                  <span className="text-sm" style={{ color: '#8B8996' }}>{benefit}</span>
                </li>
              ))}
            </ul>

            <Link href="/auth/register" className="btn-primary">
              Start for Free →
            </Link>
          </div>

          {/* Right: Mock Result Card */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: 'linear-gradient(135deg, #1C1C28 0%, #21202F 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#4A4856' }}>
                  Your Results
                </p>
                <h3 className="text-lg font-bold" style={{ color: '#F2F0F5' }}>
                  Domain Compatibility
                </h3>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(165,148,249,0.15)', color: '#A594F9' }}
              >
                Top Match ✦
              </div>
            </div>

            <div className="space-y-5">
              {mockDomains.map((domain, i) => (
                <div key={domain.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: '#F2F0F5' }}>
                      {domain.name}
                    </span>
                    <span
                      className="text-sm font-bold"
                      style={{ color: i === 0 ? '#A594F9' : '#4A4856' }}
                    >
                      {domain.percent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${domain.percent}%`, opacity: i === 0 ? 1 : 0.35 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-6 pt-5 flex items-center justify-between"
              style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-xs" style={{ color: '#4A4856' }}>Based on 24 test answers</p>
              <span className="text-xs font-medium" style={{ color: '#A594F9' }}>
                View full report →
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { Brain, TrendingUp, Map, Sparkles, Building2, CheckCircle } from 'lucide-react';

const features = [
  {
    Icon: Brain,
    tag: '01',
    title: 'Smart Test',
    description: 'Weighted questions covering your interests, personality, and abilities. Designed for depth.',
    color: '#E8724A',
  },
  {
    Icon: TrendingUp,
    tag: '02',
    title: 'Domain Scoring',
    description: 'Our algorithm ranks every domain by compatibility with your profile — from strongest to weakest.',
    color: '#F0B860',
  },
  {
    Icon: Map,
    tag: '03',
    title: 'Custom Roadmap',
    description: 'A week-by-week action plan for 3 or 6 months, built around your primary domain.',
    color: '#7DAA92',
  },
  {
    Icon: Sparkles,
    tag: '04',
    title: 'Clear Explanations',
    description: 'Understand why you match a domain with readable and personalized explanations.',
    color: '#E8724A',
  },
  {
    Icon: Building2,
    tag: '05',
    title: 'Recommended Institutions',
    description: 'Find schools and programs that match your domain, filterable by location.',
    color: '#F0B860',
  },
  {
    Icon: CheckCircle,
    tag: '06',
    title: 'Progress Tracking',
    description: 'Tick your tasks. Watch your progress grow. Stay on track every week.',
    color: '#7DAA92',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="max-w-xl mb-16">
          <span className="section-label">What we offer</span>
          <h2
            className="section-title mt-4 mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            Everything you need<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>to move forward.</em>
          </h2>
          <p className="section-body text-base">
            Tools designed for young Moroccans to choose their path with clarity and confidence.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.tag}
              className="card group p-7 relative overflow-hidden"
              style={{ borderRadius: '20px' }}
            >
              {/* Large faded number */}
              <div
                className="absolute -top-2 -right-1 text-8xl font-black select-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity"
                style={{ fontFamily: 'Lora, serif', color: f.color }}
              >
                {f.tag}
              </div>

              {/* Icon */}
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${f.color}18`, color: f.color }}
              >
                <f.Icon size={20} />
              </div>

              <h3
                className="mb-2 font-bold"
                style={{ fontFamily: 'Lora, serif', fontSize: '17px', color: 'var(--ink)' }}
              >
                {f.title}
              </h3>
              <p className="section-body text-sm">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <a
            href="/auth/register"
            className="btn-primary btn-sm inline-flex items-center gap-2"
          >
            Take the test now →
          </a>
        </div>

      </div>
    </section>
  );
}
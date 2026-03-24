import { Brain, TrendingUp, Map, Sparkles, Building2, CheckCircle } from 'lucide-react';

const features = [
  {
    Icon: Brain,
    title: 'Smart Orientation Test',
    description: 'Weighted questions covering interests, personality and abilities. Designed for depth.',
  },
  {
    Icon: TrendingUp,
    title: 'Intelligent Scoring',
    description: 'Our algorithm ranks every domain by compatibility — from strongest to weakest match.',
  },
  {
    Icon: Map,
    title: 'Personalized Roadmap',
    description: 'A week-by-week action plan for 3 or 6 months, built around your top domain.',
  },
  {
    Icon: Sparkles,
    title: 'AI-Powered Explanations',
    description: 'Understand why you matched a domain with smart, readable explanations.',
  },
  {
    Icon: Building2,
    title: 'Institution Recommendations',
    description: 'Find schools and programs that match your domain, filterable by country.',
  },
  {
    Icon: CheckCircle,
    title: 'Progress Tracking',
    description: 'Mark tasks done. Watch your progress grow. Stay on track with your plan.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Decorative floating elements (using subtle colors) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-linear-to-r from-[#ff595e]/5 to-[#ffca3a]/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-linear-to-r from-[#6a4c93]/5 to-[#8ac926]/5 blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={16} className="text-(--secondary)" />
            <span className="text-xs font-semibold text-(--primary) uppercase tracking-wider">What We Offer</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="section-body max-w-lg mx-auto text-lg">
            All the tools to find and follow your academic and professional path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card group p-7 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Decorative background number */}
              <div
                className="absolute top-3 right-4 text-7xl font-black select-none opacity-5 group-hover:opacity-10 transition-opacity"
                style={{ color: 'var(--primary)' }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              <div
                className="icon-badge mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  backgroundColor: 'rgba(106, 76, 147, 0.1)', // using primary with opacity
                  color: 'var(--primary)',
                }}
              >
                <feature.Icon size={22} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 shadow-sm border border-(--accent)">
            <p className="text-sm font-medium text-gray-700">
              ✨ Ready to start? <a href="/auth/register" className="text-(--secondary) font-semibold hover:underline">Take the test now</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
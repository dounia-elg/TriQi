import { Brain, TrendingUp, Map, Sparkles, Building2, CheckCircle } from 'lucide-react';

const features = [
  {
    Icon: Brain,
    title: 'Smart Orientation Test',
    description: 'Weighted questions covering interests, personality, and abilities. Built for depth, not just surface answers.',
  },
  {
    Icon: TrendingUp,
    title: 'Intelligent Scoring Engine',
    description: 'Our algorithm ranks every domain by compatibility score — from your strongest to weakest match.',
  },
  {
    Icon: Map,
    title: 'Personalized Roadmap',
    description: 'A week-by-week action plan built around your top domain. 3-month or 6-month tracks.',
  },
  {
    Icon: Sparkles,
    title: 'AI-Powered Explanations',
    description: 'Understand why you matched a domain with detailed explanations based on your score intensity.',
  },
  {
    Icon: Building2,
    title: 'Institution Recommendations',
    description: 'Find schools and programs that match your domain, filterable by country and city.',
  },
  {
    Icon: CheckCircle,
    title: 'Progress Tracking',
    description: 'Mark tasks as done. Watch your progress grow. Stay accountable to your own journey.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-4" style={{ backgroundColor: '#15151D' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-3">What We Offer</span>
          <h2 className="section-title text-4xl md:text-5xl mb-4">Main Features</h2>
          <p className="section-body max-w-lg mx-auto text-lg">
            Everything you need to find and follow your academic and professional path.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.title} className="card p-6">
              <div className="icon-badge mb-5">
                <feature.Icon size={20} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#F2F0F5' }}>
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8B8996' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

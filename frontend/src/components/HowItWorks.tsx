import { ClipboardList, BarChart2, Map, Building2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: ClipboardList,
    title: 'Take the Test',
    description: 'Answer questions about your interests, personality, and abilities.',
  },
  {
    number: '02',
    Icon: BarChart2,
    title: 'Get Your Results',
    description: 'Our engine ranks the domains that match you best, with clear explanations.',
  },
  {
    number: '03',
    Icon: Map,
    title: 'Follow Your Roadmap',
    description: 'A week-by-week action plan for 3 or 6 months, tailored to you.',
  },
  {
    number: '04',
    Icon: Building2,
    title: 'Find Your Institution',
    description: 'Discover schools and programs in Morocco that fit your profile.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4" style={{ backgroundColor: '#0D0D12' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-3">The Process</span>
          <h2 className="section-title text-4xl md:text-5xl mb-4">How It Works</h2>
          <p className="section-body max-w-lg mx-auto text-lg">
            From zero clarity to a clear direction — in 4 steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card p-6"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {/* Decorative background number */}
              <div
                className="absolute top-3 right-4 text-7xl font-black select-none"
                style={{ color: 'rgba(255,255,255,0.03)', lineHeight: 1 }}
              >
                {step.number}
              </div>

              <div className="icon-badge mb-5">
                <step.Icon size={20} />
              </div>

              <span className="section-label mb-2">{step.number}</span>

              <h3 className="text-lg font-bold mb-2" style={{ color: '#F2F0F5' }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8B8996' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

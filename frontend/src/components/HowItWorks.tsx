import Image from 'next/image';
import { ClipboardList, BarChart2, Map } from 'lucide-react';

const steps = [
  {
    number: '01',
    Icon: ClipboardList,
    title: 'Take the Test',
    description: 'Answer thoughtful questions about your interests, personality, and natural abilities. Takes about 10 minutes — honesty is key.',
    image: '/images/step1.jpg',
    alt: 'Student taking orientation test',
    accent: '#E8724A',
  },
  {
    number: '02',
    Icon: BarChart2,
    title: 'Discover Your Domains',
    description: 'Our engine ranks every domain by compatibility with your profile. You get clear, ranked results and explanations.',
    image: '/images/step2.jpg',
    alt: 'Dashboard showing results',
    accent: '#F0B860',
  },
  {
    number: '03',
    Icon: Map,
    title: 'Follow Your Roadmap',
    description: 'Get a personalized 3 or 6-month action plan with weekly tasks — tailored to your top domain.',
    image: '/images/step3.jpg',
    alt: 'Roadmap illustration',
    accent: '#7DAA92',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4 relative" style={{ backgroundColor: 'var(--sand)' }}>

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(232,114,74,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label">Your progress</span>
          <h2
            className="section-title mt-4 mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}
          >
            From confusion<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>to clarity.</em>
          </h2>
          <p className="section-body max-w-md mx-auto text-base">
            Three simple steps to find your direction and start moving forward with confidence.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="card group overflow-hidden">

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Warm tint overlay */}
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${step.accent}55 0%, transparent 60%)` }}
                />
                {/* Step number badge */}
                <div
                  className="absolute bottom-4 left-5 text-5xl font-black select-none"
                  style={{ fontFamily: 'Lora, serif', color: 'rgba(251,245,236,0.9)', lineHeight: 1 }}
                >
                  {step.number}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${step.accent}18`, color: step.accent }}
                >
                  <step.Icon size={18} />
                </div>
                <h3
                  className="mb-2 font-bold"
                  style={{ fontFamily: 'Lora, serif', fontSize: '18px', color: 'var(--ink)' }}
                >
                  {step.title}
                </h3>
                <p className="section-body text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-14 flex justify-center">
          <div
            className="inline-flex items-center gap-3 rounded-2xl px-6 py-4"
            style={{ background: '#FBF5EC', border: '1px solid rgba(232,114,74,0.2)' }}
          >
            <span style={{ fontSize: '20px' }}>✨</span>
            <p className="section-body text-sm">
              <strong style={{ color: 'var(--primary)' }}>Start today.</strong>{' '}
              Hundreds of students have already found their path with TriQi. Your future self will thank you.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
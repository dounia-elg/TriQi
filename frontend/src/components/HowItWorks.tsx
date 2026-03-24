import { ClipboardList, BarChart2, Map, Sparkles } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    Icon: ClipboardList,
    title: 'Take the Test',
    description: 'Answer thoughtful questions about your interests, personality, and natural abilities. It takes about 10 minutes.',
    image: '/images/step1.jpg',
    imageAlt: 'Student taking a test',
    color: '#ff595e', // vibrant_coral
  },
  {
    number: '02',
    Icon: BarChart2,
    title: 'Discover Your Domains',
    description: 'Our engine ranks every domain by compatibility with your profile. You get clear, ranked results and explanations.',
    image: '/images/step2.jpg',
    imageAlt: 'Dashboard showing results',
    color: '#ffca3a', // golden_pollen
  },
  {
    number: '03',
    Icon: Map,
    title: 'Follow Your Roadmap',
    description: 'Get a personalized 3 or 6-month action plan with weekly tasks — tailored to your top domain.',
    image: '/images/step3.jpg',
    imageAlt: 'Roadmap illustration',
    color: '#8ac926', // yellow_green
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4 relative" style={{ backgroundColor: '#ffddde' }}>
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
          <circle cx="200" cy="200" r="80" fill="#ff595e" />
          <circle cx="800" cy="500" r="120" fill="#ffca3a" />
          <circle cx="500" cy="800" r="100" fill="#8ac926" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <Sparkles size={16} className="text-[#ff595e]" />
            <span className="text-xs font-semibold text-[#6a4c93] uppercase tracking-wider">Your Journey</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="section-body max-w-lg mx-auto text-lg">
            Three simple steps from confusion to clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>

              <div className="p-6 relative">
                {/* Decorative number background */}
                <div
                  className="absolute top-4 right-4 text-8xl font-black select-none opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>

                <div
                  className="icon-badge mb-4"
                  style={{ backgroundColor: `${step.color}1A`, color: step.color }}
                >
                  <step.Icon size={22} />
                </div>

                <h3 className="text-xl font-bold mb-2 text-[#2D2B35]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional call to action */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto shadow-md border border-[#ffca3a]">
            <p className="text-sm font-semibold text-[#ff595e] mb-2">✨ Start Today</p>
            <p className="text-gray-600">
              Join hundreds of students who found their path with TriQi. Your future self will thank you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
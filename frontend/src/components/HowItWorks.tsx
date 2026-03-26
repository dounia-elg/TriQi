import Image from 'next/image';
import { ClipboardList, BarChart2, Map } from 'lucide-react';

const steps = [
  { number: '01', Icon: ClipboardList, title: 'Take the Test',         description: 'Answer thoughtful questions about your interests, personality, and natural abilities. About 10 minutes — honesty gets the best results.', image: '/images/step1.jpg', alt: 'Student taking the orientation test',  bg: 'var(--tint-blue)',   border: 'var(--blue)',  icon: 'var(--primary)',   numColor: 'rgba(194,224,244,0.95)' },
  { number: '02', Icon: BarChart2,     title: 'Discover Your Domains',  description: 'Our engine ranks every domain by how well it fits your profile. Clear, ranked results with explanations — not just a raw score.',              image: '/images/step2.jpg', alt: 'Dashboard showing orientation results', bg: 'var(--tint-pink)',   border: 'var(--pink)',  icon: 'var(--secondary)', numColor: 'rgba(249,206,222,0.95)' },
  { number: '03', Icon: Map,           title: 'Follow Your Roadmap',    description: 'Get a personalized 3 or 6-month action plan with weekly tasks — designed around your top domain and ready to follow from day one.',               image: '/images/step3.jpg', alt: 'Roadmap illustration',                  bg: 'var(--tint-green)',  border: 'var(--green)', icon: 'var(--accent)',    numColor: 'rgba(200,234,204,0.95)' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--sand)' }}>

      <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-50" style={{ background: 'var(--blue)' }} />
      <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-40" style={{ background: 'var(--lemon)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="section-label">Your Journey</span>
          <h2 className="section-title mt-4 mb-4" style={{ fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-0.02em' }}>
            From confusion<br />
            <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>to clarity.</em>
          </h2>
          <p className="section-body max-w-md mx-auto text-base">Three simple steps to find your direction and start moving forward with real confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group overflow-hidden rounded-[20px] transition-all duration-300 hover:-translate-y-1"
              style={{ background: step.bg, border: `1.5px solid ${step.border}`, boxShadow: '0 2px 16px rgba(91,170,220,0.07)' }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image src={step.image} alt={step.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${step.border}BB 0%, transparent 60%)` }} />
                <div className="absolute bottom-4 left-5 text-5xl font-black select-none" style={{ fontFamily: 'Lora, serif', color: step.numColor, lineHeight: 1 }}>
                  {step.number}
                </div>
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ background: '#fff', color: step.icon, boxShadow: `0 2px 8px ${step.border}` }}>
                  <step.Icon size={18} />
                </div>
                <h3 className="mb-2 font-bold" style={{ fontFamily: 'Lora, serif', fontSize: '18px', color: 'var(--ink)' }}>{step.title}</h3>
                <p className="section-body text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl px-6 py-4" style={{ background: '#fff', border: '1px solid var(--border)' }}>
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
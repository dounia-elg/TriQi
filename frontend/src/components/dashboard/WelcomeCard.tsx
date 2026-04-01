import Link from 'next/link';
import { Compass, ArrowRight, BrainCircuit, Target } from 'lucide-react';

interface WelcomeCardProps {
  firstName?: string;
  hasCompletedTest?: boolean;
}

export function WelcomeCard({ firstName, hasCompletedTest }: WelcomeCardProps) {
  return (
    <div className="bg-(--surface) rounded-4xl p-10 shadow-sm border border-(--border) relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-10 w-80 h-80 bg-(--tint-pink) rounded-full blur-3xl opacity-80" />
      <div className="absolute -bottom-32 -left-10 w-80 h-80 bg-(--tint-lemon) rounded-full blur-3xl opacity-80" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-(--tint-blue) rounded-full blur-3xl opacity-60" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl">
          {/* Color bar accent */}
          <div className="flex gap-1.5 mb-5">
            {['var(--blue)', 'var(--pink)', 'var(--green)', 'var(--lemon)'].map((c) => (
              <span key={c} className="h-1.5 w-8 rounded-full" style={{ background: c }} />
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
            Your future starts here{firstName ? `, ${firstName}` : ''}.
          </h1>
          <p className="text-(--text) text-lg leading-relaxed mb-6 font-medium">
            {hasCompletedTest
              ? "You've successfully completed the orientation test. Explore your paths, roadmap, and schools below."
              : 'The first step to finding your dream career is understanding yourself. Take our orientation test to get personalized recommendations.'}
          </p>

          {!hasCompletedTest && (
            <Link
              href="/orientation-test"
              className="inline-flex items-center gap-2 bg-(--primary) text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-[0_8px_32px_rgba(91,170,220,0.4)] hover:-translate-y-1 transition-all"
            >
              <Compass size={20} />
              Start My Orientation Test
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {/* Floating icon */}
        <div className="hidden md:flex relative">
          <div className="absolute inset-0 bg-linear-to-br from-(--blue) to-(--pink) rounded-3xl blur-xl opacity-40 animate-pulse" />
          <div className="relative w-32 h-32 rounded-3xl bg-white flex items-center justify-center border-2 border-(--tint-blue) shadow-xl rotate-3 hover:rotate-6 transition-transform">
            {hasCompletedTest ? (
              <Target size={56} className="text-(--accent)" />
            ) : (
              <BrainCircuit size={56} className="text-(--pink)" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

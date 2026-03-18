import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24"
      style={{ backgroundColor: '#0D0D12' }}
    >
      {/* Animated Orbs */}
      <div className="orb orb-lavender" style={{ width: 700, height: 700, top: '-10%', left: '-15%' }} />
      <div className="orb orb-rose"     style={{ width: 500, height: 500, bottom: '0%', right: '-10%' }} />
      <div className="orb orb-lavender" style={{ width: 350, height: 350, bottom: '10%', left: '30%', opacity: 0.5 }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div
          className="fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
          style={{
            border: '1px solid rgba(165,148,249,0.3)',
            color: '#A594F9',
            backgroundColor: 'rgba(165,148,249,0.08)',
          }}
        >
          ✦ Your Free Orientation Platform
        </div>

        {/* Main Heading */}
        <h1
          className="fade-up-1 font-bold leading-tight mb-6"
          style={{
            fontSize: 'clamp(44px, 7vw, 80px)',
            letterSpacing: '-0.02em',
            color: '#F2F0F5',
          }}
        >
          Know Yourself.{' '}
          <br className="hidden sm:block" />
          <span className="gradient-text">Choose Wisely.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up-2 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12"
          style={{ color: '#8B8996' }}
        >
          TriQi helps young Moroccans find their academic and professional direction
          through a smart test, personalized roadmaps, and AI-powered guidance.
        </p>

        {/* CTAs */}
        <div className="fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-base">
            Start Your Journey →
          </Link>
          <Link href="#how-it-works" className="btn-ghost text-base">
            How it works ↓
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-up-4 mt-20 flex items-center justify-center gap-12 flex-wrap">
          {[
            { value: '50+',  label: 'Domains' },
            { value: '6 mo', label: 'Roadmaps' },
            { value: '100%', label: 'Free' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold" style={{ color: '#F2F0F5' }}>
                {stat.value}
              </p>
              <p className="text-xs mt-1 tracking-widest uppercase" style={{ color: '#4A4856' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

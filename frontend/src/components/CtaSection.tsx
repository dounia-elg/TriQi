import Link from 'next/link';

export default function CtaSection() {
  return (
    <section
      className="py-28 px-4 relative overflow-hidden"
      style={{ backgroundColor: '#15151D' }}
    >
      {/* Center orb */}
      <div
        className="orb orb-lavender"
        style={{
          width: 700,
          height: 700,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.12,
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="section-label mb-4">Ready?</span>
        <h2
          className="text-4xl md:text-6xl font-bold mb-6"
          style={{ letterSpacing: '-0.02em', color: '#F2F0F5' }}
        >
          Your path is{' '}
          <span className="gradient-text">waiting for you</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: '#8B8996' }}>
          Take the test today and get a personalized direction in minutes.
          Free, always.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-base">
            Start for Free →
          </Link>
          <Link href="/auth/login" className="btn-ghost text-base">
            I have an account
          </Link>
        </div>
      </div>
    </section>
  );
}

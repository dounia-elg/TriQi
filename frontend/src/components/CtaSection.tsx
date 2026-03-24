import Link from 'next/link';

export default function CtaSection() {
  return (
    <section
      className="py-28 px-4"
      style={{
        background:
          'linear-gradient(135deg, #EDE8F8 0%, #FDF7F2 50%, #FDE8EE 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="section-label">Take the first step</span>
        <h2
          className="text-4xl md:text-6xl font-bold mt-4 mb-6"
          style={{ letterSpacing: '-0.02em', color: '#2D2B35' }}
        >
          Ready to find{' '}
          <span className="gradient-text">your path?</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: '#6E6A7C' }}>
          The test takes 10 minutes. The clarity lasts a lifetime.
          <br />
          Free. No pressure. Just you and your direction.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-base">
            Start for Free →
          </Link>
          <Link href="/auth/login" className="btn-ghost text-base">
            I have an account
          </Link>
        </div>

        <p className="mt-6 text-sm" style={{ color: '#A9A5B8' }}>
          No account required to explore
        </p>
      </div>
    </section>
  );
}

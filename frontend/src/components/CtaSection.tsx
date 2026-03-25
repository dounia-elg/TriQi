import Link from 'next/link';
 
export function CtaSection() {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #F5E6C8 0%, #FBF5EC 50%, #EDE8E0 100%)' }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(232,114,74,0.15) 0%, transparent 70%)' }}
      />
 
      <div className="max-w-2xl mx-auto text-center relative z-10">
 
        <span className="section-label">The first step</span>
 
        <h2
          className="mt-5 mb-5"
          style={{
            fontFamily: 'Lora, serif',
            fontSize: 'clamp(34px, 5vw, 58px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: 'var(--ink)',
            lineHeight: 1.12,
          }}
        >
          Ready to find<br />
          <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>your path?</em>
        </h2>
 
        <p
          className="mb-10 mx-auto"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '400px' }}
        >
          The test takes 10 minutes.<br />
          The clarity lasts a lifetime.<br />
          <span style={{ color: 'var(--dim)', fontSize: '15px' }}>Free. No pressure. Just you and your direction.</span>
        </p>
 
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-base">
            Start for free →
          </Link>
          <Link href="/auth/login" className="btn-ghost text-base">
            I have an account
          </Link>
        </div>
 
        <p style={{ marginTop: '20px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--dim)' }}>
          No account required to explore
        </p>
      </div>
    </section>
  );
}
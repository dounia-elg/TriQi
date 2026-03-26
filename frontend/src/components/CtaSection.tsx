import Link from 'next/link';
import Logo from '@/components/Logo';


export function CtaSection() {
  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, var(--tint-blue) 0%, var(--bg) 50%, var(--tint-green) 100%)' }}
    >
      <div className="absolute top-8 left-[10%] w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-60" style={{ background: 'var(--blue)' }} />
      <div className="absolute bottom-8 right-[8%] w-52 h-52 rounded-full blur-3xl pointer-events-none opacity-50" style={{ background: 'var(--pink)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full blur-3xl pointer-events-none opacity-30" style={{ background: 'var(--lemon)' }} />

      <div className="max-w-2xl mx-auto text-center relative z-10">

        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {[
            { label: '50+ Domains', bg: 'var(--blue)', color: '#1A6FA0' },
            { label: '10-min test', bg: 'var(--pink)', color: '#B94B6E' },
            { label: 'Free forever', bg: 'var(--green)', color: '#2D7A3A' },
          ].map(b => (
            <span key={b.label} className="tag text-xs" style={{ background: b.bg, color: b.color }}>{b.label}</span>
          ))}
        </div>

        <h2
          className="mt-2 mb-5"
          style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(34px,5vw,58px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--ink)', lineHeight: 1.12 }}
        >
          Ready to find<br />
          <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>your path?</em>
        </h2>

        <p className="mb-10 mx-auto" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '17px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '380px' }}>
          The test takes 10 minutes.<br />The clarity lasts a lifetime.<br />
          <span style={{ color: 'var(--dim)', fontSize: '15px' }}>Free. No pressure. Just you and your direction.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary text-base">Start for Free →</Link>
          <Link href="/auth/login" className="btn-ghost text-base">I have an account</Link>
        </div>

        <p style={{ marginTop: '18px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--dim)' }}>
          No account required to explore
        </p>
      </div>
    </section>
  );
}
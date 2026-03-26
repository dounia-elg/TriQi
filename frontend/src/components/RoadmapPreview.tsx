import Link from 'next/link';
import { CheckCircle, Circle, Target, Calendar } from 'lucide-react';

const weeks = [
  { label: 'Weeks 1–2', task: 'Discover your domain & explore possible paths', percent: 100, done: true, bar: 'var(--green)', text: 'var(--accent)' },
  { label: 'Weeks 3–4', task: 'Explore institutions and entry requirements', percent: 72, done: false, bar: 'var(--blue)', text: 'var(--primary)' },
  { label: 'Weeks 5–6', task: 'Prepare your portfolio and application documents', percent: 40, done: false, bar: 'var(--pink)', text: 'var(--secondary)' },
  { label: 'Weeks 7–8', task: 'Apply and follow up on your applications', percent: 10, done: false, bar: 'var(--lemon)', text: '#A07A10' },
];

export default function RoadmapPreview() {
  return (
    <section className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--ink)' }}>
      <div className="absolute top-16 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-[0.1]" style={{ background: 'var(--blue)' }} />
      <div className="absolute top-1/3 right-8 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-[0.08]" style={{ background: 'var(--pink)' }} />
      <div className="absolute bottom-16 left-1/3 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-[0.08]" style={{ background: 'var(--green)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full px-4 py-1.5 mb-4 text-[11px] font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(253,232,160,0.12)', color: 'var(--lemon)', border: '1px solid rgba(253,232,160,0.2)', fontFamily: 'DM Sans, sans-serif' }}>
            Your action plan
          </span>
          <h2 className="mb-4" style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(30px,4vw,46px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            A roadmap built<br /><em style={{ fontStyle: 'italic', color: 'var(--lemon)' }}>just for you.</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontFamily: 'DM Sans, sans-serif', maxWidth: '400px', margin: '0 auto', lineHeight: 1.7 }}>
            After your test, TriQi generates a step-by-step action plan. Here's a sample.
          </p>
        </div>

        <div className="rounded-3xl p-8 md:p-10" style={{ background: 'var(--bg)', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>Sample Roadmap</p>
              <h3 style={{ fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>6-Month Plan — Design & UX</h3>
            </div>
            <span className="tag tag-green flex items-center gap-1.5"><Target size={11} /> In Progress</span>
          </div>

          <div className="space-y-7">
            {weeks.map((week, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  {week.done ? <CheckCircle size={19} style={{ color: 'var(--accent)' }} /> : <Circle size={19} style={{ color: 'var(--dim)' }} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: week.text }}>{week.label}</p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)', marginTop: '1px' }}>{week.task}</p>
                    </div>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: week.text, flexShrink: 0 }}>{week.percent}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(30,41,59,0.07)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${week.percent}%`, background: week.bar }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4" style={{ borderTop: '1px solid var(--border)' }}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} /> Generated from your orientation results
            </p>
            <Link href="/auth/register" className="btn-primary btn-sm">Get Mine →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
import Link from 'next/link';
import { CheckCircle, Circle, Target, Calendar } from 'lucide-react';

const weeks = [
  { label: 'Weeks 1–2', task: 'Discover your domain and explore paths', percent: 100, done: true },
  { label: 'Weeks 3–4', task: 'Explore institutions and requirements',  percent: 72,  done: false },
  { label: 'Weeks 5–6', task: 'Prepare your portfolio and documents',      percent: 40,  done: false },
  { label: 'Weeks 7–8', task: 'Apply and follow up on applications', percent: 10, done: false },
];

export default function RoadmapPreview() {
  return (
    <section
      className="py-28 px-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--ink)' }}
    >
      {/* Warm ambient blobs */}
      <div className="absolute top-16 left-10 w-72 h-72 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(232,114,74,0.1)' }} />
      <div className="absolute bottom-16 right-10 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(125,170,146,0.08)' }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block rounded-full px-4 py-1.5 mb-4 text-[11px] font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(240,184,96,0.12)', color: '#F0B860', border: '1px solid rgba(240,184,96,0.2)', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.1em' }}
          >
            Your action plan
          </span>
          <h2
            className="mb-4"
            style={{ fontFamily: 'Lora, serif', fontSize: 'clamp(30px, 4vw, 46px)', fontWeight: 700, color: '#FBF5EC', letterSpacing: '-0.02em', lineHeight: 1.15 }}
          >
            A roadmap built<br />
            <em style={{ fontStyle: 'italic', color: '#F0B860' }}>just for you.</em>
          </h2>
          <p style={{ color: 'rgba(251,245,236,0.6)', fontSize: '16px', fontFamily: 'DM Sans, sans-serif', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
            After the test, TriQi generates a step-by-step plan. Here is what it looks like.
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{ background: '#FBF5EC', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--dim)' }}>
                Sample Roadmap
              </p>
              <h3 style={{ fontFamily: 'Lora, serif', fontSize: '20px', fontWeight: 700, color: 'var(--ink)', marginTop: '2px' }}>
                6-Month Plan — Design & UX
              </h3>
            </div>
            <span className="tag tag-primary flex items-center gap-1.5">
              <Target size={11} /> In progress
            </span>
          </div>

          {/* Progress items */}
          <div className="space-y-7">
            {weeks.map((week) => (
              <div key={week.label} className="flex items-start gap-4">
                <div className="shrink-0 mt-0.5">
                  {week.done
                    ? <CheckCircle size={19} style={{ color: 'var(--secondary)' }} />
                    : <Circle      size={19} style={{ color: 'var(--dim)' }} />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)' }}>
                        {week.label}
                      </p>
                      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'var(--text)', marginTop: '1px' }}>
                        {week.task}
                      </p>
                    </div>
                    <span
                      style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: 700, color: week.done ? 'var(--secondary)' : 'var(--dim)', flexShrink: 0 }}
                    >
                      {week.percent}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${week.percent}%`, background: `linear-gradient(90deg, #E8724A, #F0B860)` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'var(--dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={13} /> Generated from your orientation results
            </p>
            <Link href="/auth/register" className="btn-primary btn-sm flex items-center gap-1.5">
              Get mine →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
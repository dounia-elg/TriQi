import Link from 'next/link';
import { CheckCircle, Circle, Calendar, Target } from 'lucide-react';

const weeks = [
  { label: 'Weeks 1–2', task: 'Discover your domain & research paths', percent: 100, completed: true },
  { label: 'Weeks 3–4', task: 'Explore institutions and requirements', percent: 72, completed: false },
  { label: 'Weeks 5–6', task: 'Prepare your portfolio and documents', percent: 40, completed: false },
  { label: 'Weeks 7–8', task: 'Apply and follow up on applications', percent: 10, completed: false },
];

export default function RoadmapPreview() {
  return (
    <section className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--primary)' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-linear-to-r from-white/10 to-white/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-linear-to-r from-white/10 to-white/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-white/20">
            <Calendar size={16} className="text-(--accent)" />
            <span className="text-xs font-semibold text-white uppercase tracking-wider">Your Plan</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            A Roadmap Built for You
          </h2>
          <p className="max-w-lg mx-auto text-lg text-white/80">
            After your test, TriQi generates a step-by-step action plan. Here's what it looks like.
          </p>
        </div>

        <div
          className="rounded-3xl p-8 md:p-10 backdrop-blur-md bg-white shadow-2xl border border-white/10 transition-all duration-300 hover:shadow-white/5"
        >
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest mb-1 text-(--dim)">
                Sample Roadmap
              </p>
              <h3 className="text-xl font-bold text-(--text)">
                6-Month Plan — Design & UX
              </h3>
            </div>
            <span className="tag-primary flex items-center gap-1">
              <Target size={12} />
              In Progress
            </span>
          </div>

          <div className="space-y-8">
            {weeks.map((week) => (
              <div key={week.label} className="relative">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {week.completed ? (
                      <CheckCircle size={20} className="text-(--secondary)" />
                    ) : (
                      <Circle size={20} className="text-(--dim)" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-(--primary)">
                          {week.label}
                        </span>
                        <p className="text-sm font-medium text-(--text)">{week.task}</p>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: week.percent === 100 ? 'var(--secondary)' : 'var(--dim)' }}
                      >
                        {week.percent}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${week.percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 pt-6 flex items-center justify-between flex-wrap gap-4"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p className="text-sm text-(--dim) flex items-center gap-1">
              <Target size={14} />
              Generated from your orientation results
            </p>
            <Link href="/auth/register" className="btn-primary btn-sm flex items-center gap-1">
              Get Mine <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Brain, TrendingUp, Map, Sparkles, Building2, CheckCircle } from 'lucide-react';

const features = [
  { Icon: Brain,       tag: '01', title: 'Smart Orientation Test',    description: 'Weighted questions covering your interests, personality, and abilities — designed to go deep in just 10 minutes.', bg: 'var(--tint-blue)',   border: 'var(--blue)',   icon: 'var(--primary)',   num: 'var(--blue)'   },
  { Icon: TrendingUp,  tag: '02', title: 'Intelligent Scoring',       description: 'Our algorithm ranks every career domain by compatibility — from your strongest match to the weakest.',             bg: 'var(--tint-pink)',   border: 'var(--pink)',   icon: 'var(--secondary)', num: 'var(--pink)'   },
  { Icon: Map,         tag: '03', title: 'Personalized Roadmap',      description: 'A week-by-week action plan for 3 or 6 months, built specifically around your top domain.',                         bg: 'var(--tint-green)',  border: 'var(--green)',  icon: 'var(--accent)',    num: 'var(--green)'  },
  { Icon: Sparkles,    tag: '04', title: 'Clear Explanations',        description: 'Understand exactly why you matched a domain with readable, personalized explanations — not just a raw score.',     bg: 'var(--tint-yellow)', border: 'var(--lemon)',  icon: '#A07A10',          num: 'var(--lemon)'  },
  { Icon: Building2,   tag: '05', title: 'Institution Recommendations',description: 'Find schools and programs that fit your domain, filterable by country — Morocco and beyond.',                      bg: 'var(--tint-blue)',   border: 'var(--blue)',   icon: 'var(--primary)',   num: 'var(--blue)'   },
  { Icon: CheckCircle, tag: '06', title: 'Progress Tracking',         description: 'Check off tasks. Watch your progress grow. Stay on your plan, week after week.',                                    bg: 'var(--tint-green)',  border: 'var(--green)',  icon: 'var(--accent)',    num: 'var(--green)'  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-4" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="max-w-xl mb-16">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title mt-4 mb-4" style={{ fontSize: 'clamp(32px,4vw,48px)', letterSpacing: '-0.02em' }}>
            Everything you need<br />
            <em style={{ fontStyle: 'italic', color: 'var(--secondary)' }}>to move forward.</em>
          </h2>
          <p className="section-body text-base">Tools built for Moroccan students who want to choose their path with clarity and confidence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.tag}
              className="group relative overflow-hidden rounded-[20px] p-7 transition-all duration-300 hover:-translate-y-1"
              style={{ background: f.bg, border: `1.5px solid ${f.border}`, boxShadow: '0 2px 12px rgba(91,170,220,0.06)' }}
            >
              <div className="absolute -top-1 -right-1 text-8xl font-black select-none opacity-[0.1] group-hover:opacity-[0.18] transition-opacity" style={{ fontFamily: 'Lora, serif', color: f.num, lineHeight: 1 }}>
                {f.tag}
              </div>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110" style={{ background: '#fff', color: f.icon, boxShadow: `0 2px 10px ${f.border}` }}>
                <f.Icon size={20} />
              </div>
              <h3 className="mb-2 font-bold" style={{ fontFamily: 'Lora, serif', fontSize: '17px', color: 'var(--ink)' }}>{f.title}</h3>
              <p className="section-body text-sm">{f.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a href="/auth/register" className="btn-primary btn-sm inline-flex items-center gap-2">Take the test now →</a>
        </div>
      </div>
    </section>
  );
}
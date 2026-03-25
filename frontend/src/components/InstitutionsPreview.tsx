import Link from 'next/link';
import { MapPin, GraduationCap, ArrowRight } from 'lucide-react';

const institutions = [
  {
    name: 'ENSIAS',
    city: 'Rabat',
    type: 'Public · Selective',
    domain: 'Computer Science',
    match: 92,
    emoji: '🏛️',
    accent: '#E8724A',
  },
  {
    name: 'ESCA École de Management',
    city: 'Casablanca',
    type: 'Private · Business',
    domain: 'Business & Finance',
    match: 85,
    emoji: '🎓',
    accent: '#F0B860',
  },
  {
    name: 'Institut National des Beaux-Arts',
    city: 'Tetouan',
    type: 'Public · Creative',
    domain: 'Design & Arts',
    match: 78,
    emoji: '🎨',
    accent: '#7DAA92',
  },
];

export default function InstitutionsPreview() {
  return (
    <section className="py-28 px-4" style={{ backgroundColor: '#FBF5EC' }}>
      <div className="max-w-6xl mx-auto">

        {/* Header — left-aligned for editorial feel */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <span className="section-label">Find your place</span>
            <h2
              className="section-title mt-4 mb-3"
              style={{ fontSize: 'clamp(30px, 4vw, 44px)', letterSpacing: '-0.02em' }}
            >
              Institutions<br />
              <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>recommended for you.</em>
            </h2>
            <p className="section-body text-base">
              TriQi matches your profile to schools and programs that suit you best — in Morocco and abroad.
            </p>
          </div>
          <Link href="/auth/register" className="btn-ghost btn-sm whitespace-nowrap self-start md:self-auto">
            See all →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {institutions.map((inst) => (
            <div key={inst.name} className="card group p-6 relative overflow-hidden">

              {/* Match badge */}
              <div
                className="absolute top-5 right-5 w-11 h-11 relative"
              >
                <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" stroke="rgba(0,0,0,0.06)" strokeWidth="3" fill="none" />
                  <circle
                    cx="22" cy="22" r="18"
                    stroke={inst.accent}
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 18}`}
                    strokeDashoffset={`${2 * Math.PI * 18 * (1 - inst.match / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
                  style={{ color: inst.accent }}
                >
                  {inst.match}%
                </span>
              </div>

              {/* Icon + name */}
              <div className="flex items-start gap-3 mb-5 pr-12">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${inst.accent}18` }}
                >
                  {inst.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight" style={{ fontFamily: 'Lora, serif', color: 'var(--ink)' }}>
                    {inst.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1" style={{ color: 'var(--dim)', fontSize: '12px' }}>
                    <MapPin size={11} />
                    <span>{inst.city}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="tag tag-primary text-xs flex items-center gap-1">
                  <GraduationCap size={10} /> {inst.domain}
                </span>
                <span
                  className="tag text-xs"
                  style={{ background: `${inst.accent}12`, color: inst.accent }}
                >
                  {inst.type}
                </span>
              </div>

              {/* CTA */}
              <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                  style={{ color: 'var(--primary)' }}
                >
                  View institution → <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
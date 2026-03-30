import Link from 'next/link';
import { MapPin, GraduationCap, ArrowRight } from 'lucide-react';

const institutions = [
  { name: 'ENSIAS', city: 'Rabat', type: 'Public · Selective', domain: 'Computer Science', match: 92, emoji: '🏛️', bg: 'var(--tint-blue)', border: 'var(--blue)', ring: 'var(--primary)', tag: { bg: 'var(--blue)', color: '#1A6FA0' } },
  { name: 'ESCA École de Management', city: 'Casablanca', type: 'Private · Business', domain: 'Business & Finance', match: 85, emoji: '🎓', bg: 'var(--tint-pink)', border: 'var(--pink)', ring: 'var(--secondary)', tag: { bg: 'var(--pink)', color: '#B94B6E' } },
  { name: 'Institut National des Beaux-Arts', city: 'Tétouan', type: 'Public · Creative', domain: 'Design & Arts', match: 78, emoji: '🎨', bg: 'var(--tint-green)', border: 'var(--green)', ring: 'var(--accent)', tag: { bg: 'var(--green)', color: '#2D7A3A' } },
];

export default function InstitutionsPreview() {
  return (
    <section className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--tint-yellow)' }}>
      <div className="absolute top-8 left-8 w-52 h-52 rounded-full blur-3xl pointer-events-none opacity-50" style={{ background: 'var(--pink)' }} />
      <div className="absolute bottom-8 right-8 w-60 h-60 rounded-full blur-3xl pointer-events-none opacity-40" style={{ background: 'var(--blue)' }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-lg">
            <span className="section-label">Find Your Place</span>
            <h2 className="section-title mt-4 mb-3" style={{ fontSize: 'clamp(30px,4vw,44px)', letterSpacing: '-0.02em' }}>
              Institutions<br />
              <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>recommended for you.</em>
            </h2>
            <p className="section-body text-base">TriQi matches your profile to the schools and programs that suit you best — in Morocco and internationally.</p>
          </div>
          <Link href="/auth/register" className="btn-ghost btn-sm whitespace-nowrap self-start md:self-auto">See all →</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {institutions.map((inst) => (
            <div key={inst.name} className="group relative overflow-hidden rounded-[20px] p-6 transition-all duration-300 hover:-translate-y-1" style={{ background: inst.bg, border: `1.5px solid ${inst.border}`, boxShadow: '0 2px 12px rgba(91,170,220,0.06)' }}>

              <div className="absolute top-5 right-5 w-11 h-11">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="18" stroke="rgba(30,41,59,0.08)" strokeWidth="3" fill="none" />
                  <circle cx="22" cy="22" r="18" stroke={inst.ring} strokeWidth="3" fill="none"
                    strokeDasharray={`${2 * Math.PI * 18}`}
                    strokeDashoffset={`${2 * Math.PI * 18 * (1 - inst.match / 100)}`}
                    strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold" style={{ color: inst.ring }}>{inst.match}%</span>
              </div>

              <div className="flex items-start gap-3 mb-5 pr-12">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0" style={{ background: '#fff', boxShadow: `0 2px 8px ${inst.border}` }}>{inst.emoji}</div>
                <div>
                  <h3 className="font-bold text-sm leading-tight" style={{ fontFamily: 'Lora, serif', color: 'var(--ink)' }}>{inst.name}</h3>
                  <div className="flex items-center gap-1 mt-1" style={{ color: 'var(--dim)', fontSize: '12px' }}><MapPin size={11} /><span>{inst.city}</span></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="tag text-xs flex items-center gap-1" style={{ background: inst.tag.bg, color: inst.tag.color }}><GraduationCap size={10} />{inst.domain}</span>
                <span className="tag text-xs" style={{ background: 'rgba(30,41,59,0.06)', color: 'var(--muted)' }}>{inst.type}</span>
              </div>

              <div className="border-t pt-4" style={{ borderColor: inst.border }}>
                <Link href="/auth/register" className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: 'var(--primary)' }}>
                  View Institution <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import Link from 'next/link';
import { MapPin, GraduationCap, ExternalLink, TrendingUp } from 'lucide-react';

const institutions = [
  {
    name: 'ENSIAS',
    city: 'Rabat',
    country: 'Morocco',
    type: 'Public · Selective',
    domain: 'Computer Science',
    match: 92,
    emoji: '🏛️',
    color: '#ff595e',
  },
  {
    name: 'ESCA École de Management',
    city: 'Casablanca',
    country: 'Morocco',
    type: 'Private · Business',
    domain: 'Business & Finance',
    match: 85,
    emoji: '🎓',
    color: '#ffca3a',
  },
  {
    name: 'Institut National des Beaux-Arts',
    city: 'Tétouan',
    country: 'Morocco',
    type: 'Public · Creative',
    domain: 'Design & Arts',
    match: 78,
    emoji: '🎨',
    color: '#8ac926',
  },
];

export default function InstitutionsPreview() {
  return (
    <section className="py-28 px-4 relative overflow-hidden" style={{ backgroundColor: 'var(--surface)' }}>
      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-gradient-to-r from-[#ff595e]/5 to-[#ffca3a]/5 blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 rounded-full bg-gradient-to-r from-[#6a4c93]/5 to-[#8ac926]/5 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
            <GraduationCap size={16} className="text-[var(--secondary)]" />
            <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">Find Your Place</span>
          </div>
          <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
            Recommended Institutions
          </h2>
          <p className="section-body max-w-lg mx-auto text-lg">
            TriQi matches your profile to schools and programs that suit you best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {institutions.map((inst) => (
            <div
              key={inst.name}
              className="card group p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Match percentage as circular progress */}
              <div className="absolute top-4 right-4 flex items-center justify-center">
                <div className="relative w-12 h-12">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke="rgba(0,0,0,0.05)"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      stroke={inst.color}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - inst.match / 100)}`}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: inst.color }}>
                    {inst.match}%
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${inst.color}1A` }}
                >
                  {inst.emoji}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text)]">{inst.name}</h3>
                  <div className="flex items-center gap-1 text-[var(--dim)] text-xs mt-1">
                    <MapPin size={12} />
                    <span>{inst.city}, {inst.country}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                <span className="tag-primary text-xs flex items-center gap-1">
                  <GraduationCap size={11} />
                  {inst.domain}
                </span>
                <span className="tag-secondary text-xs">{inst.type}</span>
              </div>

              <div className="border-t border-[var(--border)] pt-4 mt-auto">
                <Link
                  href="/auth/register"
                  className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-300"
                  style={{ color: 'var(--primary)' }}
                >
                  View Institution <ExternalLink size={13} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/auth/register" className="btn-ghost flex items-center gap-1 justify-center mx-auto w-fit">
            See All Institutions <TrendingUp size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
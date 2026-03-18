import Link from 'next/link';

const links = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Why TriQi?',  href: '#why-triqi' },
  { label: 'Login',        href: '/auth/login' },
  { label: 'Register',     href: '/auth/register' },
];

export default function Footer() {
  return (
    <footer
      className="py-10 px-4"
      style={{
        backgroundColor: '#0A0A0F',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-2">
            <span className="text-xl">🧭</span>
            <span className="text-base font-bold" style={{ color: '#F2F0F5' }}>TriQi</span>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="nav-link text-sm">
                {link.label}
              </Link>
            ))}
          </div>

          <p className="text-xs" style={{ color: '#4A4856' }}>
            © 2026 <span style={{ color: '#8B8996' }}>TriQi</span> — Dounia Elgarrai
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧭</span>
            <span className="text-xl font-bold text-white">TriQi</span>
          </div>

          {/* Nav Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it works</Link>
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#why-triqi" className="hover:text-white transition-colors">Why TriQi?</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            <Link href="/register" className="hover:text-white transition-colors">Register</Link>
          </div>

          {/* Copyright */}
          <p className="text-sm">
            © 2026 <span className="text-white font-medium">TriQi</span> — Dounia Elgarrai
          </p>

        </div>
      </div>
    </footer>
  );
}

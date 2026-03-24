import Link from 'next/link';
import { ChevronDown, Sparkles, Star, Compass, Heart } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/hero.mp4"
      />

      {/* Overlay with vibrant coral tint */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(255,89,94,0.3) 0%, rgba(255,202,58,0.4) 50%, rgba(106,76,147,0.5) 100%)',
        }}
      />

      {/* Decorative shapes with new colors */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#ff595e]/20 to-[#ffca3a]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-[#6a4c93]/20 to-[#8ac926]/20 blur-3xl pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-1/3 left-[5%] hidden md:block animate-float">
        <Sparkles size={32} className="text-[#ff595e]/40" />
      </div>
      <div className="absolute bottom-1/4 right-[8%] hidden md:block animate-float" style={{ animationDelay: '2s' }}>
        <Heart size={28} className="text-[#ffca3a]/40" />
      </div>
      <div className="absolute top-2/3 left-[12%] hidden md:block animate-float" style={{ animationDelay: '1.2s' }}>
        <Compass size={36} className="text-[#6a4c93]/30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 py-28">

        {/* Animated Badge */}
        <div className="fade-up mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-5 py-2 shadow-sm border border-[#ffca3a]">
            <Sparkles size={16} className="text-[#ff595e]" />
            <span className="text-sm font-semibold text-[#6a4c93]">✨ Made for You</span>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="fade-up-1 font-extrabold mb-6"
          style={{
            fontSize: 'clamp(42px, 6vw, 72px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Discover Your Path.
          <br />
          <span className="gradient-text">Thrive with Confidence.</span>
        </h1>

        {/* Divider */}
        <div className="fade-up-1 flex justify-center mb-6">
          <div className="w-20 h-1 rounded-full bg-gradient-to-r from-[#ff595e] to-[#ffca3a]" />
        </div>

        {/* Subtitle */}
        <p className="fade-up-2 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10 text-gray-700">
          TriQi combines an intelligent orientation test, personalized roadmap, and real opportunities 
          to help you make confident career choices — without the guesswork.
        </p>

        {/* CTA Buttons */}
        <div className="fade-up-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/register" className="btn-primary btn-sm">
            Start Your Journey →
          </Link>
          <Link href="#how-it-works" className="btn-ghost btn-sm">
            How it works ↓
          </Link>
        </div>

        {/* Stats */}
        <div className="fade-up-4 mt-16 flex justify-center gap-12 flex-wrap">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6a4c93]">50+</p>
            <p className="text-xs uppercase tracking-wider text-gray-500">Career Domains</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6a4c93]">10min</p>
            <p className="text-xs uppercase tracking-wider text-gray-500">Test Duration</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#6a4c93]">100%</p>
            <p className="text-xs uppercase tracking-wider text-gray-500">Free Forever</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center bounce-down z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
          <ChevronDown size={24} className="text-[#ff595e]" />
        </div>
      </div>

      {/* Wave Divider */}
      <div className="custom-shape-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffddde" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,218.7C672,213,768,171,864,170.7C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>
    </section>
  );
}
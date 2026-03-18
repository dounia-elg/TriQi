import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span>🎓</span>
          <span>Your Free Orientation Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Discover Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Perfect Path
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          TriQi helps young Moroccans find their academic and professional direction
          through a smart test, personalized roadmaps, and institution recommendations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200"
          >
            Start My Orientation →
          </Link>
          <Link
            href="/login"
            className="border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-colors"
          >
            I already have an account
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm mx-auto">
          <div>
            <p className="text-3xl font-bold text-indigo-600">50+</p>
            <p className="text-sm text-gray-500 mt-1">Domains</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">6mo</p>
            <p className="text-sm text-gray-500 mt-1">Roadmaps</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-indigo-600">100%</p>
            <p className="text-sm text-gray-500 mt-1">Personalized</p>
          </div>
        </div>

      </div>
    </section>
  );
}

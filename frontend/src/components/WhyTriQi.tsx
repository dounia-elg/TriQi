import Link from 'next/link';

const benefits = [
  { icon: '🎯', text: 'Tailored to the Moroccan educational context' },
  { icon: '🤖', text: 'AI-powered explanations and recommendations' },
  { icon: '⚡', text: 'Get clear results in minutes, not days' },
  { icon: '🔓', text: 'Free to use — no hidden fees' },
  { icon: '📱', text: 'Works on any device, anytime' },
  { icon: '🔒', text: 'Your data is private and secure' },
];

const progressSteps = [
  { label: 'Take the test', done: true, progress: '100%' },
  { label: 'Get ranked domains', done: true, progress: '75%' },
  { label: 'Build your roadmap', done: false, progress: '40%' },
  { label: 'Track your progress', done: false, progress: '10%' },
];

export default function WhyTriQi() {
  return (
    <section id="why-triqi" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side: Text + Benefits */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                TriQi?
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Most students in Morocco choose their path based on family pressure or chance.
              TriQi gives you a data-driven, personal answer — so you move forward with confidence.
            </p>

            <ul className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="text-gray-700 font-medium">{benefit.text}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all hover:shadow-lg hover:shadow-indigo-200"
            >
              Start for Free →
            </Link>
          </div>

          {/* Right Side: Visual Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-8">Your journey starts here</h3>

            <div className="space-y-5">
              {progressSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      step.done ? 'bg-white text-indigo-600' : 'bg-white/20 text-white'
                    }`}
                  >
                    {step.done ? '✓' : i + 1}
                  </div>
                  <div className="flex-1 bg-white/20 rounded-full h-2 overflow-hidden">
                    <div className="bg-white h-2 rounded-full" style={{ width: step.progress }} />
                  </div>
                  <span className="text-sm text-white/80 min-w-max">{step.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-white/70 text-sm">
                Join students who found their path with TriQi 🧭
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

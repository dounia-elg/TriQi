const steps = [
  {
    number: '01',
    icon: '📝',
    title: 'Take the Test',
    description: 'Answer questions about your interests, personality, and abilities.',
  },
  {
    number: '02',
    icon: '📊',
    title: 'Get Your Results',
    description: 'Our engine ranks the domains that match you best, with explanations.',
  },
  {
    number: '03',
    icon: '🗺️',
    title: 'Follow Your Roadmap',
    description: 'Get a personalized 3 or 6-month action plan to guide your journey.',
  },
  {
    number: '04',
    icon: '🏫',
    title: 'Find Your Institution',
    description: 'Discover schools and programs that match your profile.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            From zero clarity to a clear direction — in 4 simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-indigo-50 to-white border border-indigo-100 rounded-2xl p-6"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <span className="text-xs font-bold text-indigo-400 tracking-widest">{step.number}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-2 mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

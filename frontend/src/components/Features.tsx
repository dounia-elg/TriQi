const features = [
  {
    icon: '🧠',
    title: 'Smart Orientation Test',
    description: 'Structured questions covering interests, personality, and abilities with a weighted scoring system.',
    bg: 'bg-indigo-50',
  },
  {
    icon: '📈',
    title: 'Intelligent Scoring Engine',
    description: 'Our algorithm calculates your compatibility with each domain and ranks them from best to worst match.',
    bg: 'bg-violet-50',
  },
  {
    icon: '🗺️',
    title: 'Personalized Roadmap',
    description: 'A detailed week-by-week action plan for 3 or 6 months with tasks tailored to your profile.',
    bg: 'bg-purple-50',
  },
  {
    icon: '📚',
    title: 'AI-Powered Explanations',
    description: 'Understand why you matched a domain with clear explanations based on your score intensity.',
    bg: 'bg-blue-50',
  },
  {
    icon: '🏫',
    title: 'Institution Recommendations',
    description: 'Find schools and programs that match your domain, filtered by country and city.',
    bg: 'bg-teal-50',
  },
  {
    icon: '✅',
    title: 'Progress Tracking',
    description: 'Mark tasks as done and watch your progress percentage grow as you move toward your goal.',
    bg: 'bg-emerald-50',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Main Features</h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Everything you need to find and follow your academic and professional path.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${feature.bg}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

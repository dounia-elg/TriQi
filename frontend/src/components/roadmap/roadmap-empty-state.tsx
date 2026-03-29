import { CalendarDays, Loader2, Map, Sparkles } from 'lucide-react';

type Props = {
  selectedDuration: 3 | 6;
  generating: boolean;
  onSelectDuration: (duration: 3 | 6) => void;
  onGenerate: () => void;
};

export default function RoadmapEmptyState({
  selectedDuration,
  generating,
  onSelectDuration,
  onGenerate,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto pb-10 roadmap-rainbow-bg">
      <div className="rounded-4xl border border-(--border) bg-white p-10 shadow-sm relative overflow-hidden">
        <div className="absolute -top-12 -right-10 w-72 h-72 rounded-full bg-(--tint-pink) blur-3xl opacity-60" />
        <div className="absolute -bottom-12 -left-8 w-72 h-72 rounded-full bg-(--tint-green) blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--tint-blue) text-(--primary) text-[10px] font-black uppercase tracking-widest mb-4">
            <Map size={14} /> EPIC 14 - Your Learning Roadmap
          </div>

          <h1 className="text-4xl font-black text-(--ink) mb-3" style={{ fontFamily: 'Lora, serif' }}>
            Generate your AI Roadmap
          </h1>

          <p className="text-(--muted) max-w-2xl mb-8">
            Choose a duration and generate a personalized plan by weeks and tasks based on your top domain scores.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-6">
            <button
              onClick={() => onSelectDuration(3)}
              className={selectedDuration === 3 ? 'duration-card active' : 'duration-card'}
            >
              <CalendarDays size={18} />
              <span>3 Months</span>
            </button>

            <button
              onClick={() => onSelectDuration(6)}
              className={selectedDuration === 6 ? 'duration-card active' : 'duration-card'}
            >
              <CalendarDays size={18} />
              <span>6 Months</span>
            </button>
          </div>

          <button onClick={onGenerate} disabled={generating} className="btn-primary">
            {generating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {generating ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>
      </div>
    </div>
  );
}

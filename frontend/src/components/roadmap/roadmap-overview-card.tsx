import { CalendarDays, CheckCircle2, Circle, Rocket, Sparkles } from 'lucide-react';
import { Roadmap, RoadmapStats } from '@/services/roadmaps.service';

type Props = {
  roadmap: Roadmap;
  stats: RoadmapStats;
  currentWeek: number;
  generating: boolean;
  onRegenerate: () => void;
};

export default function RoadmapOverviewCard({
  roadmap,
  stats,
  currentWeek,
  generating,
  onRegenerate,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 rounded-4xl border border-(--border) bg-white p-7 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--tint-green) text-(--accent) text-[10px] font-black uppercase tracking-widest mb-3">
              <Rocket size={12} /> EPIC 14 - Roadmap Activated
            </div>
            <h1 className="text-3xl font-black text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
              Your Weekly Action Plan
            </h1>
            <p className="text-(--muted) mt-2 max-w-2xl">
              Keep moving week by week. Complete tasks, track your progression, and use AI tips to stay focused.
            </p>
          </div>

          <button onClick={onRegenerate} disabled={generating} className="btn-primary">
            {generating ? <Sparkles size={18} className="animate-pulse" /> : <Sparkles size={18} />}
            {generating ? 'Regenerating...' : 'Regenerate Roadmap'}
          </button>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-bold text-(--ink)">
              Overall Progress ({stats.doneTasks}/{stats.totalTasks})
            </span>
            <span className="font-black text-(--accent)">{stats.progressPercent}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-(--bg) border border-(--border) overflow-hidden">
            <div
              className="h-full bg-(--accent) transition-all duration-300"
              style={{ width: `${stats.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-4xl border border-(--border) bg-white p-5 shadow-sm space-y-3">
        <div className="stat-chip stat-chip-green">
          <CheckCircle2 size={16} /> Done: {stats.doneTasks}
        </div>
        <div className="stat-chip stat-chip-yellow">
          <Circle size={16} /> Pending: {stats.pendingTasks}
        </div>
        <div className="stat-chip stat-chip-blue">
          <CalendarDays size={16} /> Weeks: {stats.totalWeeks}
        </div>
        <div className="text-xs font-black uppercase tracking-widest text-(--dim) pt-1">
          Current Week: {currentWeek}/{roadmap.weeks.length}
        </div>
      </div>
    </div>
  );
}

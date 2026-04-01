import Link from 'next/link';
import { Map, Sparkles, ArrowRight } from 'lucide-react';
import type { RoadmapStats } from '@/services/roadmaps.service';

interface RoadmapProgressCardProps {
  roadmapStats: RoadmapStats | null;
  nextTaskTitle: string | null;
}

export function RoadmapProgressCard({ roadmapStats, nextTaskTitle }: RoadmapProgressCardProps) {
  return (
    <div className="bg-(--surface) p-8 rounded-4xl border border-(--border) shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--tint-green) text-(--accent) flex items-center justify-center">
            <Map size={20} />
          </div>
          <h3 className="font-bold text-(--ink)">Roadmap Progress</h3>
        </div>
        <span className="text-xs font-bold text-(--accent) bg-(--tint-green) px-3 py-1 rounded-full">
          {roadmapStats?.hasRoadmap
            ? `${roadmapStats.doneTasks}/${roadmapStats.totalTasks} tasks`
            : 'No roadmap'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-bold text-(--ink)">Overall Completion</span>
          <span className="font-bold text-(--accent)">
            {roadmapStats?.hasRoadmap ? `${roadmapStats.progressPercent}%` : '—'}
          </span>
        </div>
        <div className="w-full h-3 bg-(--bg) rounded-full overflow-hidden border border-(--border) shadow-inner">
          <div
            className="h-full bg-(--accent) transition-all duration-300"
            style={{ width: roadmapStats?.hasRoadmap ? `${roadmapStats.progressPercent}%` : '0%' }}
          />
        </div>

        <Link
          href="/dashboard/roadmap"
          className="mt-6 p-4 rounded-2xl bg-(--bg) border border-(--border) flex items-center justify-between group cursor-pointer hover:border-(--accent) transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-(--tint-green) flex items-center justify-center text-(--accent)">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-xs font-bold text-(--muted) uppercase tracking-wider">
                {roadmapStats?.hasRoadmap ? 'Next up' : 'Get started'}
              </p>
              <p className="text-sm font-bold text-(--ink)">
                {roadmapStats?.hasRoadmap
                  ? nextTaskTitle || 'Continue your roadmap'
                  : 'Generate your personalized roadmap'}
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="text-(--dim) group-hover:text-(--accent) transition-colors" />
        </Link>
      </div>
    </div>
  );
}

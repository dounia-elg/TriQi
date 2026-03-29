'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Loader2,
  Map,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import {
  roadmapsService,
  Roadmap,
  RoadmapStats,
  RoadmapTask,
  TaskStatus,
} from '@/services/roadmaps.service';

function weekProgress(tasks: RoadmapTask[]) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'DONE').length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { total, done, percent };
}

export default function DashboardRoadmapPage() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [stats, setStats] = useState<RoadmapStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<3 | 6>(3);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const fetchRoadmapData = async () => {
    setLoading(true);
    try {
      const [roadmapData, statsData] = await Promise.all([
        roadmapsService.getMyRoadmap(),
        roadmapsService.getStats(),
      ]);
      setRoadmap(roadmapData);
      setStats(statsData);
    } catch (error) {
      console.error('Failed to load roadmap:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoadmapData();
  }, []);

  const currentWeek = useMemo(() => {
    if (!roadmap?.weeks?.length) return 0;
    const firstIncomplete = roadmap.weeks.findIndex((w) =>
      w.tasks.some((t) => t.status !== 'DONE'),
    );
    return firstIncomplete === -1
      ? roadmap.weeks.length
      : firstIncomplete + 1;
  }, [roadmap]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const generated = await roadmapsService.generate(selectedDuration);
      setRoadmap(generated);
      const freshStats = await roadmapsService.getStats();
      setStats(freshStats);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        'Could not generate roadmap. Complete orientation test first.';
      alert(Array.isArray(message) ? message[0] : message);
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleTask = async (
    taskId: string,
    currentStatus: TaskStatus,
  ) => {
    const nextStatus: TaskStatus =
      currentStatus === 'DONE' ? 'PENDING' : 'DONE';

    setUpdatingTaskId(taskId);
    try {
      const updatedRoadmap =
        await roadmapsService.updateTaskStatus(taskId, nextStatus);
      setRoadmap(updatedRoadmap);

      const freshStats = await roadmapsService.getStats();
      setStats(freshStats);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-(--primary)" size={34} />
        <p className="text-(--dim) text-[11px] font-black uppercase tracking-widest">
          Loading your roadmap...
        </p>
      </div>
    );
  }

  if (!roadmap || !stats?.hasRoadmap) {
    return (
      <div className="max-w-5xl mx-auto pb-10 roadmap-rainbow-bg">
        <div className="rounded-4xl border border-(--border) bg-white p-10 shadow-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-10 w-72 h-72 rounded-full bg-(--tint-pink) blur-3xl opacity-60" />
          <div className="absolute -bottom-12 -left-8 w-72 h-72 rounded-full bg-(--tint-green) blur-3xl opacity-50" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--tint-blue) text-(--primary) text-[10px] font-black uppercase tracking-widest mb-4">
              <Map size={14} /> EPIC 14 - Your Learning Roadmap
            </div>

            <h1
              className="text-4xl font-black text-(--ink) mb-3"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Generate your AI Roadmap
            </h1>

            <p className="text-(--muted) max-w-2xl mb-8">
              Choose a duration and generate a personalized plan by weeks
              and tasks based on your top domain scores.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-6">
              <button
                onClick={() => setSelectedDuration(3)}
                className={
                  selectedDuration === 3
                    ? 'duration-card active'
                    : 'duration-card'
                }
              >
                <CalendarDays size={18} />
                <span>3 Months</span>
              </button>

              <button
                onClick={() => setSelectedDuration(6)}
                className={
                  selectedDuration === 6
                    ? 'duration-card active'
                    : 'duration-card'
                }
              >
                <CalendarDays size={18} />
                <span>6 Months</span>
              </button>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary"
            >
              {generating ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Sparkles size={18} />
              )}
              {generating ? 'Generating...' : 'Generate Roadmap'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-16">
      <h1 className="text-3xl font-black">My Roadmap</h1>
    </div>
  );
}
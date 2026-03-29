'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Brain,
  CalendarDays,
  CheckCircle2,
  Circle,
  Loader2,
  Map,
  Rocket,
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
    <div className="max-w-7xl mx-auto pb-16 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-4xl border border-(--border) bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--tint-green) text-(--accent) text-[10px] font-black uppercase tracking-widest mb-3">
                <Rocket size={12} /> EPIC 14 - Roadmap Activated
              </div>
              <h1
                className="text-3xl font-black text-(--ink)"
                style={{ fontFamily: 'Lora, serif' }}
              >
                Your Weekly Action Plan
              </h1>
              <p className="text-(--muted) mt-2 max-w-2xl">
                Keep moving week by week. Complete tasks, track your
                progression, and use AI tips to stay focused.
              </p>
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
              {generating ? 'Regenerating...' : 'Regenerate Roadmap'}
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-bold text-(--ink)">
                Overall Progress ({stats.doneTasks}/{stats.totalTasks})
              </span>
              <span className="font-black text-(--accent)">
                {stats.progressPercent}%
              </span>
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

      <div className="grid grid-cols-1 gap-5">
        {roadmap.weeks.map((week) => {
          const weekStats = weekProgress(week.tasks);
          const isCurrentWeek = week.weekNumber === currentWeek;

          return (
            <section
              key={week.weekNumber}
              className="roadmap-week-card rounded-4xl border border-(--border) bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-1 rounded-full bg-(--tint-blue) text-(--primary) text-[10px] font-black uppercase tracking-widest">
                      Week {week.weekNumber}
                    </span>
                    {isCurrentWeek && (
                      <span className="px-3 py-1 rounded-full bg-(--tint-pink) text-(--pink) text-[10px] font-black uppercase tracking-widest">
                        Current
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-black text-(--ink)">{week.theme}</h2>
                </div>

                <div className="min-w-52">
                  <div className="flex justify-between text-xs font-bold text-(--muted) mb-1">
                    <span>
                      {weekStats.done}/{weekStats.total} tasks done
                    </span>
                    <span>{weekStats.percent}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill transition-all duration-300"
                      style={{ width: `${weekStats.percent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {week.tasks.map((task) => {
                  const isDone = task.status === 'DONE';
                  const isUpdating = updatingTaskId === task._id;

                  return (
                    <article
                      key={task._id}
                      className={`task-row ${isDone ? 'task-done' : 'task-pending'}`}
                    >
                      <button
                        onClick={() => handleToggleTask(task._id, task.status)}
                        disabled={isUpdating}
                        className="mt-0.5 shrink-0 text-(--accent) disabled:opacity-50"
                        aria-label={`Mark task ${isDone ? 'pending' : 'done'}`}
                      >
                        {isUpdating ? (
                          <Loader2 size={20} className="animate-spin" />
                        ) : isDone ? (
                          <CheckCircle2 size={20} />
                        ) : (
                          <Circle size={20} />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <h3 className={`task-title ${isDone ? 'done' : ''}`}>
                            {task.title}
                          </h3>
                          <span
                            className={`status-pill ${
                              isDone
                                ? 'status-pill-done'
                                : 'status-pill-pending'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>

                        <p className="text-sm text-(--muted) mt-1">
                          {task.description}
                        </p>

                        <div className="tip-box mt-3">
                          <p className="text-[11px] font-black uppercase tracking-widest text-(--yellow) mb-1 inline-flex items-center gap-1">
                            <Brain size={12} />
                            AI Tip
                          </p>
                          <p className="text-sm text-(--ink)">
                            {task.tip?.trim()
                              ? task.tip
                              : 'Break this task into 20-30 minute focused blocks and track one measurable output.'}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
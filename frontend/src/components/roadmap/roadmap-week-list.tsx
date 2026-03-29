import { Brain, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Roadmap, RoadmapTask, TaskStatus } from '@/services/roadmaps.service';

type Props = {
  roadmap: Roadmap;
  currentWeek: number;
  updatingTaskId: string | null;
  onToggleTask: (taskId: string, status: TaskStatus) => void;
};

function weekProgress(tasks: RoadmapTask[]) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'DONE').length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { total, done, percent };
}

export default function RoadmapWeekList({
  roadmap,
  currentWeek,
  updatingTaskId,
  onToggleTask,
}: Props) {
  return (
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
                      onClick={() => onToggleTask(task._id, task.status)}
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
                            isDone ? 'status-pill-done' : 'status-pill-pending'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      <p className="text-sm text-(--muted) mt-1">{task.description}</p>

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
  );
}

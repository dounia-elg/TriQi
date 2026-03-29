'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  BrainCircuit,
  Target,
  Sparkles,
  BookOpen,
  School,
  Map,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { resultsService } from '@/services/results.service';
import { roadmapsService, RoadmapStats } from '@/services/roadmaps.service';
import { institutionsService } from '@/services/institutions.service';

type DomainScore = {
  domainId?: string;
  domainName: string;
  score: number;
};

type LatestResult = {
  domainScores: DomainScore[];
};

export default function DashboardPage() {
  const { user, mergeUser } = useAuth();
  const [latestResult, setLatestResult] = useState<LatestResult | null>(null);
  const [roadmapStats, setRoadmapStats] = useState<RoadmapStats | null>(null);
  const [nextTaskTitle, setNextTaskTitle] = useState<string | null>(null);
  const [institutions, setInstitutions] = useState<
    { _id: string; name: string; city?: string }[]
  >([]);
  const [loadingExtras, setLoadingExtras] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    authService
      .getProfile(user.id)
      .then((p: { hasCompletedTest?: boolean }) => {
        if (cancelled) return;
        if (p?.hasCompletedTest) mergeUser({ hasCompletedTest: true });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [user?.id, mergeUser]);

  useEffect(() => {
    if (!user?.hasCompletedTest) return;
    let cancelled = false;
    setLoadingExtras(true);
    (async () => {
      try {
        const result = (await resultsService.getLatest()) as LatestResult | null;
        if (cancelled) return;
        setLatestResult(result);

        const stats = await roadmapsService.getStats();
        if (cancelled) return;
        setRoadmapStats(stats);

        if (stats.hasRoadmap) {
          const roadmap = await roadmapsService.getMyRoadmap();
          if (!cancelled && roadmap?.weeks?.length) {
            for (const w of roadmap.weeks) {
              const t = w.tasks.find((x) => x.status !== 'DONE');
              if (t) {
                setNextTaskTitle(t.title);
                break;
              }
            }
          }
        } else {
          setNextTaskTitle(null);
        }

        if (result?.domainScores?.length) {
          const ids = result.domainScores
            .slice(0, 3)
            .map((d) =>
              typeof d.domainId === 'string'
                ? d.domainId
                : String((d as { domainId?: { toString?: () => string } }).domainId ?? ''),
            )
            .filter(Boolean);
          if (ids.length) {
            try {
              const inst = await institutionsService.getRecommended({ domainIds: ids });
              if (cancelled) return;
              if (Array.isArray(inst) && inst.length) {
                setInstitutions(
                  inst.slice(0, 2).map((i: { _id: string; name: string; city?: string }) => ({
                    _id: i._id,
                    name: i.name,
                    city: i.city,
                  })),
                );
              } else {
                setInstitutions([]);
              }
            } catch {
              setInstitutions([]);
            }
          }
        }
      } catch {
        if (!cancelled) {
          setLatestResult(null);
          setRoadmapStats(null);
        }
      } finally {
        if (!cancelled) setLoadingExtras(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.hasCompletedTest]);

  const topTwo = latestResult?.domainScores?.slice(0, 2) ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="bg-(--surface) rounded-4xl p-10 shadow-sm border border-(--border) relative overflow-hidden">
        <div className="absolute -top-32 -right-10 w-80 h-80 bg-(--tint-pink) rounded-full blur-3xl opacity-80" />
        <div className="absolute -bottom-32 -left-10 w-80 h-80 bg-(--tint-lemon) rounded-full blur-3xl opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-(--tint-blue) rounded-full blur-3xl opacity-60" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex gap-1.5 mb-5">
              {['var(--blue)', 'var(--pink)', 'var(--green)', 'var(--lemon)'].map((c) => (
                <span key={c} className="h-1.5 w-8 rounded-full" style={{ background: c }} />
              ))}
            </div>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4 text-(--ink)"
              style={{ fontFamily: 'Lora, serif' }}
            >
              Your future starts here{user?.firstName ? `, ${user.firstName}` : ''}.
            </h1>
            <p className="text-(--text) text-lg leading-relaxed mb-6 font-medium">
              {user?.hasCompletedTest
                ? "You've successfully completed the orientation test. Explore your paths, roadmap, and schools below."
                : 'The first step to finding your dream career is understanding yourself. Take our orientation test to get personalized recommendations.'}
            </p>

            {!user?.hasCompletedTest && (
              <Link
                href="/orientation-test"
                className="inline-flex items-center gap-2 bg-(--primary) text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-[0_8px_32px_rgba(91,170,220,0.4)] hover:-translate-y-1 transition-all"
              >
                <Compass size={20} />
                Start My Orientation Test
                <ArrowRight size={18} />
              </Link>
            )}
          </div>

          <div className="hidden md:flex relative">
            <div className="absolute inset-0 bg-linear-to-br from-(--blue) to-(--pink) rounded-3xl blur-xl opacity-40 animate-pulse" />
            <div className="relative w-32 h-32 rounded-3xl bg-white flex items-center justify-center border-2 border-(--tint-blue) shadow-xl rotate-3 hover:rotate-6 transition-transform">
              {user?.hasCompletedTest ? (
                <Target size={56} className="text-(--accent)" />
              ) : (
                <BrainCircuit size={56} className="text-(--pink)" />
              )}
            </div>
          </div>
        </div>
      </div>

      {user?.hasCompletedTest ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-(--surface) p-8 rounded-4xl border border-(--border) shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-(--tint-blue) text-(--primary) flex items-center justify-center">
                  <Target size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-(--ink)" style={{ fontFamily: 'Lora, serif' }}>
                    Your Top Paths
                  </h2>
                  <p className="text-xs font-bold text-(--muted) uppercase tracking-widest mt-0.5">
                    Test Results
                  </p>
                </div>
              </div>
              <Link
                href="/dashboard/results"
                className="text-xs font-bold text-(--primary) hover:underline"
              >
                Details →
              </Link>
            </div>

            {loadingExtras && !latestResult ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-(--primary)" size={32} />
              </div>
            ) : topTwo.length === 0 ? (
              <p className="text-sm text-(--muted)">No scores yet — open results to refresh.</p>
            ) : (
              <div className="space-y-4">
                {topTwo.map((d, idx) => {
                  const pct = Math.min(100, Math.round(Number(d.score) || 0));
                  const isFirst = idx === 0;
                  return (
                    <div
                      key={`${d.domainName}-${idx}`}
                      className={
                        isFirst
                          ? 'p-4 rounded-3xl bg-(--tint-green) border-2 border-(--green) flex items-center justify-between relative overflow-hidden group transition-colors cursor-default'
                          : 'p-4 rounded-3xl bg-(--tint-yellow) border border-(--yellow) flex items-center justify-between hover:border-(--yellow) transition-colors cursor-default'
                      }
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div
                          className={
                            isFirst
                              ? 'w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-(--accent) font-black text-lg'
                              : 'w-10 h-10 rounded-full bg-white flex items-center justify-center text-(--yellow) font-bold text-sm shadow-sm'
                          }
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-(--ink) text-lg">{d.domainName}</h3>
                          <p
                            className={
                              isFirst
                                ? 'text-xs font-bold text-(--accent) uppercase tracking-wider mt-0.5'
                                : 'text-[10px] font-bold text-(--yellow) uppercase tracking-wider mt-0.5'
                            }
                          >
                            {pct}% match
                          </p>
                        </div>
                      </div>
                      <div
                        className={
                          isFirst
                            ? 'w-20 h-2 bg-white rounded-full overflow-hidden shadow-inner relative z-10'
                            : 'w-14 h-1.5 bg-white rounded-full overflow-hidden shadow-inner'
                        }
                      >
                        <div
                          className={isFirst ? 'h-full bg-(--accent)' : 'h-full bg-(--yellow)'}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
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
                    style={{
                      width: roadmapStats?.hasRoadmap ? `${roadmapStats.progressPercent}%` : '0%',
                    }}
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
                  <ArrowRight
                    size={16}
                    className="text-(--dim) group-hover:text-(--accent) transition-colors"
                  />
                </Link>
              </div>
            </div>

            <div className="bg-(--surface) p-8 rounded-4xl border border-(--border) shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-(--tint-pink) text-(--pink) flex items-center justify-center">
                    <School size={20} />
                  </div>
                  <h3 className="font-bold text-(--ink)">Dream Institutions</h3>
                </div>
                <Link
                  href="/dashboard/institutions"
                  className="text-xs font-bold text-(--primary) hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {institutions.length === 0 ? (
                  <div className="col-span-2 text-sm text-(--muted) py-4 text-center">
                    <Link href="/dashboard/institutions" className="text-(--primary) font-bold">
                      Browse recommended schools →
                    </Link>
                  </div>
                ) : (
                  institutions.map((i) => (
                    <Link
                      key={i._id}
                      href="/dashboard/institutions"
                      className="p-4 rounded-3xl bg-(--bg) border border-(--border) text-center hover:border-(--pink) transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-white mx-auto mb-3 flex items-center justify-center shadow-sm text-(--pink) font-bold text-xs ring-4 ring-(--tint-pink)">
                        {i.name.slice(0, 4).toUpperCase()}
                      </div>
                      <p className="text-xs font-bold text-(--ink) line-clamp-1">{i.name}</p>
                      <p className="text-[10px] font-bold text-(--dim) mt-1">{i.city || '—'}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-(--tint-blue) p-8 rounded-4xl border-2 border-(--blue) shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-(--primary) mb-5">
              <Target size={32} />
            </div>
            <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>
              Results Summary
            </p>
            <p className="text-xs font-bold text-(--primary) uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full">
              Take test to unlock
            </p>
          </div>

          <div className="bg-(--tint-green) p-8 rounded-4xl border-2 border-(--green) shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-(--accent) mb-5">
              <BookOpen size={32} />
            </div>
            <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>
              Learning Roadmap
            </p>
            <p className="text-xs font-bold text-(--accent) uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full">
              Take test to unlock
            </p>
          </div>

          <div className="bg-(--tint-pink) p-8 rounded-4xl border-2 border-(--pink) shadow-sm flex flex-col items-center justify-center text-center h-55 hover:-translate-y-1 transition-transform">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm text-(--pink) mb-5">
              <School size={32} />
            </div>
            <p className="font-bold text-(--ink) text-lg mb-2" style={{ fontFamily: 'Lora, serif' }}>
              Dream Institutions
            </p>
            <p className="text-xs font-bold text-(--secondary) uppercase tracking-wider bg-white/60 px-4 py-1.5 rounded-full">
              Take test to unlock
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

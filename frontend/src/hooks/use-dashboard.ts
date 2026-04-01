'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth.service';
import { resultsService } from '@/services/results.service';
import { roadmapsService, RoadmapStats } from '@/services/roadmaps.service';
import { institutionsService } from '@/services/institutions.service';

export type DomainScore = {
  domainId?: string;
  domainName: string;
  score: number;
};

export type LatestResult = {
  domainScores: DomainScore[];
};

export type Institution = {
  _id: string;
  name: string;
  city?: string;
};

export function useDashboard() {
  const { user, mergeUser } = useAuth();
  const [latestResult, setLatestResult] = useState<LatestResult | null>(null);
  const [roadmapStats, setRoadmapStats] = useState<RoadmapStats | null>(null);
  const [nextTaskTitle, setNextTaskTitle] = useState<string | null>(null);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
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
    return () => { cancelled = true; };
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
              if (t) { setNextTaskTitle(t.title); break; }
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
                  inst.slice(0, 2).map((i: Institution) => ({
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
    return () => { cancelled = true; };
  }, [user?.hasCompletedTest]);

  const topTwo = latestResult?.domainScores?.slice(0, 2) ?? [];

  return {
    user,
    latestResult,
    roadmapStats,
    nextTaskTitle,
    institutions,
    loadingExtras,
    topTwo,
  };
}

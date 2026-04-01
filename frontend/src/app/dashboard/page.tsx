'use client';

import { useDashboard } from '@/hooks/use-dashboard';
import { WelcomeCard } from '@/components/dashboard/WelcomeCard';
import { TopPathsCard } from '@/components/dashboard/TopPathsCard';
import { RoadmapProgressCard } from '@/components/dashboard/RoadmapProgressCard';
import { InstitutionsCard } from '@/components/dashboard/InstitutionsCard';
import { LockedPreviewCards } from '@/components/dashboard/LockedPreviewCards';

export default function DashboardPage() {
  const { user, roadmapStats, nextTaskTitle, institutions, loadingExtras, topTwo } = useDashboard();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <WelcomeCard firstName={user?.firstName} hasCompletedTest={user?.hasCompletedTest} />

      {user?.hasCompletedTest ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TopPathsCard loadingExtras={loadingExtras} topTwo={topTwo} />

          <div className="space-y-6">
            <RoadmapProgressCard roadmapStats={roadmapStats} nextTaskTitle={nextTaskTitle} />
            <InstitutionsCard institutions={institutions} />
          </div>
        </div>
      ) : (
        <LockedPreviewCards />
      )}
    </div>
  );
}

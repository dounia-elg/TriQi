'use client';

import { Loader2 } from 'lucide-react';
import RoadmapEmptyState from '@/components/roadmap/roadmap-empty-state';
import RoadmapOverviewCard from '@/components/roadmap/roadmap-overview-card';
import RoadmapWeekList from '@/components/roadmap/roadmap-week-list';
import { useRoadmap } from '@/hooks/use-roadmap';

export default function DashboardRoadmapPageClient() {
  const {
    roadmap,
    stats,
    loading,
    generating,
    selectedDuration,
    updatingTaskId,
    currentWeek,
    setSelectedDuration,
    generateRoadmap,
    toggleTask,
  } = useRoadmap();

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
      <RoadmapEmptyState
        selectedDuration={selectedDuration}
        generating={generating}
        onSelectDuration={setSelectedDuration}
        onGenerate={generateRoadmap}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-16 space-y-6">
      <RoadmapOverviewCard
        roadmap={roadmap}
        stats={stats}
        currentWeek={currentWeek}
        generating={generating}
        onRegenerate={generateRoadmap}
      />

      <RoadmapWeekList
        roadmap={roadmap}
        currentWeek={currentWeek}
        updatingTaskId={updatingTaskId}
        onToggleTask={toggleTask}
      />
    </div>
  );
}

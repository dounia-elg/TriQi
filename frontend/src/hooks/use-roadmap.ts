'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  roadmapsService,
  Roadmap,
  RoadmapStats,
  TaskStatus,
} from '@/services/roadmaps.service';

export function useRoadmap() {
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
    return firstIncomplete === -1 ? roadmap.weeks.length : firstIncomplete + 1;
  }, [roadmap]);

  const generateRoadmap = async () => {
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

  const toggleTask = async (taskId: string, currentStatus: TaskStatus) => {
    const nextStatus: TaskStatus = currentStatus === 'DONE' ? 'PENDING' : 'DONE';

    setUpdatingTaskId(taskId);
    try {
      const updatedRoadmap = await roadmapsService.updateTaskStatus(taskId, nextStatus);
      setRoadmap(updatedRoadmap);

      const freshStats = await roadmapsService.getStats();
      setStats(freshStats);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  return {
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
  };
}

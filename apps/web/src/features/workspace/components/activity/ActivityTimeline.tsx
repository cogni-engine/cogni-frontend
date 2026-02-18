'use client';

import { useState } from 'react';
import type { WorkspaceActivity } from '@/types/notification';
import ActivityItem from './ActivityItem';

interface ActivityTimelineProps {
  activities: WorkspaceActivity[];
  loading: boolean;
}

export default function ActivityTimeline({
  activities,
  loading,
}: ActivityTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (activityId: number) => {
    setExpandedId(prev => (prev === activityId ? null : activityId));
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-text-primary' />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-text-secondary text-center'>No activity yet</p>
      </div>
    );
  }

  return (
    <div className='py-2'>
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          isLast={index === activities.length - 1}
          isExpanded={expandedId === activity.id}
          onToggle={() => handleToggle(activity.id)}
        />
      ))}
    </div>
  );
}

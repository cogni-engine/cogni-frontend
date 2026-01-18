'use client';

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
  if (loading) {
    return (
      <div className='flex items-center justify-center py-12'>
        <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-white' />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-white/60 text-center'>No activity yet</p>
      </div>
    );
  }

  return (
    <div className='px-4 py-6'>
      {activities.map((activity, index) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          isLast={index === activities.length - 1}
        />
      ))}
    </div>
  );
}

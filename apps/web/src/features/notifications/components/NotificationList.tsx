'use client';

import type { Notification } from '@/features/notifications/domain/notification';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  formatDate: (date: string) => string;
  onNotificationClick?: (notificationId: number) => void;
}

export default function NotificationList({
  notifications,
  formatDate,
  onNotificationClick,
}: NotificationListProps) {
  return (
    <div className='flex flex-col gap-[14px]'>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          formatDate={formatDate}
          onNotificationClick={onNotificationClick}
        />
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import type { Notification } from '@/features/notifications/domain/notification';

interface NotificationItemProps {
  notification: Notification;
  formatDate: (date: string) => string;
  onNotificationClick?: (notificationId: number) => void;
}

export default function NotificationItem({
  notification,
  formatDate,
  onNotificationClick,
}: NotificationItemProps) {
  const isScheduled = notification.status === 'scheduled';
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (onNotificationClick) {
      setIsClicked(true);
      // エフェクト後にクリック処理を実行
      setTimeout(() => {
        onNotificationClick(notification.id);
        setIsClicked(false);
      }, 150);
    }
  };

  return (
    <div
      className={`p-3 rounded-lg bg-surface-primary hover:bg-interactive-hover transition-all duration-150 border border-border-subtle cursor-pointer ${
        isClicked
          ? 'bg-interactive-active scale-95 shadow-lg shadow-interactive-active'
          : 'hover:scale-[1.02]'
      }`}
      onClick={handleClick}
    >
      <div className='flex items-start justify-between gap-2'>
        <h4 className='text-sm text-text-primary font-medium flex-1 line-clamp-2'>
          {notification.title}
        </h4>
        {isScheduled && (
          <span className='text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30 whitespace-nowrap'>
            NEW
          </span>
        )}
      </div>
      <div className='text-[11px] text-text-muted mt-1'>
        {formatDate(notification.due_date)}
      </div>
    </div>
  );
}

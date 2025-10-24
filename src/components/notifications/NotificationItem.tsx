'use client';

import type { Notification } from '@/types/notification';

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

  const handleClick = () => {
    if (onNotificationClick) {
      onNotificationClick(notification.id);
    }
  };

  return (
    <div
      className='p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer'
      onClick={handleClick}
    >
      <div className='flex items-start justify-between gap-2'>
        <h4 className='text-sm text-white/90 font-medium flex-1 line-clamp-2'>
          {notification.title}
        </h4>
        {isScheduled && (
          <span className='text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 whitespace-nowrap'>
            NEW
          </span>
        )}
      </div>
      <div className='text-[11px] text-white/40 mt-1'>
        {formatDate(notification.due_date)}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
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
      className={`p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-150 border border-white/5 cursor-pointer ${
        isClicked
          ? 'bg-white/20 scale-95 shadow-lg shadow-white/20'
          : 'hover:scale-[1.02]'
      }`}
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

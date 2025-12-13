'use client';

import { useRef, useState, useEffect } from 'react';

interface TimeValue {
  hours: number;
  minutes: number;
}

interface TimeWheelPickerProps {
  value: TimeValue;
  onChange: (value: TimeValue) => void;
}

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

/**
 * iOS-style time wheel picker component
 */
export function TimeWheelPicker({ value, onChange }: TimeWheelPickerProps) {
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const [isDraggingHours, setIsDraggingHours] = useState(false);
  const [isDraggingMinutes, setIsDraggingMinutes] = useState(false);

  const hours = Array.from({ length: 24 * 15 }, (_, i) => i % 24);
  const minutes = Array.from({ length: 60 * 15 }, (_, i) => i % 60);

  const centerOffset = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;

  useEffect(() => {
    if (hoursRef.current && !isDraggingHours) {
      hoursRef.current.scrollTop = (value.hours + 24 * 7) * ITEM_HEIGHT;
    }
  }, [value.hours, isDraggingHours]);

  useEffect(() => {
    if (minutesRef.current && !isDraggingMinutes) {
      minutesRef.current.scrollTop = (value.minutes + 60 * 7) * ITEM_HEIGHT;
    }
  }, [value.minutes, isDraggingMinutes]);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    type: 'hours' | 'minutes'
  ) => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const mod = type === 'hours' ? 24 : 60;
    const newValue = index % mod;

    if (type === 'hours' && newValue !== value.hours) {
      onChange({ ...value, hours: newValue });
    } else if (type === 'minutes' && newValue !== value.minutes) {
      onChange({ ...value, minutes: newValue });
    }
  };

  const handleScrollEnd = (
    ref: React.RefObject<HTMLDivElement | null>,
    type: 'hours' | 'minutes'
  ) => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);

    ref.current.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: 'smooth',
    });

    if (type === 'hours') {
      setIsDraggingHours(false);
    } else {
      setIsDraggingMinutes(false);
    }
  };

  return (
    <div className='relative flex items-center justify-center gap-1 h-[220px]'>
      {/* Selection highlight */}
      <div className='absolute left-4 right-4 h-[44px] bg-white/10 rounded-lg pointer-events-none z-0' />

      {/* Hours */}
      <div
        ref={hoursRef}
        className='relative h-full w-[100px] overflow-y-auto scrollbar-hide snap-y snap-mandatory z-10 [&::-webkit-scrollbar]:hidden'
        style={{
          paddingTop: centerOffset,
          paddingBottom: centerOffset,
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onScroll={() => handleScroll(hoursRef, 'hours')}
        onScrollCapture={() => setIsDraggingHours(true)}
        onTouchEnd={() => handleScrollEnd(hoursRef, 'hours')}
        onMouseUp={() => handleScrollEnd(hoursRef, 'hours')}
      >
        {hours.map((h, idx) => (
          <div
            key={idx}
            className={`h-[44px] flex items-center justify-center text-[22px] font-light snap-center transition-all duration-150 ${
              h === value.hours ? 'text-white' : 'text-white/30'
            }`}
          >
            {h.toString().padStart(2, '0')}
          </div>
        ))}
      </div>

      {/* Separator */}
      <div className='text-white text-[22px] font-light z-10'>:</div>

      {/* Minutes */}
      <div
        ref={minutesRef}
        className='relative h-full w-[100px] overflow-y-auto scrollbar-hide snap-y snap-mandatory z-10 [&::-webkit-scrollbar]:hidden'
        style={{
          paddingTop: centerOffset,
          paddingBottom: centerOffset,
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onScroll={() => handleScroll(minutesRef, 'minutes')}
        onScrollCapture={() => setIsDraggingMinutes(true)}
        onTouchEnd={() => handleScrollEnd(minutesRef, 'minutes')}
        onMouseUp={() => handleScrollEnd(minutesRef, 'minutes')}
      >
        {minutes.map((m, idx) => (
          <div
            key={idx}
            className={`h-[44px] flex items-center justify-center text-[22px] font-light snap-center transition-all duration-150 ${
              m === value.minutes ? 'text-white' : 'text-white/30'
            }`}
          >
            {m.toString().padStart(2, '0')}
          </div>
        ))}
      </div>
    </div>
  );
}

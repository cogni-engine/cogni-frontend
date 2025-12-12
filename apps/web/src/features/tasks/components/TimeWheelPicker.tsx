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

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const centerOffset = Math.floor(VISIBLE_ITEMS / 2) * ITEM_HEIGHT;

  useEffect(() => {
    if (hoursRef.current && !isDraggingHours) {
      hoursRef.current.scrollTop = value.hours * ITEM_HEIGHT;
    }
  }, [value.hours, isDraggingHours]);

  useEffect(() => {
    if (minutesRef.current && !isDraggingMinutes) {
      minutesRef.current.scrollTop = value.minutes * ITEM_HEIGHT;
    }
  }, [value.minutes, isDraggingMinutes]);

  const handleScroll = (
    ref: React.RefObject<HTMLDivElement | null>,
    type: 'hours' | 'minutes'
  ) => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const maxIndex = type === 'hours' ? 23 : 59;
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));

    if (type === 'hours' && clampedIndex !== value.hours) {
      onChange({ ...value, hours: clampedIndex });
    } else if (type === 'minutes' && clampedIndex !== value.minutes) {
      onChange({ ...value, minutes: clampedIndex });
    }
  };

  const handleScrollEnd = (
    ref: React.RefObject<HTMLDivElement | null>,
    type: 'hours' | 'minutes'
  ) => {
    if (!ref.current) return;
    const scrollTop = ref.current.scrollTop;
    const index = Math.round(scrollTop / ITEM_HEIGHT);
    const maxIndex = type === 'hours' ? 23 : 59;
    const clampedIndex = Math.max(0, Math.min(index, maxIndex));

    ref.current.scrollTo({
      top: clampedIndex * ITEM_HEIGHT,
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
        className='relative h-full w-[100px] overflow-y-auto scrollbar-hide snap-y snap-mandatory z-10'
        style={{
          paddingTop: centerOffset,
          paddingBottom: centerOffset,
          scrollSnapType: 'y mandatory',
        }}
        onScroll={() => handleScroll(hoursRef, 'hours')}
        onScrollCapture={() => setIsDraggingHours(true)}
        onTouchEnd={() => handleScrollEnd(hoursRef, 'hours')}
        onMouseUp={() => handleScrollEnd(hoursRef, 'hours')}
      >
        {hours.map(h => (
          <div
            key={h}
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
        className='relative h-full w-[100px] overflow-y-auto scrollbar-hide snap-y snap-mandatory z-10'
        style={{
          paddingTop: centerOffset,
          paddingBottom: centerOffset,
          scrollSnapType: 'y mandatory',
        }}
        onScroll={() => handleScroll(minutesRef, 'minutes')}
        onScrollCapture={() => setIsDraggingMinutes(true)}
        onTouchEnd={() => handleScrollEnd(minutesRef, 'minutes')}
        onMouseUp={() => handleScrollEnd(minutesRef, 'minutes')}
      >
        {minutes.map(m => (
          <div
            key={m}
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


import { useEffect, useRef } from 'react';
import type { Message } from '@cogni/types';

export interface UseMessageAutoScrollOptions {
  messages: Message[];
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  streamingContainerRef?: React.RefObject<HTMLDivElement | null>;
  isInitialMount: boolean;
  delay?: number;
  headerHeight?: number;
}

// Default header height in pixels (pt-20 = 5rem = 80px)
const DEFAULT_HEADER_HEIGHT = 60;

/**
 * Hook to automatically scroll to the bottom when new messages arrive
 * Handles both normal scrolling and scrolling to streaming message container
 */
export function useMessageAutoScroll({
  messages,
  scrollContainerRef,
  streamingContainerRef,
  isInitialMount,
  delay = 100,
  headerHeight = DEFAULT_HEADER_HEIGHT,
}: UseMessageAutoScrollOptions) {
  const prevMessageCountRef = useRef(0);

  useEffect(() => {
    const currentCount = messages.length;

    if (
      currentCount > prevMessageCountRef.current &&
      currentCount > 0 &&
      scrollContainerRef.current
    ) {
      setTimeout(() => {
        if (!scrollContainerRef.current) return;

        if (
          streamingContainerRef?.current &&
          streamingContainerRef.current.children.length > 0
        ) {
          // If streaming container exists and has messages, scroll to align its top with viewport top
          // Account for the header height by subtracting it from the offset
          const offsetTop = streamingContainerRef.current.offsetTop;
          scrollContainerRef.current.scrollTo({
            top: offsetTop - headerHeight,
            behavior: 'smooth',
          });
        } else {
          console.log('isInitialMount', isInitialMount);
          // No streaming messages, scroll to bottom normally
          const container = scrollContainerRef.current;
          const targetScroll =
            container.scrollHeight - container.clientHeight + 400; // 400 for the footer etc
          container.scrollTo({
            top: targetScroll,
            behavior: isInitialMount ? 'auto' : 'smooth',
          });
        }
      }, delay);
    }

    prevMessageCountRef.current = currentCount;
  }, [
    messages,
    scrollContainerRef,
    streamingContainerRef,
    delay,
    headerHeight,
    isInitialMount,
  ]);
}

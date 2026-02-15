import { useEffect, useRef, useCallback } from 'react';

export interface UseMessageAutoScrollOptions {
  messages: { length: number }; // Only need length for scroll logic
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  isInitialMount: boolean;
}

/**
 * Hook that implements standard AI chat auto-scrolling behavior:
 * 1. Auto-scrolls to bottom when new messages arrive
 * 2. Stays pinned to bottom during streaming (content updates)
 * 3. Disengages auto-scroll when user scrolls up
 * 4. Re-engages when user scrolls back near the bottom
 */
export function useMessageAutoScroll({
  messages,
  scrollContainerRef,
  isInitialMount,
}: UseMessageAutoScrollOptions) {
  const isUserNearBottomRef = useRef(true);
  const prevMessageCountRef = useRef(0);
  const isAutoScrollingRef = useRef(false);

  const NEAR_BOTTOM_THRESHOLD = 150; // px from bottom to consider "near bottom"

  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = 'smooth') => {
      const container = scrollContainerRef.current;
      if (!container) return;

      isAutoScrollingRef.current = true;
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });

      // Reset the flag after scroll completes
      // Use a timeout since smooth scrolling is animated
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, behavior === 'smooth' ? 300 : 50);
    },
    [scrollContainerRef]
  );

  // Track user scroll position to determine if they're near the bottom
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Don't update user intent while we're programmatically scrolling
      if (isAutoScrollingRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      isUserNearBottomRef.current = distanceFromBottom <= NEAR_BOTTOM_THRESHOLD;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, NEAR_BOTTOM_THRESHOLD]);

  // Scroll on new messages (message count changes)
  useEffect(() => {
    const currentCount = messages.length;

    if (currentCount > prevMessageCountRef.current && currentCount > 0) {
      // Always scroll on new message (user just sent or AI started responding)
      isUserNearBottomRef.current = true;
      scrollToBottom(isInitialMount ? 'auto' : 'smooth');
    }

    prevMessageCountRef.current = currentCount;
  }, [messages.length, scrollToBottom, isInitialMount]);

  // Stay pinned to bottom during streaming (content updates, same message count)
  // This uses a MutationObserver to detect DOM changes in the scroll container
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => {
      if (isUserNearBottomRef.current) {
        // Use auto (instant) during streaming for smooth following
        const el = container;
        el.scrollTop = el.scrollHeight - el.clientHeight;
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [scrollContainerRef]);
}

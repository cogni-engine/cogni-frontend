/**
 * Scroll utilities for column-reverse layouts (like chat interfaces)
 *
 * Note: With flex-direction: column-reverse, scroll behavior is inverted:
 * - scrollTop = 0 means we're at the bottom (newest messages)
 * - Negative scrollTop means we're scrolled up toward older messages
 */

interface ScrollMetrics {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * Check if user is near the bottom of a column-reverse container.
 * With column-reverse, bottom is at scrollTop = 0 or small positive values.
 * Negative values mean we're scrolled away from bottom (toward top).
 *
 * @param scrollTop - Current scroll position
 * @param threshold - Distance from bottom to consider "near" (default: 1000)
 * @returns true if within threshold of bottom
 */
export function isNearBottom(scrollTop: number, threshold = 1000): boolean {
  const scrollTopAbs = Math.abs(scrollTop);
  return scrollTopAbs <= threshold;
}

/**
 * Check if user is near the top of a column-reverse container.
 * With column-reverse, negative scrollTop means we're scrolled to the top (oldest messages).
 *
 * @param metrics - Object containing scrollTop, scrollHeight, and clientHeight
 * @param threshold - Distance from top to consider "near" (default: 800)
 * @returns true if within threshold of top
 */
export function isNearTop(
  { scrollTop, scrollHeight, clientHeight }: ScrollMetrics,
  threshold = 800
): boolean {
  // With flex-col-reverse, negative scrollTop means we're scrolled to the top (oldest messages)
  // This is a browser quirk with flex-col-reverse
  if (scrollTop < 0) {
    // If scrollTop is negative, we're scrolled up toward older messages
    // The more negative, the more we've scrolled up
    // Trigger if we're scrolled up significantly (absolute value > 200px threshold)
    return Math.abs(scrollTop) > 200;
  }

  // Calculate max scroll position
  const maxScrollTop = scrollHeight - clientHeight;

  // Handle edge case where content is smaller than container
  if (maxScrollTop <= 0) return false;

  // For positive scrollTop, check if we're within threshold of the max scroll
  const distanceFromTop = maxScrollTop - scrollTop;
  return distanceFromTop < threshold;
}

/**
 * Get scroll metrics from a container element
 */
export function getScrollMetrics(
  container: HTMLElement | null
): ScrollMetrics | null {
  if (!container) return null;
  return {
    scrollTop: container.scrollTop,
    scrollHeight: container.scrollHeight,
    clientHeight: container.clientHeight,
  };
}

// Custom events for header actions
export const HEADER_EVENTS = {
  CREATE_THREAD: 'header:createThread',
  TOGGLE_THREAD_SIDEBAR: 'header:toggleThreadSidebar',
  TOGGLE_NOTIFICATION_PANEL: 'header:toggleNotificationPanel',
  REFRESH_NOTIFICATION_COUNT: 'header:refreshNotificationCount',
} as const;

export type HeaderEventType =
  (typeof HEADER_EVENTS)[keyof typeof HEADER_EVENTS];

// Dispatch a header event
export function dispatchHeaderEvent(eventType: HeaderEventType) {
  const event = new CustomEvent(eventType);
  window.dispatchEvent(event);
}

// Listen to header events
export function onHeaderEvent(
  eventType: HeaderEventType,
  callback: () => void
) {
  const handler = () => callback();
  window.addEventListener(eventType, handler);
  return () => window.removeEventListener(eventType, handler);
}

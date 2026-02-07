/**
 * Service Worker registration utility
 *
 * Registers the Service Worker for offline support
 */

export const registerServiceWorker = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if ('serviceWorker' in navigator) {
    const doRegister = () => {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '/',
        })
        .then(registration => {
          console.log(
            '[Service Worker] Registered successfully with scope:',
            registration.scope
          );

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (
                  newWorker.state === 'installed' &&
                  navigator.serviceWorker.controller
                ) {
                  // New service worker available
                  console.log('[Service Worker] New version available');
                }
              });
            }
          });
        })
        .catch(error => {
          console.error('[Service Worker] Registration failed:', error);
        });
    };

    // ページの load が既に終わっている場合は即時登録、
    // まだの場合は load イベントで登録する
    if (document.readyState === 'complete') {
      doRegister();
    } else {
      window.addEventListener('load', doRegister);
    }
  } else {
    console.warn('[Service Worker] Not supported in this browser');
  }
};

export const unregisterServiceWorker = async () => {
  if (typeof window === 'undefined') {
    return;
  }

  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const unregistered = await registration.unregister();
    if (unregistered) {
      console.log('[Service Worker] Unregistered successfully');
    }
  }
};

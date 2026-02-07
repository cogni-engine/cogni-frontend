/**
 * Service Worker for offline support
 *
 * Uses a static offline.html so dev and prod behave the same when offline.
 */

const CACHE_NAME = 'cogni-v4';
const OFFLINE_PAGE = '/offline.html';

// Install event - cache static offline page (no dependency on Next server)
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching offline page');
      return cache.addAll([OFFLINE_PAGE]);
    })
  );

  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  
  // Take control of all pages immediately
  return self.clients.claim();
});

// Minimal fallback HTML if offline.html was never cached (e.g. install during offline)
const FALLBACK_HTML = '<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>オフライン</title></head><body style="margin:0;min-height:100vh;background:#0f172a;color:#fff;font-family:system-ui;display:flex;align-items:center;justify-content:center"><p>オフラインです。接続を確認してから再読み込みしてください。</p></body></html>';

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => response)
        .catch(() => {
          return caches.match(OFFLINE_PAGE).then((cached) => {
            if (cached) return cached;
            return new Response(FALLBACK_HTML, {
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            });
          });
        })
    );
  }
});

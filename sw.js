const CACHE_NAME = 'fatkhl-portfolio-v4';
const ASSETS = [
  '/',
  '/index.html',
  '/static/css/style.css',
  '/static/js/main.js',
  '/static/img/og-image.png',
  '/manifest.json',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Cache-first for static assets
  if (e.request.url.includes('/static/')) {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
    return;
  }

  // Network-first for pages
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});

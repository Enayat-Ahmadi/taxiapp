const CACHE_NAME = 'eidsvoll-taxi-v2';
const STATIC_CACHE = 'eidsvoll-taxi-static-v2';
const IMAGE_CACHE = 'eidsvoll-taxi-images-v2';
const API_CACHE = 'eidsvoll-taxi-api-v2';

const urlsToCache = [
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// Install event – pre-cache shell routes
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch(() => null);
    }),
  );
  self.skipWaiting();
});

// Activate event – clean up old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, IMAGE_CACHE, API_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => caches.delete(name)),
        ),
      ),
  );
  self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Skip chrome-extension and non-http(s) requests
  if (!url.protocol.startsWith("http")) return;

  // Next.js static assets (_next/static) – Cache First
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.open(STATIC_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      }),
    );
    return;
  }

  // Images – Cache First (24h expiry handled on next load)
  if (/\.(png|gif|jpg|jpeg|svg|webp|ico)$/i.test(url.pathname)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then(async (cache) => {
        const cached = await cache.match(event.request);
        if (cached) return cached;
        const response = await fetch(event.request);
        if (response.ok) cache.put(event.request, response.clone());
        return response;
      }),
    );
    return;
  }

  // API routes and external APIs – Network First, fallback to cache
  if (
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("openrouteservice.org")
  ) {
    event.respondWith(
      fetch(event.request)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(API_CACHE);
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  // HTML pages – Network Only (Server Action IDs are embedded in HTML and
  // change on every build; caching HTML causes "action not found" errors)
  event.respondWith(fetch(event.request));
});

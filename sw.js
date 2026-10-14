// Retire the old shell cache: race recommendations require an online response.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) =>
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((name) => name.startsWith('keiba-lens-shell-'))
          .map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  ),
);

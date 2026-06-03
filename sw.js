const CACHE = 'kissmoka-v1';
const PRECACHE = [
    '/KissMoKa/',
    '/KissMoKa/index.html',
    '/KissMoKa/style.css',
    '/KissMoKa/script.js',
    '/KissMoKa/product/index.html',
    '/KissMoKa/faq/index.html',
    '/KissMoKa/content/index.html',
    '/KissMoKa/why-us/index.html',
    '/KissMoKa/info/index.html',
    '/KissMoKa/quiz/index.html',
    '/KissMoKa/blog/index.html',
    '/KissMoKa/ingredients/index.html',
    '/KissMoKa/contact/index.html',
    '/KissMoKa/loyalty/index.html',
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.method !== 'GET') return;
    e.respondWith(
        caches.match(e.request).then(cached => {
            if (cached) return cached;
            return fetch(e.request).then(response => {
                if (response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE).then(cache => cache.put(e.request, clone));
                }
                return response;
            }).catch(() => caches.match('/KissMoKa/index.html'));
        })
    );
});

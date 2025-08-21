const CACHE_NAME = 'ahmed-noor-v1';
const CORE_ASSETS = [
	'/',
	'/index.html',
	'/assets/css/style.css',
	'/assets/js/main.js',
	'/assets/icons/favicon.svg',
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
	);
	self.skipWaiting();
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
	);
	self.clients.claim();
});

self.addEventListener('fetch', event => {
	const { request } = event;
	if (request.method !== 'GET') return;
	event.respondWith(
		caches.match(request).then(cached => cached || fetch(request).then(resp => {
			const copy = resp.clone();
			if (resp.ok) caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
			return resp;
		}).catch(() => cached))
	);
});


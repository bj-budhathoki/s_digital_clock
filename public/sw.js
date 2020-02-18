// SW Version
const cacheName = 'static_d_1.1';
// Static Cache 
const appAssets = [
    'index.html',
    'favicon.png',
    'global.css',
    './build/bundle.css',
    './build/bundle.js',
    './img/bg-day.jpg',
    './img/bg-night.jpg',
]
// install SW
self.addEventListener('install', e => {
    e.waitUntil(caches.open(cacheName).then(cache => {
        cache.addAll(appAssets)
    }).then(() => self.skipWaiting())
    )
})

// activate event
self.addEventListener('activate', evt => {
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

//fething
self.addEventListener('fetch', e => {
    if (!(e.request.url.indexOf('http') === 0)) {
        return;
    }
    e.respondWith(
        fetch(e.request).then((res) => {
            const resClone = res.clone()
            caches.open(cacheName).then(cache => {
                cache.put(e.request, resClone)
            })
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    )
})
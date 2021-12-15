const cacheName = "V1";

// Call activate event
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache != cacheName) {
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

//Call fetch event
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
        .then(res => {
            const clone = res.clone();

            caches.open(cacheName).then(cache => {
                cache.put(e.request, clone);
            });
            return res;
        })
        .catch(err => caches.match(e.request).then(res => res))
    );
});
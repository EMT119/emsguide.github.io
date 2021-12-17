const cacheName = "V2";
const cacheFiles = [
    "index.html",
    "main.css",
    "narrative.html",
    "./Metronome/metronome.css",
    "./Metronome/metronome.flac",
    "./Metronome/metronome.html",
    "./Metronome/metronome.js",
    "./PedTape/pedTape.html",
    "./PedTape/process.js",
    "./PedTape/style.css",
    "./PedTape/tapeColors.js",
];

// Call install event
self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(cacheName)
        .then(cache => cache.addAll(cacheFiles))
    );
});

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
        fetch(e.request).catch(() => {
            return caches.match(e.request);
        })
    )
});
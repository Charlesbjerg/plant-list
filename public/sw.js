let cacheName = "app-core-cache";
var urlsToCache = [
    '/css/normalize.css',
    '/css/main.css',
    '/js/fontawesome-all.min.js',
    '/images/spritesheet.png'
];

// Install service worker callback function
self.addEventListener('install', function (event) {
    // Perform install
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('Cache opened');
                return cache.addAll(urlsToCache);
            })
    );
});

// Request handler
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {

                // cache can be used - return response
                if (response) {
                    return response;
                }

                // Cache new requests

                // Clone request
                var fetchRequest = event.request.clone();
                return fetch(fetchRequest).then(
                    function (response) {
                        // ensure response is valid
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        // clone response
                        var responseToCache = response.clone();
                        caches.open(cacheName)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    }
                );
            })
    );
});
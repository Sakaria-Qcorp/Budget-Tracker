const FILES_TO_CACHE = [
    "/", 
    "/index.html", 
    "/index.js", 
    "/db.js", 
    "/styles.css", 
    "/icons/icon-144x144.png",
    "/icons/icon-192x192.png", 
    "/icons/icon-512x512.png"
  ];


  const CACHE_NAME = "static-cache-v1";
  const DATA_CACHE_NAME = "data-cache-v1";
   
  // install
  self.addEventListener("install", function (evt) {
      evt.waitUntil(
          caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/transaction"))
      );
  
      evt.waitUntil(
          caches.open(CACHE_NAME).then(cache => {
          console.log("Great!! files were pre-cached successfully!");
          return cache.addAll(FILES_TO_CACHE);
          })
      );
      
      self.skipWaiting();
  });

  self.addEventListener("activate", function (evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});
self.addEventListener("fetch", function (evt) {
    // cache successful requests to the API
    if (evt.request.url.includes("/api/")) {
        evt.respondWith( // Issue with object and response
        caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(evt.request)
            .then(response => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
                }

                return response;
            })
            .catch(err => {
                // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
            });
        }).catch(err => console.log(err))
        );

        return;
    }
    evt.respondWith(
        caches.match(evt.request).then(function (response) {
        return response || fetch(evt.request);
        })
    );
    
});

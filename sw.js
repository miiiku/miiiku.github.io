this.addEventListener("install", function(event) {
  console.dir(event)
  event.waitUntil(
    caches.open("v1").then(cache => {
      return cache.addAll([
        '/',

        '/shichagundong/index.html',
        '/shichagundong/style.css',
        '/shichagundong/images/1.jpg',
        '/shichagundong/images/2.jpg',
        '/shichagundong/images/3.jpg',
        '/shichagundong/images/4.jpg',
        '/shichagundong/images/5.jpg',
        '/shichagundong/images/6.jpg',

        '/wushiyin/index.html',
        '/wushiyin/style.css',
        '/wushiyin/images/bg.jpg',
      ])
    }).catch(error => {
      console.log(error)
    })
  )
})

this.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      });
    }
  }));
});
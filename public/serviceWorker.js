console.log("WORKWE WORK");

let cacheName = "v1";
this.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			cache.addAll([
            "/static/media/house.c646e57e5be00d358430.png",
				"/static/js/bundle.js",
				"/index.html",
            "/",
            "/beer"
			]);
		})
	);
});

this.addEventListener("fetch", (event) => {
   if(!navigator.onLine){
      event.respondWith(
         caches.match(event.request).then((response) => {
            if (response) {
               return response;
            }
            //return fetch(event.request);
            const fetchRequest = event.request.clone(); 
            fetch(fetchRequest);

         })
      );
   }
});


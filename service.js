//caches
const cachName ='v2';

self.addEventListener('install', e => {
	console.log('service worker: Installed');
});
self.addEventListener('activate', e =>
{
	console.log('service worker : activated');
	e.waitUntil(
		caches.keys().then(cacheNames => {

			return prominse.all(
			cacheNames.map(cache => {
				if(cache != cacheName) {
					return caches.delete(cache);
				}
			})
		)
		})
		);
});
 //call fetch event 
 self.addEventListener('fetch', e =>
 {
 	console.log('service worker: fetching');
 	e.respondWith(
 		fetch(e.request)
 		.then(res =>
 		{
 			const resClone = res.clone();
 			caches.open(cachName)
 			.then(cache => {
 				cache.put(e.request, resClone);
 			});
 			return res;
 		}).catch(err => caches.match(e.request).then(res => res))
 		
 	);
 });


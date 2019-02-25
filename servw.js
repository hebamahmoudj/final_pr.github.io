//caches
const cachName ='v1';
const cacheAssets =[
'/index.html',
'/restaurant.html',
'/js/dbhelper.js',
'/js/main.js',
'/js/restaurant_info.js',
'/data/restaurants.json'
'/css/style.css',
'/js/main.js',
'/img/1.jpg',
'/img/2.jpg',
'/img/3.jpg',
'/img/4.jpg',
'/img/5.jpg',
'/img/6.jpg',
'/img/7.jpg',
'/img/8.jpg',
'/img/9.jpg',
'/img/10.jpg',
'/',

];
self.addEventListener('install', e => {
	console.log('service worker: Installed');
	e.waitUntil(
		caches
		.open(cacheName)
		.then(cache => {
			console.log('service worker : caching files');
			cache.addAll(cacheAssets);
		})
.then(() => self.skipWaiting())


		);
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
 		fetch(e.request).
 		catch(() => caches.match(e.request))
 		)
 }	)


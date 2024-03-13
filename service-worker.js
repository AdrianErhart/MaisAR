const cacheName = 'maisARCache';
const cacheFiles = [
    '/',
    'images/puzzle/1_after.png',
    'images/puzzle/1.png',
    'images/puzzle/2_after.png',
    'images/puzzle/2.png',
    'images/puzzle/3_after.png',
    'images/puzzle/3.png',
    'images/puzzle/4_after.png',
    'images/puzzle/4.png',
    'images/puzzle/5_after.png',
    'images/puzzle/5.png',
    'images/puzzle/6_after.png',
    'images/puzzle/6.png',
    'images/puzzle/7_after.png',
    'images/puzzle/7.png',
    'images/puzzle/8_after.png',
    'images/puzzle/8.png',
    'images/puzzle/9_after.png',
    'images/puzzle/9.png',
    'images/accu.png',
    'images/alien.png',
    'images/armadillo.png',
    'images/basketball.png',
    'images/beanie.png',
    'images/bowlingball.png',
    'images/cap.png',
    'images/corn_field.png',
    'images/corn.png',
    'images/crystalball.png',
    'images/eel.png',
    'images/football.png',
    'images/fortune.png',
    'images/glasses.png',
    'images/goatee.png',
    'images/grass.png',
    'images/hat.png',
    'images/headlight.png',
    'images/hole.png',
    'images/hole4.png',
    'images/melon.png',
    'images/mole.png',
    'images/mole5.png',
    'images/moon.png',
    'images/moustache.png',
    'images/navigation.png',
    'images/necklace.png',
    'images/none.png',
    'images/overall.png',
    'images/owl.png',
    'images/rauch.png',
    'images/raven.png',
    'images/ravencrystal.png',
    'images/settings.png',
    'images/sheep.png',
    'images/shorts.png',
    'images/skiglasses.png',
    'images/skirt.png',
    'images/sloth.png',
    'images/star.png',
    'images/steeringwheel.png',
    'images/sun.png',
    'images/sunglasses.png',
    'images/turbine.png',
    'images/ufo_smoke.png',
    'images/ufo.png',
    'images/unknown_black.png',
    'images/unknown.png',
    'images/volleyball.png',
    'images/wheel.png',
    'js/app.js',
    'js/arframe.js',
    'js/config-game.js',
    'js/custom-screen.js',
    'js/memory-screen.js',
    'js/puzzle-screen.js',
    'js/quiz-screen.js',
    'js/sheep-screen.js',
    'js/start-screen.js',
    'js/tarot-screen.js',
    'js/whackamole-screen.js',
    'lib/aframe-ar.js',
    'lib/aframe.min.js',
    'lib/bootstrap.bundle.min.js',
    'lib/bootstrap.min.css',
    'lib/jquery-ui.css',
    'lib/jquery-ui.min.js',
    'lib/jquery.min.js',
    'lib/jquery.ui.touch-punch.min.js',
    'app.css',
    'arframe.html',
    'index.html',
    'manifest.json'
];

self.addEventListener('install', (event) => {
    // install service worker
    event.waitUntil(
        caches.open(cacheName)
        .then((cache) => {
            console.log('Opened cache');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [cacheName]; // Liste der Cache-Namen, die erhalten bleiben sollen
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Löscht alte Cache-Versionen
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Teilt mit, dass der Service Worker sofort nach der Installation die Kontrolle über die Seiten übernimmt
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
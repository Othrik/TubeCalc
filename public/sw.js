const CV = 'tubecalc-v1.7.2';
const CORE = ['/', '/index.html', '/mix/', '/dil/', '/protein/', '/mol/', '/mw/',
  '/ghs/GHS01.svg', '/ghs/GHS02.svg', '/ghs/GHS03.svg', '/ghs/GHS04.svg', '/ghs/GHS05.svg',
  '/ghs/GHS06.svg', '/ghs/GHS07.svg', '/ghs/GHS08.svg', '/ghs/GHS09.svg'];
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CV).then(function (c) { return c.addAll(CORE); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CV; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;
  const isHtml = e.request.headers.get('accept') && e.request.headers.get('accept').indexOf('text/html') >= 0;
  if (isHtml) {
    e.respondWith(fetch(e.request).then(function (r) {
      const cp = r.clone(); caches.open(CV).then(function (c) { c.put(e.request, cp); }); return r;
    }).catch(function () { return caches.match(e.request).then(function (m) { return m || caches.match('/'); }); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function (m) {
    const net = fetch(e.request).then(function (r) {
      if (r.ok) { const cp = r.clone(); caches.open(CV).then(function (c) { c.put(e.request, cp); }); }
      return r;
    }).catch(function () { return m; });
    return m || net;
  }));
});

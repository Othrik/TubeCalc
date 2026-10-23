/* TubeCalc Service Worker：预缓存核心页 + stale-while-revalidate 运行时缓存 → 全站可离线。
   发新版时递增 VER 即可；旧缓存随 activate 自动清理。 */
'use strict';
const VER = 'tubecalc-v1.2.25';
const CORE = [
  '/', '/tools/mix/', '/tools/dil/', '/tools/protein/', '/tools/mw/',
  '/zh/', '/zh/tools/mix/', '/zh/tools/dil/', '/zh/tools/protein/', '/zh/tools/mw/',
  '/es/', '/es/tools/mix/', '/es/tools/dil/', '/es/tools/protein/', '/es/tools/mw/',
  '/pt/', '/pt/tools/mix/', '/pt/tools/dil/', '/pt/tools/protein/', '/pt/tools/mw/',
  '/ru/', '/ru/tools/mix/', '/ru/tools/dil/', '/ru/tools/protein/', '/ru/tools/mw/',
  '/fr/', '/fr/tools/mix/', '/fr/tools/dil/', '/fr/tools/protein/', '/fr/tools/mw/',
  '/en/', '/en/tools/mix/', '/en/tools/dil/', '/en/tools/protein/', '/en/tools/mw/',
  '/mw.js?v=2', '/manifest.webmanifest?v=12',
  '/icons/icon-192.png?v=6', '/icons/icon-512.png?v=6', '/icons/maskable-512.png?v=6', '/icons/favicon-32.png?v=6'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VER).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(VER);
    const cached = await cache.match(req);
    const net = fetch(req).then(res => {
      if (res && res.status === 200 && res.type === 'basic') cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    if (cached) { net.catch(() => {}); return cached; }          // SWR：先回缓存，后台更新
    const res = await net;                                        // 未命中：等网络
    if (res) return res;
    if (req.mode === 'navigate') {                                // 离线兜底 → 首页
      return (await cache.match('/')) || Response.error();
    }
    return Response.error();
  })());
});

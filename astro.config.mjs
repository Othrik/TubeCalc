import { defineConfig } from 'astro/config';

// directory 格式：/tools/mix/ 干净 URL；prefetch：站内链接悬停预取（纯构建产物内实现）
export default defineConfig({
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  redirects: {
    '/en': '/',
    '/en/tools/mix': '/tools/mix/',
    '/en/tools/dil': '/tools/dil/',
    '/en/tools/protein': '/tools/protein/',
    '/en/tools/mw': '/tools/mol/',
    '/tools/mw': '/tools/mol/',
    '/zh/tools/mw': '/zh/tools/mol/',
    '/es/tools/mw': '/es/tools/mol/',
    '/pt/tools/mw': '/pt/tools/mol/',
    '/ru/tools/mw': '/ru/tools/mol/',
    '/fr/tools/mw': '/fr/tools/mol/',
  }
});

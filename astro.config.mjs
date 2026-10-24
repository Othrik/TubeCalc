import { defineConfig } from 'astro/config';

// directory 格式：/tools/mix/ 干净 URL；prefetch：站内链接悬停预取（纯构建产物内实现）
// 默认语言=中文（根路径）；/zh/ 为中文别名副本（build 后由 post_build_zh_alias.js 生成）；
// en 挂 /en/；es/pt/ru/fr 挂各自前缀
export default defineConfig({
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  redirects: {
    // 旧名 mw → mol（各语言；/zh/tools/mw 为英文时代遗留 URL）
    '/zh/tools/mw': '/tools/mol/',
    '/en/tools/mw': '/en/tools/mol/',
    '/es/tools/mw': '/es/tools/mol/',
    '/pt/tools/mw': '/pt/tools/mol/',
    '/ru/tools/mw': '/ru/tools/mol/',
    '/fr/tools/mw': '/fr/tools/mol/',
    '/tools/mw': '/tools/mol/',
  }
});

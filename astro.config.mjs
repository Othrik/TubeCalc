import { defineConfig } from 'astro/config';

// directory 格式：/tools/mix/ 干净 URL；prefetch：站内链接悬停预取（纯构建产物内实现）
export default defineConfig({
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' }
});

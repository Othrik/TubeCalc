import { defineConfig } from 'astro/config';

// 输出格式 file：保持 /tools/mix.html 这样的 .html 文件名（与旧站 URL 完全一致）
export default defineConfig({
  build: { format: 'file' }
});

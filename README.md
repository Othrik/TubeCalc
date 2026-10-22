# TubeCalc

在线科研小工具集（配方计算、蛋白质序列分析、分子量、序列处理、统计、稀释、单位换算）。纯前端运行，所有计算在浏览器本地完成，无后端、无追踪。

基于 [Astro](https://astro.build) 构建纯静态站点。

## 结构

- `src/layouts/Layout.astro` — 全站统一骨架（head / 导航 / 页脚），NAV 数组即导航唯一事实来源
- `src/pages/index.astro` — 首页
- `src/pages/tools/*.astro` — 各工具页（骨架全部来自 Layout，页面只保留自身内容与脚本）
- `public/assets/style.css` — 全站样式

## 开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 产物输出 dist/，文件名保持 .html
```

## 加一个新工具

1. `src/pages/tools/xxx.astro`：复制任一工具页改内容，Layout 传 `title / active / note / root="../"`
2. `src/layouts/Layout.astro` 的 NAV 数组加一行
3. `npm run build`，把 `dist/` 部署到任意静态托管

## License

[MIT](LICENSE)

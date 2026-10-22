<div align="center">
  <img src="public/icons/icon-512.png" width="88" alt="TubeCalc app icon — 3D test tube on brand blue">
</div>

# TubeCalc

[English](#english) · [中文](#中文)

<a id="english"></a>
## English

A collection of free online science tools for the lab bench: **solution preparation calculator** (stock/final concentration → volumes, solvent make-up, weighing support, plus a built-in simplified dilution solver C₁V₁=C₂V₂), **protein sequence analysis**, **molecular weight** and **unit conversion**.

Pure front-end — every computation runs locally in your browser. No backend, no tracking.

Built with [Astro](https://astro.build) as a fully static site.

### Structure

- `src/layouts/Layout.astro` — site-wide skeleton (head / nav / footer); the `NAV` array is the single source of truth for navigation
- `src/pages/index.astro` — homepage
- `src/pages/tools/*.astro` — tool pages (skeleton comes from Layout; each page keeps only its own content and script)
- `src/styles/style.css` — site-wide stylesheet (hashed into `/_astro/` at build time, long-lived browser caching)

### Development

```bash
npm install
npm run dev      # local dev server
npm run build    # outputs dist/ with clean directory URLs like /tools/mix/
```

### Adding a new tool

1. Create `src/pages/tools/xxx.astro` (copy any tool page and edit; pass `title / active / note` to Layout)
2. Add one line to the `NAV` array in `src/layouts/Layout.astro`
3. `npm run build`, then host `dist/` on any static hosting

### Version

The version lives in `package.json` and is shown in the site footer. Notable changes are tagged (current: `v1.0.0`).

<a id="中文"></a>
## 中文

面向实验台的免费在线科研小工具集：**溶液配制计算器**（储液/终浓度自动算加样量，支持多溶剂与称量，内置简化稀释 C₁V₁=C₂V₂）、**蛋白质序列分析**、**分子量** 与 **单位换算**。

纯前端运行——所有计算都在浏览器本地完成，无后端、无追踪。

基于 [Astro](https://astro.build) 构建纯静态站点。

### 结构

- `src/layouts/Layout.astro` — 全站统一骨架（head / 导航 / 页脚），NAV 数组即导航唯一事实来源
- `src/pages/index.astro` — 首页
- `src/pages/tools/*.astro` — 各工具页（骨架全部来自 Layout，页面只保留自身内容与脚本）
- `src/styles/style.css` — 全站样式（构建时哈希指纹输出到 `/_astro/`，浏览器长缓存）

### 开发

```bash
npm install
npm run dev      # 本地开发
npm run build    # 产物输出 dist/，URL 为 /tools/mix/ 目录式干净路径
```

### 加一个新工具

1. 新建 `src/pages/tools/xxx.astro`（复制任一工具页改内容，Layout 传 `title / active / note`）
2. 在 `src/layouts/Layout.astro` 的 NAV 数组加一行
3. `npm run build`，把 `dist/` 部署到任意静态托管

### 版本

版本号定义在 `package.json`，页脚展示；重要变更会打 git tag（当前 `v1.0.0`）。

## Credits

The app icon is based on [Microsoft Fluent Emoji](https://github.com/microsoft/fluentui-emoji) ("Test tube · 3D"), © Microsoft Corporation, licensed under the [MIT License](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE).

应用图标基于微软 [Fluent Emoji](https://github.com/microsoft/fluentui-emoji) 的"Test tube · 3D"素材制作，版权归 © Microsoft Corporation 所有，依其 MIT 许可证使用。

## License

[MIT](LICENSE)

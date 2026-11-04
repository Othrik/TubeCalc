# Development log / 开发日志

## v1.8.28 — 2026-11-05 (Asia/Shanghai)

### Changes
- COCONUT search now relies solely on the server-side full database API (738,794 records / 44 fields): removed the front-end local shard fallback (public/data/np_meta.json + np_shards, ~34 MB).
- Unified `npFirst()` across all six languages (zh/en/es/fr/pt/ru) on the server API; es/fr/pt/ru previously used the shard-only implementation and are now upgraded to the full API.
- Server slimming: deleted abandoned ChEMBL localization residue on the main server (/opt/chembl_part_*.bin and related probes/logs, ~17 GB); disk usage dropped from 67% to 24%.

### Validation
- Astro production build passed; `/zh/` alias regenerated.
- API verified locally and publicly (`/coconut/search?q=caffeine` → CNP0228556.0 with 14 fields).
- Built output confirmed free of np_meta.json / np_shards; site `data/` directory removed from server.

## v1.8.27 — 2026-11-02 (Asia/Shanghai)

### Changes
- Reworked mixing calculator layouts for portrait tablets (up to 1100px) and phones (up to 600px): component cards, readable input widths, larger touch targets, compact solvent rows, and delete buttons beside component names.
- Kept unit and solvent menus inside the visible viewport, including viewport resize and scrolling. Capture-phase click handling ensures native-select replacement controls that stop propagation also receive positioning correction.
- Replaced the example with 1 L of 10× Tris–glycine–SDS running buffer: 250 mM Tris base, 1920 mM glycine, 1% w/v SDS; water to final volume. Expected masses: 30.285 g, 144.134 g, and 10.000 g.
- Simplified the example button label and synchronized Chinese, English, Spanish, French, Russian, and Portuguese pages.
- Reworked shared navigation into two rows on narrow screens: brand and language selector above horizontally scrollable tool links; enlarged touch targets, added aria-current, and centered the active tool in the scroll area.

### Validation
- Astro production build passed.
- Browser checks at 375, 390, 768, 820, and 1024 CSS pixels: no document horizontal overflow; unit menu remained visible.
- Five translated pages: example masses matched; solvent menu stayed within the viewport at 744px.
- Shared navigation at 390px and 820px: links stayed inside the navigation and brand/language controls did not overlap.
- Public pages and shared stylesheet checked after deployment.
- No physical iPad/iPhone or standalone iOS device test performed; browser viewport checks do not replace device testing.

### 配方依据
- https://www.cellsignal.com/products/buffers-dyes/tris-glycine-sds-running-buffer-10x/4050
- 采用其 1× 配方（25 mM Tris、192 mM glycine、0.1% SDS）的十倍浓度。

### 后续验证
- 在实体 iPad/iPhone（含添加到主屏幕模式）检查状态栏安全区、缩放及键盘弹出后的导航与菜单位置。
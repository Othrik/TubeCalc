# Development log / 开发日志

## v1.8.33 — 2026-11-07 (Asia/Shanghai)

### Changes
- Fixed formulas rendering visibly larger than the surrounding prose. KaTeX ships `font-size: 1.21em` on `.katex`, so with 16px body copy every formula was laid out at 19.36px; after the font swap to Google Sans Flex (larger x-height than KaTeX_Main) the overshoot became obvious — measured cap height was 17% taller than body text. Added an explicit `body .katex { font-size: 1.04em }`, which brings the formula to 16.64px and makes cap heights equal (ratio 1.000 by canvas measurement), so inline math now sits flush inside a sentence instead of jumping out of it.
- Service worker cache version bumped `tubecalc-v1.8.32` → `tubecalc-v1.8.33` and registration `sw.js?v=48` → `sw.js?v=49`.

### Validation
- Canvas metric check on `/en/tools/mix/`: body 16px cap 12.00px vs formula cap 12.00px (was 14.00px before the fix).
- Zoomed visual check of the English mixing and Chinese mixing/dilution/protein pages: `V = C_final × V_total ÷ C_stock`, `C₁V₁ = C₂V₂` and `ε280` now match neighbouring text in cap height, weight and baseline; subscripts stay legible at ~11.6px and no line-height jump appears in the paragraph.

## v1.8.32 — 2026-11-07 (Asia/Shanghai)

### Changes
- KaTeX formulas are now fully upright: variable letters no longer fall back to KaTeX's italic math face, and the synthesised oblique that was applied to `.mathnormal` / `.mathit` / `.boldsymbol` is removed. Every glyph in a formula — including the `V = C_final × V_total ÷ C_stock` form used on the dilution and mixing pages — now uses the same upright `Google Sans Flex` + `Noto Sans SC` face as the surrounding prose, so formulas no longer look "pasted in" from another type system. `\\mathit` is intentionally upright too, since the site never uses it and the user asked for no italics anywhere.
- Service worker cache version bumped `tubecalc-v1.8.31` → `tubecalc-v1.8.32` and registration `sw.js?v=47` → `sw.js?v=48`, so returning visitors pick up the new formula styling on their first load rather than after a refresh cycle.

### Validation
- Computed style check on `/tools/mix/`: `.katex .mathnormal` resolves to `font-style: normal`, family `"Google Sans Flex", "Noto Sans SC", KaTeX_Main, serif`; no inline element inside a formula reports `font-style: italic`.
- Visual check of `V = C_final × V_total ÷ C_stock` (mix), `C₁V₁ = C₂V₂` (dil) and the ionic-strength formula (protein) at 2x zoom: letters, subscripts and operators all upright, baseline and spacing unchanged from v1.8.31.

## v1.8.31 — 2026-11-07 (Asia/Shanghai)

### Changes
- Typography scale unified on a Google-style ladder instead of 18 ad-hoc sizes (10.5/11/11.5/12/12.5/13/13.5/14/14.5/15/16/17/18/20/22/24/26/30px + 4 clamps). The site now uses 12 / 13 / 14 / 15 / 16 for text and 18 / 22 / 24 / 32–44 for headings, so every half-pixel step is gone.
- Reading sizes raised for comfort: body copy 16px / line-height 1.7, page descriptions 16px / 1.75 with a 74ch measure cap, hints and form labels 14px, table cells 15px, card paragraphs 15px. Heading sizes follow Material-style increments (hero 32–44, page title 26–32, featured card 22, card title 18).
- Footer re-tiered to 13 / 12 so attribution and licence lines stop competing with body text.
- Service worker cache version finally bumped: `CV` `tubecalc-v1.8.20` → `tubecalc-v1.8.31`, and the registration query `sw.js?v=46` → `sw.js?v=47`. On activate the worker deletes every cache whose name is not the current `CV`, so returning visitors get the new CSS and font files on the first load instead of one refresh later.

### Validation
- Size inventory after the change: 12 / 13 / 14 / 15 / 16 / 18 / 22 / 24 + clamps (26–32, 32–44); no non-integer sizes remain in `src/styles` or any `src/pages/**/*.astro`.
- Layout regression pass on home, mix, dil, protein and mol at 1280px, 1100px, 768px and 375px via iframe viewports: `scrollWidth - clientWidth = 0` on every page (no horizontal overflow), nav stays on two rows below 1100px, mix grid and protein textarea keep their alignment.
- Computed styles spot-checked: body 16px / 27.2px line-height, `.page-desc` 16px, labels and hints 14px, footer 13px, inputs still 16px (unchanged — the iOS no-zoom threshold).
- Build: 30 pages, `dist/index.html` carries `sw.js?v=47`.

## v1.8.30 — 2026-11-07 (Asia/Shanghai)

### Changes
- KaTeX formulas now use the site typeface: upright letters, digits, chemical formulas (mhchem) and `\text{}` render in Google Sans Flex with Noto Sans SC for Chinese subscripts, instead of the Times-style KaTeX_Main fallback.
- Italic variables are synthesised from Google Sans Flex (no true italic axis in the OFL release); large operators and stretchy delimiters keep KaTeX's own glyphs so layout metrics stay correct.

### Validation
- Local render check on the mixing and dilution pages plus a stress set (C_1V_1 = C_2V_2, \varepsilon_{280}, \ce{C8H10N4O2}, V = C_{\text{终}} \times V_{\text{总}} \div C_{\text{储}}): all glyphs render in the new family, subscripts stay correctly placed, Greek coverage comes from Google Sans Flex's math subset.
- Known limitation recorded: unused constructs such as `\frac` get tighter numerator/denominator spacing after the substitution.

## v1.8.29 — 2026-11-07 (Asia/Shanghai)

### Changes
- Typography: switched the site from the system font stack to a self-hosted pair — Google Sans Flex (Latin and other non-CJK scripts) with Noto Sans SC (Chinese) as the CJK companion, both under the SIL Open Font License.
- Fonts are served from the site itself (`public/fonts/gsf`, `public/fonts/nsc`, 111 `@font-face` blocks with `unicode-range`), so no request ever reaches fonts.googleapis.com / fonts.gstatic.com; this keeps the site fully offline-capable and reachable from networks where Google Fonts is blocked.
- Google Sans Flex is self-hosted only where the licence allows redistribution (SIL OFL 1.1); the existing system stack remains as the fallback chain for any glyph the web fonts do not cover.

### Validation
- Local build: body `font-family` resolves to "Google Sans Flex", "Noto Sans SC" + system fallbacks; 111 faces registered, only the subsets actually used are fetched (19 on the molecular tool page).
- Canvas metrics confirm the web fonts are really applied: "TubeCalc" in Google Sans Flex measures 253.05px vs 231.12px in the fallback at 60px; "分子工具" measures 240px in Noto Sans SC.
- Font payload: Google Sans Flex 208 KB (10 subsets), Noto Sans SC 4.5 MB (101 subsets), lazy-loaded per `unicode-range`.

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
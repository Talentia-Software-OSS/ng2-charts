# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@talentia/ng2-charts` is a **fork of [valor-software/ng2-charts](https://github.com/valor-software/ng2-charts)**
2.x (git remote `upstream`), kept current with Angular by Talentia while staying on **Chart.js 2.9.4**
(peer `chart.js ~2.9.4`, plus `lodash-es ~4.18.1`). It is consumed by `@talentia/components`
(core-components) and by the HCM front-end — check real usage there before changing behavior.
Chart.js 3+ APIs do not apply here.

The workspace has two projects: the library (`projects/ng2-charts`) and a demo app (`projects/demo`,
one route per chart type: bar, bubble, doughnut, line, pie, polar-area, radar, scatter; the demo
also uses `chartjs-plugin-annotation` and `chartjs-plugin-datalabels`). The library version follows
the release branch name (e.g. `2.4.14`).

## Commands

```bash
npm run build          # clean:build + build:prod — production library build (dist/ng2-charts)
npm run build:dev      # development build
npm start              # build:dev + ng serve demo (http://localhost:4200)
npm run watch          # lib + demo in watch mode
npm run demo:prod      # production build of the demo (also demo:dev); CI runs build:prod + demo:prod
npm run lint           # ng lint (lib + demo)
npm run lint:lib-fix   # ng lint of the library with --fix
npm run update-browserslist
```

There is no test framework (no Jest/Karma, no `*.spec.ts`): verify in the demo or in a consumer.
Node version: `.nvmrc`.

## Architecture

Everything lives in `projects/ng2-charts/src/lib/`:

- **`base-chart.directive.ts`** — `BaseChartDirective` (`canvas[baseChart]`, `exportAs: 'base-chart'`,
  `standalone: false`). Inputs `data`, `datasets`, `labels`, `options`, `chartType`, `colors`,
  `legend`, `plugins`; outputs `chartClick`, `chartHover`. Creates the Chart.js instance (public
  `chart`) and keeps it in sync: `ngOnChanges` handles new references, while **`ngDoCheck` compares
  the inputs against a cached `old` state** (existence and length of `data`/`datasets`/`labels`, the
  `data` array of each dataset, copies of the colors, ...) so in-place mutations (e.g. `data.push(...)`)
  are detected too; it then either `chart.update()`s or fully re-creates the chart (`refresh()`).
- **`theme.service.ts`** — `ThemeService` (`providedIn: 'root'`): `colorschemesOptions`
  (`BehaviorSubject<ChartOptions>`) merged into every chart's options for dynamic theming (`smartMerge`
  in the directive, which `cloneDeep`s the options with lodash-es before applying the overrides).
- **`color.ts`, `colors.ts`, `default-colors.ts`, `get-colors.ts`** — default palettes and the color
  generation applied to datasets without explicit colors.
- **`monkey-patch-chart-js-legend.ts`, `monkey-patch-chart-js-tooltip.ts`** — exported functions
  that patch Chart.js 2 globals: the legend learns to lay out multi-line (array) labels, the tooltip
  gets a replacement `Chart.Tooltip.prototype.drawBody`. Not applied automatically: consumers call
  them once at startup (the demo does it in `main.ts`).
- **`charts.module.ts`** — `ChartsModule` declares/exports the directive.

## Working in this codebase

- Angular upgrades are done **without adopting new Angular features** (NgModule, `standalone: false`,
  zone.js in the demo via `provideZoneChangeDetection()`).
- The `ngDoCheck` comparison is what makes in-place data mutations work in consumers: keep it
  when touching change detection.
- `@angular/*` versions are pinned exactly; peer range `^<major>.0.0`. No `overrides` in
  `package.json`: transitive `@angular-devkit/*` are kept on the framework patch only by the lock.
- `tmp/` is git-ignored and may contain task worklogs/scripts (e.g. `tmp/HCM-8031/`, including a
  Playwright test of the demo that reads the Chart.js instance via `ng.getDirectives`).

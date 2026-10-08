# AGENTS.md

本文件为在该仓库工作的 AI 编码代理提供指引（`CLAUDE.md` 是指向本文件的软链接）。

## 常用命令

包管理器为 **pnpm**，Node 版本以 CI 为准（Node 22）。

| 命令 | 作用 |
| --- | --- |
| `pnpm check` | 质量门禁：`lint` + `typecheck` + `test`，提交前必跑 |
| `pnpm lint` | ESLint（`@antfu/eslint-config`，不带 `--fix`，需要自动修复加 `pnpm lint --fix`） |
| `pnpm typecheck` | 串行跑 5 处类型检查，见下方说明 |
| `pnpm test` | Vitest 全量（仓库无 vitest 配置文件，走默认发现） |
| `pnpm build` | `build:site` + `build:extension` + `verify:extension` |

开发态：`pnpm dev:core`（扩展 WXT）、`pnpm dev:tb`（toolbox 独立页面）、`pnpm dev:ms`（油猴脚本 watch）、`pnpm dev:doc`（文档站）。

单测跑单个文件/用例：

```bash
pnpm vitest run apps/toolbox/src/views/url/parse-url.test.ts
pnpm vitest run -t '用例名片段'
```

`pnpm typecheck` 不是一条 `tsc`，而是依次检查 `monkey-scripts`、`packages/shared`、`packages/ui`、`apps/toolbox`（project references）、`extensions/aimless`（`tsc --noEmit`）。新增 workspace 包时要把它挂进这条链，否则类型检查会悄悄漏掉。

## 架构

仓库是 pnpm workspace（`apps/*`、`extensions/*`、`packages/*`、`monkey-scripts/*`），产出 **四个发布面**，共享两个内部包：

```
packages/shared (@aimless/shared)  纯 TS 工具：request/dom/download/type-is
packages/ui     (@aimless/ui)      React 组件，re-export antd + JsonEditor/JsonView/CodeDiffEditor
        ↓                    ↓
apps/toolbox            extensions/aimless          monkey-scripts/*        apps/docs
(React SPA 工具箱)      (WXT 扩展 Chrome/Firefox)   (油猴脚本)              (VitePress 站点)
```

### 构建产物归属（关键）

全部产物落在根 `.output/`，各发布面的 outDir 由各自配置指定、互不覆盖：

- `apps/toolbox` 永远只构建到自己的 `dist/`，**不直接写扩展目录**。
- `extensions/aimless/modules/toolbox-assets.mjs` 是本地 WXT 模块：生产构建前先 `vite build` toolbox，再通过 `addPublicAssets` 把 `dist/` 挂到扩展的 `toolbox/` 子路径。因此扩展最终目录（`.output/chrome-mv3`、`.output/firefox-mv2`）由 WXT 独家拥有。
- `apps/docs` 输出到 `.output/docs`；油猴脚本输出到 `.output/docs/scripts`，随文档站一起发到 GitHub Pages。

### 扩展的权限不变式

`build/verify-extension-artifacts.mjs` 在 `pnpm build` 末尾强校验两个 manifest，**改动 `wxt.config.ts` 的 manifest 必须同步改这个脚本，否则构建失败**：

- `permissions` 恰好是 `['contextMenus', 'scripting']`
- content script 匹配 `http://*/*` + `https://*/*`，且 `all_frames` 必须为假（只跑顶层 frame）
- `web_accessible_resources` 恰好只有 `json-content.js`

这些限制是刻意为之（见 `docs/superpowers/specs/2026-09-19-architecture-hardening-design.md`）：扩展权限按实际使用收紧，JSON 渲染器是唯一对页面暴露的资源。

### 扩展内部链路

JSON 页面美化走三跳：`entrypoints/content/index.ts`（`document_start` 注入样式）→ `injectScript('/json-content.js')` → `entrypoints/json-content.ts`（`defineUnlistedScript`，检测到 `body > pre` 才 `render()`）→ `content/modules/json/` 用 `@aimless/ui` 的 `JsonEditor` 接管 `document.body`。

`entrypoints/background/context-menu/` 注册右键菜单，点击后 `chrome.tabs.create` 打开 `toolbox/index.html#/<tool>`，即扩展内嵌的 toolbox SPA。

### 油猴脚本：约定优于配置

`build/discover-userscripts.mjs` 扫描 `monkey-scripts/` 下除 `lib` 外的所有目录，**每个目录必须同时有 `index.ts`（入口）和 `manifests.ts`（UserScript 元信息注释）**，缺一个就报错。构建用 `plugins/vite-plugin-banner` 把 `manifests.ts` 原文贴到产物头部，输出 `<name>.user.js`。新增脚本 = 新建目录 + 这两个文件，不需要改构建脚本；文档侧需在 `apps/docs/src/monkey-scripts/` 加页面并挂到 `.vitepress/config.mts` 的 sidebar。

### 新增 toolbox 工具

`apps/toolbox/src/constants/menu.tsx` 加 `MenuPath` 常量 → `src/views/<tool>/` 写组件 → `src/routes/router.tsx` 注册（hash router）→ 若需右键入口，还要在 `extensions/aimless/entrypoints/background/context-menu/index.ts` 加菜单项（现有 `diff` 工具就只注册了路由、没进右键菜单）。

## UI 设计：必须遵循 DESIGN.md

根目录 `DESIGN.md` 是 UI 的唯一设计依据，**任何新增或改动界面前先读它**。它定义两套主题（Default / Aurora）× 明暗双模，Aurora Dark 是默认签名态；token 以 `--xt-*` 命名挂在 `:root`，靠 `.theme-aurora` / `.theme-aurora-dark` 等类覆盖切换。

最容易违反的硬性规则：

- `#7C3AED` 是唯一强调色；`ai-flow` 紫→青渐变**只能**用于 AI 相关交互（thinking、AI 建议、prompt 边框），不做通用装饰。
- 暗色模式用环境光（`brand.primary-glow`）+ 四级 surface 分层（`base`→`raised`→`overlay`→`elevated`）表达层次，不用重投影；明色模式才回到常规浅投影。
- 正文用 `text.secondary`，`text.primary` 留给标题和可交互标签；正文不要用纯白 `#FFFFFF`。
- 默认不加动画，动效只保留给 AI 处理指示和用户主动触发的转场。

## 约定

- **依赖版本统一在 `pnpm-workspace.yaml` 的 `catalog:` 里**，各包写 `"react": "catalog:"`；内部包用 `workspace:*`。vite 的 `overrides` 只允许放在根。
- 内部包全部 `private: true`，`main`/`module` 直接指向 `./index.ts` 源码（消费方不走构建产物）。
- Monaco 相关组件必须 import `packages/ui/src/basic-components/json-editor/preload.ts`，它负责配置 worker 与 `loader.config`。
- JSON 编辑器/查看器只有 `@aimless/ui` 一份实现，扩展和 toolbox 都从它引入，不要在使用侧另写一套。
- 代码注释与文档以中文为主，沿用既有风格。

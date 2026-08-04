# 传统小型无纺布企业官网 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `E:\aiwork\GEO` 内交付一个可信、朴素、适合 GEO/SEO 的 Astro 静态无纺布企业官网，并将用户提供的生产设备照片用于证据型展示。

**Architecture:** 使用 Astro 静态输出和共享布局/组件构建 10 个主要栏目及一个知识文章示例。企业、产品、设备、应用与 FAQ 事实集中在 TypeScript 数据模块中；SEO 元数据和 JSON-LD 由页面类型驱动生成，所有未知事实使用统一的待确认标记。

**Tech Stack:** Astro 5、TypeScript、原生 CSS、Node.js 内置测试运行器、Astro sitemap integration。

## Global Constraints

- 视觉采用深绿、暖灰、纸张白与少量黄色强调，保留白色导航、宽幅真实工厂图、大标题、黄色短下划线和宽松留白。
- 不复制参考站的品牌、Logo、文案、图片或数据。
- 不虚构产能、厂房面积、员工数量、客户、认证、资质、专利、检测结果或行业排名。
- 缺失企业资料统一使用 `[待企业确认：字段名]`。
- 用户提供的 `C:\Users\qxy12\Downloads\eca05cd7-b936-4479-8a99-cad67b454b40.png` 仅作为生产设备/生产现场照片，不作为检测、认证或产能证明。
- 构建产物必须为 `dist/`，可直接部署至 EdgeOne Pages。

---

## File Map

- `package.json`：项目脚本与依赖。
- `astro.config.mjs`、`tsconfig.json`：静态站与站点域名配置。
- `src/data/site.ts`：企业主体、导航、联系方式、占位策略。
- `src/data/products.ts`：三类产品及参数。
- `src/data/content.ts`：设备、质量、应用、FAQ 与知识文章元数据。
- `src/layouts/BaseLayout.astro`：全站元数据、页头页脚、Organization JSON-LD。
- `src/components/*.astro`：导航、标题、照片、参数表、证据卡、联系区和 JSON-LD。
- `src/pages/**`：10 个栏目、知识文章示例、404、robots.txt。
- `src/styles/global.css`：设计变量、响应式布局和交互状态。
- `public/images/nonwoven-production-line.png`：用户提供的设备照片。
- `public/site.webmanifest`：站点基础清单。
- `tests/source.test.mjs`：源数据、占位规则和页面覆盖测试。
- `tests/dist.test.mjs`：构建产物、链接、元数据和结构化数据测试。
- `README.md`：资料替换、本地运行、GitHub/EdgeOne 部署与上线清单。
- `design-qa.md`：参考图与实现的视觉验证结果。

### Task 1: Astro 基础与企业数据边界

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/data/site.ts`
- Create: `tests/source.test.mjs`
- Create: `.gitignore`

**Interfaces:**
- Produces: `siteConfig`、`navigation`、`isConfirmedValue(value: string): boolean`。
- Consumes: 已确认的 URL 结构与占位符格式。

- [ ] **Step 1: 写失败的源数据测试**

在 `tests/source.test.mjs` 中用 `node:test` 读取 `src/data/site.ts`，断言包含 10 个导航目标、企业名称占位符、域名占位符，并禁止“行业领先”“年产”“通过 ISO”等未经确认表述。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test tests/source.test.mjs`

Expected: FAIL，原因是 `src/data/site.ts` 尚不存在。

- [ ] **Step 3: 创建最小 Astro 配置和数据模块**

`package.json` 提供 `dev`、`build`、`preview`、`test`、`check` 脚本；Astro 设置 `output: 'static'`、`site: 'https://www.example.com/'` 并启用 sitemap。`siteConfig` 使用明确占位符，导航映射到规格中的 10 个栏目。

- [ ] **Step 4: 运行源数据测试**

Run: `node --test tests/source.test.mjs`

Expected: PASS。

- [ ] **Step 5: 提交**

Run: `git add package.json astro.config.mjs tsconfig.json src/data/site.ts tests/source.test.mjs .gitignore && git commit -m "chore: scaffold astro site data"`

### Task 2: 设计系统、布局与真实设备素材

**Files:**
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/PageHero.astro`
- Create: `src/components/PhotoEvidence.astro`
- Create: `src/components/PlaceholderNotice.astro`
- Create: `src/components/JsonLd.astro`
- Create: `public/images/nonwoven-production-line.png`

**Interfaces:**
- Consumes: `siteConfig`、`navigation`。
- Produces: `BaseLayout` props `{ title, description, canonicalPath, breadcrumbs?, jsonLd? }`；`PhotoEvidence` props `{ src, alt, caption, label }`。

- [ ] **Step 1: 扩展源测试**

断言设备照片存在且 SHA-256 与用户原图相同；断言 CSS 定义 `--color-forest`、`--color-warm-gray`、`--color-accent`，布局含 skip link 和移动菜单按钮。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test tests/source.test.mjs`

Expected: FAIL，指出样式、布局和设备图缺失。

- [ ] **Step 3: 复制原图并实现布局组件**

将用户 PNG 原样复制到 `public/images/nonwoven-production-line.png`。实现白色导航、深绿文字、暖灰背景、黄色标题短线、克制边框、可键盘操作的移动菜单、页脚与待确认提示。设备图使用 `aspect-ratio` 与 `object-fit: cover`，首页使用 16:9 证据卡，设备页使用宽幅完整展示。

- [ ] **Step 4: 运行测试确认通过**

Run: `node --test tests/source.test.mjs`

Expected: PASS。

- [ ] **Step 5: 提交**

Run: `git add src/styles src/layouts src/components public/images && git commit -m "feat: add industrial design system"`

### Task 3: 产品与证据内容组件

**Files:**
- Create: `src/data/products.ts`
- Create: `src/data/content.ts`
- Create: `src/components/ProductCard.astro`
- Create: `src/components/EvidenceCard.astro`
- Create: `src/components/SpecTable.astro`
- Create: `src/components/ContactPanel.astro`
- Modify: `tests/source.test.mjs`

**Interfaces:**
- Produces: `Product`、`EquipmentItem`、`ApplicationItem`、`FaqItem`、`KnowledgeArticle` 类型；`products` 长度固定为 3。
- Consumes: `isConfirmedValue` 以避免为空联系方式生成链接。

- [ ] **Step 1: 写内容契约测试**

断言三项产品各有独立 slug、参数数组、应用和采购确认项；FAQ 至少覆盖 MOQ、打样、交期、包装、运输和定制；设备与质量条目不含未经确认数字。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test tests/source.test.mjs`

Expected: FAIL，原因是产品和内容模块不存在。

- [ ] **Step 3: 实现类型化内容和组件**

产品名保持“产品 A/B/C + 待企业确认真实名称”；参数值为具体字段占位符。联系组件在电话号码或邮箱未确认时显示文字但不生成 `tel:`/`mailto:`。

- [ ] **Step 4: 运行测试确认通过**

Run: `node --test tests/source.test.mjs`

Expected: PASS。

- [ ] **Step 5: 提交**

Run: `git add src/data src/components tests/source.test.mjs && git commit -m "feat: model products and evidence content"`

### Task 4: 首页与九个栏目页面

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/about/index.astro`
- Create: `src/pages/factory/index.astro`
- Create: `src/pages/equipment/index.astro`
- Create: `src/pages/quality/index.astro`
- Create: `src/pages/products/product-a/index.astro`
- Create: `src/pages/products/product-b/index.astro`
- Create: `src/pages/products/product-c/index.astro`
- Create: `src/pages/applications/index.astro`
- Create: `src/pages/knowledge/index.astro`
- Create: `src/pages/404.astro`
- Modify: `tests/source.test.mjs`

**Interfaces:**
- Consumes: 布局、内容组件和数据模块。
- Produces: 10 个规格 URL 与 404 页面。

- [ ] **Step 1: 写路由与可见内容测试**

断言 10 个路由源文件存在，每页只有一个 `<h1>`，首页引用设备照片且标题为事实型企业定位，设备页注明照片用途，质量页区分“通用流程”和“企业待确认项目”。

- [ ] **Step 2: 运行测试确认失败**

Run: `node --test tests/source.test.mjs`

Expected: FAIL，指出页面缺失。

- [ ] **Step 3: 实现页面**

首页遵循“定位—产品—能力—生产现场—应用—FAQ—联系”的采购顺序；各内页具有面包屑、相关栏目链接和明确 CTA。设备图在首页和设备页复用，不冒充多个不同现场。

- [ ] **Step 4: 运行测试确认通过**

Run: `node --test tests/source.test.mjs`

Expected: PASS。

- [ ] **Step 5: 提交**

Run: `git add src/pages tests/source.test.mjs && git commit -m "feat: build enterprise site pages"`

### Task 5: SEO、GEO 与知识文章

**Files:**
- Create: `src/pages/knowledge/nonwoven-procurement-checklist/index.astro`
- Create: `src/pages/robots.txt.ts`
- Create: `public/site.webmanifest`
- Create: `tests/dist.test.mjs`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/pages/knowledge/index.astro`

**Interfaces:**
- Consumes: `siteConfig`、`products`、`faqItems`、`knowledgeArticles`。
- Produces: Organization、Product、BreadcrumbList、Article、FAQPage JSON-LD 与 sitemap/robots。

- [ ] **Step 1: 写构建产物测试**

测试运行 Astro build 后读取 `dist/`：断言所有路由存在；每页含 title、description、canonical；首页 JSON-LD 包含 Organization；产品页包含 Product 与 BreadcrumbList；知识文章包含 Article；知识库包含 FAQPage；robots 指向 sitemap。

- [ ] **Step 2: 运行测试确认失败**

Run: `npm run build && node --test tests/dist.test.mjs`

Expected: FAIL，指出文章、robots 或结构化数据缺失。

- [ ] **Step 3: 实现 SEO/GEO 输出**

所有 JSON-LD 只使用页面可见事实；产品占位页不输出价格、评分、库存或认证；Organization 联系字段只有在确认后才加入。知识文章标题为“无纺布采购前需要确认哪些信息”，内容为通用采购清单并明确企业特定数据待确认。

- [ ] **Step 4: 运行构建产物测试**

Run: `npm run build && node --test tests/dist.test.mjs`

Expected: PASS。

- [ ] **Step 5: 提交**

Run: `git add src public tests && git commit -m "feat: add seo geo structured data"`

### Task 6: 文档、部署配置与最终验证

**Files:**
- Create: `README.md`
- Create: `design-qa.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: 完整站点与所有测试。
- Produces: 可交付项目、EdgeOne 配置说明和视觉 QA 结论。

- [ ] **Step 1: 写上线清单**

README 必须列出企业名称、域名、备案号、Logo、联系方式、三类产品、参数、设备、质量标准、应用范围和真实照片；明确 EdgeOne 构建命令为 `pnpm run build`、输出目录为 `dist`、Node 版本为 22.12 或更高。

- [ ] **Step 2: 安装依赖并运行完整验证**

Run: `npm install && npm run check && npm test && npm run build`

Expected: 所有命令退出码为 0，无 TypeScript/Astro 错误和失败测试。

- [ ] **Step 3: 启动本地预览并检查交互**

Run: `npm run dev -- --host 127.0.0.1 --port 4321`

检查桌面端与 390×844：导航、移动菜单、所有站内链接、CTA、照片裁切、参数表滚动、焦点样式和 404。

- [ ] **Step 4: 完成视觉 QA**

同屏比较 Industrial 企业首页参考图与首页截图，记录深绿/暖灰配色、白色导航、标题层级、黄色短线、宽幅图片、留白和移动端问题。修复全部 P0/P1/P2，直到 `design-qa.md` 写明 `final result: passed`；若无法进行浏览器截图比较，写明 `final result: blocked`，不得声称视觉验证通过。

- [ ] **Step 5: 扫描虚构事实与占位符**

Run: `git grep -n -E "行业领先|全球领先|年产[0-9]|ISO[0-9]+|服务[0-9]+家|出口[0-9]+个国家" -- ':!docs/superpowers/**'`

Expected: 无匹配。再运行 `git grep -n "待企业确认"`，确认所有缺失事实仍显式可见。

- [ ] **Step 6: 提交**

Run: `git add README.md design-qa.md package.json && git commit -m "docs: add deployment and verification guide"`

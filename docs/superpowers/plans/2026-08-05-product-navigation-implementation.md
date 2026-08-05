# 产品导航合并 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将页头的三个产品入口合并为一个指向首页产品总览的“产品介绍”入口。

**Architecture:** 继续由 `src/data/site.ts` 作为桌面端与移动端导航的唯一数据源，只改变导航数组，不修改产品数据或详情页路由。源码测试验证导航只有一个产品入口，产物测试继续验证三个详情页均存在。

**Tech Stack:** Astro 7、TypeScript、Node.js 内置测试运行器。

## Global Constraints

- 保留 `/products/product-a/`、`/products/product-b/`、`/products/product-c/` 三个详情页。
- 新导航入口文字必须为“产品介绍”，链接必须为 `/#products`。
- 不修改产品事实、占位符或结构化数据。

---

### Task 1: 合并产品导航入口

**Files:**
- Modify: `tests/source.test.mjs`
- Modify: `src/data/site.ts`

**Interfaces:**
- Consumes: `navigation` 导航数组和首页现有的 `id="products"` 区域。
- Produces: 桌面端与移动端共用的单一产品总览入口。

- [ ] **Step 1: 写失败测试**

在 `tests/source.test.mjs` 中断言 `site.ts` 包含 `{ label: '产品介绍', href: '/#products' }`，且导航数组中不再包含三个产品详情页路径。

- [ ] **Step 2: 验证测试失败**

Run: `node --test tests/source.test.mjs`

Expected: FAIL，因为当前导航仍包含“产品 A / 产品 B / 产品 C”。

- [ ] **Step 3: 实现最小修改**

将 `src/data/site.ts` 导航数组中的三个产品入口替换为：

```ts
{ label: '产品介绍', href: '/#products' },
```

- [ ] **Step 4: 验证测试与构建**

Run: `node --test tests/source.test.mjs tests/dist.test.mjs`

Expected: 12 个测试全部通过。

Run: `pnpm.cmd run check`

Expected: 0 errors、0 warnings、0 hints。

Run: `pnpm.cmd run build`

Expected: 三个产品详情页和首页均成功生成。

- [ ] **Step 5: 浏览器检查并提交**

确认桌面端和移动端顶部只显示“产品介绍”，点击后进入首页产品区域，然后提交：

```text
git add src/data/site.ts tests/source.test.mjs docs/superpowers/plans/2026-08-05-product-navigation-implementation.md
git commit -m "refactor: simplify product navigation"
```

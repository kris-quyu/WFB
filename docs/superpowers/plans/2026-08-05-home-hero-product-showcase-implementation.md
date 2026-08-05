# 首页首屏与产品展示区改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用真实设备照片、灰蓝遮罩、砖红强调色和可访问的产品胶囊入口，改造首页首屏与产品展示区。

**Architecture:** 首页继续由 `src/pages/index.astro` 组织内容，真实设备照片以语义化 `<img>` 作为首屏背景，产品卡片仍由 `ProductCard.astro` 渲染。产品胶囊按钮通过首页内联脚本维护 `aria-pressed` 和卡片强调状态，不改变产品数据或详情页路由。

**Tech Stack:** Astro 7、TypeScript、原生 CSS、原生浏览器 JavaScript、Node.js 内置测试运行器。

## Global Constraints

- 只修改首页首屏、首页产品展示区及其卡片视觉。
- 只使用 `public/images/nonwoven-production-line.png` 这一张已提供的真实设备照片。
- 不虚构产品图片、产能、检测、认证、设备型号或性能数据。
- 保留三个产品详情页和所有 `[待企业确认：…]` 字段。
- 桌面端与 `390 × 844` 手机端均不得横向溢出。

---

### Task 1: 锁定新版首屏与产品区结构

**Files:**
- Modify: `tests/dist.test.mjs`
- Modify: `src/pages/index.astro`
- Modify: `src/components/ProductCard.astro`

**Interfaces:**
- Consumes: `products` 数组、`ProductCard` 的 `product: Product` 属性、真实设备图片路径。
- Produces: `.immersive-hero`、`.product-showcase`、`.product-filter` 和可定位的产品卡片结构。

- [ ] **Step 1: 写失败测试**

在 `tests/dist.test.mjs` 增加测试，读取构建后的 `dist/index.html` 并断言用户可见结构包含：

```js
assert.match(home, /class="immersive-hero"/);
assert.match(home, /class="product-showcase/);
assert.match(home, /data-product-filter="all"/);
assert.match(home, /aria-pressed="true"/);
assert.match(home, /nonwoven-production-line\.png/);
assert.match(home, /id="product-a"[^>]+data-product-card="product-a"/);
```

该测试会在旧首页结构或产品卡片无法被胶囊入口定位时失败。

- [ ] **Step 2: 验证测试失败**

Run: `pnpm.cmd run build; node --test tests/dist.test.mjs`

Expected: FAIL，因为当前首页仍为 `.home-hero` 分栏结构，且没有产品胶囊入口。

- [ ] **Step 3: 实现首屏结构**

在 `src/pages/index.astro` 中移除 `PhotoEvidence` 使用，加入：

```astro
<section class="immersive-hero">
  <img class="immersive-hero__image" src="/images/nonwoven-production-line.png" alt="绿色无纺布生产设备正在加工白色卷材的现场照片" />
  <div class="immersive-hero__overlay"></div>
  <div class="container immersive-hero__content">...</div>
</section>
```

文案沿用现有可信表达，主按钮指向 `#products`，现场说明明确设备信息仍待企业确认。

- [ ] **Step 4: 实现产品展示结构**

将产品区域改为 `.product-showcase`，加入四个按钮：

```astro
<button type="button" data-product-filter="all" aria-pressed="true">全部产品</button>
{products.map((product) => (
  <button type="button" data-product-filter={product.slug} aria-pressed="false">{product.displayName}</button>
))}
```

修改 `ProductCard.astro` 的文章根节点：

```astro
<article id={product.slug} data-product-card={product.slug} class="product-card card">
```

- [ ] **Step 5: 运行源码测试**

Run: `pnpm.cmd run build; node --test tests/dist.test.mjs`

Expected: 所有源码测试通过。

---

### Task 2: 实现视觉、交互与响应式

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/components/ProductCard.astro`
- Test: `tests/dist.test.mjs`

**Interfaces:**
- Consumes: Task 1 的 CSS 类名和 `data-product-filter` / `data-product-card` 属性。
- Produces: 灰蓝沉浸首屏、砖红强调色、产品卡片强调交互和手机端单列布局。

- [ ] **Step 1: 写失败测试**

在 `tests/dist.test.mjs` 继续断言最终 HTML 包含：

```js
assert.match(home, /--showcase-red:\s*#b8322a/i);
assert.match(home, /linear-gradient/);
assert.match(home, /aria-pressed/);
assert.match(home, /scrollIntoView/);
```

- [ ] **Step 2: 验证测试失败**

Run: `pnpm.cmd run build; node --test tests/dist.test.mjs`

Expected: FAIL，因为视觉变量和按钮交互尚未实现。

- [ ] **Step 3: 实现视觉与交互**

在首页局部样式中定义灰蓝、暖白、砖红变量；首屏图片使用 `object-fit: cover`，叠加左深右浅渐变。产品区使用同图的装饰性模糊背景和高透明度遮罩，卡片为浅色半透明底。

在首页加入内联脚本：点击按钮时更新全部按钮的 `aria-pressed`；点击具体产品时设置对应卡片 `.is-highlighted` 并使用 `scrollIntoView({ behavior: 'smooth', block: 'center' })`；点击“全部产品”时清除卡片强调。

- [ ] **Step 4: 实现手机端规则**

在 `max-width: 720px` 下将首屏内容置于底部深色渐变区域、按钮允许换行、产品胶囊横向滚动、三张卡片改为单列，并保持页面 `scrollWidth === clientWidth`。

- [ ] **Step 5: 完整验证**

Run: `pnpm.cmd run check`

Expected: 0 errors、0 warnings、0 hints。

Run: `pnpm.cmd run build`

Expected: 12 个静态页面成功生成。

Run: `node --test tests/source.test.mjs tests/dist.test.mjs`

Expected: 12 个测试全部通过。

使用项目现有 CDP 截图脚本验证 `1920 × 1080` 桌面端和 `390 × 844` 手机端；控制台错误必须为 0，手机端 `scrollWidth` 必须等于 `clientWidth`。

- [ ] **Step 6: 提交**

```text
git add src/pages/index.astro src/components/ProductCard.astro tests/source.test.mjs docs/superpowers/plans/2026-08-05-home-hero-product-showcase-implementation.md design-qa.md
git commit -m "feat: redesign homepage hero and product showcase"
```

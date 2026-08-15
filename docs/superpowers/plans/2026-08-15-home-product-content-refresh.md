# 首页与三个产品页内容优化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改动现有视觉结构的情况下，把首页和三个产品详情页改成证据明确、边界清楚、可供采购人员直接使用的内容，并发布源代码到 `kris-quyu/WFB`。

**Architecture:** 首页文案继续由 `src/pages/index.astro` 管理；三个产品页继续复用 `ProductDetail.astro`，产品差异内容由 `src/data/products.ts` 提供。应用页共享的 `content.ts` 不修改，避免超出用户确认范围。

**Tech Stack:** Astro 7、TypeScript、Node.js Test Runner、pnpm、Git/GitHub。

## Global Constraints

- 只修改首页和无纺布、针刺布、土工布三个产品详情页的内容。
- 不改变视觉结构、灰蓝配色、页面路由和六个首页代表性场景。
- 不虚构产能、规模、认证、检测结果、客户案例、固定 MOQ 或固定交期。
- 行业通用知识必须与企业已确认事实区分。
- 不提交 `dist/`、`release/`、临时 QA 文件或历史发布压缩包。

---

### Task 1: 为内容边界编写失败测试

**Files:**
- Modify: `tests/source.test.mjs`
- Modify: `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `src/pages/index.astro`、`src/components/ProductDetail.astro`、`src/data/products.ts` 和构建后的四个页面。
- Produces: 首页证据文案、产品选型边界和禁止虚构表述的回归约束。

- [ ] **Step 1: 增加源代码测试**

在 `tests/source.test.mjs` 增加断言，要求首页包含“成立于2004年”“参考样品或图片”“设备型号不代替产品参数”；要求产品详情标题包含“选型边界”；要求产品数据分别包含“不能只按产品名称”“不能只凭厚度或手感”“不能只按克重”；并禁止 `年产\d`、`服务\d+家`、`通过ISO`、`行业领先`。

- [ ] **Step 2: 增加构建产物测试**

在 `tests/dist.test.mjs` 增加断言，检查首页和三个产品页渲染上述内容，并确保四个页面没有未经证实的数字、认证和领先性表述。

- [ ] **Step 3: 运行测试确认失败**

Run: `pnpm test`

Expected: 新增的首页或“选型边界”断言失败，证明测试覆盖到尚未实施的内容。

- [ ] **Step 4: 提交测试**

```bash
git add tests/source.test.mjs tests/dist.test.mjs
git commit -m "test: define evidence-first content requirements"
```

### Task 2: 优化首页文案

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `siteConfig` 中的企业名称、地址和电话，以及现有产品、场景、FAQ 数据。
- Produces: 保持七段连续滚动结构不变的新版首页。

- [ ] **Step 1: 修改首屏与企业介绍**

将首屏说明写为企业成立时间、所在地、三类主营产品以及“按用途、样品或图片和目标规格沟通”的直接表述；将企业介绍标题改为“2004年成立，主体地址和主营产品可核对”。

- [ ] **Step 2: 修改产品、工厂与设备摘要**

产品中心说明分别提示三类产品的关键选型依据；工厂摘要改为从用途、样品和订单规格开始核对；设备摘要明确现场照片显示加工、整理与收卷，同时写明“设备型号不代替产品参数”。

- [ ] **Step 3: 修改应用和知识引导语**

保持六个场景和四个 FAQ 不变，只把引导语改成具体的采购输入，包括用途、样品、规格、工况和设计要求。

- [ ] **Step 4: 运行源代码测试**

Run: `pnpm test`

Expected: 首页新增断言通过；产品边界断言仍失败。

- [ ] **Step 5: 提交首页修改**

```bash
git add src/pages/index.astro
git commit -m "content: make homepage claims evidence-first"
```

### Task 3: 优化三个产品详情页

**Files:**
- Modify: `src/data/products.ts`
- Modify: `src/components/ProductDetail.astro`

**Interfaces:**
- Consumes: `Product.features`、`Product.specifications`、`Product.packaging` 和 `Product.purchaseChecklist`。
- Produces: 三个页面各自的选型边界、参数确认说明和询价清单；不改变产品总览页使用的 `summary`、`material` 与 `process`。

- [ ] **Step 1: 写入无纺布选型边界**

将无纺布 `features` 改为：不能只按产品名称报价；涉及承重、过滤、接触或耐候要求时，需要提供指标、样品或使用条件。完善参数与询价清单，使其先问用途和后加工方式。

- [ ] **Step 2: 写入针刺布选型边界**

将针刺布 `features` 改为：不能只凭厚度或手感选型；过滤用途需要明确介质、温湿度、颗粒情况与目标指标。完善参数和询价清单。

- [ ] **Step 3: 写入土工布选型边界**

将土工布 `features` 改为：不能只按克重采购；工程用途必须结合设计文件、执行标准、铺设条件与目标指标。完善参数和询价清单。

- [ ] **Step 4: 调整共享详情页标签**

把“常见原料”标为“行业常见原料”，把“选型说明”改为“选型边界”，把说明文字改为通用知识与企业供应范围分开的直接表述。保持 Product 与 FAQ JSON-LD 字段范围不变。

- [ ] **Step 5: 运行测试和类型检查**

Run: `pnpm test && pnpm check`

Expected: 所有源代码测试通过，Astro 类型检查无错误。

- [ ] **Step 6: 提交产品页修改**

```bash
git add src/data/products.ts src/components/ProductDetail.astro
git commit -m "content: clarify product selection boundaries"
```

### Task 4: 构建、验证和发布 GitHub

**Files:**
- Generated but not committed: `dist/`
- Modify only if required by repository hygiene: `.gitignore`

**Interfaces:**
- Consumes: 完成后的 Astro 项目和 Git 历史。
- Produces: 通过测试的生产构建及 GitHub 仓库 `kris-quyu/WFB` 上的源代码分支。

- [ ] **Step 1: 执行完整验证**

Run: `pnpm test && pnpm check && pnpm build && pnpm test`

Expected: 测试、类型检查和构建全部成功，`dist` 产物测试通过。

- [ ] **Step 2: 检查提交范围**

Run: `git status --short && git log --oneline -8`

Expected: `release/` 仍为未跟踪且未暂存；代码提交仅包含设计、计划、测试和本次内容文件。

- [ ] **Step 3: 核对远程仓库**

Run: `git ls-remote https://github.com/kris-quyu/WFB.git`

Expected: 仓库可访问；若为空则无 refs 输出。

- [ ] **Step 4: 设置远程并发布**

```bash
git remote add origin https://github.com/kris-quyu/WFB.git
git push -u origin HEAD:main
```

若 `origin` 已存在且指向其他地址，则停止并核对，不覆盖未知远程。若远端 `main` 已有用户内容，则先拉取和检查，不强制推送。

- [ ] **Step 5: 验证远端提交**

Run: `git ls-remote --heads origin main`

Expected: 远端 `main` 指向本地最新提交。

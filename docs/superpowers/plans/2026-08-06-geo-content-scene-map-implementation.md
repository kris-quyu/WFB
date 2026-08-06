# Tianrui GEO Scene Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace public-facing placeholders and internal build notes with truthful product knowledge, eighteen product-specific micro-scenarios, direct FAQ answers, and matching structured data without inventing enterprise capabilities.

**Architecture:** Keep verified company facts in `site.ts`, product knowledge in `products.ts`, and reusable micro-scenarios/FAQ/article metadata in `content.ts`. Render the same scenario records through one reusable component on the homepage, applications index, and product detail pages so copy cannot drift. Keep the homepage concise by selecting six featured scenarios while the applications and product pages expose the complete map.

**Tech Stack:** Astro 7 static generation, TypeScript content modules, schema.org JSON-LD, Node.js built-in test runner, existing CSS design tokens.

## Global Constraints

- Verified enterprise facts remain limited to the company name, 2004-06-01 founding date, credit code, address, phone, WeChat QR, supplied product photos, and supplied production photo.
- Industry knowledge must use wording such as “常见”“通常”“选型时需要” and must not imply that Tianrui supplies every material, process, type, or performance level mentioned.
- Do not publish factory area, capacity, line count, employee count, customers, exports, certifications, test results, equipment models, fixed MOQ, fixed lead time, price, inventory, ratings, or unsupported numerical ranges.
- Public page copy must not contain `待企业确认`, `资料原则`, `未经确认数字`, or internal explanations about how many photos were supplied. The ICP placeholder may remain in configuration until deployment.
- The homepage renders six featured scenario summaries; it must not render all eighteen full scenario answers.
- The applications page renders all eighteen scenarios grouped into six per product; each product detail renders only its own six.
- Preserve gray-blue `#405066`, warm white `#F2F2F2`, red accent `#B8322A`, natural continuous scrolling, mobile navigation, and the WeChat dialog.
- JSON-LD must match visible content and must not add offers, ratings, certifications, inventory, or unsupported claims.

---

## File Responsibility Map

- `src/data/products.ts`: Three products, stable industry knowledge, selection fields, and inquiry requirements.
- `src/data/content.ts`: FAQ answers, eighteen `MicroScenario` records, featured scenario selection, scenario lookup, and knowledge article metadata.
- `src/components/ScenarioGrid.astro`: Reusable compact/full scenario renderer.
- `src/components/ProductCard.astro`: Product summary and clearly labeled common material/process content.
- `src/components/ProductDetail.astro`: Product knowledge, six relevant scenarios, inquiry checklist, Product and FAQ JSON-LD.
- `src/pages/index.astro`: Concise homepage copy and six featured scenario cards.
- `src/pages/applications/index.astro`: Full eighteen-scenario directory grouped by product.
- `src/pages/about/index.astro`: Public enterprise description without editorial disclaimers.
- `src/pages/factory/index.astro`: Verified site photo and four common order steps.
- `src/pages/equipment/index.astro`: Plain description of visible production and roll-finishing work.
- `src/pages/products/index.astro`: Product overview without `PlaceholderNotice`.
- `src/pages/knowledge/index.astro`: Direct FAQ answers and high-value knowledge entries without placeholder notices.
- `tests/source.test.mjs`: Source-level content model and forbidden-copy assertions.
- `tests/dist.test.mjs`: Built HTML, scenario count, content partitioning, and JSON-LD assertions.

---

### Task 1: Define truthful product knowledge and the eighteen-scenario data model

**Files:**
- Modify: `tests/source.test.mjs`
- Modify: `src/data/products.ts`
- Modify: `src/data/content.ts`

**Interfaces:**
- Produces: `ProductSlug`, `Product.selectionFocus: string[]`, and updated human-readable product fields.
- Produces: `MicroScenario`, `microScenarios`, `featuredScenarios`, and `getScenariosForProduct(productSlug)`.
- Consumers: `ProductCard.astro`, `ProductDetail.astro`, `ScenarioGrid.astro`, `index.astro`, and `applications/index.astro`.

- [ ] **Step 1: Add failing source tests for the content boundary and scenario map**

Append assertions to `tests/source.test.mjs` that require eighteen scenario records, six per product, six featured records, direct FAQ answers, and no public placeholders in content/product data:

```js
test('GEO content defines eighteen product-specific micro scenarios', () => {
  const content = readFileSync(resolve(root, 'src/data/content.ts'), 'utf8');
  assert.match(content, /export interface MicroScenario/);
  assert.match(content, /export const microScenarios/);
  assert.match(content, /export const featuredScenarios/);
  assert.match(content, /export const getScenariosForProduct/);
  assert.equal((content.match(/productSlug:\s*'product-a'/g) ?? []).length, 6);
  assert.equal((content.match(/productSlug:\s*'product-b'/g) ?? []).length, 6);
  assert.equal((content.match(/productSlug:\s*'product-c'/g) ?? []).length, 6);
  assert.equal((content.match(/featured:\s*true/g) ?? []).length, 6);
});

test('public product and FAQ data contain useful answers without editorial placeholders', () => {
  const products = readFileSync(resolve(root, 'src/data/products.ts'), 'utf8');
  const content = readFileSync(resolve(root, 'src/data/content.ts'), 'utf8');
  assert.doesNotMatch(`${products}\n${content}`, /\[待企业确认|资料原则|未经确认数字/);
  for (const phrase of ['常见原料', '选型重点', '开松混合', '梳理成网', '针刺加固']) {
    assert.match(products, new RegExp(phrase));
  }
  for (const topic of ['起订量会受到', '交期根据', '包装方式需要', '收货地点']) {
    assert.match(content, new RegExp(topic));
  }
});
```

- [ ] **Step 2: Run the source tests and verify the new tests fail**

Run: `node --test tests/source.test.mjs`  
Expected: FAIL because `MicroScenario`, eighteen `productSlug` records, and the new direct FAQ wording do not exist.

- [ ] **Step 3: Add the product and scenario interfaces**

In `src/data/products.ts`, export the slug type and add a selection field:

```ts
export type ProductSlug = 'product-a' | 'product-b' | 'product-c';

export interface Product {
  slug: ProductSlug;
  // existing fields
  selectionFocus: string[];
}
```

In `src/data/content.ts`, import the type and add the reusable scenario model:

```ts
import type { ProductSlug } from './products';

export interface MicroScenario {
  slug: string;
  productSlug: ProductSlug;
  title: string;
  question: string;
  issue: string;
  focus: string[];
  candidateProduct: string;
  inquiryInput: string[];
  featured: boolean;
}
```

- [ ] **Step 4: Replace product placeholders with common knowledge and conditional selection copy**

Use these exact content rules in `src/data/products.ts`:

```ts
// 无纺布
material: '行业常见原料包括聚丙烯、聚酯等；实际材质以样品或订单要求为准',
process: '无纺材料通常由纤维成网后通过热粘合、机械加固等方式形成，具体类型需要结合用途确认',
specifications: [
  { label: '克重', value: '根据用途、手感和后续加工要求确认' },
  { label: '幅宽', value: '根据成品尺寸、裁切方式和损耗要求确认' },
  { label: '颜色', value: '根据样品、色样或订单要求确认' },
  { label: '卷长', value: '结合克重、幅宽、包装和运输方式确认' },
],
packaging: '通常采用卷材包装；标签、外包装和运输要求在询价时确认',
selectionFocus: ['最终用途', '材质与克重', '幅宽与卷长', '颜色与后续加工'],

// 针刺布
material: '行业常见原料包括涤纶、丙纶及其他纤维，实际配方以样品或订单要求为准',
process: '常见流程包括开松混合、梳理成网、针刺加固和整理收卷',
selectionFocus: ['克重与厚度', '硬挺度与手感', '颜色与尺寸', '使用工况'],

// 土工布
material: '行业常见原料包括聚酯、聚丙烯等合成纤维，实际材质需结合产品资料确认',
process: '土工布有短纤针刺、长丝和机织等常见类型，工程选型应以设计要求为依据',
selectionFocus: ['工程用途', '设计指标', '幅宽与卷长', '铺设条件与数量'],
```

Give all three products conditional, non-numerical specification values and roll-packaging language. Do not add ranges.

- [ ] **Step 5: Add the eighteen scenario records and selectors**

Populate `microScenarios` with the exact eighteen titles approved in the design spec. Each record must provide a unique issue, two to four focus points, one candidate product, and two to four inquiry inputs. Mark two scenarios per product as `featured: true` and export:

```ts
export const featuredScenarios = microScenarios.filter((scenario) => scenario.featured);

export const getScenariosForProduct = (productSlug: ProductSlug) =>
  microScenarios.filter((scenario) => scenario.productSlug === productSlug);
```

Use these featured titles so the homepage represents all three products:

```ts
const featuredTitles = [
  '产品包装防尘、防刮用布怎么选',
  '家具底布、沙发内衬需要确认哪些参数',
  '过滤用途如何说明介质、工况与目标要求',
  '针刺布常见工艺流程与采购注意事项',
  '路基或场地隔离使用土工布要提供什么信息',
  '土工布工程询价需要准备哪些设计资料',
];
```

- [ ] **Step 6: Rewrite all six FAQ answers as conditional direct answers**

Keep the existing questions, but replace bracketed values with direct answers about variables that affect MOQ, samples, lead time, packaging, transport, and customization. Do not promise free samples, a fixed number of days, or a fixed customization range.

- [ ] **Step 7: Run source tests and commit the content model**

Run: `node --test tests/source.test.mjs`  
Expected: PASS.

```bash
git add tests/source.test.mjs src/data/products.ts src/data/content.ts
git commit -m "content: add geo micro scenario map"
```

---

### Task 2: Render reusable micro-scenarios on product detail pages with matching JSON-LD

**Files:**
- Create: `src/components/ScenarioGrid.astro`
- Modify: `src/components/ProductCard.astro`
- Modify: `src/components/ProductDetail.astro`
- Modify: `src/pages/products/index.astro`
- Modify: `tests/source.test.mjs`
- Modify: `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `MicroScenario[]`, `Product`, and `getScenariosForProduct(product.slug)`.
- Produces: `<ScenarioGrid scenarios={...} compact={boolean} />` and one visible `<article data-scenario>` per scenario.
- Produces: Product and FAQPage JSON-LD arrays passed through `BaseLayout.jsonLd`.

- [ ] **Step 1: Add failing tests for scenario rendering and Product/FAQ JSON-LD**

Add source assertions:

```js
test('product detail uses the reusable scenario grid and matching FAQ data', () => {
  const detail = readFileSync(resolve(root, 'src/components/ProductDetail.astro'), 'utf8');
  const grid = readFileSync(resolve(root, 'src/components/ScenarioGrid.astro'), 'utf8');
  assert.match(detail, /getScenariosForProduct/);
  assert.match(detail, /<ScenarioGrid/);
  assert.match(detail, /'@type': 'FAQPage'/);
  assert.match(grid, /data-scenario=/);
  assert.match(grid, /询价需提供/);
});
```

Add built assertions after the product pages are rendered:

```js
test('each product page renders six owned scenarios and matching FAQPage JSON-LD', () => {
  for (const route of ['products/product-a', 'products/product-b', 'products/product-c']) {
    const html = htmlFor(route);
    assert.equal((html.match(/data-scenario=/g) ?? []).length, 6);
    assert.match(html, /"@type":"Product"/);
    assert.match(html, /"@type":"FAQPage"/);
  }
});
```

- [ ] **Step 2: Run the tests and verify they fail**

Run: `node --test tests/source.test.mjs`  
Expected: FAIL because `ScenarioGrid.astro` and scenario imports do not exist.

- [ ] **Step 3: Create `ScenarioGrid.astro`**

Implement this public interface:

```astro
---
import type { MicroScenario } from '../data/content';

interface Props {
  scenarios: MicroScenario[];
  compact?: boolean;
  linkToProduct?: boolean;
}

const { scenarios, compact = false, linkToProduct = false } = Astro.props;
---
```

Each card must render `title`, `issue`, `focus`, `candidateProduct`, and `inquiryInput`. In compact mode, show the title, issue, candidate product, and product link; in full mode show all four answer sections. Use `data-scenario={scenario.slug}` for testable markup.

- [ ] **Step 4: Update product cards and product overview**

In `ProductCard.astro`, change labels from generic “材质/工艺” to “常见原料/常见工艺”, and render the first two `selectionFocus` values as selection guidance. In `products/index.astro`, remove `PlaceholderNotice` and replace it with a visible paragraph explaining that common materials and processes are selection references while final specifications follow the order.

- [ ] **Step 5: Update `ProductDetail.astro`**

Import `ScenarioGrid` and `getScenariosForProduct`, remove `PlaceholderNotice`, and calculate:

```ts
const scenarios = getScenariosForProduct(product.slug);
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: scenarios.map((scenario) => ({
    '@type': 'Question',
    name: scenario.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: `${scenario.issue} 选型时重点确认：${scenario.focus.join('、')}。询价需提供：${scenario.inquiryInput.join('、')}。`,
    },
  })),
};
```

Pass `jsonLd={[productJsonLd, faqJsonLd]}` to `BaseLayout`. Add a “常见应用问题” section with `<ScenarioGrid scenarios={scenarios} />`. Rename “当前特点” to “选型说明” and keep all copy conditional.

- [ ] **Step 6: Build and verify source and built tests pass**

Run: `pnpm.cmd run build && node --test tests/source.test.mjs tests/dist.test.mjs`  
Expected: PASS, including six scenarios and Product/FAQPage JSON-LD on each product page.

- [ ] **Step 7: Commit the reusable scenario renderer**

```bash
git add src/components/ScenarioGrid.astro src/components/ProductCard.astro src/components/ProductDetail.astro src/pages/products/index.astro tests/source.test.mjs tests/dist.test.mjs
git commit -m "feat: add product scenario answers"
```

---

### Task 3: Replace homepage, factory, equipment, and about editorial disclaimers

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/about/index.astro`
- Modify: `src/pages/factory/index.astro`
- Modify: `src/pages/equipment/index.astro`
- Modify: `tests/source.test.mjs`
- Modify: `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `featuredScenarios` and `ScenarioGrid`.
- Produces: Six compact homepage scenario cards and four public common-order workflow cards.

- [ ] **Step 1: Add failing tests for forbidden public copy and the six-card homepage limit**

Add source assertions that scan the four page files:

```js
test('public enterprise pages contain customer-facing copy instead of editorial notes', () => {
  const relativeFiles = [
    'src/pages/index.astro',
    'src/pages/about/index.astro',
    'src/pages/factory/index.astro',
    'src/pages/equipment/index.astro',
  ];
  const source = relativeFiles.map((file) => readFileSync(resolve(root, file), 'utf8')).join('\n');
  assert.doesNotMatch(source, /资料原则|不能确认的不包装|不使用未经确认|只提供一张|仍待企业补充|不作未经核实/);
  for (const phrase of ['2004年成立，专注无纺材料供应', '从需求确认到卷材交付', '无纺布卷材生产现场']) {
    assert.match(source, new RegExp(phrase));
  }
});
```

Add built assertions:

```js
test('homepage stays concise with six featured scenario summaries', () => {
  const home = htmlFor('');
  const applications = home.match(/<section[^>]+id="applications"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((applications.match(/data-scenario=/g) ?? []).length, 6);
  assert.doesNotMatch(home, /资料原则|不能确认的不包装|不使用未经确认|只提供一张/);
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run: `node --test tests/source.test.mjs`  
Expected: FAIL on the existing editorial notes and missing approved headings.

- [ ] **Step 3: Rewrite the homepage sections**

Apply the exact approved copy from the design spec:

- About label/title: “企业概况” / “2004年成立，专注无纺材料供应”.
- Factory title: “从需求确认到卷材交付”.
- Factory photo title/caption: “无纺布卷材生产现场” and the approved visible-equipment wording.
- Applications intro: explain that six representative questions link to full product-specific answers.
- Render `<ScenarioGrid scenarios={featuredScenarios} compact linkToProduct />`.

Do not alter the seven-section continuous homepage structure.

- [ ] **Step 4: Rewrite about, factory, and equipment pages**

In `about/index.astro`, remove the paragraph about unsupported data and replace it with a service description based on uses and order specifications.

In `factory/index.astro`, replace the four placeholder cards with:

```astro
<EvidenceCard index="01" title="需求确认" description="了解产品用途、使用环境、目标尺寸和采购数量。" />
<EvidenceCard index="02" title="规格确认" description="核对材质、克重、幅宽、颜色、卷长及后续加工要求。" />
<EvidenceCard index="03" title="生产与整理" description="按确认的产品类型和规格进行加工、卷材整理与收卷。" />
<EvidenceCard index="04" title="包装与交付" description="确认包装、标签、数量、收货地址和运输安排。" />
```

Remove `PlaceholderNotice` from the factory page. In `equipment/index.astro`, use the heading “常规生产与卷材整理设备” and describe only visible material processing, roll finishing, and rewinding work.

- [ ] **Step 5: Build, run tests, and commit**

Run: `pnpm.cmd run build && node --test tests/source.test.mjs tests/dist.test.mjs`  
Expected: PASS; homepage still has seven sections and exactly six compact scenario cards.

```bash
git add src/pages/index.astro src/pages/about/index.astro src/pages/factory/index.astro src/pages/equipment/index.astro tests/source.test.mjs tests/dist.test.mjs
git commit -m "content: replace public editorial disclaimers"
```

---

### Task 4: Build the full application directory and direct-answer knowledge center

**Files:**
- Modify: `src/pages/applications/index.astro`
- Modify: `src/pages/knowledge/index.astro`
- Modify: `src/pages/knowledge/nonwoven-procurement-checklist/index.astro`
- Modify: `tests/source.test.mjs`
- Modify: `tests/dist.test.mjs`

**Interfaces:**
- Consumes: `products`, `microScenarios`, `getScenariosForProduct`, `faqItems`, and `knowledgeArticles`.
- Produces: Three application groups with six scenarios each and a knowledge index without placeholder notices.

- [ ] **Step 1: Add failing built tests for the eighteen-scenario directory and clean knowledge output**

```js
test('applications page groups all eighteen scenarios by product', () => {
  const html = htmlFor('applications');
  assert.equal((html.match(/data-scenario=/g) ?? []).length, 18);
  for (const productName of ['无纺布', '针刺布', '土工布']) {
    assert.match(html, new RegExp(`${productName}应用问题`));
  }
});

test('knowledge pages publish direct answers without public placeholders', () => {
  const rendered = `${htmlFor('knowledge')}\n${htmlFor('knowledge/nonwoven-procurement-checklist')}`;
  assert.doesNotMatch(rendered, /待企业确认|资料状态说明|补充资料/);
  for (const phrase of ['起订量会受到', '交期根据', '收货地点']) {
    assert.match(rendered, new RegExp(phrase));
  }
});
```

- [ ] **Step 2: Run the build and verify the new tests fail**

Run: `pnpm.cmd run build && node --test tests/dist.test.mjs`  
Expected: FAIL because the applications page renders six broad categories and the knowledge output still includes placeholder-oriented content.

- [ ] **Step 3: Rebuild the applications page from scenario data**

Import `products`, `getScenariosForProduct`, and `ScenarioGrid`. For each product, render a semantic section with heading `${product.displayName}应用问题` and `<ScenarioGrid scenarios={getScenariosForProduct(product.slug)} linkToProduct />`. Replace the PageHero description with:

> 按具体用途和采购问题整理无纺布、针刺布与土工布的选型重点、候选产品和询价资料。

- [ ] **Step 4: Clean the knowledge index and procurement article**

Remove `PlaceholderNotice` from `knowledge/index.astro`. Keep all six visible FAQ answers synchronized with `faqItems` and the existing FAQPage JSON-LD. Update the procurement article opening so it directly explains the checklist without saying what the company does not claim. Keep its Article JSON-LD and the six practical sections.

- [ ] **Step 5: Build, run tests, and commit**

Run: `pnpm.cmd run build && node --test tests/source.test.mjs tests/dist.test.mjs`  
Expected: PASS with eighteen application scenarios, direct FAQ answers, and no public placeholder notes.

```bash
git add src/pages/applications/index.astro src/pages/knowledge/index.astro src/pages/knowledge/nonwoven-procurement-checklist/index.astro tests/source.test.mjs tests/dist.test.mjs
git commit -m "content: publish application scene directory"
```

---

### Task 5: Full verification and browser QA

**Files:**
- Modify only if a verified defect is found: files named by the failing test or browser evidence.
- Do not commit ignored files under `work/qa`.

**Interfaces:**
- Consumes: The complete static site.
- Produces: Fresh build/test/type-check evidence and desktop/mobile screenshots.

- [ ] **Step 1: Run the complete automated verification suite**

Run:

```powershell
pnpm.cmd run build
pnpm.cmd test
pnpm.cmd run check
git diff --check
```

Expected: static build succeeds; all tests pass; Astro reports `0 errors`, `0 warnings`, and `0 hints`; `git diff --check` prints no errors.

- [ ] **Step 2: Search built public HTML for forbidden editorial copy**

Run:

```powershell
Get-ChildItem dist -Recurse -Filter *.html |
  Select-String -Pattern '待企业确认|资料原则|不能确认的不包装|不使用未经确认|只提供一张|仍待企业补充'
```

Expected: no matches. The configuration-only ICP placeholder is not rendered as content in the pages under review.

- [ ] **Step 3: Run desktop browser QA**

Run: `node work/qa/capture-desktop.mjs`  
Expected: `scrollWidth` equals `clientWidth`, all three product images have non-zero `naturalWidth`, WeChat QR has non-zero `naturalWidth`, dialog opens and closes, and `consoleErrorCount` is `0`.

Inspect:

- `work/qa/implementation-desktop-final.png`
- `work/qa/implementation-products.png`
- `work/qa/implementation-wechat-dialog.png`

Verify the homepage shows only six scenario summaries and the content does not visually overflow.

- [ ] **Step 4: Run mobile browser QA**

Run: `node work/qa/capture-mobile.mjs`  
Expected: viewport and scroll width are both `390`, mobile navigation exposes seven links, and `consoleErrorCount` is `0`.

Inspect:

- `work/qa/implementation-mobile-cdp.png`
- `work/qa/implementation-mobile-menu.png`

- [ ] **Step 5: Review repository state and commit only verified fixes**

Run: `git status --short`  
Expected: no uncommitted production files. If browser QA required a production fix, rerun all commands in Step 1 and commit only the verified fix with a focused message.

---

## Completion Checklist

- [ ] Eighteen unique micro-scenarios exist, six per product.
- [ ] Homepage shows only six featured scenario summaries.
- [ ] Product pages show only their own six scenarios.
- [ ] Applications page shows all eighteen grouped scenarios.
- [ ] Product and FAQ JSON-LD match visible content.
- [ ] No public editorial placeholders or internal notes remain.
- [ ] No unsupported enterprise claims or numerical ranges were introduced.
- [ ] Desktop/mobile layout, continuous scrolling, navigation, and WeChat interaction remain functional.
- [ ] Build, full test suite, Astro check, and diff check pass.

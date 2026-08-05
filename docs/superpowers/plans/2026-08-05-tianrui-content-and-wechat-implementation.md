# Tianrui Content and WeChat Contact Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic enterprise placeholders with verified Tianrui company information, real product categories and images, simplified equipment copy, and an accessible floating WeChat contact dialog.

**Architecture:** Keep the existing Astro static-site routes and continuous homepage. Centralize verified entity/contact data in `src/data/site.ts`, product content in `src/data/products.ts`, and place the floating WeChat interaction in a focused `WeChatContact.astro` component mounted by `BaseLayout.astro`. Preserve the three existing product route slugs to avoid route churn while changing their public names and content.

**Tech Stack:** Astro 7, TypeScript, scoped Astro CSS, native `<dialog>`, Node test runner, static JSON-LD.

## Global Constraints

- Preserve the gray-blue `#405066`, warm white `#F2F2F2`, and red accent design.
- Preserve the continuous homepage section order: hero, about, products, factory, equipment, applications, knowledge.
- Use the verified company name `广州市天瑞无纺布有限公司`, founding date `2004-06-01`, phone `13822292512`, credit code `914401017619348288`, and address `广州市白云区良田镇光明村冯坎路29号之一`.
- Remove email UI, mail links, placeholders, and Organization JSON-LD email output.
- Use only the supplied production-line, WeChat QR, and three verified product photographs.
- Do not invent production capacity, equipment models/counts, certifications, test values, customers, prices, stock, ratings, or detailed specification ranges.
- Keep unknown product specifications visibly marked with `[待企业确认：…]`.
- Retain the independent `/about/`, `/products/`, `/factory/`, `/equipment/`, `/applications/`, and `/knowledge/` routes for SEO/GEO.

---

### Task 1: Lock Verified Entity, Product, Asset, and Contact Requirements in Tests

**Files:**
- Modify: `tests/source.test.mjs`
- Modify: `tests/dist.test.mjs`
- Copy: `D:/weix/xwechat_files/wxid_exeyb1jp5hnl22_98c6/temp/RWTemp/2026-08/1ff2652b78583b4f6865f168e26c8533/6ffa6695486de9b4f5f34f19d32822e4.jpg` to `public/images/wechat-contact.jpg`
- Copy: `D:/xiazai/ac68ec65-a775-42a2-a8ce-b9fb5f9d7e98.png` to `public/images/product-nonwoven.png`
- Copy: `D:/xiazai/2d049054-6132-4793-b149-b1e362a99fbb.png` to `public/images/product-needle-punched-fabric.png`
- Copy: `D:/xiazai/5836d7be-3be5-431b-9f8e-ff43beb36750.png` to `public/images/product-geotextile.png`

**Interfaces:**
- Consumes: supplied source files and the existing built HTML test helpers.
- Produces: regression expectations for `siteConfig`, the three named products, image paths, absence of email, simplified equipment, and WeChat dialog semantics.

- [ ] **Step 1: Add failing source tests for the verified entity and assets**

Add assertions equivalent to:

```js
for (const value of [
  '广州市天瑞无纺布有限公司',
  '天瑞无纺布',
  '2004-06-01',
  '914401017619348288',
  '13822292512',
  '广州市白云区良田镇光明村冯坎路29号之一',
]) assert.match(siteSource, new RegExp(value));

assert.doesNotMatch(siteSource, /email:/);
for (const file of ['wechat-contact.jpg', 'product-nonwoven.png', 'product-needle-punched-fabric.png', 'product-geotextile.png']) {
  assert.equal(existsSync(resolve(root, 'public/images', file)), true);
}
```

- [ ] **Step 2: Add failing distribution tests for product names, contact behavior, and equipment simplification**

Assert that the built homepage and product pages contain `无纺布`, `针刺布`, and `土工布`; contain a `tel:13822292512` link; contain no `mailto:` or `邮箱`; expose a dialog labeled `微信咨询`; and that the equipment page contains neither `设备型号` nor `设备数量`.

- [ ] **Step 3: Run the tests and verify the expected failure**

Run:

```powershell
pnpm.cmd run build
node --test tests/source.test.mjs tests/dist.test.mjs
```

Expected: failures for the old placeholder company data, missing image assets, old product names, email UI, and detailed equipment cards.

- [ ] **Step 4: Copy the four verified assets without transforming their bytes**

Use `Copy-Item -LiteralPath` for each exact source and destination path. Confirm each destination exists and has a non-zero byte length.

- [ ] **Step 5: Commit the red tests and source assets**

```powershell
git add tests/source.test.mjs tests/dist.test.mjs public/images
git commit -m "test: define verified tianrui content"
```

---

### Task 2: Replace Site Identity and Add the WeChat Contact Component

**Files:**
- Modify: `src/data/site.ts`
- Create: `src/components/WeChatContact.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/ContactPanel.astro`
- Modify: `src/components/SiteFooter.astro`

**Interfaces:**
- Consumes: `siteConfig.phone`, `siteConfig.wechatQrImage`, and the copied QR asset.
- Produces: `WeChatContact.astro` with a `.wechat-float` trigger and native dialog `#wechat-contact-dialog` mounted on every route.

- [ ] **Step 1: Replace placeholder company fields in `siteConfig`**

Use this shape:

```ts
export const siteConfig = {
  siteUrl: 'https://www.example.com/',
  companyName: '广州市天瑞无纺布有限公司',
  shortName: '天瑞无纺布',
  tagline: '广州无纺布、针刺布与土工布生产供应',
  foundedAt: '2004-06-01',
  creditCode: '914401017619348288',
  companyType: '有限责任公司（自然人投资或控股）',
  registeredAddress: '广州市白云区良田镇光明村冯坎路29号之一',
  factoryAddress: '广州市白云区良田镇光明村冯坎路29号之一',
  phone: '13822292512',
  wechatQrImage: '/images/wechat-contact.jpg',
  icpNumber: '[待企业确认：ICP备案号]',
  description: '广州市天瑞无纺布有限公司成立于2004年，主要提供无纺布、针刺布与土工布产品，具体规格与供货要求以沟通确认为准。',
} as const;
```

Remove the `email` property entirely.

- [ ] **Step 2: Implement `WeChatContact.astro` with accessible native dialog behavior**

Render a fixed button with `aria-haspopup="dialog"` and `aria-controls="wechat-contact-dialog"`. Render `<dialog id="wechat-contact-dialog" aria-labelledby="wechat-dialog-title">`, the exact QR image, a close button, and phone fallback. Use `showModal()`, `close()`, backdrop click detection, and the dialog's native Escape behavior. Add `body:has(dialog[open]) { overflow: hidden; }` in scoped global CSS or toggle a class in the component script.

- [ ] **Step 3: Mount the WeChat component once in `BaseLayout.astro`**

Import `WeChatContact` and place `<WeChatContact />` after `<SiteFooter />`. Update Organization JSON-LD to add `foundingDate: siteConfig.foundedAt` and remove the entire conditional email block.

- [ ] **Step 4: Replace email actions with WeChat and phone actions**

In `ContactPanel.astro`, retain the phone button and replace the mail action with a button that opens the same dialog via `document.getElementById('wechat-contact-dialog')?.showModal()`. In `SiteFooter.astro`, delete the email list item and add `微信：扫码添加好友` plus the verified credit code.

- [ ] **Step 5: Run focused tests and commit**

```powershell
pnpm.cmd run build
node --test tests/source.test.mjs tests/dist.test.mjs
git add src/data/site.ts src/components/WeChatContact.astro src/layouts/BaseLayout.astro src/components/ContactPanel.astro src/components/SiteFooter.astro
git commit -m "feat: add verified identity and wechat contact"
```

Expected: entity/contact tests pass; product and equipment tests may remain red.

---

### Task 3: Convert the Three Product Templates to Real Named Product Pages

**Files:**
- Modify: `src/data/products.ts`
- Modify: `src/components/ProductCard.astro`
- Modify: `src/components/ProductShowcase.astro`
- Modify: `src/components/ProductDetail.astro`
- Modify: `src/pages/products/index.astro`

**Interfaces:**
- Consumes: the existing `Product` interface and three stable route slugs `product-a`, `product-b`, `product-c`.
- Produces: `Product.image`, `Product.imageAlt`, real public names, neutral definitions, common uses, and honest unknown specification values.

- [ ] **Step 1: Extend `Product` with image fields**

Add:

```ts
image: string;
imageAlt: string;
```

Use the stable mapping:

```ts
product-a -> 无纺布 -> /images/product-nonwoven.png
product-b -> 针刺布 -> /images/product-needle-punched-fabric.png
product-c -> 土工布 -> /images/product-geotextile.png
```

- [ ] **Step 2: Replace generic product content with neutral factual copy**

Use real display names for both `displayName` and `confirmedName`. Describe common applications without implying completed cases. Keep material, process variants, specification ranges, packaging, MOQ, lead time, and customization limits marked with product-specific `[待企业确认：…]` values.

- [ ] **Step 3: Add real product images to cards and detail pages**

In `ProductCard.astro`, render a linked image above the text with a fixed 1:1 card crop and `object-fit: cover`. In `ProductDetail.astro`, render the image in the introduction area with its full aspect ratio, and change the placeholder notice to state that the photo and category are confirmed while detailed parameters remain pending.

- [ ] **Step 4: Update product page metadata and JSON-LD**

Change the products index description to name all three categories. In `ProductDetail.astro`, set Product JSON-LD `name` to `product.displayName`, `image` to an absolute URL, `category` to `product.displayName`, and omit offers, ratings, prices, and inventory.

- [ ] **Step 5: Run product tests and commit**

```powershell
pnpm.cmd run build
node --test tests/source.test.mjs tests/dist.test.mjs
git add src/data/products.ts src/components/ProductCard.astro src/components/ProductShowcase.astro src/components/ProductDetail.astro src/pages/products/index.astro
git commit -m "feat: publish three verified product categories"
```

Expected: product name, image, metadata, and JSON-LD tests pass.

---

### Task 4: Update Continuous Homepage, About Page, Equipment Copy, and Knowledge Content

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/about/index.astro`
- Modify: `src/pages/equipment/index.astro`
- Modify: `src/data/content.ts`

**Interfaces:**
- Consumes: verified `siteConfig`, named `products`, and existing continuous section anchors.
- Produces: factual entity copy, three image-backed product cards, concise equipment copy, and GEO-oriented FAQ/application content.

- [ ] **Step 1: Update the homepage entity and product narrative**

Keep exactly seven sections and the existing IDs. Change the hero and about section to name Tianrui, Guangzhou, the 2004 founding year, and the three product categories. Preserve the production-line hero image and gray-blue overlay.

- [ ] **Step 2: Make the product cards the primary evidence in the product section**

Continue rendering `products.map(ProductCard)` and update the section intro to explain that the three photographs are actual products while concrete specifications require confirmation.

- [ ] **Step 3: Simplify both homepage and detail equipment content**

Replace the homepage equipment card grid with one concise paragraph and a link to `/equipment/`. On the equipment page, retain the production-line photograph and use one prose block explaining that standard production and auxiliary equipment support processing and roll handling; remove the model/count table, equipment list, and request for manufacturer/model/count details.

- [ ] **Step 4: Update About with verified registration fields**

Show company name, founding date, credit code, company type, registered address, factory address, phone, and registered business-scope summary. Do not show the full license scan, legal representative, registered capital, or old license number.

- [ ] **Step 5: Refine applications and FAQ for the three products**

In `src/data/content.ts`, connect common use cases to the three categories using neutral language. Keep MOQ, sampling, lead-time, packaging, transport, and customization answers honest: company-specific policies remain marked as awaiting confirmation.

- [ ] **Step 6: Run the full test set and commit**

```powershell
pnpm.cmd run build
pnpm.cmd test
git add src/pages/index.astro src/pages/about/index.astro src/pages/equipment/index.astro src/data/content.ts
git commit -m "content: tailor tianrui enterprise and geo copy"
```

Expected: all content and equipment assertions pass.

---

### Task 5: Final Static, Accessibility, and Responsive Verification

**Files:**
- Modify if required by failures: files touched in Tasks 2-4
- Test: `tests/source.test.mjs`
- Test: `tests/dist.test.mjs`

**Interfaces:**
- Consumes: the complete Tianrui site implementation.
- Produces: a clean feature branch with build, test, type, interaction, and responsive evidence.

- [ ] **Step 1: Run all automated verification from a clean build**

```powershell
pnpm.cmd run build
pnpm.cmd test
pnpm.cmd run check
git diff --check
```

Expected: Astro builds 12 pages; all Node tests pass; Astro reports 0 errors, 0 warnings, and 0 hints; Git reports no whitespace errors.

- [ ] **Step 2: Verify the generated HTML requirements**

Inspect `dist/index.html`, `dist/about/index.html`, `dist/equipment/index.html`, and all three product detail pages for verified company fields, image paths, telephone link, JSON-LD, absence of email, and absence of equipment model/count claims.

- [ ] **Step 3: Verify the chosen in-app browser manually**

Open `http://127.0.0.1:4321/`. At desktop and narrow mobile widths, verify continuous scrolling, anchor navigation, product image crops, phone links, floating WeChat placement, dialog open/close/backdrop/Escape behavior, no horizontal overflow, and no obstruction of the footer or knowledge content.

- [ ] **Step 4: Commit any verification fixes and confirm clean status**

```powershell
git add src tests
git commit -m "fix: polish tianrui responsive contact experience"
git status --short
```

Skip the commit if Step 3 requires no code changes. Expected final status: no uncommitted files.

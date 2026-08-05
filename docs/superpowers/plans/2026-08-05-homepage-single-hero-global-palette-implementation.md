# Homepage Single Hero and Global Palette Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reduce the homepage to one image-led hero followed directly by the footer, while replacing the green/yellow site palette with gray-blue, warm white, and restrained red.

**Architecture:** Keep all existing content routes intact and simplify only `src/pages/index.astro`. Move palette ownership into global CSS variables so existing components inherit the new colors without duplicating page-specific overrides. Verify the built HTML and CSS so the homepage structure, route content, scrolling behavior, and color tokens are tested at the static output boundary.

**Tech Stack:** Astro 7 static generation, TypeScript, CSS custom properties, Node test runner.

## Global Constraints

- Homepage contains only the status/header shell, one immersive hero, and the shared footer.
- Hero contains only the supplied production-line image, positioning title, and short description.
- Applications, FAQ, material-status notices, and inquiry panels remain available on their existing interior routes and do not appear on the homepage.
- Primary gray-blue is exactly `#405066`; warm white is exactly `#F2F2F2`; red emphasis is exactly `#B8322A`.
- No green or yellow palette values remain in site source CSS or theme-color metadata.
- Scrolling stays native and continuous; use smooth scrolling without scroll snapping or wheel interception.
- Respect `prefers-reduced-motion` by restoring `scroll-behavior: auto`.
- Do not invent enterprise facts, product data, certifications, capacity, equipment models, or quality figures.

---

### Task 1: Lock Homepage Structure and Palette with Failing Tests

**Files:**
- Modify: `tests/dist.test.mjs`
- Modify: `tests/source.test.mjs`

**Interfaces:**
- Consumes: Astro's `dist/index.html` and emitted CSS assets.
- Produces: regression assertions for the single-hero homepage, retained interior content, global palette, and natural scrolling.

- [ ] **Step 1: Write the failing built-output assertions**

Add assertions that the homepage contains the immersive hero but not `.button-row`, `.immersive-hero__caption`, `.homepage-continuation`, capability/application/FAQ copy, `PlaceholderNotice`, or `ContactPanel`; ensure the homepage hero is followed by the shared footer in output. Assert that `/applications/`, `/knowledge/`, and `/products/` still render their assigned content.

- [ ] **Step 2: Write the failing palette and motion assertions**

Assert that emitted CSS and layout metadata contain `#405066`, `#f2f2f2`, and `#b8322a`, do not contain `#174d3b`, `#0d3529`, `#d2a72d`, or `scroll-snap-type`, and include a reduced-motion override setting scroll behavior to auto.

- [ ] **Step 3: Run the tests to verify RED**

Run: `pnpm.cmd run build; node --test tests/source.test.mjs tests/dist.test.mjs`

Expected: failures identify the current homepage buttons/content and the old green/yellow global variables.

- [ ] **Step 4: Commit the failing tests**

```powershell
git add tests/dist.test.mjs tests/source.test.mjs
git commit -m "test: define single-hero homepage palette"
```

### Task 2: Simplify the Homepage to One Essential Hero

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `siteConfig`, and `/images/nonwoven-production-line.png`.
- Produces: one `.immersive-hero` section with image, eyebrow, `h1`, and description only.

- [ ] **Step 1: Remove homepage-only content imports and markup**

Remove `EvidenceCard`, `PlaceholderNotice`, `ContactPanel`, `applications`, and `faqItems`. Delete buttons, photo caption, capability cards, applications, FAQ, status notice, and inquiry panel from the homepage.

- [ ] **Step 2: Remove obsolete homepage styles**

Delete button, caption, continuation, FAQ, card-grid, and obsolete mobile rules. Size the hero with `min-height: calc(100svh - var(--site-header-height, 112px))` and retain the supplied photo, gray-blue overlay, title hierarchy, and responsive crop.

- [ ] **Step 3: Run focused tests to verify the homepage structure passes**

Run: `pnpm.cmd run build; node --test tests/source.test.mjs tests/dist.test.mjs`

Expected: homepage structure assertions pass; palette assertions may remain red until Task 3.

- [ ] **Step 4: Commit the homepage simplification**

```powershell
git add src/pages/index.astro
git commit -m "refactor: reduce homepage to immersive hero"
```

### Task 3: Replace the Global Green/Yellow Palette

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/components/SiteHeader.astro`
- Modify: `src/components/SiteFooter.astro`
- Modify: `src/components/ContactPanel.astro`
- Modify: `src/components/EvidenceCard.astro`
- Modify: `src/components/PlaceholderNotice.astro`

**Interfaces:**
- Consumes: existing semantic variables such as `--color-forest`, `--color-forest-dark`, and `--color-accent`.
- Produces: new gray-blue/warm-white/red values inherited throughout all routes without changing component APIs.

- [ ] **Step 1: Remap global variables and motion behavior**

Set `--color-forest: #405066`, `--color-forest-dark: #303d50`, `--color-forest-soft: #dfe4ea`, `--color-warm-gray: #f2f2f2`, `--color-paper: #ffffff`, `--color-ink: #20262d`, `--color-muted: #5d6771`, `--color-line: #d6d9dd`, and `--color-accent: #b8322a`. Add a reduced-motion media query that sets `html { scroll-behavior: auto; }`.

- [ ] **Step 2: Replace component-local green-tinted neutrals**

Change header/footer/contact/card muted colors to neutral gray-blue equivalents and remove yellow highlight values. Keep component structure and accessibility contrast intact.

- [ ] **Step 3: Update browser theme metadata**

Change `theme-color` in `BaseLayout.astro` to `#405066`.

- [ ] **Step 4: Run all automated checks to verify GREEN**

Run: `pnpm.cmd run build; pnpm.cmd test; pnpm.cmd run check`

Expected: build succeeds, all tests pass, and Astro reports zero errors, warnings, and hints.

- [ ] **Step 5: Commit the global palette**

```powershell
git add src/styles/global.css src/layouts/BaseLayout.astro src/components/SiteHeader.astro src/components/SiteFooter.astro src/components/ContactPanel.astro src/components/EvidenceCard.astro src/components/PlaceholderNotice.astro
git commit -m "style: apply gray-blue site palette"
```

### Task 4: Browser and Design QA

**Files:**
- Modify: `design-qa.md`

**Interfaces:**
- Consumes: local preview at `http://127.0.0.1:4321/` and the supplied industrial reference image.
- Produces: desktop/mobile evidence and a final `passed` or `blocked` report.

- [ ] **Step 1: Capture desktop and mobile homepage states**

Verify the page contains one hero followed immediately by the footer, has no horizontal overflow, and the browser console reports zero errors.

- [ ] **Step 2: Verify interior content routes**

Open `/products/`, `/applications/`, and `/knowledge/` to ensure reassigned content remains reachable and uses the global gray-blue/warm-white palette.

- [ ] **Step 3: Compare reference and implementation in one visual input**

Place the source industrial reference and current homepage capture together, then check typography, spacing, tokens, photo quality, and copy. Fix any P0/P1/P2 issues and repeat the comparison.

- [ ] **Step 4: Update QA report and run final verification**

Record viewport, dimensions, interaction checks, console status, comparison history, and exact `final result: passed` or `final result: blocked` in `design-qa.md`. Run `git diff --check; pnpm.cmd run build; pnpm.cmd test; pnpm.cmd run check`.

- [ ] **Step 5: Commit verified output**

```powershell
git add design-qa.md
git commit -m "docs: verify single-hero homepage"
```

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const siteDataPath = resolve(root, 'src/data/site.ts');

test('site data exposes one product introduction navigation target', () => {
  assert.equal(existsSync(siteDataPath), true, 'src/data/site.ts should exist');
  const source = readFileSync(siteDataPath, 'utf8');
  const expectedPaths = ['/', '/#about', '/#products', '/#factory', '/#equipment', '/#applications', '/#knowledge'];

  for (const path of expectedPaths) {
    assert.match(source, new RegExp(`href:\\s*['\"]${path.replaceAll('/', '\\/')}['\"]`));
  }

  assert.match(source, /label:\s*['"]产品中心['"]\s*,\s*href:\s*['"]\/#products['"]/);
  assert.doesNotMatch(source, /质量检测|\/quality\//);
  assert.doesNotMatch(source, /href:\s*['"]\/products\/product-[abc]\//);
});

test('site data exposes explicit placeholders and no unsupported claims', () => {
  assert.equal(existsSync(siteDataPath), true, 'src/data/site.ts should exist');
  const source = readFileSync(siteDataPath, 'utf8');

  assert.match(source, /\[待企业确认：企业法定名称\]/);
  assert.match(source, /https:\/\/www\.example\.com/);
  assert.doesNotMatch(source, /行业领先|全球领先|年产\s*\d|通过\s*ISO/);
});

test('industrial design shell and supplied production photo are present', () => {
  const cssPath = resolve(root, 'src/styles/global.css');
  const layoutPath = resolve(root, 'src/layouts/BaseLayout.astro');
  const headerPath = resolve(root, 'src/components/SiteHeader.astro');
  const sourceImage = 'C:/Users/qxy12/Downloads/eca05cd7-b936-4479-8a99-cad67b454b40.png';
  const projectImage = resolve(root, 'public/images/nonwoven-production-line.png');

  for (const file of [cssPath, layoutPath, headerPath, projectImage]) {
    assert.equal(existsSync(file), true, `${file} should exist`);
  }

  const css = readFileSync(cssPath, 'utf8');
  const layout = readFileSync(layoutPath, 'utf8');
  const header = readFileSync(headerPath, 'utf8');
  assert.match(css, /--color-forest\s*:/);
  assert.match(css, /--color-warm-gray\s*:/);
  assert.match(css, /--color-accent\s*:/);
  assert.match(layout, /class="skip-link"/);
  assert.match(header, /aria-controls="primary-navigation"/);
  assert.match(header, /aria-expanded="false"/);

  const digest = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
  assert.equal(digest(projectImage), digest(sourceImage), 'project photo should preserve source bytes');
});

test('product and evidence content cover real procurement decisions', () => {
  const productsPath = resolve(root, 'src/data/products.ts');
  const contentPath = resolve(root, 'src/data/content.ts');
  assert.equal(existsSync(productsPath), true, 'src/data/products.ts should exist');
  assert.equal(existsSync(contentPath), true, 'src/data/content.ts should exist');

  const products = readFileSync(productsPath, 'utf8');
  const content = readFileSync(contentPath, 'utf8');
  for (const slug of ['product-a', 'product-b', 'product-c']) {
    assert.match(products, new RegExp(`slug:\\s*['\"]${slug}['\"]`));
  }
  for (const field of ['material', 'process', 'specifications', 'applications', 'purchaseChecklist']) {
    assert.match(products, new RegExp(`${field}:`));
  }
  for (const topic of ['MOQ', '打样', '交期', '包装', '运输', '定制']) {
    assert.match(content, new RegExp(topic));
  }
  assert.doesNotMatch(`${products}\n${content}`, /行业领先|全球领先|年产\s*\d|通过\s*ISO/);
});

test('content components keep specifications and contact details honest', () => {
  for (const relative of [
    'src/components/ProductCard.astro',
    'src/components/EvidenceCard.astro',
    'src/components/SpecTable.astro',
    'src/components/ContactPanel.astro',
  ]) {
    assert.equal(existsSync(resolve(root, relative)), true, `${relative} should exist`);
  }
  const contact = readFileSync(resolve(root, 'src/components/ContactPanel.astro'), 'utf8');
  assert.match(contact, /isConfirmedValue/);
  assert.match(contact, /tel:/);
  assert.match(contact, /mailto:/);
});

test('JSON-LD is emitted as an explicit inline data script', () => {
  const jsonLd = readFileSync(resolve(root, 'src/components/JsonLd.astro'), 'utf8');
  assert.match(jsonLd, /<script\s+is:inline\s+type="application\/ld\+json"/);
});

test('layout declares an existing temporary favicon asset', () => {
  const layout = readFileSync(resolve(root, 'src/layouts/BaseLayout.astro'), 'utf8');
  assert.match(layout, /rel="icon"[^>]+href="\/images\/nonwoven-production-line\.png"/);
});

test('global shell includes safeguards against horizontal overflow', () => {
  const globalCss = readFileSync(resolve(root, 'src/styles/global.css'), 'utf8');
  const header = readFileSync(resolve(root, 'src/components/SiteHeader.astro'), 'utf8');
  assert.match(globalCss, /overflow-x:\s*clip/);
  assert.match(header, /\.menu-button\s*{[^}]*flex-shrink:\s*0/s);
});

test('all requested routes have semantic page sources', () => {
  const pages = [
    ['src/pages/index.astro', '生产现场'],
    ['src/pages/about/index.astro', '企业介绍'],
    ['src/pages/factory/index.astro', '工厂实力'],
    ['src/pages/equipment/index.astro', '生产设备'],
    ['src/pages/products/index.astro', 'ProductShowcase'],
    ['src/pages/products/product-a/index.astro', 'product-a'],
    ['src/pages/products/product-b/index.astro', 'product-b'],
    ['src/pages/products/product-c/index.astro', 'product-c'],
    ['src/pages/applications/index.astro', '应用场景'],
    ['src/pages/knowledge/index.astro', '知识库'],
    ['src/pages/404.astro', '返回首页'],
  ];

  for (const [relative, expected] of pages) {
    const path = resolve(root, relative);
    assert.equal(existsSync(path), true, `${relative} should exist`);
    const source = readFileSync(path, 'utf8');
    assert.match(source, /<h1|<PageHero|<ProductDetail|<ProductShowcase/);
    assert.match(source, new RegExp(expected));
  }

  const home = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
  const equipment = readFileSync(resolve(root, 'src/pages/equipment/index.astro'), 'utf8');
  assert.match(home, /nonwoven-production-line\.png/);
  assert.match(equipment, /现场照片/);
  assert.equal(existsSync(resolve(root, 'src/pages/quality/index.astro')), false);
});

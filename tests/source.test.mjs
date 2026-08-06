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

test('site data exposes verified Tianrui identity and no unsupported claims', () => {
  assert.equal(existsSync(siteDataPath), true, 'src/data/site.ts should exist');
  const source = readFileSync(siteDataPath, 'utf8');

  for (const value of [
    '广州市天瑞无纺布有限公司',
    '天瑞无纺布',
    '2004-06-01',
    '914401017619348288',
    '13822292512',
    '广州市白云区良田镇光明村冯坎路29号之一',
  ]) {
    assert.match(source, new RegExp(value));
  }
  assert.doesNotMatch(source, /email\s*:/);
  assert.match(source, /https:\/\/www\.example\.com/);
  assert.doesNotMatch(source, /行业领先|全球领先|年产\s*\d|通过\s*ISO/);
});

test('verified product and WeChat image assets are present', () => {
  for (const file of [
    'wechat-contact.jpg',
    'product-nonwoven.png',
    'product-needle-punched-fabric.png',
    'product-geotextile.png',
  ]) {
    const path = resolve(root, 'public/images', file);
    assert.equal(existsSync(path), true, `${file} should exist`);
  }
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
  for (const productName of ['无纺布', '针刺布', '土工布']) {
    assert.match(products, new RegExp(productName));
  }
  for (const image of ['product-nonwoven.png', 'product-needle-punched-fabric.png', 'product-geotextile.png']) {
    assert.match(products, new RegExp(image.replace('.', '\\.')));
  }
  for (const topic of ['MOQ', '打样', '交期', '包装', '运输', '定制']) {
    assert.match(content, new RegExp(topic));
  }
  assert.doesNotMatch(`${products}\n${content}`, /行业领先|全球领先|年产\s*\d|通过\s*ISO/);
});

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
  for (const phrase of ['行业常见原料', 'selectionFocus', '开松混合', '梳理成网', '针刺加固']) {
    assert.match(products, new RegExp(phrase));
  }
  for (const topic of ['起订量会受到', '交期根据', '包装方式需要', '收货地点']) {
    assert.match(content, new RegExp(topic));
  }
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
  assert.match(contact, /data-wechat-open/);
  assert.doesNotMatch(contact, /mailto:/);
});

test('product detail uses a reusable scenario grid and matching FAQ data', () => {
  const detail = readFileSync(resolve(root, 'src/components/ProductDetail.astro'), 'utf8');
  const gridPath = resolve(root, 'src/components/ScenarioGrid.astro');
  assert.equal(existsSync(gridPath), true, 'ScenarioGrid.astro should render shared scenario data');
  const grid = readFileSync(gridPath, 'utf8');
  assert.match(detail, /getScenariosForProduct/);
  assert.match(detail, /<ScenarioGrid/);
  assert.match(detail, /'@type': 'FAQPage'/);
  assert.match(grid, /data-scenario=/);
  assert.match(grid, /询价需提供/);
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

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const htmlFor = (route) => readFileSync(resolve(dist, route, 'index.html'), 'utf8');
const builtCss = () => readdirSync(resolve(dist, '_astro'))
  .filter((file) => file.endsWith('.css'))
  .map((file) => readFileSync(resolve(dist, '_astro', file), 'utf8'))
  .join('\n');

const routes = [
  '',
  'about',
  'factory',
  'equipment',
  'products',
  'products/product-a',
  'products/product-b',
  'products/product-c',
  'applications',
  'knowledge',
  'knowledge/nonwoven-procurement-checklist',
];

test('static build contains all routes and unique metadata', () => {
  assert.equal(existsSync(dist), true, 'dist should exist after build');
  const titles = new Set();
  for (const route of routes) {
    const file = resolve(dist, route, 'index.html');
    assert.equal(existsSync(file), true, `${route || '/'} should build`);
    const html = readFileSync(file, 'utf8');
    const title = html.match(/<title>(.*?)<\/title>/)?.[1];
    assert.ok(title, `${route || '/'} should have a title`);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    assert.match(html, /<link rel="canonical" href="https:\/\/www\.example\.com\/[^"]*"/);
  }
  assert.equal(titles.size, routes.length, 'every route should have a unique title');
  assert.equal(existsSync(resolve(dist, 'quality', 'index.html')), false, 'quality route should be removed');
});

test('navigation follows the simplified small-enterprise information architecture', () => {
  const home = htmlFor('');
  const navigation = home.match(/<nav\b[\s\S]*?<\/nav>/)?.[0] ?? '';
  const labels = [...navigation.matchAll(/<a\b[^>]*>([^<]+)<\/a>/g)].map((item) => item[1].trim());
  assert.deepEqual(labels, ['首页', '关于我们', '产品中心', '工厂实力', '生产设备', '应用领域', '知识中心']);
  for (const target of ['#about', '#products', '#factory', '#equipment', '#applications', '#knowledge']) {
    assert.match(navigation, new RegExp(`href="\/${target}"`));
  }
  assert.doesNotMatch(home, /href="\/quality\/"|质量检测/);
});

test('structured data matches page intent', () => {
  assert.match(htmlFor(''), /"@type":"Organization"/);
  assert.match(htmlFor('products/product-a'), /"@type":"Product"/);
  assert.match(htmlFor('products/product-a'), /"@type":"BreadcrumbList"/);
  assert.match(htmlFor('knowledge'), /"@type":"FAQPage"/);
  assert.match(htmlFor('knowledge/nonwoven-procurement-checklist'), /"@type":"Article"/);
});

test('robots and sitemap are deployment-ready', () => {
  const robotsPath = resolve(dist, 'robots.txt');
  assert.equal(existsSync(robotsPath), true, 'robots.txt should build');
  const robots = readFileSync(robotsPath, 'utf8');
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/www\.example\.com\/sitemap-index\.xml/);
  assert.equal(existsSync(resolve(dist, 'sitemap-index.xml')), true, 'sitemap index should build');
});

test('homepage presents every primary module as one continuous document', () => {
  const home = htmlFor('');
  const main = home.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  const productsPage = htmlFor('products');
  assert.match(main, /class="immersive-hero"/);
  assert.equal((main.match(/<section\b/g) ?? []).length, 7, 'homepage should render the hero plus six modules');
  const ids = [...main.matchAll(/<section\b[^>]*id="([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, ['about', 'products', 'factory', 'equipment', 'applications', 'knowledge']);
  assert.doesNotMatch(main, /class="product-showcase/);
  assert.match(main, /src="\/images\/nonwoven-production-line\.png"/);
  assert.match(main, /关于我们|产品中心|工厂实力|生产设备|应用领域|知识中心/);
  assert.doesNotMatch(main, /质量检测|质量流程/);
  assert.match(productsPage, /class="product-showcase/);
  assert.match(productsPage, /data-product-filter="all"[^>]+aria-pressed="true"/);
  assert.match(productsPage, /id="product-a"[^>]+data-product-card="product-a"/);
  assert.match(productsPage, /scrollIntoView/);
});

test('homepage stays concise with six featured scenario summaries', () => {
  const home = htmlFor('');
  const applications = home.match(/<section[^>]+id="applications"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.equal((applications.match(/data-scenario=/g) ?? []).length, 6);
  assert.doesNotMatch(home, /资料原则|不能确认的不包装|不使用未经确认|只提供一张/);
});

test('homepage uses verifiable facts and actionable inquiry inputs', () => {
  const home = htmlFor('');
  for (const phrase of ['成立于2004年', '参考样品或图片', '设备型号不代替产品参数']) {
    assert.match(home, new RegExp(phrase));
  }
});

test('applications page groups all eighteen scenarios by product', () => {
  const html = htmlFor('applications');
  assert.equal((html.match(/data-scenario=/g) ?? []).length, 18);
  for (const productName of ['无纺布', '针刺布', '土工布']) {
    assert.match(html, new RegExp(`${productName}应用问题`));
  }
});

test('knowledge pages publish direct answers without public placeholders', () => {
  const mainFor = (route) => htmlFor(route).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  const rendered = `${mainFor('knowledge')}\n${mainFor('knowledge/nonwoven-procurement-checklist')}`;
  assert.doesNotMatch(rendered, /待企业确认|资料状态说明|补充资料|不代表任何企业/);
  for (const phrase of ['起订量会受到', '交期根据', '收货地点']) {
    assert.match(rendered, new RegExp(phrase));
  }
});

test('interior routes retain applications, knowledge, product guidance, and inquiry content', () => {
  const products = htmlFor('products');
  const productsMain = products.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '';
  assert.match(htmlFor('applications'), /应用场景/);
  assert.match(htmlFor('knowledge'), /常见问题|FAQ/);
  assert.match(productsMain, /选型说明/);
  assert.doesNotMatch(productsMain, /资料状态说明|待企业确认/);
  assert.match(productsMain, /询价准备/);
});

test('rendered site publishes verified Tianrui identity and phone without email', () => {
  const rendered = [htmlFor(''), htmlFor('about'), htmlFor('products'), htmlFor('equipment')].join('\n');
  for (const value of [
    '广州市天瑞无纺布有限公司',
    '2004-06-01',
    '914401017619348288',
    '广州市白云区良田镇光明村冯坎路29号之一',
  ]) {
    assert.match(rendered, new RegExp(value));
  }
  assert.match(rendered, /href="tel:13822292512"/);
  assert.doesNotMatch(rendered, /mailto:|邮箱/);
});

test('rendered site exposes three verified products with real photographs', () => {
  const home = htmlFor('');
  const productPages = [htmlFor('products/product-a'), htmlFor('products/product-b'), htmlFor('products/product-c')].join('\n');
  for (const productName of ['无纺布', '针刺布', '土工布']) {
    assert.match(`${home}\n${productPages}`, new RegExp(productName));
  }
  for (const image of ['product-nonwoven.png', 'product-needle-punched-fabric.png', 'product-geotextile.png']) {
    assert.match(`${home}\n${productPages}`, new RegExp(`/images/${image.replace('.', '\\.')}`));
  }
});

test('each product page renders six owned scenarios and matching FAQPage JSON-LD', () => {
  for (const route of ['products/product-a', 'products/product-b', 'products/product-c']) {
    const html = htmlFor(route);
    assert.equal((html.match(/data-scenario=/g) ?? []).length, 6);
    assert.match(html, /"@type":"Product"/);
    assert.match(html, /"@type":"FAQPage"/);
  }
});

test('product pages publish distinct selection boundaries without unsupported claims', () => {
  const pages = {
    nonwoven: htmlFor('products/product-a'),
    needlePunched: htmlFor('products/product-b'),
    geotextile: htmlFor('products/product-c'),
  };

  for (const html of Object.values(pages)) {
    assert.match(html, /选型边界/);
    assert.doesNotMatch(html, /年产\s*\d|服务\s*\d+\s*家|通过\s*ISO|行业领先|全球领先/);
  }

  assert.match(pages.nonwoven, /不能只按产品名称/);
  assert.match(pages.needlePunched, /不能只凭厚度或手感/);
  assert.match(pages.geotextile, /不能只按克重/);
});

test('WeChat contact is accessible', () => {
  const home = htmlFor('');
  assert.match(home, /aria-haspopup="dialog"/);
  assert.match(home, /<dialog[^>]+id="wechat-contact-dialog"[^>]+aria-labelledby="wechat-dialog-title"/);
  assert.match(home, /src="\/images\/wechat-contact\.jpg"/);
  assert.match(home, /微信咨询|扫码添加好友/);
});

test('equipment copy stays concise', () => {
  const equipment = htmlFor('equipment');
  assert.doesNotMatch(equipment, /设备型号|设备数量/);
});

test('site ships the gray-blue palette and native continuous scrolling', () => {
  const renderedAssets = `${htmlFor('')}\n${htmlFor('products')}\n${builtCss()}`.toLowerCase();
  assert.match(renderedAssets, /--showcase-red:\s*#b8322a/i);
  assert.match(renderedAssets, /--showcase-slate:\s*#405066/i);
  assert.match(renderedAssets, /--color-forest:\s*#405066/i);
  assert.match(renderedAssets, /--color-warm-gray:\s*#f2f2f2/i);
  assert.match(renderedAssets, /--color-accent:\s*#b8322a/i);
  assert.doesNotMatch(renderedAssets, /#174d3b|#0d3529|#d2a72d/);
  assert.match(renderedAssets, /scroll-behavior:\s*smooth/);
  assert.match(renderedAssets, /prefers-reduced-motion/);
  assert.match(renderedAssets, /scroll-behavior:\s*auto/);
  assert.doesNotMatch(renderedAssets, /scroll-snap-type/);
  assert.match(renderedAssets, /linear-gradient/);
  assert.match(htmlFor(''), /<meta name="theme-color" content="#405066"/i);
});

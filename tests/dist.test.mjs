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
  'quality',
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

test('homepage contains one essential hero followed directly by the footer', () => {
  const home = htmlFor('');
  const productsPage = htmlFor('products');
  assert.match(home, /class="immersive-hero"/);
  assert.equal((home.match(/<section\b/g) ?? []).length, 1, 'homepage should render one content section');
  assert.match(home, /<\/section>\s*<\/main>\s*<footer\b/);
  assert.doesNotMatch(home, /class="product-showcase/);
  assert.match(home, /src="\/images\/nonwoven-production-line\.png"/);
  assert.doesNotMatch(home, /class="button-row"|class="immersive-hero__caption"|class="homepage-continuation"/);
  assert.doesNotMatch(home, /能力证据|应用场景|常见问题|资料状态说明|询价准备/);
  assert.match(productsPage, /class="product-showcase/);
  assert.match(productsPage, /data-product-filter="all"[^>]+aria-pressed="true"/);
  assert.match(productsPage, /id="product-a"[^>]+data-product-card="product-a"/);
  assert.match(productsPage, /scrollIntoView/);
});

test('interior routes retain applications, knowledge, status, and inquiry content', () => {
  assert.match(htmlFor('applications'), /应用场景/);
  assert.match(htmlFor('knowledge'), /常见问题|FAQ/);
  assert.match(htmlFor('products'), /资料状态说明/);
  assert.match(htmlFor('products'), /询价准备/);
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

import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');
const htmlFor = (route) => readFileSync(resolve(dist, route, 'index.html'), 'utf8');

const routes = [
  '',
  'about',
  'factory',
  'equipment',
  'quality',
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

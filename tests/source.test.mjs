import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const siteDataPath = resolve(root, 'src/data/site.ts');

test('site data defines ten procurement-oriented navigation targets', () => {
  assert.equal(existsSync(siteDataPath), true, 'src/data/site.ts should exist');
  const source = readFileSync(siteDataPath, 'utf8');
  const expectedPaths = [
    '/',
    '/about/',
    '/factory/',
    '/equipment/',
    '/quality/',
    '/products/product-a/',
    '/products/product-b/',
    '/products/product-c/',
    '/applications/',
    '/knowledge/',
  ];

  for (const path of expectedPaths) {
    assert.match(source, new RegExp(`href:\\s*['\"]${path.replaceAll('/', '\\/')}['\"]`));
  }
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

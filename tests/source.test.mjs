import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

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

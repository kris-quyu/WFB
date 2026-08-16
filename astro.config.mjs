import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://kris-quyu.github.io',
  base: '/WFB',
  integrations: [sitemap()],
});

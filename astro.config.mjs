import { defineConfig } from 'astro/config';

export default defineConfig({
  // The live address. Used for absolute links (e.g. share previews).
  site: 'https://teriyakisaurusrex2.github.io',
  // Every page is a folder with index.html, so /of-theseus/ works on GitHub Pages.
  trailingSlash: 'always',
});

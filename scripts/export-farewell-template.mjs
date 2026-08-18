import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, 'dist');
const sourceHtmlPath = join(distRoot, 'farewell', 'index.html');
const outputPath = '/Users/lifesaver/Downloads/farewell-team-template.html';

let html = await readFile(sourceHtmlPath, 'utf8');

const stylesheetHref = html.match(/<link rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/)?.[1];
const scriptSrc = html.match(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];

if (!stylesheetHref || !scriptSrc) {
  throw new Error('Could not find the built farewell page assets.');
}

const assetPath = (urlPath) => join(distRoot, urlPath.replace(/^\//, ''));
const [css, rawJavaScript] = await Promise.all([
  readFile(assetPath(stylesheetHref), 'utf8'),
  readFile(assetPath(scriptSrc), 'utf8'),
]);

const embeddedImages = await Promise.all(
  ['hero.png', 'lunch.png', 'presentation.png', 'coffee.png', 'celebration.png'].map(async (name) => {
    const data = await readFile(join(projectRoot, 'public', 'farewell', name));
    return [`/farewell/${name}`, `data:image/png;base64,${data.toString('base64')}`];
  }),
);

let javascript = rawJavaScript;
for (const [source, embedded] of embeddedImages) {
  javascript = javascript.split(source).join(embedded);
}

const favicon = await readFile(join(projectRoot, 'public', 'images', 'favicon-spiderverse.jpg'));
const faviconData = `data:image/jpeg;base64,${favicon.toString('base64')}`;

html = html
  .replace(
    /<link rel="icon"[^>]*>/,
    () => `<link rel="icon" type="image/jpeg" href="${faviconData}">`,
  )
  .replace(/\s*<meta property="og:image"[^>]*>/, '')
  .replace(/\s*<meta name="twitter:image"[^>]*>/, '')
  .replace(
    /<link rel="stylesheet"[^>]+href="[^"]+"[^>]*>/,
    () => `<style>${css.replaceAll('</style', '<\\/style')}</style>`,
  )
  .replace(
    /<script type="module"[^>]+src="[^"]+"[^>]*><\/script>/,
    () =>
      `<script>window.__FAREWELL_TEMPLATE__ = true;</script>\n    <script type="module">${javascript.replaceAll('</script', '<\\/script')}</script>`,
  )
  .replace(
    '<!doctype html>',
    () =>
      '<!doctype html>\n<!-- Self-contained farewell website sample. Mock names, notes, and generated photos are included for preview use. -->',
  );

await writeFile(outputPath, html, 'utf8');
console.log(outputPath);

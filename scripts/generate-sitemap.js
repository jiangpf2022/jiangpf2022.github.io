const fs = require('fs');
const path = require('path');

const siteRoot = path.resolve(__dirname, '..', '_site');
const urls = [];

function visit(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      visit(absolutePath);
    } else if (entry.name === 'index.html') {
      let route = `/${path.relative(siteRoot, path.dirname(absolutePath))}/`;
      route = route.replaceAll(path.sep, '/').replace('/./', '/');
      if (route !== '/academic_homepage/') urls.push(route);
    }
  }
}

visit(siteRoot);
urls.sort();

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((route) => `  <url><loc>https://jiangpf2022.github.io${route}</loc></url>`),
  '</urlset>',
  '',
].join('\n');

fs.writeFileSync(path.join(siteRoot, 'sitemap.xml'), xml);

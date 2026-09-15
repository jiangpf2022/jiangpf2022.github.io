// Redefine 2.6.2 hard-codes lazy-loading and recommendation images at the
// domain root. Keep those internal theme assets under the configured /blog/ root.
hexo.extend.filter.register('after_render:html', function (html, data) {
  html = html.replaceAll('src="/images/', 'src="/blog/images/');

  if (data && data.path === '404.html') {
    html = html.replace('href="/" class="button large center"', 'href="/blog/" class="button large center"');
  }

  // Technical modeling lessons include equations, derivations, worked examples,
  // and an active workshop.  Their front matter defines a 40-minute study unit;
  // reflect that estimate instead of the prose-only word-count heuristic.
  if (html.includes('href="/blog/categories/Mathematical-Modeling/"')) {
    html = html.replace(
      /(<span class="article-min2read article-meta-item"><i[^>]*><\/i>&nbsp;<span>)[^<]+(<\/span>)/,
      (_match, before, after) => `${before}40 Mins${after}`
    );
  }

  return html;
}, 100);

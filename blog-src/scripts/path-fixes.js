// Redefine 2.6.2 hard-codes lazy-loading and recommendation images at the
// domain root. Keep those internal theme assets under the configured /blog/ root.
hexo.extend.filter.register('after_render:html', function (html, data) {
  html = html.replaceAll('src="/images/', 'src="/blog/images/');

  const bilingualPost = '2026/09/14/Mathematical-Modeling-01-From-Reality-to-a-Model/';
  const chinesePost = '2026/09/14/Mathematical-Modeling-01-From-Reality-to-a-Model-zh/';
  const renderedPath = String(data?.path || '');
  const isChinese = renderedPath.includes(chinesePost) ||
    html.includes('property="og:title" content="数学建模 1 - 从现实问题到数学模型"');
  const isEnglish = !isChinese && (renderedPath.includes(bilingualPost) ||
    html.includes('property="og:title" content="Mathematical Modeling 1 - From Reality to a Model"'));
  if (isEnglish || isChinese) {
    const site = 'https://jiangpf2022.github.io/blog/';
    const canonicalPath = isChinese ? chinesePost : bilingualPost;
    html = html.replace(
      /<link rel="canonical" href="[^"]*">/,
      '<link rel="canonical" href="' + site + canonicalPath + '">'
    );
    if (isChinese) {
      html = html.replace('<html lang="en"', '<html lang="zh-CN"');
      html = html.replace('property="og:locale" content="en_US"', 'property="og:locale" content="zh_CN"');
    }
    html = html.replace(
      '</head>',
      '<link rel="alternate" hreflang="en" href="' + site + bilingualPost + '">' +
      '<link rel="alternate" hreflang="zh-CN" href="' + site + chinesePost + '">' +
      '<link rel="alternate" hreflang="x-default" href="' + site + bilingualPost + '">' +
      '</head>'
    );
  }

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

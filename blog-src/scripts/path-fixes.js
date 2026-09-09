// Redefine 2.6.2 hard-codes lazy-loading and recommendation images at the
// domain root. Keep those internal theme assets under the configured /blog/ root.
hexo.extend.filter.register('after_render:html', function (html, data) {
  html = html.replaceAll('src="/images/', 'src="/blog/images/');

  if (data && data.path === '404.html') {
    html = html.replace('href="/" class="button large center"', 'href="/blog/" class="button large center"');
  }

  return html;
}, 100);

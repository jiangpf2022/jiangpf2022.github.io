"use strict";

// Old review-only lesson URLs remain individually addressable, but the home
// index should present the new 20-lesson course rather than both editions.
const paginate = require("hexo-pagination");

hexo.extend.generator.register("index", function generateCurrentIndex(locals) {
  const posts = locals.posts
    .filter((post) => !post.translation_of && !post.categories.some((category) => category.name === "Mathematical Modeling Draft Archive"))
    .sort(this.config.index_generator.order_by);
  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));
  return paginate(this.config.index_generator.path || "", posts, {
    perPage: this.config.index_generator.per_page,
    layout: ["index", "archive"],
    format: (this.config.pagination_dir || "page") + "/%d/",
    data: { __index: true },
  });
});

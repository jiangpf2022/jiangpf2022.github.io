"use strict";

const normalizeText = (value) =>
  String(value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\{%.+?%\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const blogAsset = (value) => {
  const asset = String(value || "").trim();
  if (!asset || /^(?:https?:)?\/\//i.test(asset)) return asset;
  if (asset.startsWith("/blog/")) return asset;
  return asset.startsWith("/") ? `/blog${asset}` : `/blog/${asset}`;
};

hexo.extend.generator.register("category-hub-data", (locals) => {
  const articles = locals.posts
    .sort("date", -1)
    .map((post) => {
      const content = normalizeText(post.excerpt || post.description || post.content);
      return {
        title: post.title,
        path: `/blog/${post.path}`.replace(/\/{2,}/g, "/"),
        date: post.date ? post.date.toISOString() : null,
        updated: post.updated ? post.updated.toISOString() : null,
        cover: blogAsset(post.cover || post.banner || post.thumbnail),
        excerpt: content.length > 220 ? `${content.slice(0, 217).trim()}...` : content,
        categories: post.categories.map((category) => category.name),
      };
    });

  return {
    path: "category-hub.json",
    data: JSON.stringify(articles),
  };
});

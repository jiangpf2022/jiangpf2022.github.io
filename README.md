# jiangpf2022.github.io

Unified GitHub Pages source for Panfeng Jiang's academic homepage and Blog.

- `/` is built with Jekyll from the repository root.
- `/blog/` is built with Hexo from `blog-src/`.
- `.github/workflows/pages.yml` builds both sites and deploys one Pages artifact.

In GitHub repository settings, set **Pages > Build and deployment > Source** to
**GitHub Actions**.

## Local build

```sh
bundle install
bundle exec jekyll build --destination _site
cd blog-src
npm ci
npx hexo clean && npx hexo generate
cd ..
mkdir -p _site/blog
cp -R blog-src/public/. _site/blog/
node scripts/generate-sitemap.js
```

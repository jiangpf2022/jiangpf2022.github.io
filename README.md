# jiangpf2022.github.io

Unified GitHub Pages source for Panfeng Jiang's academic homepage and Blog.

- `/` is built with Jekyll from the repository root.
- `/blog/` is built with Hexo from `blog-src/`.
- Blog downloads are published at both `/blog/files/` and the legacy `/files/` paths. The academic CV at `/files/cv.pdf` is maintained in the root `files/cv.pdf` and takes precedence when the sites are merged.
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
mkdir -p _site/files
cp -R blog-src/public/files/. _site/files/
cp files/cv.pdf _site/files/cv.pdf
node scripts/generate-sitemap.js
```

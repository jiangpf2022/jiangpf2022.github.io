# Supabase setup

## Saved passages

`article-bookmarks.sql` creates the private `article_bookmarks` table used by the article bookmark button and My Learning. It has been applied to the Blog Reader Supabase project. Row-level security permits each authenticated reader to view, add, and delete only their own passages; bookmarks are separate from reading-history and course-plan rows. If deploying the site against a different Supabase project, run this migration there before enabling the button.

`article-bookmark-annotations.sql` adds optional notes, an HTML snapshot, and the inclusive start/end content-block positions to an existing bookmarks table. It has been applied to the live Blog Reader project. Existing text-only bookmarks remain readable. New snapshots are sanitized both before storage and before display; only the bookmark owner can read them through the existing RLS policies.

## Mathematical Modeling review lock

Lesson 1 is public. Lesson 2 has its existing owner-only draft in `public.protected_modeling_articles`. The new 20-lesson edition's lessons 3–20 have routes and short public outlines, but **no revised full article bodies in Supabase yet**. In developer view, `jiangpf2022` sees a clearly labeled working-outline preview instead of the lock; regular-user view and other accounts still see a lock. This must not be mistaken for access to finished lesson text. Older lesson 3–18 drafts remain on their legacy URLs and in the OneDrive backup; do not silently render those topic-mismatched texts under the new lesson titles.

Supabase row-level security permits reads of existing private draft rows only for the verified GitHub OAuth user `jiangpf2022` (Supabase user UUID `ef797a53-7193-4d0e-b566-5c8f3d33f9fd`). The ordinary-user preview switch changes only what that developer sees in the browser; it does not remove their server-side access. The current table's check constraint accepts legacy 2026/09/14 routes only. Before adding a **reviewed, topic-correct** private draft for a new 2026/09/15 route, migrate the constraint to include lessons 2–20 and recheck the existing owner-only RLS policy. Never commit draft HTML or Markdown to this public repository.

Earlier full Markdown drafts are backed up outside this public repository in OneDrive at `/Users/gavin0576/Library/CloudStorage/OneDrive-个人/Mathematical-Modeling-Private-Drafts-before-example-redesign/`; the current 20-lesson working scaffolds are at `/Users/gavin0576/Library/CloudStorage/OneDrive-个人/Mathematical-Modeling-Course-v2-Drafts/`. Follow that folder's `PLAN.md`: copied material under a new lesson heading is not a finished article. Do not commit either folder to the public site. `tools/lock-modeling-articles.mjs` was a one-time migration tool and deliberately refuses to run without backup verification.

After reviewing a lesson, publish it in **one commit**: copy its approved Markdown draft back to `source/_posts/`, remove its two-digit lesson number from `lockedLessons` in `source/js/protected-modeling.js`, run `npm run build`, then run `node tools/audit-protected-modeling.mjs '/Users/gavin0576/Library/CloudStorage/OneDrive-个人/Mathematical-Modeling-Private-Drafts'`. Only then commit and push. The published article is served statically; it does not depend on Supabase to render.

This lock controls the **current website and current source files**, not historical disclosure. Lessons 2–18 existed in earlier public Git commits, and their old image assets also remain public. Neither a client-side preview toggle nor Supabase row-level security can erase that history. A truly secret pre-publication workflow would require a separately authorized repository-history and asset migration, potentially affecting existing links and clones.

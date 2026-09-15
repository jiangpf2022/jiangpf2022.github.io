-- Draft lesson bodies live here while their public Hexo routes show a lock page.
-- The fixed user id below was verified against the GitHub OAuth identity whose
-- provider_id is 137176698 (jiangpf2022). Do not grant draft access by mutable
-- user_metadata.user_name.

create table if not exists public.protected_modeling_articles (
  post_path text primary key,
  content_html text not null, -- gzip-compressed HTML encoded as base64
  toc_html text not null default '',
  content_sha256 text not null,
  updated_at timestamptz not null default now(),
  constraint protected_modeling_post_path
    check (post_path ~ '^/blog/2026/09/14/Mathematical-Modeling-(0[2-9]|1[0-8])-[A-Za-z0-9-]+/$')
);

alter table public.protected_modeling_articles enable row level security;

revoke all on table public.protected_modeling_articles from anon, authenticated;
grant select on table public.protected_modeling_articles to authenticated;

create policy "jiangpf2022 can read draft lessons"
  on public.protected_modeling_articles
  for select
  to authenticated
  using ((select auth.uid()) = 'ef797a53-7193-4d0e-b566-5c8f3d33f9fd'::uuid);

comment on table public.protected_modeling_articles is
  'Mathematical Modeling lessons 2–18 under owner review. content_html is gzip-base64. Publish by moving a reviewed private draft back into Hexo source.';

-- Run once in the Supabase SQL Editor for the Blog Reader project.
-- Bookmarked passages belong to the signed-in GitHub user and remain private.
create table if not exists public.article_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_path text not null check (post_path ~ '^/blog/[0-9]{4}/[0-9]{2}/[0-9]{2}/[^/]+/$'),
  post_title text not null,
  quote_text text not null check (char_length(quote_text) between 1 and 5000),
  chapter_title text not null default '',
  start_offset integer not null check (start_offset >= 0),
  end_offset integer not null check (end_offset > start_offset),
  start_block integer check (start_block >= 0),
  end_block integer check (end_block >= start_block),
  content_html text not null default '' check (char_length(content_html) <= 300000),
  note_text text not null default '' check (char_length(note_text) <= 2000),
  created_at timestamptz not null default now(),
  unique (user_id, post_path, start_offset, end_offset)
);

create index if not exists article_bookmarks_user_recent_idx
  on public.article_bookmarks (user_id, created_at desc);

alter table public.article_bookmarks enable row level security;

grant select, insert, delete on table public.article_bookmarks to authenticated;
grant update (note_text) on table public.article_bookmarks to authenticated;

create policy "Readers can view their own bookmarks"
on public.article_bookmarks for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Readers can add their own bookmarks"
on public.article_bookmarks for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Readers can delete their own bookmarks"
on public.article_bookmarks for delete
to authenticated
using ((select auth.uid()) = user_id);

create policy "Readers can edit their own bookmark notes"
on public.article_bookmarks for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

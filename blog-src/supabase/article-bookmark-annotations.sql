-- Apply once to an existing Blog Reader database. Existing text bookmarks remain valid.
alter table public.article_bookmarks
  add column if not exists start_block integer check (start_block >= 0),
  add column if not exists end_block integer check (end_block >= start_block),
  add column if not exists content_html text not null default '' check (char_length(content_html) <= 300000),
  add column if not exists note_text text not null default '' check (char_length(note_text) <= 2000);

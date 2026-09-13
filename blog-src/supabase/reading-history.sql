create table if not exists public.reading_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_path text not null check (post_path like '/blog/%'),
  post_title text not null,
  post_url text not null,
  progress smallint not null default 0 check (progress between 0 and 100),
  completed boolean not null default false,
  chapter_progress jsonb not null default '{}'::jsonb check (jsonb_typeof(chapter_progress) = 'object'),
  completion smallint not null default 0 check (completion between 0 and 100),
  mastery smallint not null default 0 check (mastery between 0 and 100),
  read_count integer not null default 1 check (read_count > 0),
  first_read_at timestamptz not null default now(),
  last_read_at timestamptz not null default now(),
  unique (user_id, post_path)
);

alter table public.reading_history
  add column if not exists chapter_progress jsonb not null default '{}'::jsonb,
  add column if not exists completion smallint not null default 0,
  add column if not exists mastery smallint not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'reading_history_chapter_progress_object'
      and conrelid = 'public.reading_history'::regclass
  ) then
    alter table public.reading_history
      add constraint reading_history_chapter_progress_object
      check (jsonb_typeof(chapter_progress) = 'object');
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'reading_history_completion_range'
      and conrelid = 'public.reading_history'::regclass
  ) then
    alter table public.reading_history
      add constraint reading_history_completion_range
      check (completion between 0 and 100);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'reading_history_mastery_range'
      and conrelid = 'public.reading_history'::regclass
  ) then
    alter table public.reading_history
      add constraint reading_history_mastery_range
      check (mastery between 0 and 100);
  end if;
end;
$$;

alter table public.reading_history enable row level security;

revoke all on table public.reading_history from anon;
grant select, insert, update, delete on table public.reading_history to authenticated;

drop policy if exists "Readers can view their own history" on public.reading_history;
create policy "Readers can view their own history"
on public.reading_history for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Readers can add their own history" on public.reading_history;
create policy "Readers can add their own history"
on public.reading_history for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Readers can update their own history" on public.reading_history;
create policy "Readers can update their own history"
on public.reading_history for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Readers can delete their own history" on public.reading_history;
create policy "Readers can delete their own history"
on public.reading_history for delete
to authenticated
using ((select auth.uid()) = user_id);

create or replace function public.save_reading_progress(
  p_post_path text,
  p_post_title text,
  p_post_url text,
  p_progress smallint,
  p_completed boolean,
  p_increment_read_count boolean default false
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  insert into public.reading_history (
    user_id,
    post_path,
    post_title,
    post_url,
    progress,
    completed,
    read_count,
    first_read_at,
    last_read_at
  )
  values (
    auth.uid(),
    p_post_path,
    p_post_title,
    p_post_url,
    greatest(0, least(100, p_progress)),
    p_completed,
    1,
    now(),
    now()
  )
  on conflict (user_id, post_path)
  do update set
    post_title = excluded.post_title,
    post_url = excluded.post_url,
    progress = greatest(public.reading_history.progress, excluded.progress),
    completed = public.reading_history.completed or excluded.completed,
    read_count = public.reading_history.read_count +
      case when p_increment_read_count then 1 else 0 end,
    last_read_at = now();
end;
$$;

revoke all on function public.save_reading_progress(text, text, text, smallint, boolean, boolean) from public;
grant execute on function public.save_reading_progress(text, text, text, smallint, boolean, boolean) to authenticated;

create or replace function public.save_learning_progress(
  p_post_path text,
  p_post_title text,
  p_post_url text,
  p_chapter_progress jsonb,
  p_completion smallint,
  p_mastery smallint
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  normalized_completion smallint := greatest(0, least(100, p_completion));
  normalized_mastery smallint := greatest(0, least(100, p_mastery));
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_post_path is null or p_post_path not like '/blog/%' then
    raise exception 'Invalid article path';
  end if;

  if p_chapter_progress is null or jsonb_typeof(p_chapter_progress) <> 'object' then
    raise exception 'Chapter progress must be a JSON object';
  end if;

  if pg_column_size(p_chapter_progress) > 65536 then
    raise exception 'Chapter progress is too large';
  end if;

  insert into public.reading_history (
    user_id,
    post_path,
    post_title,
    post_url,
    progress,
    completed,
    chapter_progress,
    completion,
    mastery,
    read_count,
    first_read_at,
    last_read_at
  )
  values (
    auth.uid(),
    p_post_path,
    p_post_title,
    p_post_url,
    0,
    normalized_completion = 100,
    p_chapter_progress,
    normalized_completion,
    normalized_mastery,
    1,
    now(),
    now()
  )
  on conflict (user_id, post_path)
  do update set
    post_title = excluded.post_title,
    post_url = excluded.post_url,
    chapter_progress = excluded.chapter_progress,
    completion = excluded.completion,
    mastery = excluded.mastery,
    completed = public.reading_history.completed or excluded.completion = 100,
    last_read_at = now();
end;
$$;

revoke all on function public.save_learning_progress(text, text, text, jsonb, smallint, smallint) from public;
grant execute on function public.save_learning_progress(text, text, text, jsonb, smallint, smallint) to authenticated;

create index if not exists reading_history_user_recent_idx
  on public.reading_history (user_id, last_read_at desc);

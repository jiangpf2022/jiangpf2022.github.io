create table if not exists public.reading_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  post_path text not null check (post_path like '/blog/%'),
  post_title text not null,
  post_url text not null,
  progress smallint not null default 0 check (progress between 0 and 100),
  completed boolean not null default false,
  read_count integer not null default 1 check (read_count > 0),
  first_read_at timestamptz not null default now(),
  last_read_at timestamptz not null default now(),
  unique (user_id, post_path)
);

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

create index if not exists reading_history_user_recent_idx
  on public.reading_history (user_id, last_read_at desc);

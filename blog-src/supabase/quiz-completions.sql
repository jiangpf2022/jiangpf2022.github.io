-- One-time migration for interactive quiz EXP.
-- Run this in the Supabase SQL editor for the blog project.

create table if not exists public.quiz_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id text not null check (char_length(quiz_id) between 3 and 120),
  earned_exp smallint not null default 1 check (earned_exp = 1),
  completed_at timestamptz not null default now(),
  primary key (user_id, quiz_id)
);

alter table public.quiz_completions enable row level security;

drop policy if exists "Users can view their quiz completions" on public.quiz_completions;
create policy "Users can view their quiz completions"
on public.quiz_completions
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their quiz completions" on public.quiz_completions;
create policy "Users can insert their quiz completions"
on public.quiz_completions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

grant select, insert on public.quiz_completions to authenticated;

create or replace function public.complete_quiz_question(p_quiz_id text)
returns table (awarded boolean, completed_on timestamptz)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  inserted_at timestamptz;
begin
  if (select auth.uid()) is null then
    raise exception 'Authentication required';
  end if;

  if p_quiz_id is null or char_length(p_quiz_id) < 3 or char_length(p_quiz_id) > 120 then
    raise exception 'Invalid quiz id';
  end if;

  insert into public.quiz_completions (user_id, quiz_id)
  values ((select auth.uid()), p_quiz_id)
  on conflict (user_id, quiz_id) do nothing
  returning quiz_completions.completed_at into inserted_at;

  if inserted_at is not null then
    return query select true, inserted_at;
  else
    return query
      select false, completion.completed_at
      from public.quiz_completions as completion
      where completion.user_id = (select auth.uid())
        and completion.quiz_id = p_quiz_id;
  end if;
end;
$$;

revoke all on function public.complete_quiz_question(text) from public;
grant execute on function public.complete_quiz_question(text) to authenticated;

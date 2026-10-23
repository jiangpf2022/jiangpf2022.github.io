-- One-time migration for the Mathematical Modeling article quizzes.
-- Run this in the blog project's Supabase SQL editor.

alter table public.quiz_completions
  drop constraint if exists quiz_completions_earned_exp_check;

alter table public.quiz_completions
  add constraint quiz_completions_earned_exp_check
  check (earned_exp between 1 and 10);

create table if not exists public.quiz_attempts (
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id text not null check (char_length(quiz_id) between 3 and 120),
  attempt_count smallint not null default 0 check (attempt_count >= 0),
  first_attempt_correct boolean,
  solved boolean not null default false,
  last_answer_correct boolean not null default false,
  last_attempt_at timestamptz not null default now(),
  primary key (user_id, quiz_id)
);

alter table public.quiz_attempts enable row level security;

drop policy if exists "Users can view their quiz attempts" on public.quiz_attempts;
create policy "Users can view their quiz attempts"
on public.quiz_attempts for select to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their quiz attempts" on public.quiz_attempts;
create policy "Users can insert their quiz attempts"
on public.quiz_attempts for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their quiz attempts" on public.quiz_attempts;
create policy "Users can update their quiz attempts"
on public.quiz_attempts for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

grant select, insert, update on public.quiz_attempts to authenticated;

create or replace function public.submit_modeling_quiz_answer(
  p_quiz_id text,
  p_selected_answers text[]
)
returns table (
  answer_correct boolean,
  awarded boolean,
  earned_exp smallint,
  attempt_count smallint,
  first_attempt_correct boolean,
  solved boolean
)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_user_id uuid := (select auth.uid());
  v_correct_answer text[];
  v_selected text[];
  v_max_exp smallint;
  v_is_correct boolean;
  v_previous public.quiz_attempts%rowtype;
  v_current public.quiz_attempts%rowtype;
  v_awarded boolean := false;
  v_earned smallint := 0;
  v_rows integer := 0;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  case p_quiz_id
    when 'modeling-01-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-01-q2' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-01-q3' then v_correct_answer := array['A','B','C']; v_max_exp := 2;
    when 'modeling-01-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-01-q5' then v_correct_answer := array['A','B','C','E']; v_max_exp := 3;
    when 'modeling-01-q6' then v_correct_answer := array['C']; v_max_exp := 4;
    when 'modeling-01-q7' then v_correct_answer := array['A','C','D']; v_max_exp := 5;
    when 'modeling-01-q8' then v_correct_answer := array['B']; v_max_exp := 6;
    when 'modeling-01-q9' then v_correct_answer := array['B']; v_max_exp := 8;
    when 'modeling-01-q10' then v_correct_answer := array['A','C','D','F']; v_max_exp := 10;
    when 'modeling-02-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-02-q2' then v_correct_answer := array['C']; v_max_exp := 1;
    when 'modeling-02-q3' then v_correct_answer := array['A','C','D']; v_max_exp := 2;
    when 'modeling-02-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-02-q5' then v_correct_answer := array['A','B','D']; v_max_exp := 3;
    when 'modeling-02-q6' then v_correct_answer := array['C']; v_max_exp := 4;
    when 'modeling-02-q7' then v_correct_answer := array['B']; v_max_exp := 5;
    when 'modeling-02-q8' then v_correct_answer := array['A','C','D']; v_max_exp := 6;
    when 'modeling-02-q9' then v_correct_answer := array['C']; v_max_exp := 8;
    when 'modeling-02-q10' then v_correct_answer := array['A','B','D','F']; v_max_exp := 10;
    when 'modeling-03-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-03-q2' then v_correct_answer := array['C']; v_max_exp := 1;
    when 'modeling-03-q3' then v_correct_answer := array['A','C','D']; v_max_exp := 2;
    when 'modeling-03-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-03-q5' then v_correct_answer := array['A','B','D']; v_max_exp := 3;
    when 'modeling-03-q6' then v_correct_answer := array['C']; v_max_exp := 4;
    when 'modeling-03-q7' then v_correct_answer := array['A','C','D']; v_max_exp := 5;
    when 'modeling-03-q8' then v_correct_answer := array['B']; v_max_exp := 6;
    when 'modeling-03-q9' then v_correct_answer := array['A','B','D']; v_max_exp := 8;
    when 'modeling-03-q10' then v_correct_answer := array['A','C','D','F']; v_max_exp := 10;
    when 'modeling-04-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-04-q2' then v_correct_answer := array['C']; v_max_exp := 1;
    when 'modeling-04-q3' then v_correct_answer := array['A','C','D']; v_max_exp := 2;
    when 'modeling-04-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-04-q5' then v_correct_answer := array['A','B','D']; v_max_exp := 3;
    when 'modeling-04-q6' then v_correct_answer := array['C']; v_max_exp := 4;
    when 'modeling-04-q7' then v_correct_answer := array['B']; v_max_exp := 5;
    when 'modeling-04-q8' then v_correct_answer := array['A','C','D']; v_max_exp := 6;
    when 'modeling-04-q9' then v_correct_answer := array['B']; v_max_exp := 8;
    when 'modeling-04-q10' then v_correct_answer := array['A','C','D','F']; v_max_exp := 10;
    when 'modeling-06-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-06-q2' then v_correct_answer := array['C']; v_max_exp := 1;
    when 'modeling-06-q3' then v_correct_answer := array['A','C','D']; v_max_exp := 2;
    when 'modeling-06-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-06-q5' then v_correct_answer := array['A','B','D']; v_max_exp := 3;
    when 'modeling-06-q6' then v_correct_answer := array['C']; v_max_exp := 4;
    when 'modeling-06-q7' then v_correct_answer := array['B']; v_max_exp := 5;
    when 'modeling-06-q8' then v_correct_answer := array['A','C','D']; v_max_exp := 6;
    when 'modeling-06-q9' then v_correct_answer := array['B']; v_max_exp := 8;
    when 'modeling-06-q10' then v_correct_answer := array['A','C','D','F']; v_max_exp := 10;
    when 'modeling-07-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-07-q2' then v_correct_answer := array['C']; v_max_exp := 1;
    when 'modeling-07-q3' then v_correct_answer := array['A','C','D']; v_max_exp := 2;
    when 'modeling-07-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-07-q5' then v_correct_answer := array['C']; v_max_exp := 3;
    when 'modeling-07-q6' then v_correct_answer := array['B']; v_max_exp := 4;
    when 'modeling-07-q7' then v_correct_answer := array['A','B','D']; v_max_exp := 5;
    when 'modeling-07-q8' then v_correct_answer := array['A','C','D']; v_max_exp := 6;
    when 'modeling-07-q9' then v_correct_answer := array['B']; v_max_exp := 8;
    when 'modeling-07-q10' then v_correct_answer := array['A','C','D','F']; v_max_exp := 10;
    when 'modeling-09-q1' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-09-q2' then v_correct_answer := array['C']; v_max_exp := 1;
    when 'modeling-09-q3' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-09-q4' then v_correct_answer := array['C']; v_max_exp := 2;
    when 'modeling-09-q5' then v_correct_answer := array['D']; v_max_exp := 3;
    when 'modeling-09-q6' then v_correct_answer := array['A','C']; v_max_exp := 4;
    when 'modeling-09-q7' then v_correct_answer := array['B']; v_max_exp := 5;
    when 'modeling-09-q8' then v_correct_answer := array['C']; v_max_exp := 6;
    when 'modeling-09-q9' then v_correct_answer := array['A','B','D']; v_max_exp := 8;
    when 'modeling-09-q10' then v_correct_answer := array['A','C','D','E']; v_max_exp := 10;
    when 'modeling-10-q1' then v_correct_answer := array['D']; v_max_exp := 1;
    when 'modeling-10-q2' then v_correct_answer := array['B']; v_max_exp := 1;
    when 'modeling-10-q3' then v_correct_answer := array['C']; v_max_exp := 2;
    when 'modeling-10-q4' then v_correct_answer := array['B']; v_max_exp := 2;
    when 'modeling-10-q5' then v_correct_answer := array['C']; v_max_exp := 3;
    when 'modeling-10-q6' then v_correct_answer := array['D']; v_max_exp := 4;
    when 'modeling-10-q7' then v_correct_answer := array['B']; v_max_exp := 5;
    when 'modeling-10-q8' then v_correct_answer := array['A','C']; v_max_exp := 6;
    when 'modeling-10-q9' then v_correct_answer := array['A','B','D']; v_max_exp := 8;
    when 'modeling-10-q10' then v_correct_answer := array['A','B','D','F']; v_max_exp := 10;
    else raise exception 'Unknown quiz id';
  end case;

  select coalesce(array_agg(distinct answer order by answer), array[]::text[])
    into v_selected
    from unnest(coalesce(p_selected_answers, array[]::text[])) as answer;
  v_is_correct := v_selected = v_correct_answer;

  select * into v_previous
  from public.quiz_attempts
  where user_id = v_user_id and quiz_id = p_quiz_id
  for update;

  if found then
    update public.quiz_attempts as qa
    set attempt_count = qa.attempt_count + 1,
        solved = qa.solved or v_is_correct,
        last_answer_correct = v_is_correct,
        last_attempt_at = now()
    where user_id = v_user_id and quiz_id = p_quiz_id
    returning * into v_current;
  else
    insert into public.quiz_attempts (
      user_id, quiz_id, attempt_count, first_attempt_correct,
      solved, last_answer_correct, last_attempt_at
    ) values (
      v_user_id, p_quiz_id, 1, v_is_correct,
      v_is_correct, v_is_correct, now()
    ) returning * into v_current;
  end if;

  if v_is_correct and not coalesce(v_previous.solved, false) then
    v_earned := case
      when v_current.attempt_count = 1 then v_max_exp
      else ceil(v_max_exp / 2.0)::smallint
    end;
    insert into public.quiz_completions (user_id, quiz_id, earned_exp)
    values (v_user_id, p_quiz_id, v_earned)
    on conflict (user_id, quiz_id) do nothing;
    get diagnostics v_rows = row_count;
    v_awarded := v_rows > 0;
    if not v_awarded then v_earned := 0; end if;
  end if;

  return query select
    v_is_correct,
    v_awarded,
    v_earned,
    v_current.attempt_count,
    v_current.first_attempt_correct,
    v_current.solved;
end;
$$;

revoke all on function public.submit_modeling_quiz_answer(text, text[]) from public;
grant execute on function public.submit_modeling_quiz_answer(text, text[]) to authenticated;

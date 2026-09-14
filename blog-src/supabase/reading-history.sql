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
  course_slug text,
  in_plan boolean not null default false,
  plan_added_at timestamptz,
  read_count integer not null default 1 check (read_count > 0),
  first_read_at timestamptz not null default now(),
  last_read_at timestamptz not null default now(),
  unique (user_id, post_path)
);

alter table public.reading_history
  add column if not exists chapter_progress jsonb not null default '{}'::jsonb,
  add column if not exists completion smallint not null default 0,
  add column if not exists mastery smallint not null default 0,
  add column if not exists course_slug text,
  add column if not exists in_plan boolean not null default false,
  add column if not exists plan_added_at timestamptz;

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

  if not exists (
    select 1 from pg_constraint
    where conname = 'reading_history_course_slug_allowed'
      and conrelid = 'public.reading_history'::regclass
  ) then
    alter table public.reading_history
      add constraint reading_history_course_slug_allowed
      check (
        course_slug is null
        or course_slug in ('deep-learning', 'llm-generative-ai', 'robotic')
      );
  end if;
end;
$$;

update public.reading_history
set
  course_slug = case
    when post_path = '/blog/2026/09/10/Columbia-Neural-Networks-Deep-Learning/' then 'deep-learning'
    when post_path = '/blog/2026/09/11/LLM-Based-Generative-AI-Columbia-University/' then 'llm-generative-ai'
    else course_slug
  end,
  post_title = case
    when post_path = '/blog/2026/09/10/Columbia-Neural-Networks-Deep-Learning/' then 'Deep Learning 1 - Single Layer Models'
    else post_title
  end
where post_path in (
  '/blog/2026/09/10/Columbia-Neural-Networks-Deep-Learning/',
  '/blog/2026/09/11/LLM-Based-Generative-AI-Columbia-University/'
);

update public.reading_history
set in_plan = false
where in_plan and course_slug is null;

update public.reading_history as history
set chapter_progress = coalesce(
  (
    select jsonb_object_agg(
      chapter.key,
      case
        when chapter.value ->> 'completed' = 'true'
          and not (chapter.value ? 'reviewed_at')
        then chapter.value || jsonb_build_object('reviewed_at', history.last_read_at)
        else chapter.value
      end
    )
    from jsonb_each(history.chapter_progress) as chapter
  ),
  '{}'::jsonb
)
where history.chapter_progress <> '{}'::jsonb
  and exists (
    select 1
    from jsonb_each(history.chapter_progress) as chapter
    where chapter.value ->> 'completed' = 'true'
      and not (chapter.value ? 'reviewed_at')
  );

create table if not exists public.learning_mastery_history (
  user_id uuid not null,
  post_path text not null,
  event_date date not null,
  chapter_progress jsonb not null default '{}'::jsonb
    check (jsonb_typeof(chapter_progress) = 'object'),
  completion smallint not null default 0 check (completion between 0 and 100),
  mastery smallint not null default 0 check (mastery between 0 and 100),
  recorded_at timestamptz not null default now(),
  primary key (user_id, post_path, event_date),
  foreign key (user_id, post_path)
    references public.reading_history (user_id, post_path)
    on delete cascade
);

alter table public.learning_mastery_history
  add column if not exists article_score numeric(6, 2) not null default 0,
  add column if not exists earned_exp numeric(6, 2) not null default 0;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'learning_mastery_history_article_score_range'
      and conrelid = 'public.learning_mastery_history'::regclass
  ) then
    alter table public.learning_mastery_history
      add constraint learning_mastery_history_article_score_range
      check (article_score between 0 and 100);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'learning_mastery_history_earned_exp_range'
      and conrelid = 'public.learning_mastery_history'::regclass
  ) then
    alter table public.learning_mastery_history
      add constraint learning_mastery_history_earned_exp_range
      check (earned_exp between 0 and 100);
  end if;
end;
$$;

create or replace function public.calculate_learning_article_score(
  p_completion smallint,
  p_chapter_progress jsonb,
  p_at timestamptz default now()
)
returns numeric
language plpgsql
immutable
security invoker
set search_path = ''
as $$
declare
  chapter record;
  chapter_weight numeric;
  chapter_mastery numeric;
  reviewed_at timestamptz;
  elapsed_days numeric;
  weighted_mastery numeric := 0;
  total_weight numeric := 0;
  retained_mastery numeric := 0;
begin
  if p_chapter_progress is null or jsonb_typeof(p_chapter_progress) <> 'object' then
    return 0;
  end if;

  for chapter in select value from jsonb_each(p_chapter_progress)
  loop
    if coalesce(chapter.value ->> 'completed', 'false') = 'true' then
      chapter_weight := greatest(1, coalesce((chapter.value ->> 'weight')::numeric, 1));
      chapter_mastery := greatest(0, least(100, coalesce((chapter.value ->> 'mastery')::numeric, 0)));
      reviewed_at := coalesce(nullif(chapter.value ->> 'reviewed_at', '')::timestamptz, p_at);
      elapsed_days := greatest(0, extract(epoch from (p_at - reviewed_at)) / 86400.0);
      weighted_mastery := weighted_mastery + chapter_mastery * exp(-elapsed_days / 7.0) * chapter_weight;
      total_weight := total_weight + chapter_weight;
    end if;
  end loop;

  if total_weight > 0 then
    retained_mastery := weighted_mastery / total_weight;
  end if;

  return round(
    greatest(0, least(100, coalesce(p_completion, 0))) *
    greatest(0, least(100, retained_mastery)) / 100.0,
    2
  );
end;
$$;

revoke all on function public.calculate_learning_article_score(smallint, jsonb, timestamptz) from public;
grant execute on function public.calculate_learning_article_score(smallint, jsonb, timestamptz) to authenticated;

update public.learning_mastery_history
set article_score = public.calculate_learning_article_score(completion, chapter_progress, recorded_at);

with daily_scores as (
  select
    user_id,
    post_path,
    event_date,
    article_score,
    lag(article_score, 1, 0) over (
      partition by user_id, post_path
      order by event_date
    ) as previous_score
  from public.learning_mastery_history
)
update public.learning_mastery_history as history
set earned_exp = greatest(0, daily_scores.article_score - daily_scores.previous_score)
from daily_scores
where history.user_id = daily_scores.user_id
  and history.post_path = daily_scores.post_path
  and history.event_date = daily_scores.event_date;

create table if not exists public.course_plans (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null check (
    course_slug in ('deep-learning', 'llm-generative-ai', 'robotic')
  ),
  enrolled_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_slug)
);

insert into public.course_plans (user_id, course_slug, enrolled_at, updated_at)
select
  user_id,
  course_slug,
  coalesce(min(plan_added_at), min(last_read_at), now()),
  now()
from public.reading_history
where in_plan and course_slug is not null
group by user_id, course_slug
on conflict (user_id, course_slug) do nothing;

alter table public.reading_history enable row level security;
alter table public.learning_mastery_history enable row level security;
alter table public.course_plans enable row level security;

revoke all on table public.reading_history from anon;
grant select, insert, update, delete on table public.reading_history to authenticated;
revoke all on table public.learning_mastery_history from anon;
grant select, insert, update, delete on table public.learning_mastery_history to authenticated;
revoke all on table public.course_plans from anon;
grant select, insert, update, delete on table public.course_plans to authenticated;

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

drop policy if exists "Readers can view their own mastery history" on public.learning_mastery_history;
create policy "Readers can view their own mastery history"
on public.learning_mastery_history for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Readers can add their own mastery history" on public.learning_mastery_history;
create policy "Readers can add their own mastery history"
on public.learning_mastery_history for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Readers can update their own mastery history" on public.learning_mastery_history;
create policy "Readers can update their own mastery history"
on public.learning_mastery_history for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Readers can delete their own mastery history" on public.learning_mastery_history;
create policy "Readers can delete their own mastery history"
on public.learning_mastery_history for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Readers can view their own course plans" on public.course_plans;
create policy "Readers can view their own course plans"
on public.course_plans for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Readers can add their own course plans" on public.course_plans;
create policy "Readers can add their own course plans"
on public.course_plans for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Readers can update their own course plans" on public.course_plans;
create policy "Readers can update their own course plans"
on public.course_plans for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Readers can delete their own course plans" on public.course_plans;
create policy "Readers can delete their own course plans"
on public.course_plans for delete
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

drop function if exists public.save_learning_progress(text, text, text, jsonb, smallint, smallint);
drop function if exists public.save_learning_progress(text, text, text, jsonb, smallint, smallint, date);

create or replace function public.save_learning_progress(
  p_post_path text,
  p_post_title text,
  p_post_url text,
  p_course_slug text,
  p_chapter_progress jsonb,
  p_completion smallint,
  p_mastery smallint,
  p_event_date date
)
returns void
language plpgsql
security invoker
set search_path = ''
as $$
declare
  normalized_completion smallint := greatest(0, least(100, p_completion));
  normalized_mastery smallint := greatest(0, least(100, p_mastery));
  effective_date date := coalesce(p_event_date, current_date);
  current_score numeric(6, 2) := 0;
  previous_score numeric(6, 2) := 0;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_post_path is null or p_post_path not like '/blog/%' then
    raise exception 'Invalid article path';
  end if;

  if p_course_slug is null or p_course_slug not in ('deep-learning', 'llm-generative-ai', 'robotic') then
    raise exception 'Invalid course';
  end if;

  if p_chapter_progress is null or jsonb_typeof(p_chapter_progress) <> 'object' then
    raise exception 'Chapter progress must be a JSON object';
  end if;

  if pg_column_size(p_chapter_progress) > 65536 then
    raise exception 'Chapter progress is too large';
  end if;

  current_score := public.calculate_learning_article_score(
    normalized_completion,
    p_chapter_progress,
    now()
  );

  select public.calculate_learning_article_score(
    history.completion,
    history.chapter_progress,
    now()
  )
  into previous_score
  from public.learning_mastery_history as history
  where history.user_id = auth.uid()
    and history.post_path = p_post_path
    and history.event_date < effective_date
  order by history.event_date desc
  limit 1;

  previous_score := coalesce(previous_score, 0);

  insert into public.reading_history (
    user_id,
    post_path,
    post_title,
    post_url,
    progress,
    completed,
    course_slug,
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
    p_course_slug,
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
    course_slug = excluded.course_slug,
    chapter_progress = excluded.chapter_progress,
    completion = excluded.completion,
    mastery = excluded.mastery,
    completed = public.reading_history.completed or excluded.completion = 100,
    last_read_at = now();

  insert into public.learning_mastery_history (
    user_id,
    post_path,
    event_date,
    chapter_progress,
    completion,
    mastery,
    article_score,
    earned_exp,
    recorded_at
  )
  values (
    auth.uid(),
    p_post_path,
    effective_date,
    p_chapter_progress,
    normalized_completion,
    normalized_mastery,
    current_score,
    greatest(0, current_score - previous_score),
    now()
  )
  on conflict (user_id, post_path, event_date)
  do update set
    chapter_progress = excluded.chapter_progress,
    completion = excluded.completion,
    mastery = excluded.mastery,
    article_score = excluded.article_score,
    earned_exp = excluded.earned_exp,
    recorded_at = now();
end;
$$;

revoke all on function public.save_learning_progress(text, text, text, text, jsonb, smallint, smallint, date) from public;
grant execute on function public.save_learning_progress(text, text, text, text, jsonb, smallint, smallint, date) to authenticated;

drop function if exists public.set_learning_plan(text, text, text, boolean, date);

create or replace function public.set_learning_plan(
  p_post_path text,
  p_post_title text,
  p_post_url text,
  p_course_slug text,
  p_in_plan boolean,
  p_event_date date
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

  if p_post_path is null or p_post_path not like '/blog/%' then
    raise exception 'Invalid article path';
  end if;

  if p_course_slug is null or p_course_slug not in ('deep-learning', 'llm-generative-ai', 'robotic') then
    raise exception 'Invalid course';
  end if;

  insert into public.reading_history (
    user_id,
    post_path,
    post_title,
    post_url,
    course_slug,
    in_plan,
    plan_added_at,
    read_count,
    first_read_at,
    last_read_at
  )
  values (
    auth.uid(),
    p_post_path,
    p_post_title,
    p_post_url,
    p_course_slug,
    p_in_plan,
    case when p_in_plan then now() else null end,
    1,
    now(),
    now()
  )
  on conflict (user_id, post_path)
  do update set
    post_title = excluded.post_title,
    post_url = excluded.post_url,
    course_slug = excluded.course_slug,
    in_plan = p_in_plan,
    plan_added_at = case
      when p_in_plan and not public.reading_history.in_plan then now()
      when p_in_plan then public.reading_history.plan_added_at
      else public.reading_history.plan_added_at
    end,
    last_read_at = now();

  if p_in_plan then
    insert into public.learning_mastery_history (
      user_id,
      post_path,
      event_date,
      chapter_progress,
      completion,
      mastery,
      recorded_at
    )
    select
      user_id,
      post_path,
      coalesce(p_event_date, current_date),
      chapter_progress,
      completion,
      mastery,
      now()
    from public.reading_history
    where user_id = auth.uid() and post_path = p_post_path
    on conflict (user_id, post_path, event_date)
    do update set
      chapter_progress = excluded.chapter_progress,
      completion = excluded.completion,
      mastery = excluded.mastery,
      recorded_at = now();
  end if;
end;
$$;

revoke all on function public.set_learning_plan(text, text, text, text, boolean, date) from public;
grant execute on function public.set_learning_plan(text, text, text, text, boolean, date) to authenticated;

create or replace function public.set_course_plan(
  p_course_slug text,
  p_in_plan boolean
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

  if p_course_slug is null or p_course_slug not in ('deep-learning', 'llm-generative-ai', 'robotic') then
    raise exception 'Invalid course';
  end if;

  if p_in_plan then
    insert into public.course_plans (user_id, course_slug, enrolled_at, updated_at)
    values (auth.uid(), p_course_slug, now(), now())
    on conflict (user_id, course_slug)
    do update set updated_at = now();
  else
    delete from public.course_plans
    where user_id = auth.uid() and course_slug = p_course_slug;
  end if;

  update public.reading_history
  set in_plan = p_in_plan,
      plan_added_at = case
        when p_in_plan then coalesce(plan_added_at, now())
        else plan_added_at
      end
  where user_id = auth.uid() and course_slug = p_course_slug;
end;
$$;

revoke all on function public.set_course_plan(text, boolean) from public;
grant execute on function public.set_course_plan(text, boolean) to authenticated;

create index if not exists reading_history_user_recent_idx
  on public.reading_history (user_id, last_read_at desc);

create index if not exists reading_history_user_course_plan_idx
  on public.reading_history (user_id, course_slug, in_plan);

create index if not exists course_plans_user_enrolled_idx
  on public.course_plans (user_id, enrolled_at desc);

create index if not exists learning_mastery_history_user_post_date_idx
  on public.learning_mastery_history (user_id, post_path, event_date);

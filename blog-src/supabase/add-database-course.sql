-- Allow the COMS W4111 course to participate in plans, reading history,
-- mastery tracking, and experience calculations without resetting user data.

begin;

alter table public.reading_history
  drop constraint if exists reading_history_course_slug_allowed;

alter table public.reading_history
  add constraint reading_history_course_slug_allowed
  check (
    course_slug is null
    or course_slug in ('deep-learning', 'llm-generative-ai', 'robotic', 'mathematical-modeling', 'databases')
  );

alter table public.course_plans
  drop constraint if exists course_plans_course_slug_allowed;

alter table public.course_plans
  add constraint course_plans_course_slug_allowed
  check (course_slug in ('deep-learning', 'llm-generative-ai', 'robotic', 'mathematical-modeling', 'databases'));

do $migration$
declare
  function_record record;
  original_definition text;
  updated_definition text;
  changed_functions integer := 0;
begin
  for function_record in
    select procedure.oid
    from pg_proc as procedure
    join pg_namespace as namespace on namespace.oid = procedure.pronamespace
    where namespace.nspname = 'public'
      and procedure.prokind = 'f'
      and pg_get_functiondef(procedure.oid) like
        '%''deep-learning'', ''llm-generative-ai'', ''robotic'', ''mathematical-modeling''%'
  loop
    original_definition := pg_get_functiondef(function_record.oid);
    updated_definition := replace(
      original_definition,
      '''deep-learning'', ''llm-generative-ai'', ''robotic'', ''mathematical-modeling''',
      '''deep-learning'', ''llm-generative-ai'', ''robotic'', ''mathematical-modeling'', ''databases'''
    );

    if updated_definition <> original_definition then
      execute updated_definition;
      changed_functions := changed_functions + 1;
    end if;
  end loop;

  if changed_functions <> 3 then
    raise exception 'Expected to update 3 course-aware functions, updated %', changed_functions;
  end if;
end;
$migration$;

commit;

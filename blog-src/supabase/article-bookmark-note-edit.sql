-- Run once in the Supabase SQL Editor for the Blog Reader project.
-- Only the bookmark owner may edit their own note; other columns are not updated by the site.
grant update (note_text) on table public.article_bookmarks to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'article_bookmarks'
      and policyname = 'Readers can edit their own bookmark notes'
  ) then
    create policy "Readers can edit their own bookmark notes"
    on public.article_bookmarks for update
    to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);
  end if;
end $$;

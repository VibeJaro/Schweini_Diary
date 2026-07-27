-- Grundabsicherung für die direkt aus dem Browser verwendete Supabase-API.
-- Lesen bleibt öffentlich. Nur eng begrenzte Kommentar- und Reaktions-INSERTs
-- sind erlaubt; UPDATE und DELETE bleiben für anon/authenticated gesperrt.

begin;

alter table public.entries enable row level security;
alter table public.comments enable row level security;
alter table public.reactions enable row level security;

revoke all privileges on table public.entries from anon, authenticated;
revoke all privileges on table public.comments from anon, authenticated;
revoke all privileges on table public.reactions from anon, authenticated;

grant select on table public.entries to anon, authenticated;
grant select on table public.comments to anon, authenticated;
grant select on table public.reactions to anon, authenticated;

grant insert (entry_id, author, body)
  on table public.comments
  to anon, authenticated;

grant insert (entry_id, emoji)
  on table public.reactions
  to anon, authenticated;

drop policy if exists entries_public_read on public.entries;
create policy entries_public_read
  on public.entries
  for select
  to anon, authenticated
  using (true);

drop policy if exists comments_public_read on public.comments;
create policy comments_public_read
  on public.comments
  for select
  to anon, authenticated
  using (true);

drop policy if exists comments_family_insert on public.comments;
create policy comments_family_insert
  on public.comments
  for insert
  to anon, authenticated
  with check (
    entry_id is not null
    and author = any (array[
      'Elisa',
      'Mama',
      'Papa',
      'Oma',
      'Opa',
      'Wonkel',
      'Schweini'
    ]::text[])
    and char_length(body) between 1 and 500
    and nullif(btrim(body), '') is not null
  );

drop policy if exists reactions_public_read on public.reactions;
create policy reactions_public_read
  on public.reactions
  for select
  to anon, authenticated
  using (true);

drop policy if exists reactions_family_insert on public.reactions;
create policy reactions_family_insert
  on public.reactions
  for insert
  to anon, authenticated
  with check (
    entry_id is not null
    and emoji = any (array['🐷', '🤣', '🤦', '💩']::text[])
  );

commit;

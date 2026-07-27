-- Hero-Inhalte direkt an der zugehörigen Tagebuchgeschichte speichern.
-- Das Skript ist idempotent und kann im Supabase SQL Editor erneut ausgeführt werden.

alter table public.entries
  add column if not exists hero_line_1 text,
  add column if not exists hero_line_2 text,
  add column if not exists hero_line_3 text,
  add column if not exists hero_line_4 text,
  add column if not exists hero_deck text,
  add column if not exists hero_label text,
  add column if not exists hero_caption text,
  add column if not exists hero_image text,
  add column if not exists hero_enabled boolean not null default false;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'entries_hero_line_lengths'
      and conrelid = 'public.entries'::regclass
  ) then
    alter table public.entries
      add constraint entries_hero_line_lengths check (
        (hero_line_1 is null or char_length(hero_line_1) <= 12)
        and (hero_line_2 is null or char_length(hero_line_2) <= 12)
        and (hero_line_3 is null or char_length(hero_line_3) <= 20)
        and (hero_line_4 is null or char_length(hero_line_4) <= 13)
        and (hero_deck is null or char_length(hero_deck) <= 145)
        and (hero_label is null or char_length(hero_label) <= 32)
        and (hero_caption is null or char_length(hero_caption) <= 40)
      );
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'entries_enabled_hero_is_complete'
      and conrelid = 'public.entries'::regclass
  ) then
    alter table public.entries
      add constraint entries_enabled_hero_is_complete check (
        not hero_enabled
        or (
          nullif(btrim(hero_line_1), '') is not null
          and nullif(btrim(hero_line_2), '') is not null
          and nullif(btrim(hero_line_3), '') is not null
          and nullif(btrim(hero_line_4), '') is not null
          and nullif(btrim(hero_deck), '') is not null
          and nullif(btrim(hero_label), '') is not null
          and nullif(btrim(hero_caption), '') is not null
          and nullif(btrim(hero_image), '') is not null
          and coalesce(hero_image = any(images), false)
        )
      );
  end if;
end
$$;

update public.entries
set
  hero_line_1 = 'Workshop.',
  hero_line_2 = 'Ich führe.',
  hero_line_3 = 'Kuchen kann auch',
  hero_line_4 = 'Arbeit sein.',
  hero_deck = 'Schweini führt durch einen wichtigen Workshop, übernimmt die Technik und prüft das Buffet mit größter beruflicher Sorgfalt.',
  hero_label = 'Chef auf Dienstreise',
  hero_caption = 'Workshop, eindeutig unter Kontrolle',
  hero_image = images[3],
  hero_enabled = true
where id = 'd66f74c7-14d4-4bf9-9c4e-b1fbfd76ac8f';

update public.entries
set
  hero_line_1 = 'Danke.',
  hero_line_2 = 'An mich.',
  hero_line_3 = 'Für mein schieres',
  hero_line_4 = 'Können.',
  hero_deck = 'Elisa kommt nach Hause. Schweini putzt, kocht und backt. Was könnte da schon schiefgehen?',
  hero_label = 'Haushaltsexperte',
  hero_caption = 'Triumph, absolut verdient',
  hero_image = images[5],
  hero_enabled = true
where id = '207999d0-4b2a-4430-a693-7f4909aafe37';

update public.entries
set
  hero_line_1 = 'Natürlich',
  hero_line_2 = 'berühmt.',
  hero_line_3 = 'Mein Talent ist',
  hero_line_4 = 'unfassbar.',
  hero_deck = 'Actionheld, Filmstar und Superschurke mit weißer Katze. Schweini liefert alles – vor allem Rüssel-Charisma.',
  hero_label = 'Direkt aus Hollywood',
  hero_caption = 'Weltruhm, völlig logisch',
  hero_image = images[12],
  hero_enabled = true
where id = '15072668-5746-4c39-926c-4b975ebbbcc0';

update public.entries
set
  hero_line_1 = 'Schwerelos.',
  hero_line_2 = 'Fast.',
  hero_line_3 = 'Torte im Bauch.',
  hero_line_4 = 'Kein Problem.',
  hero_deck = 'Schweini trainiert fürs Weltall, trotzt der Schwerelosigkeit und entdeckt einen winzigen Nachteil seiner Sahnetorten-Strategie.',
  hero_label = 'Erster Schweinonaut',
  hero_caption = 'Weltraumtraining mit Nebenwirkungen',
  hero_image = images[8],
  hero_enabled = true
where id = '58333d33-b1c4-41d0-a1fe-9ef10e6d45c0';

update public.entries
set
  hero_line_1 = 'Modeltag.',
  hero_line_2 = 'Großartig.',
  hero_line_3 = 'Mein Rüssel',
  hero_line_4 = 'kennt Posen.',
  hero_deck = 'Die Welt braucht professionelle Bilder von Schweini. Zum Glück beherrscht er jede Pose – besonders den geheimnisvollen Rüssel.',
  hero_label = 'Fotomodell von Welt',
  hero_caption = 'Die Kamera war völlig begeistert',
  hero_image = images[10],
  hero_enabled = true
where id = '6ebf365f-b24c-4a33-be49-6feee4664dbf';

update public.entries
set
  hero_line_1 = 'Sportlich.',
  hero_line_2 = 'Natürlich.',
  hero_line_3 = 'Drei Übungen,',
  hero_line_4 = 'Profi-Pause.',
  hero_deck = 'Schweini startet ein gigantisches Fitnessprogramm, entdeckt seine Muskeln und nimmt die Regeneration mit Pommes sehr ernst.',
  hero_label = 'Fitnesslegende',
  hero_caption = 'Höchstleistung kurz vor der Pause',
  hero_image = images[8],
  hero_enabled = true
where id = 'd5dc6612-165b-4af1-8df4-3aac65a0d878';

update public.entries
set
  hero_line_1 = 'Fünf Sterne.',
  hero_line_2 = 'Für mich.',
  hero_line_3 = 'Gurken raus,',
  hero_line_4 = 'Pommes rein.',
  hero_deck = 'Schweini eröffnet seine eigene Wellness-Oase. Blubberblasen, Luxus und ein überraschend knuspriges Gurkenproblem inklusive.',
  hero_label = 'Wellnessdirektor',
  hero_caption = 'Entspannung auf höchstem Niveau',
  hero_image = images[5],
  hero_enabled = true
where id = 'f3b5130c-47c6-4eca-96ed-4de71fa79abf';

update public.entries
set
  hero_line_1 = 'Mannheim.',
  hero_line_2 = 'geprüft.',
  hero_line_3 = 'Kultur war nett.',
  hero_line_4 = 'Nudeleis!',
  hero_deck = 'Schweini prüft Mannheims Quadrate, wichtige Kultur und schließlich die entscheidende Frage: Können Nudeln auch Nachtisch?',
  hero_label = 'Stadtexperte unterwegs',
  hero_caption = 'Mannheim darf bleiben',
  hero_image = images[9],
  hero_enabled = true
where id = '0a571399-d0b7-44d8-9d13-90aa770cae36';

update public.entries
set
  hero_line_1 = 'Sturmfrei.',
  hero_line_2 = 'Na endlich.',
  hero_line_3 = 'Keiner stoppt',
  hero_line_4 = 'mein Genie.',
  hero_deck = 'Keine Aufsicht, sehr viele Regeln und ein Schwein mit einem ausgezeichneten Plan. Was soll da bitte schiefgehen?',
  hero_label = 'Chef ohne Aufsicht',
  hero_caption = 'Sturmfrei, vollkommen kontrolliert',
  hero_image = images[6],
  hero_enabled = true
where id = '0224caac-ce6c-451f-aac4-16527d974309';

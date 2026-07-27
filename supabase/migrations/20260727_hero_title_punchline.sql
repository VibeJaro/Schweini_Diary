-- Natural two-part Hero headline.
-- The existing four hero_line_* columns stay in place as a fallback while
-- editorial choices and the frontend migration are still in progress.

alter table public.entries
  add column if not exists hero_title text,
  add column if not exists hero_punchline text;

comment on column public.entries.hero_title is
  'Natural Hero headline; the frontend may wrap it visually.';

comment on column public.entries.hero_punchline is
  'Short highlighted payoff that follows hero_title.';

-- Natural captions may be a short sentence. Keep all other legacy limits,
-- but widen the former 40-character caption limit to 90 characters.
alter table public.entries
  drop constraint if exists entries_hero_line_lengths;

alter table public.entries
  add constraint entries_hero_line_lengths check (
    (hero_line_1 is null or char_length(hero_line_1) <= 12)
    and (hero_line_2 is null or char_length(hero_line_2) <= 12)
    and (hero_line_3 is null or char_length(hero_line_3) <= 20)
    and (hero_line_4 is null or char_length(hero_line_4) <= 13)
    and (hero_deck is null or char_length(hero_deck) <= 145)
    and (hero_label is null or char_length(hero_label) <= 32)
    and (hero_caption is null or char_length(hero_caption) <= 90)
  );

-- An enabled Hero may use either the new natural title pair or the legacy
-- four-line title. Deck, label, caption and selected image remain mandatory.
alter table public.entries
  drop constraint if exists entries_enabled_hero_is_complete;

alter table public.entries
  add constraint entries_enabled_hero_is_complete check (
    not hero_enabled
    or (
      (
        (
          nullif(btrim(hero_title), '') is not null
          and nullif(btrim(hero_punchline), '') is not null
        )
        or (
          nullif(btrim(hero_line_1), '') is not null
          and nullif(btrim(hero_line_2), '') is not null
          and nullif(btrim(hero_line_3), '') is not null
          and nullif(btrim(hero_line_4), '') is not null
        )
      )
      and nullif(btrim(hero_deck), '') is not null
      and nullif(btrim(hero_label), '') is not null
      and nullif(btrim(hero_caption), '') is not null
      and nullif(btrim(hero_image), '') is not null
      and coalesce(hero_image = any(images), false)
    )
  );

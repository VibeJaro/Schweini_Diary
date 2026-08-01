-- Final redaktionell freigegebene Festivalgeschichte.
-- Die feste UUID und ON CONFLICT machen den Import wiederholbar.

insert into public.entries (
  id,
  title,
  body,
  mood,
  date_label,
  author,
  images,
  hero_title,
  hero_punchline,
  hero_deck,
  hero_label,
  hero_caption,
  hero_image,
  hero_enabled,
  created_at
)
values (
  'a56a7f98-a9b5-4947-a29a-054a382be2d9',
  'Der Star von Mannheim',
  $story$
Es war ein milder Abend in Mannheim. Ich, Schweini, das optische und intellektuelle Highlight der modernen Popkultur, flanierte an der Alten Feuerwache vorbei. Drinnen wummerte der Bass. Die Luft vibrierte. Sofort war mir klar: Diese Menschen dort drinnen haben Sehnsucht. Sehnsucht nach echter Kunst. Sehnsucht nach MIR!

Als ich die Halle betrat und die Bühne sah, war der Fall gelöst. Das hier war keine gewöhnliche Konzertveranstaltung. Das war mein persönliches Sprungbrett zum Weltruhm. Die Bands da oben waren ja ganz nett, aber ihnen fehlte das gewisse Etwas. Das gewisse Rosa.

## Akt 1: Der sanfte Einstieg (Reggae-Vibes)

Zuerst schwappten langsame, chillige Reggae-Vibes durch die Halle. Alle wiegten sich im Takt. Viel zu langweilig! Um die Aufmerksamkeit der trägen Masse zu erobern, setzte ich mir eine viel zu große Sonnenbrille auf. Zack – fertig war mein ultralässiger Festival-Look.

Ich sprang direkt auf den vordersten Bühnenrand und stolzierte im Takt los. Ein Huf vor den anderen, Bauch raus, Rüssel hoch! Dazu schnaubte ich rhythmisch zu den Trommeln. Die Leute starrten mich an. Einige machten Fotos. Sie waren sichtlich ergriffen von meiner tiefen, künstlerischen Aura. Ein voller Erfolg!

## Akt 2: Punk und die Kunst des Fliegens

Als Nächste betrat eine Band mit wilden Frisuren und lauten Gitarren die Bühne. Punk! Genau mein Ding. Schnelle Entscheidungen, harte Rhythmen. Ich zögerte nicht lang: Ich riss mir ein Stück neongrünes Klebeband vom Boden ab, klebte es mir als astreinen Irokesenschnitt auf den Kopf und stürzte mich mit einem todesmutigen Satz von der Monitorbox direkt in die Menge!

Crowdsurfing! Gut, die erste Reihe hat mich vor Schreck fast fallenlassen, aber dann trugen mich mindestens drei Hände ehrfürchtig über die Köpfe hinweg. Ich lag auf dem Rücken wie eine majestätische, rosa Wolke der Rebellion. „Pah!“, dachte ich, „nehmt das, ihr Hobby-Rocker! So fliegt nur ein echter Superstar!“

## Akt 3: Death Metal und die totale Zerstörung

Nach dem Punk wurde es düster. Die nächste Band trug nur Schwarz, guckte grimmig und die Musik klang wie eine startende Waschmaschine voller Kieselsteine. Death Metal! Zeit für meinen ultimativen Imagewechsel.

Ich fand hinter der Bühne ein zerrissenes, schwarzes Putztuch. Schnell hineingeschlüpft – zack, fertig war das perfekte, hochmoderne Heavy-Metal-Outfit. Ich positionierte mich direkt neben der riesigen Bassbox, warf meinen Kopf wild vor und zurück (Headbanging auf allerhöchstem Niveau!) und stieß mein furchteinflößendstes, tiefstes Plüsch-Growling aus: *„Quieeeek-Raaaaah!“*

Der Bassist guckte völlig irritiert zu mir runter. Er war sichtlich eingeschüchtert von meiner brutalen Bühnenpräsenz. Wieder ein Konkurrent eiskalt an die Wand gespielt!

## Akt 4: Der große Coup beim Finale

Zum Schluss kam die Hauptband. Doch in der kurzen Umbaupause, als die Bühne komplett leer und das Licht gedimmt war, schlug meine große Stunde. Das ist die Chance, auf die die Musikwelt gewartet hat!

Ich schlich mich im Schutz der Dunkelheit an den Stativen vorbei, kletterte mit letzter Kraft am Kabel hoch und klammerte mich direkt an das große Mikrofon. Es war zwar ausgeschaltet, aber das stört ein Genie wie mich nicht. Ich hielt eine epische, stumme Dankesrede für meine zukünftigen Grammys und winkte huldvoll in den Saal.

Genau in diesem Moment ging das Scheinwerferlicht wieder an, die Musiker der Hauptband betraten hinter mir die Bühne und die Halle explodierte in ohrenbetäubendem Jubel. Kreischende Fans! Tobender Applaus! Plakate wurden hochgehalten!

Natürlich galt das alles mir. Wer sonst hätte diesen Empfang verdient? Ich verbeugte mich elegant, warf Luftküsse in die Menge und verließ die Bühne wie der Champion, der ich nun mal bin. Mannheim liegt mir zu Füßen. Die Welttournee kann kommen!

Dein (bald Grammy-prämierter) Rockstar-Schweini 🐷🎸🤘🔥
$story$,
  'rockig & größenwahnsinnig',
  '01.08.2026 · 09:42',
  'Schweini',
  array[
    'public/images/stories/der-star-von-mannheim/01-ankunft-a.webp',
    'public/images/stories/der-star-von-mannheim/02-reggae-b.webp',
    'public/images/stories/der-star-von-mannheim/03-punk-umstyling-a.webp',
    'public/images/stories/der-star-von-mannheim/04-crowdsurfing-b.webp',
    'public/images/stories/der-star-von-mannheim/05-death-metal-umstyling-a.webp',
    'public/images/stories/der-star-von-mannheim/06-headbanging-a.webp',
    'public/images/stories/der-star-von-mannheim/07-mikrofon-b.webp',
    'public/images/stories/der-star-von-mannheim/08-triumph-a.webp'
  ]::text[],
  'Schweini rockt die Alte Feuerwache in Mannheim',
  'Ein Weltstar wird entdeckt!',
  'Wie ich als unentdecktes Musiktalent ein ganzes Festival im Sturm erobert habe. Banausen, macht Platz für den neuen Gott des Rock!',
  'Schweini backstage',
  'Kurz vor dem großen Auftritt: Die Ruhe vor dem kreativen Sturm.',
  'public/images/stories/der-star-von-mannheim/06-headbanging-a.webp',
  true,
  '2026-08-01T09:42:56+02:00'::timestamptz
)
on conflict (id) do update set
  title = excluded.title,
  body = excluded.body,
  mood = excluded.mood,
  date_label = excluded.date_label,
  author = excluded.author,
  images = excluded.images,
  hero_title = excluded.hero_title,
  hero_punchline = excluded.hero_punchline,
  hero_deck = excluded.hero_deck,
  hero_label = excluded.hero_label,
  hero_caption = excluded.hero_caption,
  hero_image = excluded.hero_image,
  hero_enabled = excluded.hero_enabled,
  created_at = excluded.created_at;

-- Redaktionell freigegebene Hero-Texte aus
-- content/textauswahl-hero-aufbau-pointe.md und
-- content/textauswahl-schweini.md.

update public.entries set
  hero_title = 'Ich leite heute den Workshop und bediene die Technik.',
  hero_punchline = 'Das Buffet war äußerst kooperativ!',
  hero_deck = 'Ich klicke die Folien weg und sichere das Kuchenbuffet. Business auf ganz hohem Niveau!',
  hero_label = 'Wichtiger Workshop',
  hero_caption = 'Ein Meister seines Fachs bei der Qualitätskontrolle.'
where id = 'd66f74c7-14d4-4bf9-9c4e-b1fbfd76ac8f';

update public.entries set
  hero_title = 'Der exklusivste Drei-Sterne-Empfang aller Zeiten',
  hero_punchline = 'Die Küche steht noch, die Torte ist im Schwein!',
  hero_deck = 'Ich backe, schrubbe und verteile Mehl. Hauptsache, für Elisa wird alles absolut perfekt!',
  hero_label = 'Home Coming',
  hero_caption = 'Vorbereitung läuft auf Hochtouren. Fast unfallfrei.'
where id = '207999d0-4b2a-4430-a693-7f4909aafe37';

update public.entries set
  hero_title = 'Hollywood hat endlich ein echtes Naturtalent gefunden',
  hero_punchline = 'Der Oscar für den besten Plüsch geht an … mich!',
  hero_deck = 'Ob als strahlender Retter oder geniales Schurken-Schwein mit Flausch-Katze – die Kameras lieben mich förmlich!',
  hero_label = 'Filmreife Action',
  hero_caption = 'Ein Gesicht, das für die große Leinwand gemacht ist. Pah!'
where id = '15072668-5746-4c39-926c-4b975ebbbcc0';

update public.entries set
  hero_title = 'Mein knallhartes Astronautentraining für das Universum.',
  hero_punchline = 'Fliegende Sahne ist sehr schwer zu fangen!',
  hero_deck = 'Mein Astronauten-Training läuft perfekt. Nur fliegende Sahnetorten sind schwerer zu fangen, als man denkt. Upsi.',
  hero_label = 'Galaktischer Hunger',
  hero_caption = 'Völlig losgelöst (und auf der Suche nach Weltraum-Snacks).'
where id = '58333d33-b1c4-41d0-a1fe-9ef10e6d45c0';

update public.entries set
  hero_title = 'Die Kamera verlangt nach meinem Rüssel',
  hero_punchline = 'Bitte von meiner Schokoladenseite knipsen!',
  hero_deck = 'Die Kamera klickt, der Rüssel sitzt. Mein geheimnisvoller Blick wird die Titelseiten der ganzen Welt erobern!',
  hero_label = 'Blitzlichtgewitter',
  hero_caption = 'Mein bestes Profil. Eigentlich sind alle meine Profile perfekt.'
where id = '6ebf365f-b24c-4a33-be49-6feee4664dbf';

update public.entries set
  hero_title = 'Nach dem Höchstleistungssport braucht der Körper Ruhe',
  hero_punchline = 'Und eine sehr große Portion Pommes.',
  hero_deck = 'Elisa ist weg, also forme ich meinen perfekten Plüsch-Körper. Die anschließende Pommes-Therapie war medizinisch absolut nötig.',
  hero_label = 'Extreme Fitness',
  hero_caption = 'Ein stahlharter Athlet beim verdienten Kohlenhydrate-Tanken.'
where id = 'd5dc6612-165b-4af1-8df4-3aac65a0d878';

update public.entries set
  hero_title = 'Entspannung auf allerhöchstem Schaum-Niveau',
  hero_punchline = 'Wer hat eigentlich die Gurkenmaske aufgegessen?',
  hero_deck = 'Mein Spa-Tag war grandios entspannend! Einziges Problem: Die Gurkenmaske sah am Ende einfach zu lecker aus.',
  hero_label = 'Pure Entspannung',
  hero_caption = 'Schaum, Glamour und ein kleiner Snack zwischendurch.'
where id = 'f3b5130c-47c6-4eca-96ed-4de71fa79abf';

update public.entries set
  hero_title = 'Auf Bildungsreise durch die Quadratestadt',
  hero_punchline = 'Nudeleis ist doch eine Hauptspeise, oder?',
  hero_deck = 'Ich habe die Quadrate genauestens vermessen. Wichtigstes Ergebnis meiner wissenschaftlichen Expedition: Nudeleis ist definitiv eine Hauptspeise.',
  hero_label = 'Stadtsafari',
  hero_caption = 'Kultur-Schwein prüft, ob die Brunnen der Stadt auch mit Schokosauce laufen.'
where id = '0a571399-d0b7-44d8-9d13-90aa770cae36';

update public.entries set
  hero_title = 'Ich bin komplett allein und habe einen genialen Plan.',
  hero_punchline = 'Regeln sind ohnehin nur grobe Empfehlungen.',
  hero_deck = 'Keine Aufsicht, aber tausend Ideen. Das wird die spektakulärste Aktion aller Zeiten!',
  hero_label = 'Meisterplan',
  hero_caption = 'Völlig risikofrei. Ich habe alles im Griff.'
where id = '0224caac-ce6c-451f-aac4-16527d974309';

select id, title, hero_title, hero_punchline, hero_label
from public.entries
where id in (
  'd66f74c7-14d4-4bf9-9c4e-b1fbfd76ac8f',
  '207999d0-4b2a-4430-a693-7f4909aafe37',
  '15072668-5746-4c39-926c-4b975ebbbcc0',
  '58333d33-b1c4-41d0-a1fe-9ef10e6d45c0',
  '6ebf365f-b24c-4a33-be49-6feee4664dbf',
  'd5dc6612-165b-4af1-8df4-3aac65a0d878',
  'f3b5130c-47c6-4eca-96ed-4de71fa79abf',
  '0a571399-d0b7-44d8-9d13-90aa770cae36',
  '0224caac-ce6c-451f-aac4-16527d974309'
)
order by created_at desc;

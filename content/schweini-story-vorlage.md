# Vorlage für eine vollständige Schweini-Geschichte

Diese Vorlage ergänzt die Schweini-Bibel. Ersetze die eckigen Klammern durch
die Ausgangsidee und gib dem Textmodell den gesamten Auftrag.

## Auftrag

Schreibe einen vollständigen neuen Tagebucheintrag für Schweinis Webseite.

Ausgangsidee: [WAS IST PASSIERT?]

Bekannte Personen, Orte und wichtige echte Details:
[NUR DIE FAKTEN, DIE IM TEXT VORKOMMEN DÜRFEN]

Der Tagebuchtext soll aus Schweinis Perspektive geschrieben sein und zur
Schweini-Bibel passen. Erfinde keine weiteren realen Personen oder Ereignisse.

Erzeuge zusammen mit der Geschichte alle Texte für die Hero-Sektion. Die beiden
großen Zeilen sind `hero_line_2` und `hero_line_4`; besonders dort müssen die
Texte kurz und auf einem Smartphone gut lesbar bleiben.

Gib genau dieses Format aus:

```text
title: [Titel der Geschichte]
mood: [kurze Stimmung]
hero_line_1: [höchstens 12 Zeichen]
hero_line_2: [höchstens 12 Zeichen]
hero_line_3: [höchstens 20 Zeichen]
hero_line_4: [höchstens 13 Zeichen]
hero_deck: [spannende Zusammenfassung, höchstens 145 Zeichen]
hero_label: [kurzes Bildlabel, höchstens 32 Zeichen]
hero_caption: [kurze Bildunterschrift, höchstens 40 Zeichen]

body:
[vollständiger Tagebucheintrag mit passenden Markdown-Zwischenüberschriften]
```

Liefere pro Feld genau eine Formulierung und keine Alternativen oder
Erklärungen. `hero_image` wird nicht vom Textmodell erfunden: Nach dem Hochladen
der Bilder wird ein vorhandener Eintrag aus `images` bewusst ausgewählt.
`hero_enabled` wird erst dann aktiviert, wenn Texte und Bild vollständig sind.

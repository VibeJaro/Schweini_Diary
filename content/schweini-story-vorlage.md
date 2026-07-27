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

Erzeuge zusammen mit der Geschichte alle Texte für die Hero-Sektion. Die
Überschrift besteht aus einem natürlichen Aufbau und einer kurzen Pointe. Beide
Texte dürfen im Browser automatisch umbrechen; erzwinge selbst keine
Zeilenumbrüche.

Gib genau dieses Format aus:

```text
title: [Titel der Geschichte]
mood: [kurze Stimmung]
hero_title: [natürliche Magazinüberschrift oder kurzer Satz, ungefähr 25 bis 60 Zeichen]
hero_punchline: [kurze überraschende Schweini-Pointe, ungefähr 15 bis 45 Zeichen]
hero_deck: [spannende Zusammenfassung, höchstens 145 Zeichen]
hero_label: [kurzes Bildlabel, höchstens 32 Zeichen]
hero_caption: [kurze Bildunterschrift, höchstens 90 Zeichen]

body:
[vollständiger Tagebucheintrag mit passenden Markdown-Zwischenüberschriften]
```

Liefere pro Feld genau eine Formulierung und keine Alternativen oder
Erklärungen. `hero_image` wird nicht vom Textmodell erfunden: Nach dem Hochladen
der Bilder wird ein vorhandener Eintrag aus `images` bewusst ausgewählt.
`hero_enabled` wird erst dann aktiviert, wenn Texte und Bild vollständig sind.

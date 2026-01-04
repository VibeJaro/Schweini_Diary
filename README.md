# Schweinis Chaos-Logbuch 🐷⚡

Ein verspieltes, statisches Tagebuch für die Abenteuer des verrückten Schweini. Die Seite zeigt Einträge direkt aus Supabase, erlaubt Reaktionen und Kommentare mit Identitätswahl, rendert Markdown-Inhalte und verlinkt das Profilbild (liegt unter `public/images/profile.png`).

## Features
- Spielerisches Layout für Kinder, ohne Deploy-/Vercel-Hinweise auf der Startseite.
- Einträge werden nur aus Supabase geladen (keine Erstellung direkt auf der Seite).
- Kommentare mit Identitätsauswahl und Emoji-Reaktionen.
- Markdown-Unterstützung für Eintragsinhalte.
- Profilbild-Link zum direkten Herunterladen/Aufrufen.

## Lokal ansehen
1. `config.js` mit gültigen `SUPABASE_URL` und `SUPABASE_ANON_KEY` füllen (siehe `instructions.md` für die Supabase-Tabellen).
2. Statischen Server starten, z. B.: `python -m http.server 3000`.
3. Im Browser `http://localhost:3000` öffnen.

> Ohne gültige Supabase-Verbindung erscheint ein freundlicher Hinweis, dass das „Chaos-Funkgerät“ schläft.

## Inhalt pflegen
- Neue Einträge werden ausschließlich in Supabase erstellt.
- Bilder können unter `public/images/` abgelegt werden (z. B. `public/images/profile.png`) und als Links in Supabase hinterlegt werden.
- Markdown im Feld `body` wird im UI formatiert dargestellt.

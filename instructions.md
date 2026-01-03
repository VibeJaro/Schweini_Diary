# Setup-Anleitung: Supabase + Vercel

Diese App nutzt nur statische Dateien (kein Build-Schritt) und kommuniziert direkt per Supabase-JavaScript-Client. Folge den Schritten unten, um alles lauffähig zu machen.

## 1) Supabase-Projekt vorbereiten
1. Neues Projekt in Supabase anlegen.
2. Den **Project URL** und den **anon public key** notieren.
3. SQL-Editor öffnen und die Tabellen anlegen (RLS wird deaktiviert, damit der anonyme Key reicht):

```sql
-- Tabelle für die Tagebucheinträge
create table if not exists public.entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  mood text,
  date_label text,
  author text,
  images text[],
  created_at timestamptz default now()
);

-- Kommentare je Eintrag
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid references public.entries(id) on delete cascade,
  author text,
  body text not null,
  created_at timestamptz default now()
);

-- Reaktionen werden als einzelne Klicks gespeichert (Auswertung im Client)
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid references public.entries(id) on delete cascade,
  emoji text not null,
  created_at timestamptz default now()
);

-- RLS komplett aus, damit keine Policies nötig sind
alter table public.entries disable row level security;
alter table public.comments disable row level security;
alter table public.reactions disable row level security;
```

> Hinweis: Für ein echtes Produkt solltest du später RLS+Policies aktivieren. Für dieses Test-Tagebuch ist alles offen gelassen.

### Beispiel-Daten einfügen
```sql
insert into public.entries (title, body, mood, date_label, author, images)
values (
  'Der Keks-Raubzug',
  'Ich wollte nur die Dose beschützen... und plötzlich fehlte ein Keks! 🐷',
  'Frech 😜',
  'Heute, 08:30 Uhr',
  'Schweini',
  ARRAY['https://<deine-vercel-domain>/images/keks.jpg']
);

insert into public.comments (entry_id, author, body)
select id, 'Oma', 'Du kleiner Krümel-Räuber!' from public.entries limit 1;
```

## 2) App konfigurieren
1. **Vercel-Variablen setzen:** Im Vercel-Projekt zwei Environment Variables anlegen:
   - `SUPABASE_URL` → z.B. `https://<YOUR-PROJECT>.supabase.co`
   - `SUPABASE_ANON_KEY` → dein anon-public-key
2. Build-Command ist bereits in `vercel.json` hinterlegt: `node scripts/generate-config.js`. Der Befehl erzeugt bei jedem Deploy automatisch eine `config.js` aus den Vercel-Variablen.
3. Lokal testen (optional): Setze die beiden Variablen (z.B. `SUPABASE_URL=... SUPABASE_ANON_KEY=... npm run generate-config`). Danach kannst du `index.html` direkt im Browser öffnen.

## 3) Bilder im GitHub-Repo ablegen
- Lege deine Bilder unter `public/images/` ab. Beispiel: `public/images/keks.jpg`.
- Nach dem Vercel-Deploy erreichst du das Bild unter `https://<deine-vercel-domain>/images/keks.jpg`.
- Trage diese URL (oder eine relative URL wie `/images/keks.jpg`) als Eintrag in die Supabase-Spalte `images` ein (ein Link pro Zeile im Formular der App). Supabase speichert nur die Links; die Dateien selbst liegen im Repo.

## 4) Vercel-Deploy
1. Neues Vercel-Projekt aus diesem Repo erstellen.
2. Environment Variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) hinterlegen.
3. Der hinterlegte Build-Command `node scripts/generate-config.js` erzeugt `config.js`; Output-Directory bleibt `.` (statische Files).
4. Deploy starten. Danach sollte die App unter deiner Vercel-URL erreichbar sein.

## 5) Was du in Supabase befüllen kannst
- **entries**: Titel, Stimmung, optionales Datumslabel (wird sonst automatisch generiert), Autor, Text und eine Liste an Bild-URLs (Text-Array).
- **comments**: Author + Text pro Eintrag. Kann direkt im UI hinzugefügt werden.
- **reactions**: Entsteht automatisch pro Klick im UI (ein Datensatz je Klick). Die Anzeige summiert die Klicks clientseitig.

## 6) Nutzung
- Neues Setup: `config.js` füllen, deployen, SQL-Script ausführen, fertig.
- Neue Einträge direkt im UI anlegen; Kommentare werden per Identitätsauswahl gespeichert; Reaktionen zählen automatisch.

Viel Spaß mit dem Chaos-Logbuch! 🐷

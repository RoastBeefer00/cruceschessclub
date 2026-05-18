# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server (SvelteKit).
- `npm run build` — production build (uses `@sveltejs/adapter-auto`; deploy target determined by environment).
- `npm run preview` — preview the production build locally.

No test, lint, or typecheck scripts are wired up. Node >=22 is required (`package.json` engines).

Dev env is managed via `devenv.nix` (devenv + direnv). `.envrc` activates devenv, which enables `languages.javascript.npm` and loads `.env` via `dotenv.enable`.

## Environment variables

Read via `$env/dynamic/private` in server code:

- `GOOGLE_CALENDAR_API_KEY` — public-restricted API key for the Calendar v3 read API.
- `GOOGLE_CALENDAR_ID` — calendar to fetch (defaults to `primary`).

When the API key is missing, server loaders return empty event arrays rather than throwing — the UI degrades to placeholder/TBD rows. See `GOOGLE_CALENDAR_SETUP.md` for the public-calendar prerequisite.

## Architecture

SvelteKit 2 + Svelte 5 SPA-ish marketing site for the Cruces Chess Club. Tailwind v4 via `@tailwindcss/vite` (configured in `vite.config.js`, imported in `src/app.css`). SCSS is preprocessed with `svelte-preprocess`; `src/variables.scss` is prepended automatically — referenced from both `svelte.config.js` and `vite.config.js`.

### Calendar data flow (the central feature)

Three entry points hit Google Calendar v3, and they each shape data differently. Edits in one place often need a matching change in the others.

1. **Homepage** (`src/routes/+page.server.js` → `src/routes/+page.svelte`): server `load()` fetches the next ~3 months of events, the page passes them to `<Calendar nextEventOnly={true} serverEvents={data.calendarEvents}>`. The component renders only the first upcoming event as a hero card.
2. **Schedule page** (`src/routes/schedule/+page.server.js` → `src/routes/schedule/+page.svelte`): server `load()` returns a `monthsData` object keyed by month index (current + 2 following), each with its own time range. **MST/MDT DST handling is hardcoded** in this loader (DST window: Mar 9 – Nov 2 of the relevant year) — when crossing a DST boundary, verify the offset math still holds.
3. **Client API endpoint** (`src/routes/api/calendar/+server.js`): `GET /api/calendar?timeMin=…&timeMax=…&maxResults=…` proxies the Calendar API. Used by `Calendar.svelte`'s `onMount` fallback when `serverEvents` isn't provided.

The shared `<Calendar>` component (`src/routes/schedule/Calendar.svelte`) drives all three. Key behaviors:

- If `serverEvents` is passed, the `onMount` fetch is skipped.
- `nextEventOnly={true}` renders the hero card; otherwise it renders a monthly table where `sortedEvents` (real events) replaces the Wednesday-placeholder rows from `getWednesdays(month)`.
- Date comparison uses local `YYYY-MM-DD` strings to dodge UTC-vs-local off-by-one bugs (recent fix `b503008` / `68e8e41`).
- Heavy `console.log` debugging is intentional in this file.

### Static fallback data

`src/routes/Schedule.json`, `Coaches.json`, `Calendar.json` (and duplicates under `src/routes/schedule/`) are legacy static schedules. The Calendar component used to support `useGoogleCalendar={false}` to read these; current pages always pass `true`. Keep the JSONs as reference data until pages are confirmed to no longer load them.

### Routes

Top-level marketing pages: `about`, `lessons`, `schedule`, `donate`, `support`, `privacy`, `gallery`, `tournaments`. `gallery` and `tournaments` links are currently commented out of the nav in `src/routes/+layout.svelte`. The fixed nav and bottom chess.com affiliate banner are layout-level.

### Styling notes

Tailwind v4 with the Vite plugin — no `tailwind.config.js`; theme customization goes in CSS (`@theme` in `app.css`) if needed. Some classes use the v3 → v4 renamed forms (`bg-linear-to-r`, etc.) — match whatever is already in the file when editing.

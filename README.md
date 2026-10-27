# Teriyaki Projects

Portfolio site for github.com/TeriyakisaurusRex2, built with [Astro](https://astro.build).
It reads your GitHub repos at build time, so the site updates itself.

```bash
npm install      # once
npm run dev      # local preview at http://localhost:5191
npm run build    # writes the finished site to dist/
```

Until at least one repo is tagged `teriyaki`, the site shows sample data from `src/data/sample-projects.json`.

## Adding a project to the site

1. **Put the project on GitHub** as a public repo. The repo name becomes its address:
   `rune-dice` → `teriyakisaurusrex2.github.io/rune-dice/`. Lowercase-with-dashes reads best.
2. **Tag it**: on the repo's page, click the ⚙ next to "About" and add the topic `teriyaki`.
   No tag = not on the site.
3. **Optional, recommended**: add a `teriyaki/` folder to the repo with a `project.json`
   and any screenshots/videos. Everything in it is optional; anything you leave out
   falls back to what GitHub already knows.

```json
{
  "name": "Rune Dice",
  "description": "Viking push-your-luck 3D dice game with online multiplayer.",
  "about": "A longer paragraph for the project page (Watch projects only).",
  "type": "play",
  "category": "game",
  "engine": "Unity",
  "status": "In development",
  "created": "2026-08-03",
  "tags": ["3D", "multiplayer"],
  "thumbnail": "thumb.png",
  "playUrl": "https://example.netlify.app",
  "media": [
    { "src": "https://www.youtube.com/watch?v=XXXXXXXXXXX", "caption": "Trailer" },
    { "src": "trailer.mp4", "caption": "Gameplay" },
    { "src": "shot1.png", "caption": "Leaving the dock" }
  ]
}
```

| Field | What it does | If left out |
|---|---|---|
| `name` | Display name | Repo name, prettified (`fret-path` → "Fret Path") |
| `description` | One line on the card | The repo's GitHub description |
| `about` | Longer text in the project page's side panel | Uses `description` |
| `type` | `"play"` (opens the game) or `"watch"` (screenshots/video page) | `play` if GitHub Pages is on for the repo, else `watch` |
| `category` | `game`, `tool`, `hardware`, `mods` (drives the filters) | `game` |
| `engine` | e.g. `Unity` (powers the Unity filter) | none |
| `status` | e.g. `In development`, `Released` | hidden |
| `created` | `YYYY-MM-DD`, when you actually started | Date the repo was made |
| `tags` | Shown on cards and the project page | The repo's other topics |
| `thumbnail` | Card image, path inside `teriyaki/` or a full URL | Coloured tile with initials |
| `playUrl` | Send "Play" somewhere other than `/repo-name/` | `/repo-name/` |
| `media` | Slides for the Watch page: images, `.mp4`/`.webm`, or YouTube links | One placeholder slide |

"Last updated" always comes from GitHub (the last push), so you never set it by hand.

**Keep videos small** (under ~25 MB) or use an unlisted YouTube link. GitHub rejects files over 100 MB.

## Showcase projects (code stays off GitHub)

For projects you want on the site without publishing their code (the Unity games),
make a folder in **this** repo: `public/showcase/<slug>/`. The folder name becomes the
address (`public/showcase/of-theseus/` → `/of-theseus/`). Put in it:

- `project.json`: same fields as above (`type` defaults to `watch`). Add `"repoUrl"` only if
  you ever want a "View source" button.
- `README.md` (optional): becomes the "about" section on the project page.
- Screenshots and videos: just drop them in. Without a `media` list they're shown in
  filename order, so name them `01-trailer.mp4`, `02-hub.png`, `03-boss.png`...
  A file named `thumb.png` (or `.jpg`/`.webp`) becomes the card image; otherwise the first screenshot is used.

"Last updated" for these is the last time you committed a change to that folder,
or set `"updated": "YYYY-MM-DD"` in `project.json` to choose it yourself.

## Making a playable project work at /repo-name/

In that project's repo: Settings → Pages → Source: "Deploy from a branch", pick `main` and `/ (root)`.
For a single `index.html` project that's all. Vite/React projects also need `base: '/repo-name/'`
in `vite.config` and a small build workflow (ask Claude for the template).

## How updates reach the site

`.github/workflows/deploy.yml` rebuilds and republishes the site:
on every push to this repo, every 6 hours, and when you press **Run workflow** on the Actions tab.

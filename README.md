# shlomota.github.io

Personal site — papers, projects, writing, and what I'm working on now.

Plain HTML, CSS and ~90 lines of JavaScript. No build step, no framework, no dependencies
beyond two Google Fonts. Open `index.html` in a browser and that's the whole thing.

```
index.html          all content
assets/style.css    one stylesheet (light + dark)
assets/main.js      theme toggle, project filter, section rail
```

## Publishing to GitHub Pages

```bash
git init
git add .
git commit -m "Personal site"
git branch -M main
git remote add origin git@github.com:shlomota/shlomota.github.io.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**.
Live at `https://shlomota.github.io` within a minute or two.

The repo must be named exactly `shlomota.github.io` for the bare domain. Any other repo
name works too, it just lands at `https://shlomota.github.io/<repo-name>/`.

## Local preview

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Editing

**Add a project** — copy any `<li class="project">` block in `index.html`. The
`data-tags` attribute drives the filter; use tags that already exist as buttons
(`llm audio rag eval data hebrew cv`) or add a new `<button data-filter="...">` to the
filter row to introduce one. Filters are deep-linkable: `?t=audio#projects`.

**Add a post or a paper** — same idea, copy a sibling `<li>`. Newest first.

**Colours and type** — the custom properties at the top of `assets/style.css`. The dark
palette is defined twice on purpose (once under `prefers-color-scheme`, once under
`[data-theme="dark"]`) so the toggle can override the OS in both directions.

## Deliberately not here

- No email address. Add one to the masthead `.links` list if you want to be reachable
  directly rather than via LinkedIn.
- No analytics.

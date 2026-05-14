# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal blog at https://markeldo.com — a Jekyll 3 site originally forked from Jekyll Now. Hosted by **GitHub Pages' auto-build path using the `github-pages` gem**, *not* a GitHub Actions workflow. There is no test suite, no lint step, and no CI.

The custom domain is set via `CNAME`. Pushes to `master` trigger the build on GitHub.

## Workflow: branch + PR for every change

**`master` is protected — direct pushes are rejected.** Every change must land via a branch and a pull request, including doc-only edits to `README.md` or `CLAUDE.md`. Before making any edit, check the current branch; if it's `master`, create a feature branch first (`git checkout -b <short-name>`), do the work there, push the branch, and open a PR with `gh pr create`.

## Local development

```sh
# One-time: bundler is user-installed (no root). Add its bin to PATH:
export PATH="/home/mark/.local/share/gem/ruby/3.0.0/bin:$PATH"
bundle install --path vendor/bundle

# Serve with live reload:
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --watch
```

**`Gemfile` and `Gemfile.lock` are gitignored on purpose** (see `.gitignore`). Local development uses a recent `github-pages` gem (`~> 232` at time of writing); the production build uses *whatever version GitHub Pages has pinned server-side*, which can differ. Don't assume features available locally are available in production — and conversely, don't bump the local Gemfile expecting it to change anything in production.

`vendor/` and `.bundle/` **must stay in `_config.yml`'s `exclude:` list**. Without that, Jekyll scans bundled gem template fixtures (e.g. `vendor/bundle/.../jekyll/lib/site_template/_posts/`) and fails with `Invalid date '<%= Time.now... %>'`.

## Posts: two separate post collections, both under `_posts`

This site uses two `_posts` directories living under different parent paths — both are picked up because Jekyll treats *any* `_posts/` folder as a post collection:

- `posts/_posts/` — blog posts. Layout defaults to `post`. Included in pagination (`paginate: 6`).
- `emails/_posts/` — archived newsletter issues. Layout defaults to `email`. **Marked `hidden: true` via `defaults` in `_config.yml`** so they stay out of `paginator.posts` on the index. The `/emails` page lists them via `site.categories.emails`.

This is why the two `defaults` blocks at the bottom of `_config.yml` exist. If you add a new content type, follow the same pattern: new directory containing `_posts/`, plus a `defaults` block scoping by `path:`.

`drafts/` contains `*.md` files that are **not** built by default (Jekyll convention). Use `--drafts` on `jekyll serve` to preview.

## Tool pages: `/sid`, `/certutil`, `/whoami`, `/sudo`

These are single-page tools (encoders/parsers) for security assessment — paste output from a built-in Windows/Linux utility and have it parsed client-side, so no third-party binary has to land on a client's network.

- `/sid` — encode a Windows SID as the DER hex needed for an LDAP `userCertificate`-style extension.
- `/certutil` — parse `certutil -dump` output and surface findings (EKU, key usage, validity, etc.).
- `/whoami` — parse Windows `whoami /all` (or any subset: `/user`, `/groups`, `/priv`) and flag dangerous privileges (SeImpersonate, SeDebug, SeBackup/Restore, …) and high-value group memberships by SID (Backup Operators, DnsAdmins, Domain/Enterprise Admins, …). Localised group names are handled via SID match; the canonical name is surfaced as a subtitle when the raw name differs. SID-cell links into `/sid/?sid=…` so the round-trip works.
- `/sudo` — parse Linux `sudo -l` output and cross-reference each allowed binary against an embedded curated GTFOBins lookup (~50 entries), with link-out to `gtfobins.github.io` for anything not in the curated set. Flags `NOPASSWD`/`SETENV`, dangerous `Defaults env_keep` entries (`LD_PRELOAD`, `LD_LIBRARY_PATH`, `PYTHONPATH`, …), shell-equivalent runas targets, and command-path wildcards.

Each tool is split across three files:

- `<tool>/index.html` — thin HTML shell. Front matter sets `layout: page`; the body is markup only, with `<script src="{{ site.baseurl }}/<tool>/<tool>.js" defer></script>` at the bottom.
- `<tool>/<tool>.js` — the tool's logic, wrapped in an IIFE so its constants don't leak to `window`.
- `_sass/_<tool>.scss` — the tool's styles, scoped under a parent class (`.ct` for certutil, `.sid` for sid, `.whoami` for whoami, `.sudo` for sudo) to keep them out of the rest of the site. Imported from `style.scss` before `_dark`.

Each partial defines `--<tool>-*` CSS custom properties for every colour it uses, and `_sass/_dark.scss`'s `dark-theme` mixin rebinds those tokens to dark-friendly values. This is how the tools participate in the site's dark mode (system preference + the toggle in the nav) without any tool-specific dark-mode code. When adding a new tool page, follow the same pattern.

The `force_light: true` front-matter mechanism is still wired in `_layouts/default.html` as an escape hatch (it adds `data-theme-locked` on `<html>` and suppresses the toggle button), but no page currently uses it.

## Dark mode

Lives in three places:

- `_sass/_dark.scss` — a single `dark-theme` mixin, applied via `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` (the latter excludes elements with `data-theme-locked`).
- `_layouts/default.html` — pre-paint inline script that reads `localStorage.theme` and sets `data-theme` *before* first render (FOUC-prevention). The toggle button (and its handler script) are wrapped in `{% unless page.force_light %}` so they aren't emitted on locked pages.
- `style.scss` — toggle button base styling, imports `_dark` last.

When adding new colours: prefer adding overrides inside the existing `dark-theme` mixin so both the manual and auto paths stay in sync. The toggle keeps `aria-pressed` synced with the resolved theme on init, click, and system-preference change.

## Conventions worth knowing

- **Permalinks** are `/:title/` (no date or category in the URL).
- **Markdown** is kramdown with GFM enabled; syntax highlighting via Rouge with class `.highlight`. Code-block colours are hand-rolled (Solarized-derived) in `_sass/_highlights.scss`, with dark-mode-friendly overrides in `_sass/_dark.scss`.
- **Sass** entry point is the root `style.scss` (with front matter so Jekyll renders it). Partials live in `_sass/`. Output style is `:expanded`.
- **Pagination** still uses `jekyll-paginate` (deprecated). Don't be surprised by it; migrating to `jekyll-paginate-v2` would require GitHub Pages to support it on the auto-build path, which it currently doesn't.

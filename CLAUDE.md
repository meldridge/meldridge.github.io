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
- `/whoami` — parse Windows `whoami /all` (or any subset: `/user`, `/groups`, `/priv`) and flag dangerous privileges (SeImpersonate, SeDebug, SeBackup/Restore, …) and high-value group memberships by SID (Backup Operators, DnsAdmins, Domain/Enterprise Admins, …). Localised group names are handled via SID match; the canonical name is surfaced as a subtitle when the raw name differs.
- `/sudo` — parse Linux `sudo -l` output and cross-reference each allowed binary against an embedded curated GTFOBins lookup (~50 entries), with link-out to `gtfobins.github.io` for anything not in the curated set. Flags `NOPASSWD`/`SETENV`, dangerous `Defaults env_keep` entries (`LD_PRELOAD`, `LD_LIBRARY_PATH`, `PYTHONPATH`, …), shell-equivalent runas targets, and command-path wildcards.

**Each tool page is self-contained.** The built HTML at `_site/<tool>/index.html` has its CSS and JS inlined; no `<link rel="stylesheet">` and no `<script src=>` survive. Save-as on the live URL produces a file that works on an air-gapped machine: dark mode (manual toggle + system preference), the tool's parser, and clipboard interactions all run from one file. The tools are also independent of each other — none of them link or depend on another.

Each tool is split across three source files plus a shared layout:

- `<tool>/index.html` — thin HTML shell. Front matter sets `layout: tool` and `tool: <name>` (matches the CSS/JS filenames). Body is markup only — no `<script src=>` tag; the layout inlines it.
- `<tool>/<tool>.js` — the tool's logic, wrapped in an IIFE so its constants don't leak to `window`. Inlined into the page at build time via `{% include_relative <tool>.js %}`, so the file must not contain `{{` or `{%` (Liquid would try to render those). End-of-body inlining means we lose the `defer` attribute that the source file would imply, but the script still runs after DOM parse.
- `_includes/tool/<tool>.css` — the tool's styles, scoped under a parent class (`.ct` for certutil, `.sid` for sid, `.whoami` for whoami, `.sudo` for sudo). Plain CSS, **not SCSS** — Liquid `{% include %}` dumps the file verbatim, so SCSS-only syntax like `//` line comments would leak through and break parsing.
- `_layouts/tool.html` — the minimal layout. Inlines `_includes/tool/base.css` (typography, theme toggle, body-level dark mode), then `_includes/tool/{{ page.tool }}.css`, then the pre-paint theme script, then `{% include_relative {{ page.tool }}.js %}`, then the theme-toggle click handler. No masthead/nav/footer chrome — just a title bar with the theme toggle and a small `markeldo.com` credit.

Each per-tool CSS file defines `--<tool>-*` CSS custom properties for every colour it uses and rebinds those same tokens twice at the bottom: under `html[data-theme="dark"] .<class>` (manual-toggle path) and inside `@media (prefers-color-scheme: dark) { html:not([data-theme="light"]) .<class> { … } }` (system-preference path). Both blocks carry the same declarations — duplication is the cost of inlining CSS rather than going through SCSS's `dark-theme` mixin. When adding a new tool page, follow the same pattern.

The `force_light: true` front-matter mechanism is still wired in `_layouts/default.html` for blog pages as an escape hatch (it adds `data-theme-locked` on `<html>` and suppresses the toggle button), but no page currently uses it, and the new `_layouts/tool.html` doesn't honour it — tool pages always offer the toggle.

## Dark mode

There are two separate dark-mode paths now, one per layout family:

**Blog (`_layouts/default.html` → posts/emails/pages):**

- `_sass/_dark.scss` — a single `dark-theme` mixin, applied via `:root[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` (the latter excludes elements with `data-theme-locked`).
- `_layouts/default.html` — pre-paint inline script that reads `localStorage.theme` and sets `data-theme` *before* first render (FOUC-prevention). The toggle button (and its handler script) are wrapped in `{% unless page.force_light %}` so they aren't emitted on locked pages.
- `style.scss` — toggle button base styling, imports `_dark` last.

**Tool pages (`_layouts/tool.html`):**

- All CSS, including the dark-mode declarations, is inlined into the single built HTML. The token-rebinding lives in `_includes/tool/base.css` (page chrome) and `_includes/tool/<tool>.css` (the tool's component palette), with both selectors (`html[data-theme="dark"]` and `@media (prefers-color-scheme: dark)`) written out explicitly.
- The pre-paint script and toggle click handler are inlined in `_layouts/tool.html` itself.
- The toggle keeps `aria-pressed` synced with the resolved theme on init, click, and system-preference change — same logic as the blog path, just duplicated rather than shared.

When adding new colours: pick the right path. Blog chrome → `_sass/_dark.scss` mixin. Tool-page tokens → the per-tool CSS file in `_includes/tool/`, in both the `html[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` blocks.

## Conventions worth knowing

- **Permalinks** are `/:title/` (no date or category in the URL).
- **Markdown** is kramdown with GFM enabled; syntax highlighting via Rouge with class `.highlight`. Code-block colours are hand-rolled (Solarized-derived) in `_sass/_highlights.scss`, with dark-mode-friendly overrides in `_sass/_dark.scss`.
- **Sass** entry point is the root `style.scss` (with front matter so Jekyll renders it). Partials live in `_sass/`. Output style is `:expanded`.
- **Pagination** still uses `jekyll-paginate` (deprecated). Don't be surprised by it; migrating to `jekyll-paginate-v2` would require GitHub Pages to support it on the auto-build path, which it currently doesn't.

# markeldo.com

Source for my personal blog at [markeldo.com](https://markeldo.com) — posts on security, software engineering, and technology.

Jekyll 3 site originally forked from [Jekyll Now](https://github.com/barryclark/jekyll-now), published via GitHub Pages' built-in build (the `github-pages` gem — no Actions workflow). Pushes to `master` trigger a rebuild.

## Local development

```sh
bundle install --path vendor/bundle
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --watch
```

`Gemfile` / `Gemfile.lock` are gitignored. Production uses whatever `github-pages` gem version GitHub has pinned server-side, regardless of what's in a local Gemfile — so committing one would suggest control over the production build that doesn't actually exist.

## Layout

- `posts/_posts/` — blog posts (paginated on the index).
- `emails/_posts/` — archived newsletter issues, listed at `/emails`.
- `drafts/` — unpublished drafts (pass `--drafts` to `jekyll serve` to preview).
- `sid/`, `certutil/` — single-page tools (encoders/parsers). Each tool is a thin HTML shell plus a JS file in the same directory; its styles are a Sass partial in `_sass/` and follow the site's dark mode.
- `_layouts/`, `_includes/`, `_sass/` — templates and styles. Dark mode lives in `_sass/_dark.scss` plus a pre-paint script in `_layouts/default.html`.

See [`CLAUDE.md`](./CLAUDE.md) for more detail on the conventions and gotchas.

## License

Code is MIT-licensed (see [`LICENSE`](./LICENSE), inherited from Jekyll Now). Post content is © Mark Eldridge.

# WoW Armory Redesign
Portfolio project redesigning World of Warcraft Armory pages, by Daniel Singer.

[Original mockup Reddit post](https://www.reddit.com/r/wow/comments/5olndg/theres_still_no_update_for_character_armory_pages/)

## Development
Built with [Hugo](https://gohugo.io/) (extended). No Node or Ruby required.

```sh
hugo server   # dev server with live reload (unminified CSS)
hugo --gc     # production build into public/ (minified, fingerprinted CSS)
```

| Path | Purpose |
| --- | --- |
| `content/dnasis.md` | Page front matter (title, description); body lives in the layout |
| `layouts/_default/dnasis.html` | The Dnasis armory page markup |
| `layouts/_default/baseof.html`, `layouts/partials/` | Site shell: nav, footer, meta, scripts |
| `assets/css/` | Stylesheets, concatenated and minified by Hugo Pipes. `wow.css`, `navbar.css`, `footer.css` are vendored Blizzard styles; `armory.css` and `credit-bar.css` are this project's own |
| `static/assets/` | Images, fonts and scripts, served unchanged at `/assets/` |

Deploys to GitHub Pages from `master` via `.github/workflows/pages.yml` (repo setting: Pages source must be "GitHub Actions").

# My Watchlist

Single-file PWA (`index.html`) hosted on GitHub Pages at https://eliyabsnss1-tech.github.io/My-Watchlist/ and installed on the owner's Android phone.

## Shipping a change (do this for every change the user asks for)

The installed app updates itself by comparing `APP_VERSION` in `index.html` with `version.json` on the server. A change only reaches the phone if both are bumped:

1. Make the change.
2. Increase `const APP_VERSION = N;` in `index.html` by 1.
3. Set `version.json` to the same number, with a short user-facing `note` (shown as "Updated: <note>" on the phone).
4. If you add a new file the app needs offline, add it to `SHELL` in `sw.js` and bump `V` there.
5. Commit and `git push` to `main`. GitHub Pages deploys in about a minute; the phone picks it up the next time the app is opened or brought back to the front (or within 5 minutes while open). Settings ▸ "Check for updates now" forces it.

## App layout

The app opens on a Home page (tiles, two per row) with a left side menu (☰ top-left). Each tile/menu entry is a "section" listed in the `SECTIONS` array in `index.html`. To add a new app the user mentions, add one entry there: `{ id, title, desc, color, icon, url }`. Entries with a `url` show that site full-screen inside the app (iframe); `watchlist` is the built-in one.

User data lives in the phone's localStorage (`ws.settings`, `ws.list`, `ws.view`) — never rename those keys without a migration.

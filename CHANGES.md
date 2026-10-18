---
layout: default
title: Tools changelog
description: What changed in the tools, the Play link, previews, and install-as-app.
permalink: /changes/
---

# Changes

## 2026-10-18

- **Play** opens [Emoji Games](https://thewhitewitchtm.github.io/emojigames/) in a new tab. This site stays where it was.

## 2026-10-17

- **Play** leaves this site. The menu item opens [Emoji Games](https://thewhitewitchtm.github.io/emojigames/). Old `/games/` addresses redirect to the same games over there.
- **X previews.** Blog and Rants pointed at image files that were not in the repo, so the card image 404’d. Those cards are in, at 1200×630. The default card is `/assets/images/og.jpg`, also 1200×630. Head tags now send an absolute `og:image` and `twitter:image`, plus type, width, and height when the size is known. Blog posts use the blog card. Rants use the rants card.
- **App Icon Wizard** at `/tools/icon-wizard/`. Drop an image and it builds the iOS and web-app sizes (favicon, apple-touch, 192, 512, maskable), plus a manifest and a zip. It stays in the browser.
- **Install as app.** `manifest.webmanifest`, home-screen icons, and a service worker so the browser can offer install / open as app.

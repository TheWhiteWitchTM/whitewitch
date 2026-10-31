---
layout: default
title: MAGIC Apprentice
description: "MAGIC Apprentice is the small desk for MAGIC, the language that compiles to JavaScript. A big Run button, plain errors, a helper that stays on the machine. Ages 8 to 16. Alpha. No account."
image: /assets/images/apprentice.jpg
image_width: 1200
image_height: 630
permalink: /magic/apprentice/
---

<img class="project-banner" src="{{ '/assets/images/apprentice.jpg' | relative_url }}" alt="MAGIC Apprentice. Paper, night, yours." width="100%">

# 📘 MAGIC Apprentice

MAGIC Studio is a workshop. MAGIC Apprentice is the desk you get first.

It's an Electron app for [MAGIC]({{ '/magic/' | relative_url }}), for ages 8 to 16. It feels like a small BASIC. A program on the page, a big Run button, and a sentence when something is wrong. Hello, world prints in the box. A picture or a game opens a play window. The arrow keys move the cat. Close the window when you have seen it, or press Stop.

The paper theme is the light one. Night is the dark one. It remembers, so you only have to pick once. Beginner keeps the screen to examples, the program, Run, and the helper. Advanced adds the file list, a strict check, and the compiler's own line under the plain one.

## Plain errors

`=` stores a value. A test that uses one `=` is told to write `==`. A block that is still open names the words that close with `end`: `if`, `for`, `while`, `fn`, and `class`. Advanced still shows the compiler's line, under the sentence.

## A safe box

A program can read files inside its own project. It cannot read the rest of the computer, start another program, or use the internet. The play window does not get Node. The editor window is sandboxed too. It talks to the app through a short list of calls.

Projects live in the app's library. Show folder, in Advanced, opens that library. Web page packs the program the way MAGIC packs an app, and opens `index.html`. App packs that same folder and starts it, after it asks. Both land in `export/` inside the project.

## The helper

The helper is optional. It uses Ollama on this computer, at `127.0.0.1:11434`, and nowhere else. Explain and Ask send the open program to that local model. The helper is told it cannot edit files. If a reply contains a program, MAGIC Apprentice shows it and waits. Use this code asks again before the editor changes. Nothing is saved until you press Save.

Without Ollama, the column still explains `print`, `@canvas`, `@terminal`, `@games`, loops, and sprites from the program in front of you.

## Start

The MAGIC project has to be built first. From the folder that holds both:

```
cd ../MAGIC
npm install
cd ../MAGIC-Apprentice
npm install
npm start
```

`bin/magic-apprentice` does the same thing and picks up nvm when it is installed. The first launch opens Hello, world and a three-step tour. Skip it if you want. Help → Tutorial brings it back.

The window that starts black, for when the big Run button is no longer the point, is [MAGIC Studio]({{ '/magic/studio/' | relative_url }}). [RETRO MAGIC]({{ '/magic/retro/' | relative_url }}) is the 8-bit compiler. It has its own window. This desk stays on the JavaScript one.

MIT. No account. Alpha, so the desk can still move.

## Three repos

The smaller desk, the language, and the window. Roots. Clone them.

{% include repo-links.html %}

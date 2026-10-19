---
layout: default
title: MAGIC Studio
description: "MAGIC Studio is the dark window for MAGIC, the language that compiles to JavaScript. Editor, run console, terminal. It starts black. RETRO Studio is the 8-bit window. Alpha. No account."
image: /assets/images/studio.jpg
image_width: 1200
image_height: 630
permalink: /magic/studio/
hide_sides: true
---

<img class="project-banner" src="{{ '/assets/images/studio.jpg' | relative_url }}" alt="MAGIC Studio. Black, local, yours." width="100%">

# 🖥️ MAGIC Studio

Editing `.magic` files in whatever tab was already open got old. So there's a window.

MAGIC Studio is an Electron app. Project tree on the side, editor in the middle, run console, and a terminal. It starts black. Black background, white text, color on the code. The status bar says Black. Click that if you want the lights on. It remembers, so you only have to disappoint me once.

Shift+F10 runs the file in front of you. A `.magic` file goes through `magic run`. JavaScript goes through `node`. TypeScript goes through `node` with the types stripped. Python and a shell script get the usual commands. Click a `file:line:column` path in the console and it opens. Preview packs a script into a window. Check compiles the buffer and lists the problems.

Ctrl+Space completes. Ghost text shows up while you type, once a local model is installed. Tab accepts it. The Complete button in the status bar turns the ghost off. Ctrl+Space still works. Turning off the haunting should not turn off the dictionary.

## Ask

Alt+9 opens Ask. It stays shut until you open it. Enter sends. Shift+Enter inserts a line.

Local uses Ollama on your machine. That mode keeps the prompt there. Ask does not edit files. Edit rewrites the selection you already made. Those are different jobs. Grok is on the list when the `grok` command is already installed. Grok's Edit mode can change files in the open folder. I have notes about letting a model edit unsupervised. Those notes are not a feature yet. Help → Local AI has the install steps, if you want it on purpose.

No account. No marketplace. MIT. Alpha, so the window can still move, and it will.

## Start

```
npm install
npm start
```

`bin/magic-studio` does the same thing and picks up the tools on PATH. Open a folder, or make one from the welcome screen. If the [MAGIC]({{ '/magic/' | relative_url }}) repo is sitting next to this one, the examples button can find the samples. The smaller desk, with the big Run button, is [MAGIC Apprentice]({{ '/magic/apprentice/' | relative_url }}). The window for the C64, the Apple II, and the TI-99/4A is [RETRO Studio]({{ '/magic/retro/studio/' | relative_url }}). This one runs the JavaScript compiler.

## Three repos

The window, the language, and the smaller desk. Roots. Clone them. Argue with the code if it deserves it.

{% include repo-links.html %}

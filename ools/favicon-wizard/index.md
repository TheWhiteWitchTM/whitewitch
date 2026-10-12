---
layout: default
title: Favicon Wizard
permalink: /tools/favicon-wizard/
---

<style>
  #favicon-wizard { max-width: 720px; margin: 0 auto; }
  .instructions { background: #111; border: 1px solid #2a2a2a; border-radius: 6px; padding: 0.8rem 1rem; margin-bottom: 1rem; font-size: 0.95rem; }
  .instructions code { background: #1a1a1a; padding: 0.1rem 0.3rem; border-radius: 3px; }
  input, select { width: 100%; padding: 0.6rem; margin: 0.3rem 0; background: #111; color: #e8e8e8; border: 1px solid #2a2a2a; border-radius: 6px; }
  .row { display: flex; gap: 0.6rem; }
  .row > * { flex: 1; }
  #preview { width: 64px; height: 64px; border: 1px solid #2a2a2a; border-radius: 8px; margin: 1rem 0; background: #111; }
  textarea { width: 100%; height: 80px; background: #0a0a0a; color: #c9a6ff; border: 1px solid #2a2a2a; border-radius: 6px; padding: 0.5rem; font-family: monospace; font-size: 0.85rem; }
  button { background: #6b4c8a; color: #fff; border: none; border-radius: 5px; padding: 0.45rem 0.9rem; cursor: pointer; margin-right: 0.4rem; }
  button:hover { background: #8a6cb0; }
</style>

<div id="favicon-wizard">
  <h1>🔮 Favicon Wizard</h1>

  <div class="instructions">
    <strong>How to use</strong><br>
    Type text or an emoji, pick colors, then copy the SVG or the ready-to-use <code>&lt;link&gt;</code> tag.<br>
    Works great for quick site icons. No data leaves your browser.
  </div>

  <input id="text" type="text" placeholder="Text or emoji (e.g. 🧙‍♀️ or WW)" maxlength="4" value="🧙‍♀️">
  <div class="row">
    <input id="bg" type="color" value="#0a0a0a" title="Background">
    <input id="fg" type="color" value="#c9a6ff" title="Text color">
  </div>
  <div class="row">
    <select id="size">
      <option value="32">32×32</option>
      <option value="64" selected>64×64</option>
      <option value="128">128×128</option>
    </select>
    <select id="shape">
      <option value="rounded">Rounded</option>
      <option value="circle">Circle</option>
      <option value="square">Square</option>
    </select>
  </div>

  <div id="preview"></div>

  <p><strong>SVG code</strong></p>
  <textarea id="svg-code" readonly></textarea>
  <button id="copy-svg">Copy SVG</button>
  <button id="download-svg">Download SVG</button>

  <p style="margin-top:1.2rem"><strong>HTML link tag</strong></p>
  <textarea id="link-tag" readonly></textarea>
  <button id="copy-link">Copy &lt;link&gt;</button>
</div>

<script>
const text = document.getElementById('text');
const bg = document.getElementById('bg');
const fg = document.getElementById('fg');
const size = document.getElementById('size');
const shape = document.getElementById('shape');
const preview = document.getElementById('preview');
const svgCode = document.getElementById('svg-code');
const linkTag = document.getElementById('link-tag');

function makeSVG() {
  const s = +size.value;
  const t = text.value || '★';
  const radius = shape.value === 'circle' ? s/2 : shape.value === 'rounded' ? s*0.2 : 0;
  const fontSize = Math.floor(s * 0.55);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect width="100%" height="100%" rx="${radius}" fill="${bg.value}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-size="${fontSize}" fill="${fg.value}" font-family="system-ui,sans-serif">${t}</text>
</svg>`;

  const dataUri = 'data:image/svg+xml,' + encodeURIComponent(svg);
  preview.innerHTML = `<img src="${dataUri}" width="64" height="64" alt="preview">`;
  svgCode.value = svg;
  linkTag.value = `<link rel="icon" href="${dataUri}">`;
  return svg;
}

function download(filename, content) {
  const a = document.createElement('a');
  a.href = 'data:image/svg+xml,' + encodeURIComponent(content);
  a.download = filename;
  a.click();
}

[text, bg, fg, size, shape].forEach(el => el.oninput = makeSVG);
makeSVG();

document.getElementById('copy-svg').onclick = () => navigator.clipboard.writeText(svgCode.value);
document.getElementById('copy-link').onclick = () => navigator.clipboard.writeText(linkTag.value);
document.getElementById('download-svg').onclick = () => download('favicon.svg', svgCode.value);
</script>

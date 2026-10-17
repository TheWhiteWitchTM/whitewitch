---
layout: default
title: App Icon Wizard
description: Drop an image. Get the iOS and web-app icon sizes, a manifest, and a zip. All local.
permalink: /tools/icon-wizard/
---

<style>
  #icon-wizard { max-width: 860px; margin: 0 auto; }
  .instructions { background: #111; border: 1px solid #2a2a2a; border-radius: 6px; padding: 0.8rem 1rem; margin-bottom: 1rem; font-size: 0.95rem; }
  .drop { border: 1px dashed #6b4c8a; border-radius: 8px; padding: 1.2rem; text-align: center; background: #111; margin-bottom: 0.6rem; }
  .drop.over { background: #1b1424; border-color: #c9a6ff; }
  input[type="file"], input[type="text"], select { width: 100%; padding: 0.6rem; margin: 0.3rem 0; background: #111; color: #e8e8e8; border: 1px solid #2a2a2a; border-radius: 6px; }
  label { display: block; margin: 0.7rem 0 0.2rem; }
  input[type="range"] { width: 100%; }
  .row { display: flex; gap: 0.8rem; flex-wrap: wrap; align-items: flex-end; }
  .row > * { flex: 1; min-width: 140px; }
  #preview-grid { display: flex; flex-wrap: wrap; gap: 0.7rem; margin: 1rem 0; }
  #preview-grid figure { margin: 0; text-align: center; }
  #preview-grid canvas { background: #111; border: 1px solid #2a2a2a; border-radius: 8px; width: 72px; height: 72px; }
  #preview-grid figcaption { font-size: 0.75rem; color: #bbb; margin-top: 0.25rem; }
  textarea { width: 100%; height: 140px; background: #0a0a0a; color: #c9a6ff; border: 1px solid #2a2a2a; border-radius: 6px; padding: 0.5rem; font-family: monospace; font-size: 0.8rem; }
  button { background: #6b4c8a; color: #fff; border: none; border-radius: 5px; padding: 0.45rem 0.9rem; cursor: pointer; margin: 0 0.4rem 0.4rem 0; }
  button:hover { background: #8a6cb0; }
  button:disabled { opacity: 0.45; cursor: default; }
</style>

<div id="icon-wizard">
  <h1>📲 App Icon Wizard</h1>

  <div class="instructions">
    <strong>How to use</strong><br>
    Drop an image. The wizard flattens it onto a background color and exports the sizes a web app needs to install on iOS and Android: favicon, apple-touch-icon, 192, 512, and maskable icons, plus a <code>manifest.webmanifest</code> and the head tags.<br>
    iOS and Android crop the icon into a squircle or circle. Leave the safe margin at 10% or more so the picture is not clipped. Nothing is uploaded.
  </div>

  <div id="drop" class="drop">Drop an image here</div>
  <input type="file" id="file" accept="image/*">

  <div class="row">
    <div>
      <label for="bg">Background</label>
      <input id="bg" type="color" value="#0a0a0a">
    </div>
    <div>
      <label for="fit">Fit</label>
      <select id="fit">
        <option value="fill">Fill (crop to square)</option>
        <option value="fit">Fit (show the whole image)</option>
      </select>
    </div>
    <div>
      <label for="name">App name</label>
      <input id="name" type="text" value="My App" maxlength="40">
    </div>
  </div>

  <label for="pad">Safe margin: <span id="pad-val">10%</span></label>
  <input type="range" id="pad" min="0" max="30" value="10">

  <label for="prefix">URL prefix for the tags</label>
  <input id="prefix" type="text" value="/" spellcheck="false">

  <div id="preview-grid"></div>

  <p><strong>Head tags</strong></p>
  <textarea id="html-out" readonly></textarea>
  <button id="copy-html" type="button">Copy head tags</button>

  <p style="margin-top:1.2rem"><strong>manifest.webmanifest</strong></p>
  <textarea id="manifest-out" readonly></textarea>
  <button id="copy-manifest" type="button">Copy manifest</button>
  <button id="download" type="button" disabled>Download zip</button>
</div>

<script>
const SIZES = [
  { file: 'favicon-16.png', size: 16, label: '16 favicon', ico: true },
  { file: 'favicon-32.png', size: 32, label: '32 favicon', ico: true },
  { file: 'favicon-48.png', size: 48, label: '48 favicon', ico: true },
  { file: 'icon-120.png', size: 120, label: '120 iPhone' },
  { file: 'icon-152.png', size: 152, label: '152 iPad' },
  { file: 'icon-167.png', size: 167, label: '167 iPad Pro' },
  { file: 'apple-touch-icon.png', size: 180, label: '180 iOS' },
  { file: 'icon-192.png', size: 192, label: '192 install' },
  { file: 'icon-512.png', size: 512, label: '512 install' },
  { file: 'icon-maskable-192.png', size: 192, label: '192 maskable', maskable: true },
  { file: 'icon-maskable-512.png', size: 512, label: '512 maskable', maskable: true }
];

const drop = document.getElementById('drop');
const fileInput = document.getElementById('file');
const bg = document.getElementById('bg');
const fit = document.getElementById('fit');
const pad = document.getElementById('pad');
const padVal = document.getElementById('pad-val');
const appName = document.getElementById('name');
const prefixInput = document.getElementById('prefix');
const grid = document.getElementById('preview-grid');
const htmlOut = document.getElementById('html-out');
const manifestOut = document.getElementById('manifest-out');
const downloadBtn = document.getElementById('download');

const canvases = new Map();
let source = null;

SIZES.forEach((item) => {
  const figure = document.createElement('figure');
  const canvas = document.createElement('canvas');
  const caption = document.createElement('figcaption');
  caption.textContent = item.label;
  figure.append(canvas, caption);
  grid.append(figure);
  canvases.set(item.file, canvas);
});

function padFor(item) {
  const value = +pad.value;
  return item.maskable ? Math.max(value, 10) : value;
}

function sitePrefix() {
  let value = prefixInput.value.trim() || '/';
  if (!value.startsWith('/')) value = '/' + value;
  if (!value.endsWith('/')) value += '/';
  return value;
}

function drawIcon(item) {
  const canvas = canvases.get(item.file);
  const size = item.size;
  const ctx = canvas.getContext('2d');
  canvas.width = size;
  canvas.height = size;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.fillStyle = bg.value;
  ctx.fillRect(0, 0, size, size);
  if (!source) return;

  const margin = padFor(item) / 100;
  const inner = size * (1 - margin * 2);
  const scale = fit.value === 'fill'
    ? Math.max(inner / source.width, inner / source.height)
    : Math.min(inner / source.width, inner / source.height);
  const dw = source.width * scale;
  const dh = source.height * scale;

  ctx.save();
  ctx.beginPath();
  ctx.rect((size - inner) / 2, (size - inner) / 2, inner, inner);
  ctx.clip();
  ctx.drawImage(source, (size - dw) / 2, (size - dh) / 2, dw, dh);
  ctx.restore();
}

function renderText() {
  const prefix = sitePrefix();
  const name = appName.value.trim() || 'My App';
  const color = bg.value;
  htmlOut.value = [
    '<link rel="icon" type="image/png" sizes="32x32" href="' + prefix + 'favicon-32.png">',
    '<link rel="icon" type="image/png" sizes="192x192" href="' + prefix + 'icon-192.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="' + prefix + 'apple-touch-icon.png">',
    '<link rel="manifest" href="' + prefix + 'manifest.webmanifest">',
    '<meta name="theme-color" content="' + color + '">',
    '<meta name="mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black">',
    '<meta name="apple-mobile-web-app-title" content="' + name.replace(/"/g, '') + '">'
  ].join('\n');

  const icon = (file, size, purpose) =>
    '    { "src": "' + prefix + file + '", "sizes": "' + size + 'x' + size + '", "type": "image/png", "purpose": "' + purpose + '" }';
  manifestOut.value = [
    '{',
    '  "name": ' + JSON.stringify(name) + ',',
    '  "short_name": ' + JSON.stringify(name.slice(0, 12)) + ',',
    '  "start_url": ' + JSON.stringify(prefix) + ',',
    '  "scope": ' + JSON.stringify(prefix) + ',',
    '  "display": "standalone",',
    '  "background_color": ' + JSON.stringify(color) + ',',
    '  "theme_color": ' + JSON.stringify(color) + ',',
    '  "icons": [',
    icon('icon-192.png', 192, 'any') + ',',
    icon('icon-512.png', 512, 'any') + ',',
    icon('icon-maskable-192.png', 192, 'maskable') + ',',
    icon('icon-maskable-512.png', 512, 'maskable'),
    '  ]',
    '}'
  ].join('\n');
}

function render() {
  padVal.textContent = pad.value + '%';
  SIZES.forEach(drawIcon);
  renderText();
  downloadBtn.disabled = !source;
}

function loadFile(file) {
  if (!file || !file.type.startsWith('image/')) return;
  const img = new Image();
  img.onload = () => {
    source = img;
    render();
  };
  img.src = URL.createObjectURL(file);
}

function crc32(bytes) {
  let c = ~0;
  for (let i = 0; i < bytes.length; i++) {
    c ^= bytes[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function concat(parts) {
  let len = 0;
  for (const part of parts) len += part.length;
  const out = new Uint8Array(len);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function u16(value) {
  const bytes = new Uint8Array(2);
  new DataView(bytes.buffer).setUint16(0, value, true);
  return bytes;
}

function u32(value) {
  const bytes = new Uint8Array(4);
  new DataView(bytes.buffer).setUint32(0, value, true);
  return bytes;
}

function buildZip(files) {
  const enc = new TextEncoder();
  const now = new Date();
  const dosTime = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const dosDate = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const locals = [];
  const centrals = [];
  let offset = 0;

  files.forEach((file) => {
    const name = enc.encode(file.name);
    const crc = crc32(file.data);
    const local = concat([
      u32(0x04034b50), u16(20), u16(0), u16(0),
      u16(dosTime), u16(dosDate),
      u32(crc), u32(file.data.length), u32(file.data.length),
      u16(name.length), u16(0),
      name, file.data
    ]);
    locals.push(local);
    centrals.push(concat([
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(0),
      u16(dosTime), u16(dosDate),
      u32(crc), u32(file.data.length), u32(file.data.length),
      u16(name.length), u16(0), u16(0), u16(0), u16(0),
      u32(0), u32(offset),
      name
    ]));
    offset += local.length;
  });

  const central = concat(centrals);
  const eocd = concat([
    u32(0x06054b50), u16(0), u16(0),
    u16(files.length), u16(files.length),
    u32(central.length), u32(offset), u16(0)
  ]);
  return new Blob([concat(locals), central, eocd], { type: 'application/zip' });
}

function buildIco(entries) {
  const count = entries.length;
  const header = new Uint8Array(6 + count * 16);
  const view = new DataView(header.buffer);
  view.setUint16(2, 1, true);
  view.setUint16(4, count, true);
  let pngOffset = header.length;
  entries.forEach((entry, index) => {
    const at = 6 + index * 16;
    header[at] = entry.size >= 256 ? 0 : entry.size;
    header[at + 1] = entry.size >= 256 ? 0 : entry.size;
    view.setUint16(at + 4, 1, true);
    view.setUint16(at + 6, 32, true);
    view.setUint32(at + 8, entry.data.length, true);
    view.setUint32(at + 12, pngOffset, true);
    pngOffset += entry.data.length;
  });
  return concat([header].concat(entries.map((entry) => entry.data)));
}

function canvasBytes(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(async (blob) => {
      resolve(new Uint8Array(await blob.arrayBuffer()));
    }, 'image/png');
  });
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch (err) {
    const area = document.createElement('textarea');
    area.value = value;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
}

fileInput.onchange = () => loadFile(fileInput.files[0]);
['dragover', 'dragenter'].forEach((type) => {
  drop.addEventListener(type, (event) => {
    event.preventDefault();
    drop.classList.add('over');
  });
});
drop.addEventListener('dragleave', () => drop.classList.remove('over'));
drop.addEventListener('drop', (event) => {
  event.preventDefault();
  drop.classList.remove('over');
  loadFile(event.dataTransfer.files[0]);
});

[bg, fit, pad, appName, prefixInput].forEach((el) => { el.oninput = render; });
document.getElementById('copy-html').onclick = () => copyText(htmlOut.value);
document.getElementById('copy-manifest').onclick = () => copyText(manifestOut.value);

downloadBtn.onclick = async () => {
  if (!source) return;
  downloadBtn.disabled = true;
  const pngs = [];
  for (const item of SIZES) {
    pngs.push({ item, data: await canvasBytes(canvases.get(item.file)) });
  }
  const enc = new TextEncoder();
  const files = pngs.map((png) => ({ name: png.item.file, data: png.data }));
  files.push({
    name: 'favicon.ico',
    data: buildIco(pngs.filter((png) => png.item.ico).map((png) => ({ size: png.item.size, data: png.data })))
  });
  files.push({ name: 'manifest.webmanifest', data: enc.encode(manifestOut.value + '\n') });
  files.push({ name: 'head-snippet.html', data: enc.encode(htmlOut.value + '\n') });
  const blob = buildZip(files);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'web-app-icons.zip';
  link.click();
  downloadBtn.disabled = false;
};

render();
</script>

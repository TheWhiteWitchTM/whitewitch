---
layout: default
title: Image Transparency Wizard
permalink: /tools/transparency-wizard/
---

<style>
  #trans-wizard { max-width: 820px; margin: 0 auto; }
  .instructions { background: #111; border: 1px solid #2a2a2a; border-radius: 6px; padding: 0.8rem 1rem; margin-bottom: 1rem; font-size: 0.95rem; }
  input[type="file"] { margin: 0.5rem 0; }
  label { display: block; margin: 0.6rem 0 0.2rem; }
  input[type="range"] { width: 100%; }
  .row { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; }
  canvas { max-width: 100%; border: 1px solid #2a2a2a; border-radius: 6px; background: #111; margin: 1rem 0; }
  button { background: #6b4c8a; color: #fff; border: none; border-radius: 5px; padding: 0.45rem 0.9rem; cursor: pointer; margin-right: 0.4rem; }
  button:hover { background: #8a6cb0; }
</style>

<div id="trans-wizard">
  <h1>🖼️ Image Transparency Wizard</h1>

  <div class="instructions">
    <strong>How to use</strong><br>
    Upload an image, then either lower overall opacity or pick a color to make transparent (useful for removing solid backgrounds).<br>
    Everything runs locally in your browser. Nothing is uploaded.
  </div>

  <input type="file" id="file" accept="image/*">

  <div class="row">
    <div>
      <label>Overall opacity: <span id="op-val">100%</span></label>
      <input type="range" id="opacity" min="0" max="100" value="100">
    </div>
    <div>
      <label>Color to remove</label>
      <input type="color" id="color" value="#ffffff">
    </div>
    <div>
      <label>Tolerance: <span id="tol-val">30</span></label>
      <input type="range" id="tolerance" min="0" max="100" value="30">
    </div>
  </div>

  <canvas id="canvas"></canvas><br>
  <button id="download">Download PNG</button>
  <button id="reset">Reset</button>
</div>

<script>
const fileInput = document.getElementById('file');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const opacity = document.getElementById('opacity');
const opVal = document.getElementById('op-val');
const color = document.getElementById('color');
const tolerance = document.getElementById('tolerance');
const tolVal = document.getElementById('tol-val');

let originalImage = null;

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return {r,g,b};
}

function process() {
  if (!originalImage) return;
  canvas.width = originalImage.width;
  canvas.height = originalImage.height;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha = opacity.value / 100;
  ctx.drawImage(originalImage, 0, 0);
  ctx.globalAlpha = 1;

  const imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
  const data = imgData.data;
  const target = hexToRgb(color.value);
  const tol = +tolerance.value;

  for (let i = 0; i < data.length; i += 4) {
    const dr = Math.abs(data[i] - target.r);
    const dg = Math.abs(data[i+1] - target.g);
    const db = Math.abs(data[i+2] - target.b);
    if (dr <= tol && dg <= tol && db <= tol) {
      data[i+3] = 0; // transparent
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

fileInput.onchange = e => {
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();
  img.onload = () => {
    originalImage = img;
    process();
  };
  img.src = URL.createObjectURL(file);
};

opacity.oninput = () => { opVal.textContent = opacity.value + '%'; process(); };
tolerance.oninput = () => { tolVal.textContent = tolerance.value; process(); };
color.oninput = process;

document.getElementById('download').onclick = () => {
  const a = document.createElement('a');
  a.download = 'transparent.png';
  a.href = canvas.toDataURL('image/png');
  a.click();
};

document.getElementById('reset').onclick = () => {
  opacity.value = 100;
  opVal.textContent = '100%';
  tolerance.value = 30;
  tolVal.textContent = '30';
  color.value = '#ffffff';
  if (originalImage) process();
};
</script>

---
layout: default
title: Flags Wizard
permalink: /tools/flags-builder/
---

<style>
  #flags-wizard { max-width: 920px; margin: 0 auto; }
  .instructions { background: #111; border: 1px solid #2a2a2a; border-radius: 6px; padding: 0.8rem 1rem; margin-bottom: 1rem; font-size: 0.95rem; }
  .instructions code { background: #1a1a1a; padding: 0.1rem 0.3rem; border-radius: 3px; }
  #search, #prompt {
    width: 100%; padding: 0.65rem; margin: 0.4rem 0;
    background: #111; color: #e8e8e8; border: 1px solid #2a2a2a; border-radius: 6px; font-size: 1rem;
  }
  #result {
    min-height: 3.2rem; font-size: 2rem; padding: 0.6rem; background: #0a0a0a;
    border: 1px solid #2a2a2a; border-radius: 6px; margin: 0.6rem 0; word-break: break-all; cursor: pointer;
  }
  #result-info { font-size: 0.95rem; opacity: 0.8; margin-top: 0.3rem; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.4rem; margin-top: 1rem; max-height: 65vh; overflow-y: auto; }
  .flag-item {
    padding: 0.45rem 0.6rem; background: #111; border: 1px solid #2a2a2a; border-radius: 5px;
    cursor: pointer; display: flex; align-items: center; gap: 0.5rem;
  }
  .flag-item:hover { background: #1a1a1a; }
  .flag-item .emoji { font-size: 1.6rem; }
  button { background: #6b4c8a; color: #fff; border: none; border-radius: 5px; padding: 0.4rem 0.8rem; cursor: pointer; margin-right: 0.4rem; }
  button:hover { background: #8a6cb0; }
</style>

<div id="flags-wizard">
  <h1>🏳️ Flags Wizard</h1>

  <div class="instructions">
    <strong>How to use</strong><br>
    • Type a country name or ISO code (e.g. <code>Germany</code>, <code>DE</code>, <code>Ukraine</code>, <code>UA</code>).<br>
    • Click any flag in the list to add it.<br>
    • Use the prompt box to combine: <code>DE + UA + FR</code> or <code>Germany + Ukraine</code>.<br>
    • Click the big result or the button to copy.<br>
    No data is stored. Everything stays in this tab.
  </div>

  <input id="search" type="text" placeholder="Search country or code…">
  <input id="prompt" type="text" placeholder="Combine: DE + UA + FR   or   Germany + Ukraine">

  <div id="result" title="Click to copy"></div>
  <div id="result-info"></div>
  <button id="copy-result">Copy flags</button>
  <button id="clear">Clear</button>

  <div id="list" class="grid"></div>
</div>

<script>
const countries = [
  {n:"Afghanistan",c:"AF"},{n:"Albania",c:"AL"},{n:"Algeria",c:"DZ"},{n:"Argentina",c:"AR"},
  {n:"Australia",c:"AU"},{n:"Austria",c:"AT"},{n:"Belgium",c:"BE"},{n:"Brazil",c:"BR"},
  {n:"Canada",c:"CA"},{n:"Chile",c:"CL"},{n:"China",c:"CN"},{n:"Colombia",c:"CO"},
  {n:"Croatia",c:"HR"},{n:"Czechia",c:"CZ"},{n:"Denmark",c:"DK"},{n:"Egypt",c:"EG"},
  {n:"Finland",c:"FI"},{n:"France",c:"FR"},{n:"Germany",c:"DE"},{n:"Greece",c:"GR"},
  {n:"Hungary",c:"HU"},{n:"Iceland",c:"IS"},{n:"India",c:"IN"},{n:"Indonesia",c:"ID"},
  {n:"Ireland",c:"IE"},{n:"Israel",c:"IL"},{n:"Italy",c:"IT"},{n:"Japan",c:"JP"},
  {n:"Mexico",c:"MX"},{n:"Netherlands",c:"NL"},{n:"New Zealand",c:"NZ"},{n:"Norway",c:"NO"},
  {n:"Poland",c:"PL"},{n:"Portugal",c:"PT"},{n:"Romania",c:"RO"},{n:"Russia",c:"RU"},
  {n:"Serbia",c:"RS"},{n:"Slovakia",c:"SK"},{n:"Slovenia",c:"SI"},{n:"South Africa",c:"ZA"},
  {n:"South Korea",c:"KR"},{n:"Spain",c:"ES"},{n:"Sweden",c:"SE"},{n:"Switzerland",c:"CH"},
  {n:"Turkey",c:"TR"},{n:"Ukraine",c:"UA"},{n:"United Kingdom",c:"GB"},{n:"United States",c:"US"},
  {n:"Vietnam",c:"VN"}
];

function toFlag(code) {
  return code.toUpperCase().replace(/./g, ch => String.fromCodePoint(127397 + ch.charCodeAt()));
}

const search = document.getElementById('search');
const prompt = document.getElementById('prompt');
const result = document.getElementById('result');
const resultInfo = document.getElementById('result-info');
const list = document.getElementById('list');
const copyBtn = document.getElementById('copy-result');
const clearBtn = document.getElementById('clear');

let current = [];

function renderList(filter = '') {
  list.innerHTML = '';
  const f = filter.toLowerCase();
  countries
    .filter(c => c.n.toLowerCase().includes(f) || c.c.toLowerCase().includes(f))
    .forEach(c => {
      const div = document.createElement('div');
      div.className = 'flag-item';
      div.innerHTML = `<span class="emoji">${toFlag(c.c)}</span> <span>${c.n} <small style="opacity:.6">${c.c}</small></span>`;
      div.onclick = () => addFlag(c);
      list.appendChild(div);
    });
}

function addFlag(c) {
  current.push(c);
  updateResult();
}

function updateResult() {
  if (!current.length) {
    result.textContent = '';
    resultInfo.textContent = '';
    return;
  }
  result.textContent = current.map(c => toFlag(c.c)).join(' ');
  resultInfo.textContent = current.map(c => `${c.n} (${c.c})`).join(' · ');
}

function resolve(text) {
  const parts = text.split('+').map(p => p.trim()).filter(Boolean);
  const found = [];
  for (const part of parts) {
    const low = part.toLowerCase();
    const match = countries.find(c => 
      c.n.toLowerCase() === low || c.c.toLowerCase() === low
    );
    if (match) found.push(match);
  }
  return found;
}

search.oninput = () => renderList(search.value);

prompt.oninput = () => {
  const resolved = resolve(prompt.value);
  current = resolved;
  updateResult();
};

result.onclick = () => {
  if (result.textContent) navigator.clipboard.writeText(result.textContent);
};

copyBtn.onclick = () => {
  if (result.textContent) {
    navigator.clipboard.writeText(result.textContent);
    copyBtn.textContent = 'Copied';
    setTimeout(() => copyBtn.textContent = 'Copy flags', 700);
  }
};

clearBtn.onclick = () => {
  prompt.value = '';
  search.value = '';
  current = [];
  updateResult();
  renderList();
};

renderList();
</script>

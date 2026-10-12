---
layout: default
title: Emoji Wizard
permalink: /tools/emoji-builder/
---

<style>
  #emoji-wizard { max-width: 920px; margin: 0 auto; }
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
  .cat { margin: 1.4rem 0 0.5rem; font-weight: 600; color: #c9a6ff; font-size: 1.1rem; }
  .grid { display: flex; flex-wrap: wrap; gap: 0.2rem; }
  .emoji { font-size: 1.7rem; cursor: pointer; padding: 0.15rem 0.25rem; border-radius: 4px; }
  .emoji:hover { background: #222; }
  button { background: #6b4c8a; color: #fff; border: none; border-radius: 5px; padding: 0.4rem 0.8rem; cursor: pointer; margin-right: 0.4rem; }
  button:hover { background: #8a6cb0; }
</style>

<div id="emoji-wizard">
  <h1>🧙‍♀️ Emoji Wizard</h1>

  <div class="instructions">
    <strong>How to use</strong><br>
    • Type in the search box to filter the lists below.<br>
    • Click any emoji to copy it.<br>
    • Or use the prompt box to assemble things:<br>
    &nbsp;&nbsp;<code>witch + white</code> &nbsp; <code>witch + frog</code> &nbsp; <code>person + dark</code> &nbsp; <code>smile + heart + star</code><br>
    Skin tones work on people: <code>light</code>, <code>medium</code>, <code>dark</code> (or <code>white</code>/<code>black</code>).<br>
    No data is stored. Everything stays in this tab.
  </div>

  <input id="search" type="text" placeholder="Search emojis or categories…">
  <input id="prompt" type="text" placeholder="Assemble: witch + white   or   witch + frog + star">

  <div id="result" title="Click to copy"></div>
  <button id="copy-result">Copy result</button>
  <button id="clear">Clear</button>

  <div id="categories"></div>
</div>

<script>
const data = {
  "Smileys & Emotion": "😀😃😄😁😆😅🤣😂🙂🙃😉😊😇🥰😍🤩😘😗😚😙🥲😋😛😜🤪😝🤑🤗🤭🤫🤔🤐🤨😐😑😶😏😒🙄😬🤥😌😔😪🤤😴😷🤒🤕🤢🤮🤧🥵🥶🥴😵🤯🤠🥳🥸😎🤓🧐😕😟🙁☹️😮😯😲😳🥺😦😧😨😰😥😢😭😱😖😣😞😓😩😫🥱😤😡😠🤬😈👿💀☠️💩🤡👹👺👻👽👾🤖",
  "People & Body": "👋🤚🖐️✋🖖👌🤌🤏✌️🤞🤟🤘🤙👈👉👆🖕👇☝️👍👎✊👊🤛🤜👏🙌👐🤲🤝🙏✍️💅🤳💪🦾🦿🦵🦶👂🦻👃🧠🫀🫁🦷🦴👀👁️👅👄💋🩸👶🧒👦👧🧑👱👨👩🧔👴👵🧓👮👷💂🕵️👳👲🧕👮‍♂️👮‍♀️",
  "Animals & Nature": "🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐞🐜🦟🦗🕷️🕸️🦂🐢🐍🦎🐙🦑🦐🦞🦀🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🦍🦧🐘🦛🦏🐪🐫🦒🦘🐃🐂🐄🐎🐖🐏🐑🦙🐐🦌🐕🐩🦮🐕‍🦺🐈🐈‍⬛🐓🦃🦚🦜🦢🦩🕊️🐇🦝🦨🦡🦦🦥🐁🐀🐿️🦔",
  "Food & Drink": "🍎🍐🍊🍋🍌🍉🍇🍓🫐🍈🍒🍑🥭🍍🥥🥝🍅🍆🥑🥦🥬🥒🌶️🫑🌽🥕🫒🧄🧅🥔🍠🥐🥯🍞🥖🥨🧀🥚🍳🧈🥞🧇🥓🥩🍗🍖🦴🌭🍔🍟🍕🫓🥪🥙🧆🌮🌯🫔🥗🥘🫕🥫🍝🍜🍲🍛🍣🍱🥟🦪🍤🍙🍚🍘🍥🥠🥮🍢🍡🍧🍨🍦🥧🧁🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼🫖🍵🧃🥤🧋🍶🍺🍻🥂🍷🥃🍸🍹🧉🍾🧊",
  "Travel & Places": "🚗🚕🚙🚌🚎🏎️🚓🚑🚒🚐🛻🚚🚛🚜🛴🚲🛵🏍️🛺🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉✈️🛫🛬🛩️💺🛰️🚀🛸🚁🛶⛵🚤🛥️🛳️⛴️🚢⚓⛽🚧🚦🚥🚏🗺️🗿🗽🗼🏰🏯🏟️🎡🎢🎠⛲⛱️🏖️🏝️🏜️🌋⛰️🏔️🗻🏕️⛺🏠🏡🏘️🏚️🏗️🏭🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒🏛️⛪🕌🕍🛕🕋",
  "Activities": "⚽🏀🏈⚾🥎🎾🏐🏉🥏🎱🪀🏓🏸🏒🏑🥍🏏🪃🥅⛳🪁🏹🎣🤿🥊🥋🎽🛹🛼🛷⛸️🥌🎿⛷️🏂🪂🏋️🤼🤸⛹️🤺🤾🏌️🏇🧘🏄🏊🤽🚣🧗🚵🚴🏆🥇🥈🥉🏅🎖️🏵️🎗️🎫🎟️🎪🤹🎭🩰🎨🎬🎤🎧🎼🎹🥁🪘🎷🎺🪗🎸🪕🎻🎲♟️🎯🎳🎮🎰🧩",
  "Objects": "⌚📱📲💻⌨️🖥️🖨️🖱️🖲️🕹️🗜️💽💾💿📀📼📷📸📹🎥📽️🎞️📞☎️📟📠📺📻🎙️🎚️🎛️🧭⏱️⏲️⏰🕰️⌛⏳📡🔋🔌💡🔦🕯️🪔🧯🛢️💸💵💴💶💷🪙💰💳💎⚖️🪜🧰🪛🔧🔨⚒️🛠️⛏️🪚🔩⚙️🧱⛓️🧲🔫💣🧨🪓🔪🗡️⚔️🛡️🚬⚰️🪦⚱️🏺🔮📿🧿💈⚗️🔭🔬🕳️🩹🩺💊💉🩸🧬🦠🧫🧪🌡️🧹🪠🧺🧻🚽🚰🚿🛁🛀🧼🪥🪒🧽🪣🧴🛎️🔑🗝️🚪🪑🛋️🛏️🛌🧸🪆🖼️🪞🪟🛍️🛒🎁🎈🎏🎀🪄🪅🎊🎉🎎🏮🎐🧧",
  "Symbols": "❤️🧡💛💚💙💜🖤🤍🤎💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🕉️☸️✡️🔯🕎☯️☦️🛐⛎♈♉♊♋♌♍♎♏♐♑♒♓🆔⚛️🉑☢️☣️📴📳🈶🈚🈸🈺🈷️✴️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘❌⭕🛑⛔📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿🅿️🛗🈳🈂️🛂🛃🛄🛅🚹🚺🚼⚧️🚻🚮🎦📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓",
  "Flags": "🏳️🏴🏁🚩🏳️‍🌈🏳️‍⚧️🏴‍☠️🇦🇫🇦🇽🇦🇱🇩🇿🇦🇸🇦🇩🇦🇴🇦🇮🇦🇶🇦🇬🇦🇷🇦🇲🇦🇼🇦🇺🇦🇹🇦🇿🇧🇸🇧🇭🇧🇩🇧🇧🇧🇾🇧🇪🇧🇿🇧🇯🇧🇲🇧🇹🇧🇴🇧🇦🇧🇼🇧🇷🇮🇴🇻🇬🇧🇳🇧🇬🇧🇫🇧🇮🇰🇭🇨🇲🇨🇦🇮🇨🇨🇻🇧🇶🇰🇾🇨🇫🇹🇩🇨🇱🇨🇳🇨🇽🇨🇨🇨🇴🇰🇲🇨🇬🇨🇩🇨🇰🇨🇷🇨🇮🇭🇷🇨🇺🇨🇼🇨🇾🇨🇿🇩🇰🇩🇯🇩🇲🇩🇴🇪🇨🇪🇬🇸🇻🇬🇶🇪🇷🇪🇪🇸🇿🇪🇹🇪🇺🇫🇰🇫🇴🇫🇯🇫🇮🇫🇷🇬🇫🇵🇫🇹🇫🇬🇦🇬🇲🇬🇪🇩🇪🇬🇭🇬🇮🇬🇷🇬🇱🇬🇩🇬🇵🇬🇺🇬🇹🇬🇬🇬🇳🇬🇼🇬🇾🇭🇹🇭🇳🇭🇰🇭🇺🇮🇸🇮🇳🇮🇩🇮🇷🇮🇶🇮🇪🇮🇲🇮🇱🇮🇹🇯🇲🇯🇵🇯🇪🇯🇴🇰🇿🇰🇪🇰🇮🇽🇰🇰🇼🇰🇬🇱🇦🇱🇻🇱🇧🇱🇸🇱🇷🇱🇾🇱🇮🇱🇹🇱🇺🇲🇴🇲🇬🇲🇼🇲🇾🇲🇻🇲🇱🇲🇹🇲🇭🇲🇶🇲🇷🇲🇺🇾🇹🇲🇽🇫🇲🇲🇩🇲🇨🇲🇳🇲🇪🇲🇸🇲🇦🇲🇿🇲🇲🇳🇦🇳🇷🇳🇵🇳🇱🇳🇨🇳🇿🇳🇮🇳🇪🇳🇬🇳🇺🇳🇫🇰🇵🇲🇰🇲🇵🇳🇴🇴🇲🇵🇰🇵🇼🇵🇸🇵🇦🇵🇬🇵🇾🇵🇪🇵🇭🇵🇳🇵🇱🇵🇹🇵🇷🇶🇦🇷🇪🇷🇴🇷🇺🇷🇼🇼🇸🇸🇲🇸🇹🇸🇦🇸🇳🇷🇸🇸🇨🇸🇱🇸🇬🇸🇽🇸🇰🇸🇮🇬🇸🇸🇧🇸🇴🇿🇦🇰🇷🇸🇸🇪🇸🇱🇰🇧🇱🇸🇭🇰🇳🇱🇨🇵🇲🇻🇨🇸🇩🇸🇷🇸🇪🇨🇭🇸🇾🇹🇼🇹🇯🇹🇿🇹🇭🇹🇱🇹🇬🇹🇰🇹🇴🇹🇹🇹🇳🇹🇷🇹🇲🇹🇨🇹🇻🇺🇬🇺🇦🇦🇪🇬🇧🏴󠁧󠁢󠁥󠁮󠁧󠁿🏴󠁧󠁢󠁳󠁣󠁴󠁿🏴󠁧󠁢󠁷󠁬󠁳󠁿🇺🇸🇺🇾🇺🇿🇻🇺🇻🇦🇻🇪🇻🇳🇼🇫🇪🇭🇾🇪🇿🇲🇿🇼",
  "Witchy & Fantasy": "🧙🧙‍♀️🧙‍♂️🔮✨🌙⭐🌟💫🪄🕯️🦇🕸️👻💀🎃📖⚗️🧪🧿🦄🐉🧚🧚‍♀️🧚‍♂️🧝🧝‍♀️🧝‍♂️🧛🧛‍♀️🧛‍♂️🧟🧟‍♀️🧟‍♂️🧞🧞‍♀️🧞‍♂️🧜🧜‍♀️🧜‍♂️"
};

const tones = { light: "🏻", medium: "🏽", dark: "🏿", white: "🏻", black: "🏿" };
const keywords = {
  witch: "🧙‍♀️", frog: "🐸", star: "⭐", heart: "❤️", smile: "😀", grin: "😁",
  person: "🧑", man: "👨", woman: "👩", cat: "🐱", dog: "🐶", ghost: "👻",
  skull: "💀", magic: "✨", moon: "🌙", fire: "🔥", water: "💧"
};

const search = document.getElementById('search');
const prompt = document.getElementById('prompt');
const result = document.getElementById('result');
const cats = document.getElementById('categories');
const copyBtn = document.getElementById('copy-result');
const clearBtn = document.getElementById('clear');

function render(filter = '') {
  cats.innerHTML = '';
  const f = filter.toLowerCase();
  for (const [name, str] of Object.entries(data)) {
    const emojis = [...str].filter(e => e.trim());
    const shown = emojis.filter(e => !f || name.toLowerCase().includes(f) || e.includes(f));
    if (!shown.length) continue;

    const h = document.createElement('div');
    h.className = 'cat';
    h.textContent = name;
    cats.appendChild(h);

    const grid = document.createElement('div');
    grid.className = 'grid';
    shown.forEach(e => {
      const s = document.createElement('span');
      s.className = 'emoji';
      s.textContent = e;
      s.onclick = () => navigator.clipboard.writeText(e);
      grid.appendChild(s);
    });
    cats.appendChild(grid);
  }
}

function assemble(text) {
  if (!text.trim()) { result.textContent = ''; return; }
  const parts = text.split('+').map(p => p.trim().toLowerCase()).filter(Boolean);
  const out = [];

  for (let part of parts) {
    let emoji = keywords[part] || null;
    let tone = '';

    for (const [k, v] of Object.entries(tones)) {
      if (part.includes(k)) {
        tone = v;
        part = part.replace(k, '').trim();
        if (keywords[part]) emoji = keywords[part];
        break;
      }
    }

    if (!emoji) {
      for (const str of Object.values(data)) {
        if (str.includes(part)) { emoji = part; break; }
      }
    }

    if (emoji && tone && /[\u{1F9D1}-\u{1F9DD}]/u.test(emoji)) {
      emoji += tone;
    }

    out.push(emoji || part);
  }

  result.textContent = out.join(' ');
}

search.oninput = () => render(search.value);
prompt.oninput = () => assemble(prompt.value);

result.onclick = () => {
  if (result.textContent) navigator.clipboard.writeText(result.textContent);
};
copyBtn.onclick = () => {
  if (result.textContent) {
    navigator.clipboard.writeText(result.textContent);
    copyBtn.textContent = 'Copied';
    setTimeout(() => copyBtn.textContent = 'Copy result', 700);
  }
};
clearBtn.onclick = () => {
  prompt.value = '';
  result.textContent = '';
};

render();
</script>

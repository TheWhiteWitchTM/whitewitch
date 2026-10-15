useEffect(() => {
  const gameEl = document.getElementById('game');
  if (!gameEl) return;

  const term = new Terminal({
    fontSize: '16px',
    cols: 40,
    rows: 12,
    autoRender: false   // <-- important
  });
  gameEl.innerHTML = '';
  gameEl.appendChild(term.wrap);
  term.wrap.focus();

  let px = 5, py = 5;

  function draw() {
    term.clear();
    term.setFg(8);
    for (let y = 0; y < 10; y++) {
      term.moveTo(0, y);
      term.write('#'.repeat(30));
    }
    term.setFg(2);
    for (let y = 1; y < 9; y++) {
      for (let x = 1; x < 29; x++) {
        term.moveTo(x, y);
        term.write('.');
      }
    }
    term.moveTo(px, py);
    term.setFg(10);
    term.setBright(true);
    term.write('@');
    term.resetAttr();
    term.moveTo(0, 10);
    term.setFg(10);
    term.write('WASD to move   @ at ' + px + ',' + py);
    term.render();   // <-- only once per frame
  }

  function onKey(e) {
    e.preventDefault();
    const k = e.key.toLowerCase();
    if (k === 'a' && px > 1) px--;
    if (k === 'd' && px < 28) px++;
    if (k === 'w' && py > 1) py--;
    if (k === 's' && py < 8) py++;
    draw();
  }

  term.wrap.addEventListener('keydown', onKey);
  draw();
});

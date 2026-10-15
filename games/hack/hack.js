useEffect(() => {
  const loading = document.getElementById('loading');
  if (loading) loading.textContent = 'Starting...';

  const gameEl = document.getElementById('game');
  if (!gameEl) {
    document.body.insertAdjacentHTML('beforeend', '<p style="color:red">No #game element</p>');
    return;
  }

  let term;
  try {
    term = new Terminal({
      fontSize: '16px',
      fg: '#39ff14',
      bg: '#000000',
      border: '#39ff14',
      cols: 40,
      rows: 12
    });
    gameEl.innerHTML = '';
    gameEl.appendChild(term.wrap);
    term.wrap.focus();
  } catch (e) {
    gameEl.innerHTML = '<p style="color:red">Terminal failed: ' + e.message + '</p>';
    return;
  }

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

  if (loading) loading.remove();
});

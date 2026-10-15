useEffect(() => {
  const loading = document.getElementById('loading');
  if (loading) loading.remove();

  const gameEl = document.getElementById('game');
  if (!gameEl) return;

  const term = new Terminal({
    fontSize: '14px',
    fg: '#39ff14',
    bg: '#0a140a',
    border: '#39ff14'
  });
  gameEl.appendChild(term.wrap);
  term.wrap.tabIndex = 0;

  let level, player, depth = 1, messages = [], gameOver = false;

  function beep(freq = 440, duration = 0.06) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function msg(text) {
    messages.push(text);
    if (messages.length > 3) messages.shift();
  }

  function newGame() {
    depth = 1;
    gameOver = false;
    level = new Level(depth);
    const start = level.stairsUp || level.randomFloor();
    player = new Player(start.x, start.y);
    messages = ['Use WASD to move. Type ? for help.'];
    beep(520, 0.1);
    draw();
  }

  function draw() {
    term.clear();
    for (let y = 0; y < level.height; y++) {
      for (let x = 0; x < level.width; x++) {
        term.moveTo(x, y);
        const mon = level.getMonsterAt(x, y);
        const item = level.getItemAt(x, y);
        if (x === player.x && y === player.y) {
          term.setFg(10);
          term.setBright(true);
          term.write('@');
        } else if (mon) {
          term.setFg(mon.color);
          term.write(mon.emoji);
        } else if (item) {
          term.setFg(11);
          term.write(item.ch);
        } else {
          const t = level.tiles[y][x];
          term.setFg(t === '#' ? 8 : 2);
          term.write(t);
        }
        term.resetAttr();
      }
    }
    term.moveTo(0, level.height);
    term.setFg(10);
    term.write(`Dlvl:${depth}  HP:${player.hp}/${player.maxHp}  Gold:${player.gold}`);
    term.moveTo(0, level.height + 1);
    term.setFg(7);
    term.write(messages.join(' | ').slice(0, 70));
  }

  function playerMove(dx, dy) {
    if (gameOver) return;
    const nx = player.x + dx;
    const ny = player.y + dy;
    const mon = level.getMonsterAt(nx, ny);
    if (mon) {
      const dmg = player.attack(mon);
      msg(`You hit the ${mon.emoji} ${mon.name} for ${dmg}.`);
      beep(200, 0.05);
      if (mon.hp <= 0) {
        msg(`You kill the ${mon.name}!`);
        beep(300, 0.08);
        level.monsters = level.monsters.filter(m => m !== mon);
      }
    } else if (level.isWalkable(nx, ny)) {
      player.x = nx;
      player.y = ny;
      beep(140, 0.03);
      const item = level.getItemAt(nx, ny);
      if (item) {
        msg(player.pickup(item));
        level.items = level.items.filter(i => i !== item);
        beep(600, 0.07);
      }
      if (level.tiles[ny][nx] === '⬇️') {
        depth++;
        level = new Level(depth);
        const s = level.stairsUp || level.randomFloor();
        player.x = s.x; player.y = s.y;
        msg(`You descend to level ${depth}.`);
        beep(180, 0.12);
      } else if (level.tiles[ny][nx] === '⬆️' && depth > 1) {
        depth--;
        level = new Level(depth);
        const s = level.stairsDown || level.randomFloor();
        player.x = s.x; player.y = s.y;
        msg(`You ascend to level ${depth}.`);
        beep(220, 0.12);
      }
    } else {
      beep(80, 0.04);
      msg('You cannot go that way.');
    }
    level.monsters.forEach(m => {
      const res = m.act(level, player);
      if (res) msg(res);
    });
    if (player.hp <= 0) {
      gameOver = true;
      msg('You die... Press R to restart.');
      beep(60, 0.4);
    }
    draw();
  }

  function showHelp() {
    messages = [
      'WASD to move (QEZC diagonals) or hjkl',
      'i = inventory   ? = help   r = restart when dead'
    ];
    draw();
  }

  function handleKey(e) {
    if (gameOver) {
      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        newGame();
      }
      return;
    }

    const key = e.key.toLowerCase();
    const map = {
      a: [-1, 0], d: [1, 0], w: [0, -1], s: [0, 1],
      q: [-1, -1], e: [1, -1], z: [-1, 1], c: [1, 1],
      h: [-1, 0], l: [1, 0], k: [0, -1], j: [0, 1],
      y: [-1, -1], u: [1, -1], b: [-1, 1], n: [1, 1]
    };

    if (map[key]) {
      e.preventDefault();
      e.stopPropagation();
      playerMove(...map[key]);
    } else if (key === 'i') {
      e.preventDefault();
      msg('Inventory: ' + (player.inventory.map(i => i.name).join(', ') || 'empty'));
      draw();
    } else if (key === '?') {
      e.preventDefault();
      showHelp();
    }
  }

  document.addEventListener('keydown', handleKey);

  newGame();

  return () => {
    document.removeEventListener('keydown', handleKey);
    term.destroy();
  };
});

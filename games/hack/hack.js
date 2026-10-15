useEffect(() => {
  const gameEl = document.getElementById('game');
  if (!gameEl) return;

  const term = new Terminal({
    fontSize: '14px',
    fg: '#39ff14',
    bg: '#0a140a',
    border: '#39ff14'
  });
  gameEl.appendChild(term.wrap);
  term.wrap.focus();

  let level, player, depth = 1, messages = [], gameOver = false;

  function print(text) { term.writeln(text); }
  function msg(text) { messages.push(text); if (messages.length > 3) messages.shift(); }

  function newGame() {
    depth = 1;
    gameOver = false;
    level = new Level(depth);
    const start = level.stairsUp || level.randomFloor();
    player = new Player(start.x, start.y);
    messages = ['Welcome to Hack!'];
    draw();
  }

  function draw() {
    term.clear();
    // Map
    for (let y = 0; y < level.height; y++) {
      for (let x = 0; x < level.width; x++) {
        term.moveTo(x, y);
        const mon = level.getMonsterAt(x, y);
        const item = level.getItemAt(x, y);
        if (x === player.x && y === player.y) {
          term.setFg(10);
          term.write('@');
        } else if (mon) {
          term.setFg(mon.color);
          term.write(mon.ch);
        } else if (item) {
          term.setFg(11);
          term.write(item.ch);
        } else {
          const t = level.tiles[y][x];
          term.setFg(t === '#' ? 8 : 2);
          term.write(t);
        }
      }
    }
    // Status
    term.moveTo(0, level.height);
    term.resetAttr();
    term.setFg(10);
    term.write(`Dlvl:${depth} HP:${player.hp}/${player.maxHp} Str:${player.str} Gold:${player.gold}`);
    // Messages
    term.moveTo(0, level.height + 1);
    term.setFg(7);
    term.write(messages.join(' | ').slice(0, 79));
  }

  function playerMove(dx, dy) {
    if (gameOver) return;
    const nx = player.x + dx;
    const ny = player.y + dy;
    const mon = level.getMonsterAt(nx, ny);
    if (mon) {
      const dmg = player.attack(mon);
      msg(`You hit the ${mon.name} for ${dmg}.`);
      if (mon.hp <= 0) {
        msg(`You kill the ${mon.name}!`);
        level.monsters = level.monsters.filter(m => m !== mon);
      }
    } else if (level.isWalkable(nx, ny)) {
      player.x = nx;
      player.y = ny;
      const item = level.getItemAt(nx, ny);
      if (item) {
        msg(player.pickup(item));
        level.items = level.items.filter(i => i !== item);
      }
      if (level.tiles[ny][nx] === '>' ) {
        depth++;
        level = new Level(depth);
        const s = level.stairsUp || level.randomFloor();
        player.x = s.x; player.y = s.y;
        msg(`You descend to level ${depth}.`);
      } else if (level.tiles[ny][nx] === '<' && depth > 1) {
        depth--;
        level = new Level(depth);
        const s = level.stairsDown || level.randomFloor();
        player.x = s.x; player.y = s.y;
        msg(`You ascend to level ${depth}.`);
      }
    }
    // Monsters act
    level.monsters.forEach(m => {
      const res = m.act(level, player);
      if (res) msg(res);
    });
    if (player.hp <= 0) {
      gameOver = true;
      msg('You die...');
    }
    draw();
  }

  function onKey(e) {
    if (gameOver) {
      if (e.key === 'r' || e.key === 'R') newGame();
      return;
    }
    const map = {
      ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1],
      h: [-1, 0], l: [1, 0], k: [0, -1], j: [0, 1],
      y: [-1, -1], u: [1, -1], b: [-1, 1], n: [1, 1]
    };
    if (map[e.key]) {
      e.preventDefault();
      playerMove(...map[e.key]);
    } else if (e.key === 'i') {
      msg('Inventory: ' + (player.inventory.map(i => i.name).join(', ') || 'empty'));
      draw();
    } else if (e.key === '?') {
      msg('hjkl/arrows move, i inventory, r restart');
      draw();
    }
  }

  term.wrap.addEventListener('keydown', onKey);
  newGame();

  return () => {
    term.wrap.removeEventListener('keydown', onKey);
    term.destroy();
  };
});

  function newGame() {
    try {
      depth = 1;
      gameOver = false;
      level = new Level(depth);
      // Always start inside the first room on a floor tile
      const r = level.rooms[0];
      const start = r ? { x: r.x + 2, y: r.y + 2 } : (level.randomFloor() || { x: 2, y: 2 });
      player = new Player(start.x, start.y);
      messages = ['Use WASD to move. Type ? for help.'];
      beep(520, 0.1);
      draw();
      term.wrap.focus();
    } catch (err) {
      console.error(err);
      messages = ['Error: ' + err.message];
      draw();
    }
  }

  function draw() {
    try {
      term.clear();
      // Draw map
      for (let y = 0; y < level.height; y++) {
        for (let x = 0; x < level.width; x++) {
          term.moveTo(x, y);
          const t = level.tiles[y][x];
          term.setFg(t === '#' ? 8 : 2);
          term.write(t || ' ');
        }
      }
      // Draw items
      level.items.forEach(item => {
        term.moveTo(item.x, item.y);
        term.setFg(11);
        term.write(item.ch || '?');
      });
      // Draw monsters
      level.monsters.forEach(mon => {
        if (mon.hp > 0) {
          term.moveTo(mon.x, mon.y);
          term.setFg(mon.color || 1);
          term.write(mon.ch || 'M');
        }
      });
      // Draw player last so it is always visible
      term.moveTo(player.x, player.y);
      term.setFg(10);
      term.setBright(true);
      term.write('@');
      term.resetAttr();

      // Status
      term.moveTo(0, level.height);
      term.setFg(10);
      term.write(`Dlvl:${depth}  HP:${player.hp}/${player.maxHp}  Gold:${player.gold}  @ ${player.x},${player.y}`);
      term.moveTo(0, level.height + 1);
      term.setFg(7);
      term.write((messages.join(' | ') || '').slice(0, 70));
    } catch (err) {
      console.error(err);
    }
  }

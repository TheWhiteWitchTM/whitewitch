class Monster {
  constructor(letter, x, y, depth) {
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.ch = letter;
    const base = {
      a: { name: 'ant', hp: 6, dmg: 2, color: 2 },
      b: { name: 'bat', hp: 4, dmg: 1, color: 7 },
      c: { name: 'centipede', hp: 8, dmg: 2, color: 3 },
      d: { name: 'dragon', hp: 40, dmg: 8, color: 1 },
      e: { name: 'eye', hp: 10, dmg: 3, color: 5 },
      f: { name: 'fungus', hp: 12, dmg: 1, color: 2 },
      g: { name: 'gnome', hp: 10, dmg: 3, color: 6 },
      h: { name: 'hobbit', hp: 8, dmg: 2, color: 3 },
      i: { name: 'imp', hp: 9, dmg: 3, color: 4 },
      j: { name: 'jackal', hp: 7, dmg: 2, color: 3 },
      k: { name: 'kobold', hp: 8, dmg: 2, color: 3 },
      l: { name: 'leprechaun', hp: 6, dmg: 1, color: 10 }
    };
    const stats = base[letter] || { name: 'monster', hp: 8, dmg: 2, color: 1 };
    this.name = stats.name;
    this.hp = stats.hp + depth;
    this.maxHp = this.hp;
    this.dmg = stats.dmg + Math.floor(depth / 2);
    this.color = stats.color;
  }

  act(level, player) {
    if (this.hp <= 0) return;
    const dx = Math.sign(player.x - this.x);
    const dy = Math.sign(player.y - this.y);
    const nx = this.x + dx;
    const ny = this.y + dy;
    if (nx === player.x && ny === player.y) {
      // attack player
      const hit = 1 + Math.floor(Math.random() * this.dmg);
      player.hp -= hit;
      return `${this.name} hits you for ${hit}.`;
    } else if (level.isWalkable(nx, ny) && !level.getMonsterAt(nx, ny)) {
      this.x = nx;
      this.y = ny;
    }
    return null;
  }
}

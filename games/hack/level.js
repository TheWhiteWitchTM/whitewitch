class Level {
  constructor(depth, width = 50, height = 16) {
    this.depth = depth;
    this.width = width;
    this.height = height;
    this.tiles = Array.from({ length: height }, () => Array(width).fill('#'));
    this.rooms = [];
    this.monsters = [];
    this.items = [];
    this.stairsDown = null;
    this.stairsUp = null;
    this.generate();
  }

  generate() {
    for (let i = 0; i < 4 + Math.floor(Math.random() * 2); i++) {
      const w = 6 + Math.floor(Math.random() * 6);
      const h = 4 + Math.floor(Math.random() * 3);
      const x = 1 + Math.floor(Math.random() * (this.width - w - 2));
      const y = 1 + Math.floor(Math.random() * (this.height - h - 2));
      this.carveRoom(x, y, w, h);
      this.rooms.push({ x, y, w, h });
    }
    for (let i = 1; i < this.rooms.length; i++) {
      this.connect(this.rooms[i - 1], this.rooms[i]);
    }
    if (this.rooms.length) {
      const r = this.rooms[0];
      this.stairsUp = { x: r.x + 1, y: r.y + 1 };
      const r2 = this.rooms[this.rooms.length - 1];
      this.stairsDown = { x: r2.x + r2.w - 2, y: r2.y + r2.h - 2 };
      this.tiles[this.stairsUp.y][this.stairsUp.x] = '⬆️';
      this.tiles[this.stairsDown.y][this.stairsDown.x] = '⬇️';
    }
    this.placeMonsters();
    this.placeItems();
  }

  carveRoom(x, y, w, h) {
    for (let yy = y; yy < y + h; yy++) {
      for (let xx = x; xx < x + w; xx++) {
        this.tiles[yy][xx] = '·';
      }
    }
  }

  connect(a, b) {
    let x1 = a.x + Math.floor(a.w / 2);
    let y1 = a.y + Math.floor(a.h / 2);
    let x2 = b.x + Math.floor(b.w / 2);
    let y2 = b.y + Math.floor(b.h / 2);
    while (x1 !== x2) {
      this.tiles[y1][x1] = '·';
      x1 += x1 < x2 ? 1 : -1;
    }
    while (y1 !== y2) {
      this.tiles[y1][x1] = '·';
      y1 += y1 < y2 ? 1 : -1;
    }
  }

  placeMonsters() {
    const types = ['a','b','c','d','e','f','g','h','i','j','k','l'];
    for (let i = 0; i < 2 + this.depth; i++) {
      const pos = this.randomFloor();
      if (pos) this.monsters.push(new Monster(types[Math.floor(Math.random()*types.length)], pos.x, pos.y, this.depth));
    }
  }

  placeItems() {
    for (let i = 0; i < 1 + Math.floor(this.depth / 2); i++) {
      const pos = this.randomFloor();
      if (pos) this.items.push(new Item(pos.x, pos.y, this.depth));
    }
  }

  randomFloor() {
    for (let tries = 0; tries < 80; tries++) {
      const x = 1 + Math.floor(Math.random() * (this.width - 2));
      const y = 1 + Math.floor(Math.random() * (this.height - 2));
      if (this.tiles[y][x] === '·') return { x, y };
    }
    return null;
  }

  isWalkable(x, y) {
    if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false;
    const t = this.tiles[y][x];
    return t === '·' || t === '⬆️' || t === '⬇️';
  }

  getMonsterAt(x, y) {
    return this.monsters.find(m => m.x === x && m.y === y && m.hp > 0);
  }

  getItemAt(x, y) {
    return this.items.find(i => i.x === x && i.y === y);
  }
}

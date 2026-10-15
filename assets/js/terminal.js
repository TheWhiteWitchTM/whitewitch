// terminal.js — efficient incremental ANSI terminal
class Terminal {
  constructor(options = {}) {
    this.cols = options.cols || 80;
    this.rows = options.rows || 24;
    this.font = options.font || '"Courier New", Courier, monospace';
    this.fontSize = options.fontSize || '15px';
    this.fg = options.fg || '#39ff14';
    this.bg = options.bg || '#000000';
    this.border = options.border || '#39ff14';
    this.hideMouse = options.hideMouse !== undefined ? options.hideMouse : true;
    this.autoRender = options.autoRender !== undefined ? options.autoRender : true;

    this.colors = [
      '#000000','#aa0000','#00aa00','#aa5500',
      '#0000aa','#aa00aa','#00aaaa','#aaaaaa',
      '#555555','#ff5555','#55ff55','#ffff55',
      '#5555ff','#ff55ff','#55ffff','#ffffff'
    ];

    this.wrap = document.createElement('div');
    this.wrap.className = 'terminal';
    this.wrap.tabIndex = 0;
    this.wrap.style.cssText = `
      background: ${this.bg};
      color: ${this.fg};
      font-family: ${this.font};
      font-size: ${this.fontSize};
      line-height: 1.25;
      width: ${this.cols}ch;
      height: ${this.rows * 1.25}em;
      padding: 8px;
      overflow: hidden;
      white-space: pre;
      border: 2px solid ${this.border};
      box-shadow: 0 0 12px ${this.border}40;
      position: relative;
      box-sizing: border-box;
      outline: none;
      cursor: ${this.hideMouse ? 'none' : 'auto'};
    `;

    this.screen = document.createElement('div');
    this.screen.style.cssText = 'width:100%;height:100%;overflow:hidden;';
    this.wrap.appendChild(this.screen);

    this.cellEls = [];
    this.buffer = [];
    for (let y = 0; y < this.rows; y++) {
      const row = [];
      const rowEls = [];
      const rowDiv = document.createElement('div');
      rowDiv.style.whiteSpace = 'pre';
      for (let x = 0; x < this.cols; x++) {
        const span = document.createElement('span');
        span.textContent = ' ';
        rowDiv.appendChild(span);
        rowEls.push(span);
        row.push({ ch: ' ', fg: 2, bg: 0, bright: false, dirty: true });
      }
      this.screen.appendChild(rowDiv);
      this.cellEls.push(rowEls);
      this.buffer.push(row);
    }

    this.cx = 0;
    this.cy = 0;
    this.prevCx = 0;
    this.prevCy = 0;
    this.fgIdx = 2;
    this.bgIdx = 0;
    this.bright = false;
    this.cursorOn = true;

    this._blink = setInterval(() => {
      this.cursorOn = !this.cursorOn;
      this.markDirty(this.cx, this.cy);
      this.render();
    }, 530);

    this.render();
  }

  markDirty(x, y) {
    if (y >= 0 && y < this.rows && x >= 0 && x < this.cols) {
      this.buffer[y][x].dirty = true;
    }
  }

  put(ch, x = this.cx, y = this.cy) {
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return;
    const cell = this.buffer[y][x];
    const newCh = ch || ' ';
    if (cell.ch !== newCh || cell.fg !== this.fgIdx || cell.bg !== this.bgIdx || cell.bright !== this.bright) {
      cell.ch = newCh;
      cell.fg = this.fgIdx;
      cell.bg = this.bgIdx;
      cell.bright = this.bright;
      cell.dirty = true;
    }
  }

  write(text) {
    const chars = [...text];
    for (const ch of chars) {
      if (ch === '\n') {
        this.cx = 0;
        this.cy++;
        if (this.cy >= this.rows) this.scroll();
      } else if (ch === '\r') {
        this.cx = 0;
      } else if (ch === '\b') {
        if (this.cx > 0) {
          this.markDirty(this.cx, this.cy);
          this.cx--;
          this.put(' ');
          this.markDirty(this.cx, this.cy);
        }
      } else {
        if (this.cx >= this.cols) {
          this.cx = 0;
          this.cy++;
          if (this.cy >= this.rows) this.scroll();
        }
        this.put(ch);
        this.cx++;
      }
    }
    if (this.autoRender) this.render();
  }

  writeln(text = '') { this.write(text + '\n'); }

  writeAt(x, y, text) {
    this.moveTo(x, y);
    this.write(text);
  }

  fill(x, y, w, h, ch = ' ', fg = this.fgIdx, bg = this.bgIdx) {
    for (let yy = y; yy < y + h && yy < this.rows; yy++) {
      for (let xx = x; xx < x + w && xx < this.cols; xx++) {
        if (yy >= 0 && xx >= 0) {
          const cell = this.buffer[yy][xx];
          if (cell.ch !== ch || cell.fg !== fg || cell.bg !== bg) {
            cell.ch = ch;
            cell.fg = fg;
            cell.bg = bg;
            cell.bright = this.bright;
            cell.dirty = true;
          }
        }
      }
    }
    if (this.autoRender) this.render();
  }

  getChar(x, y) {
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return null;
    return this.buffer[y][x];
  }

  moveTo(x, y) {
    this.markDirty(this.cx, this.cy);
    this.prevCx = this.cx;
    this.prevCy = this.cy;
    this.cx = Math.max(0, Math.min(this.cols - 1, x));
    this.cy = Math.max(0, Math.min(this.rows - 1, y));
    this.markDirty(this.cx, this.cy);
  }

  home() { this.moveTo(0, 0); }

  clear() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.buffer[y][x];
        cell.ch = ' ';
        cell.fg = 2;
        cell.bg = 0;
        cell.bright = false;
        cell.dirty = true;
      }
    }
    this.cx = 0;
    this.cy = 0;
    if (this.autoRender) this.render();
  }

  clearLine() {
    for (let x = this.cx; x < this.cols; x++) {
      const cell = this.buffer[this.cy][x];
      cell.ch = ' ';
      cell.fg = this.fgIdx;
      cell.bg = this.bgIdx;
      cell.bright = this.bright;
      cell.dirty = true;
    }
    if (this.autoRender) this.render();
  }

  scroll() {
    this.buffer.shift();
    this.cellEls.shift();
    const newRow = [];
    const newEls = [];
    const rowDiv = document.createElement('div');
    rowDiv.style.whiteSpace = 'pre';
    for (let x = 0; x < this.cols; x++) {
      const span = document.createElement('span');
      span.textContent = ' ';
      rowDiv.appendChild(span);
      newEls.push(span);
      newRow.push({ ch: ' ', fg: 2, bg: 0, bright: false, dirty: true });
    }
    this.screen.appendChild(rowDiv);
    this.buffer.push(newRow);
    this.cellEls.push(newEls);
    if (this.cy > 0) this.cy--;
  }

  hideCursor() { this.cursorOn = false; this.markDirty(this.cx, this.cy); this.render(); }
  showCursor() { this.cursorOn = true; this.markDirty(this.cx, this.cy); this.render(); }

  setHideMouse(hide) {
    this.hideMouse = !!hide;
    this.wrap.style.cursor = this.hideMouse ? 'none' : 'auto';
  }

  toggleHideMouse() { this.setHideMouse(!this.hideMouse); }

  focus() { this.wrap.focus(); }

  onKey(handler) {
    this.wrap.addEventListener('keydown', handler);
    return () => this.wrap.removeEventListener('keydown', handler);
  }

  setFg(n) { this.fgIdx = n & 15; }
  setBg(n) { this.bgIdx = n & 15; }
  setBright(b) { this.bright = !!b; }
  resetAttr() { this.fgIdx = 2; this.bgIdx = 0; this.bright = false; }

  writeAnsi(text) {
    let i = 0;
    while (i < text.length) {
      if (text[i] === '\x1b' && text[i + 1] === '[') {
        let j = i + 2;
        let params = '';
        while (j < text.length && !/[A-Za-z]/.test(text[j])) {
          params += text[j];
          j++;
        }
        const cmd = text[j] || '';
        const nums = params ? params.split(';').map(n => parseInt(n, 10) || 0) : [0];

        if (cmd === 'm') {
          for (const n of nums) {
            if (n === 0) this.resetAttr();
            else if (n === 1) this.bright = true;
            else if (n === 22) this.bright = false;
            else if (n >= 30 && n <= 37) this.fgIdx = n - 30;
            else if (n >= 40 && n <= 47) this.bgIdx = n - 40;
            else if (n >= 90 && n <= 97) { this.fgIdx = n - 90; this.bright = true; }
            else if (n >= 100 && n <= 107) this.bgIdx = n - 100;
          }
        } else if (cmd === 'H' || cmd === 'f') {
          this.moveTo((nums[1] || 1) - 1, (nums[0] || 1) - 1);
        } else if (cmd === 'J' && (nums[0] === 2 || nums[0] === 0)) {
          this.clear();
        } else if (cmd === 'K') {
          this.clearLine();
        } else if (cmd === 'A') this.moveTo(this.cx, this.cy - (nums[0] || 1));
        else if (cmd === 'B') this.moveTo(this.cx, this.cy + (nums[0] || 1));
        else if (cmd === 'C') this.moveTo(this.cx + (nums[0] || 1), this.cy);
        else if (cmd === 'D') this.moveTo(this.cx - (nums[0] || 1), this.cy);

        i = j + 1;
      } else {
        this.write(text[i]);
        i++;
      }
    }
    if (this.autoRender) this.render();
  }

  render() {
    // Always clean previous cursor position
    this.markDirty(this.prevCx, this.prevCy);
    this.markDirty(this.cx, this.cy);

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.buffer[y][x];
        if (!cell.dirty) continue;
        const el = this.cellEls[y][x];
        const isCursor = this.cursorOn && y === this.cy && x === this.cx;
        const ch = isCursor ? '█' : (cell.ch || ' ');
        const fgColor = this.colors[cell.bright ? Math.min(cell.fg + 8, 15) : cell.fg] || this.fg;
        const bgColor = this.colors[cell.bg] || this.bg;
        if (el.textContent !== ch) el.textContent = ch;
        if (el.style.color !== fgColor) el.style.color = fgColor;
        if (el.style.backgroundColor !== bgColor) el.style.backgroundColor = bgColor;
        cell.dirty = false;
      }
    }
    this.prevCx = this.cx;
    this.prevCy = this.cy;
  }

  destroy() {
    clearInterval(this._blink);
    this.wrap.remove();
  }
}

// terminal.js — pure 80x24 ANSI display buffer (no keyboard handling)
class Terminal {
  constructor(options = {}) {
    this.cols = 80;
    this.rows = 24;
    this.font = options.font || '"Courier New", Courier, monospace';
    this.fontSize = options.fontSize || '15px';
    this.fg = options.fg || '#cccccc';
    this.bg = options.bg || '#000000';
    this.border = options.border || '#39ff14';

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
    `;

    this.screen = document.createElement('div');
    this.screen.style.cssText = 'width:100%;height:100%;overflow:hidden;';
    this.wrap.appendChild(this.screen);

    this.buffer = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({ ch: ' ', fg: 7, bg: 0, bright: false }))
    );

    this.cx = 0;
    this.cy = 0;
    this.fgIdx = 7;
    this.bgIdx = 0;
    this.bright = false;
    this.cursorOn = true;

    this._blink = setInterval(() => {
      this.cursorOn = !this.cursorOn;
      this.render();
    }, 530);

    this.render();
  }

  // ---- Drawing ----
  put(ch, x = this.cx, y = this.cy) {
    if (x < 0 || x >= this.cols || y < 0 || y >= this.rows) return;
    this.buffer[y][x] = {
      ch: ch || ' ',
      fg: this.fgIdx,
      bg: this.bgIdx,
      bright: this.bright
    };
  }

  write(text) {
    for (const ch of text) {
      if (ch === '\n') {
        this.cx = 0;
        this.cy++;
        if (this.cy >= this.rows) this.scroll();
      } else if (ch === '\r') {
        this.cx = 0;
      } else if (ch === '\b') {
        if (this.cx > 0) {
          this.cx--;
          this.put(' ');
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
    this.render();
  }

  writeln(text = '') {
    this.write(text + '\n');
  }

  // ---- Cursor & screen ----
  moveTo(x, y) {
    this.cx = Math.max(0, Math.min(this.cols - 1, x));
    this.cy = Math.max(0, Math.min(this.rows - 1, y));
  }

  home() { this.moveTo(0, 0); }

  clear() {
    this.buffer = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({ ch: ' ', fg: 7, bg: 0, bright: false }))
    );
    this.home();
    this.render();
  }

  clearLine() {
    for (let x = this.cx; x < this.cols; x++) {
      this.buffer[this.cy][x] = { ch: ' ', fg: this.fgIdx, bg: this.bgIdx, bright: this.bright };
    }
    this.render();
  }

  scroll() {
    this.buffer.shift();
    this.buffer.push(Array.from({ length: this.cols }, () => ({ ch: ' ', fg: 7, bg: 0, bright: false })));
    if (this.cy > 0) this.cy--;
  }

  // ---- Color ----
  setFg(n) { this.fgIdx = n & 15; }
  setBg(n) { this.bgIdx = n & 15; }
  setBright(b) { this.bright = !!b; }
  resetAttr() { this.fgIdx = 7; this.bgIdx = 0; this.bright = false; }

  // ---- ANSI ----
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
          this.cy = Math.max(0, Math.min(this.rows - 1, (nums[0] || 1) - 1));
          this.cx = Math.max(0, Math.min(this.cols - 1, (nums[1] || 1) - 1));
        } else if (cmd === 'J' && (nums[0] === 2 || nums[0] === 0)) {
          this.clear();
        } else if (cmd === 'K') {
          this.clearLine();
        } else if (cmd === 'A') this.cy = Math.max(0, this.cy - (nums[0] || 1));
        else if (cmd === 'B') this.cy = Math.min(this.rows - 1, this.cy + (nums[0] || 1));
        else if (cmd === 'C') this.cx = Math.min(this.cols - 1, this.cx + (nums[0] || 1));
        else if (cmd === 'D') this.cx = Math.max(0, this.cx - (nums[0] || 1));

        i = j + 1;
      } else {
        this.write(text[i]);
        i++;
      }
    }
  }

  render() {
    let html = '';
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const cell = this.buffer[y][x];
        const isCursor = this.cursorOn && y === this.cy && x === this.cx;
        const ch = isCursor ? '█' : (cell.ch || ' ');
        const fgColor = this.colors[cell.bright ? Math.min(cell.fg + 8, 15) : cell.fg] || this.fg;
        const bgColor = this.colors[cell.bg] || this.bg;
        html += `<span style="color:${fgColor};background:${bgColor}">${ch.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</span>`;
      }
      if (y < this.rows - 1) html += '\n';
    }
    this.screen.innerHTML = html;
  }

  destroy() {
    clearInterval(this._blink);
    this.wrap.remove();
  }
}

function createTerminal(options) {
  return new Terminal(options);
}

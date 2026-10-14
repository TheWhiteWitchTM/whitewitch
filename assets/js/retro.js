// retro.js — proper terminal foundation
const RETRO = {
  cols: 80,
  rows: 24,
  font: '"Courier New", Courier, monospace',
  fg: '#39ff14',
  bg: '#000000',
  cursor: '█'
};

function terminal(className = '') {
  const wrap = document.createElement('div');
  wrap.className = `retro-terminal ${className}`.trim();
  wrap.style.cssText = `
    background: ${RETRO.bg};
    color: ${RETRO.fg};
    font-family: ${RETRO.font};
    font-size: 15px;
    line-height: 1.2;
    width: ${RETRO.cols}ch;
    height: ${RETRO.rows * 1.2}em;
    padding: 8px;
    overflow: hidden;
    white-space: pre;
    border: 2px solid ${RETRO.fg};
    box-shadow: 0 0 12px ${RETRO.fg}40;
    position: relative;
    font-weight: 600;
  `;

  const screen = document.createElement('div');
  screen.className = 'retro-screen';
  screen.style.cssText = `
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;
  wrap.appendChild(screen);

  // Internal state
  const state = {
    lines: Array(RETRO.rows).fill(''),
    cx: 0,
    cy: 0,
    cursorVisible: true
  };

  function render() {
    // Build display with cursor in the text itself so typing is always visible
    const display = state.lines.map((line, y) => {
      if (y === state.cy) {
        const before = line.slice(0, state.cx);
        const after = line.slice(state.cx);
        return before + (state.cursorVisible ? RETRO.cursor : ' ') + after.slice(1);
      }
      return line;
    });
    screen.textContent = display.join('\n');
  }

  function scrollUp() {
    state.lines.shift();
    state.lines.push('');
    if (state.cy > 0) state.cy--;
  }

  const api = {
    wrap,
    screen,
    write(text) {
      for (const ch of text) {
        if (ch === '\n') {
          state.cy++;
          state.cx = 0;
          if (state.cy >= RETRO.rows) {
            scrollUp();
            state.cy = RETRO.rows - 1;
          }
          continue;
        }
        if (state.cx >= RETRO.cols) {
          state.cy++;
          state.cx = 0;
          if (state.cy >= RETRO.rows) {
            scrollUp();
            state.cy = RETRO.rows - 1;
          }
        }
        const line = state.lines[state.cy].split('');
        line[state.cx] = ch;
        state.lines[state.cy] = line.join('').padEnd(RETRO.cols).slice(0, RETRO.cols);
        state.cx++;
      }
      render();
    },
    writeln(text = '') {
      this.write(text + '\n');
    },
    clear() {
      state.lines = Array(RETRO.rows).fill('');
      state.cx = 0;
      state.cy = 0;
      render();
    },
    setCursor(x, y) {
      state.cx = Math.max(0, Math.min(x, RETRO.cols - 1));
      state.cy = Math.max(0, Math.min(y, RETRO.rows - 1));
      render();
    },
    getCursor() {
      return { x: state.cx, y: state.cy };
    },
    backspace() {
      if (state.cx > 0) {
        state.cx--;
        const line = state.lines[state.cy].split('');
        line[state.cx] = ' ';
        state.lines[state.cy] = line.join('');
        render();
      }
    },
    status(text) {
      state.lines[RETRO.rows - 1] = text.padEnd(RETRO.cols).slice(0, RETRO.cols);
      render();
    }
  };

  // Blink cursor
  setInterval(() => {
    state.cursorVisible = !state.cursorVisible;
    render();
  }, 500);

  render();
  return api;
}

// Compatibility helpers (so older code still works)
function write(term, text) { term.write(text); }
function clear(term) { term.clear(); }
function status(term, text) { term.status(text); }

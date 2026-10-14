// retro.js — terminal that preserves emoji color
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
    line-height: 1.25;
    width: ${RETRO.cols}ch;
    height: ${RETRO.rows * 1.25}em;
    padding: 8px;
    overflow: hidden;
    white-space: pre-wrap;
    border: 2px solid ${RETRO.fg};
    box-shadow: 0 0 12px ${RETRO.fg}40;
    position: relative;
    font-weight: 500;
  `;

  const screen = document.createElement('div');
  screen.className = 'retro-screen';
  screen.style.cssText = `
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;
  wrap.appendChild(screen);

  const state = {
    lines: Array(RETRO.rows).fill(''),
    cx: 0,
    cy: 0,
    cursorVisible: true
  };

  function render() {
    const html = state.lines.map((line, y) => {
      let display = line;
      if (y === state.cy) {
        const before = line.slice(0, state.cx);
        const after = line.slice(state.cx);
        display = before + (state.cursorVisible ? RETRO.cursor : ' ') + after.slice(1);
      }
      // Let emojis keep their color by not wrapping the whole line in a forced color
      return display
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }).join('\n');

    screen.innerHTML = html;
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
        const line = (state.lines[state.cy] || '').split('');
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
    backspace() {
      if (state.cx > 0) {
        state.cx--;
        const line = (state.lines[state.cy] || '').split('');
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

  setInterval(() => {
    state.cursorVisible = !state.cursorVisible;
    render();
  }, 530);

  render();
  return api;
}

function write(term, text) { term.write(text); }
function clear(term) { term.clear(); }
function status(term, text) { term.status(text); }

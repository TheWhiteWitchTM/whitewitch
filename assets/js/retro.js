// retro.js — terminal primitives that sit on top of components.js
// Assumes components.js is already loaded (useEffect, etc.)

const RETRO = {
  cols: 80,
  rows: 24,
  font: '"Courier New", Courier, monospace',
  fg: '#39ff14',   // poison green
  bg: '#000000',
  cursor: '█'
};

// Create an 80×24 terminal element
function terminal(className = '') {
  const wrap = document.createElement('div');
  wrap.className = `retro-terminal ${className}`.trim();
  wrap.style.cssText = `
    background: ${RETRO.bg};
    color: ${RETRO.fg};
    font-family: ${RETRO.font};
    font-size: 14px;
    line-height: 1.2;
    width: ${RETRO.cols}ch;
    height: ${RETRO.rows * 1.2}em;
    padding: 8px;
    overflow: hidden;
    white-space: pre;
    border: 2px solid ${RETRO.fg};
    box-shadow: 0 0 12px ${RETRO.fg}40;
    position: relative;
  `;

  const screen = document.createElement('div');
  screen.className = 'retro-screen';
  screen.style.cssText = `
    width: 100%;
    height: 100%;
    overflow: hidden;
  `;
  wrap.appendChild(screen);

  // simple cursor
  const cursor = document.createElement('span');
  cursor.className = 'retro-cursor';
  cursor.textContent = RETRO.cursor;
  cursor.style.cssText = `
    position: absolute;
    color: ${RETRO.fg};
    animation: blink 1s step-end infinite;
  `;
  wrap.appendChild(cursor);

  // blink keyframes (injected once)
  if (!document.getElementById('retro-blink')) {
    const style = document.createElement('style');
    style.id = 'retro-blink';
    style.textContent = `
      @keyframes blink { 50% { opacity: 0; } }
    `;
    document.head.appendChild(style);
  }

  return { wrap, screen, cursor };
}

// Write text into the terminal (simple line-based for now)
function write(term, text) {
  const lines = term.screen.textContent.split('\n');
  const newLines = (term.screen.textContent + text).split('\n');
  // keep only last RETRO.rows lines
  const visible = newLines.slice(-RETRO.rows);
  term.screen.textContent = visible.join('\n');
  // move cursor to end
  const last = visible[visible.length - 1] || '';
  term.cursor.style.left = `${last.length}ch`;
  term.cursor.style.top = `${(visible.length - 1) * 1.2}em`;
}

// Clear the terminal
function clear(term) {
  term.screen.textContent = '';
  term.cursor.style.left = '0';
  term.cursor.style.top = '0';
}

// Simple status line (bottom row)
function status(term, text) {
  const lines = term.screen.textContent.split('\n');
  while (lines.length < RETRO.rows - 1) lines.push('');
  lines[RETRO.rows - 1] = text.padEnd(RETRO.cols).slice(0, RETRO.cols);
  term.screen.textContent = lines.join('\n');
}

// Example usage (you can delete this once you wire the games)
useEffect(() => {
  const t = terminal();
  document.body.appendChild(t.wrap);   // or append to a game container
  write(t, 'RETRO TERMINAL ONLINE\n');
  write(t, '80x24  POISON GREEN\n');
  write(t, '> ');
  status(t, 'READY');
  return () => t.wrap.remove();
});

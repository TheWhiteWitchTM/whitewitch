const output = document.getElementById('output');
const statusEl = document.getElementById('status');

const COLS = 40;
const ROWS = 20;
let snake, dir, food, score, alive, loop;

function init() {
  snake = [{x: 10, y: 10}, {x: 9, y: 10}, {x: 8, y: 10}];
  dir = {x: 1, y: 0};
  score = 0;
  alive = true;
  placeFood();
  if (loop) clearInterval(loop);
  loop = setInterval(tick, 120);
  draw();
}

function placeFood() {
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
}

function tick() {
  if (!alive) return;
  const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

  if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS ||
      snake.some(s => s.x === head.x && s.y === head.y)) {
    alive = false;
    clearInterval(loop);
    draw(true);
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    placeFood();
  } else {
    snake.pop();
  }
  draw();
}

function draw(dead = false) {
  const grid = Array.from({ length: ROWS }, () => Array(COLS).fill('·'));
  snake.forEach((s, i) => grid[s.y][s.x] = i === 0 ? '█' : '▓');
  if (food) grid[food.y][food.x] = '●';

  let text = '';
  for (let y = 0; y < ROWS; y++) text += grid[y].join('') + '\n';
  if (dead) text += '\n💀 CRASH! Press R to restart.';
  output.value = text;
  statusEl.textContent = `Score: ${score}`;
  output.scrollTop = 0;
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (!alive && key === 'r') { init(); return; }
  if (!alive) return;

  if ((key === 'arrowup' || key === 'w') && dir.y === 0) dir = {x: 0, y: -1};
  else if ((key === 'arrowdown' || key === 's') && dir.y === 0) dir = {x: 0, y: 1};
  else if ((key === 'arrowleft' || key === 'a') && dir.x === 0) dir = {x: -1, y: 0};
  else if ((key === 'arrowright' || key === 'd') && dir.x === 0) dir = {x: 1, y: 0};
  e.preventDefault();
});

init();

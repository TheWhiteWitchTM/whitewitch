const output = document.getElementById('output');
const statusEl = document.getElementById('status');

const W = 78, H = 20;
let map, seen, player, monsters, items, level, messages, gameOver;
let audioCtx;

function beep(f = 440, d = 0.08, type = 'square') {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.value = f;
  g.gain.setValueAtTime(0.06, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + d);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(); o.stop(audioCtx.currentTime + d);
}

const MONSTERS = [
  {ch:'👺', name:'kobold', hp:5, dmg:2, xp:1},
  {ch:'👹', name:'orc', hp:8, dmg:3, xp:2},
  {ch:'🧟', name:'zombie', hp:12, dmg:4, xp:3},
  {ch:'🧌', name:'troll', hp:20, dmg:6, xp:6},
  {ch:'🐉', name:'dragon', hp:40, dmg:10, xp:15}
];

function init() {
  level = 1;
  messages = [];
  gameOver = false;
  player = {x:0,y:0,hp:12,maxHp:12,str:16,gold:0,xp:0,level:1,inv:[],weapon:null,armor:null};
  newLevel();
  draw();
}

function newLevel() {
  map = Array.from({length:H}, () => Array(W).fill('⬛'));
  seen = Array.from({length:H}, () => Array(W).fill(false));
  monsters = [];
  items = [];
  for (let i = 0; i < 6; i++) {
    const rw = 5 + Math.floor(Math.random()*6);
    const rh = 3 + Math.floor(Math.random()*4);
    const rx = 1 + Math.floor(Math.random()*(W-rw-2));
    const ry = 1 + Math.floor(Math.random()*(H-rh-2));
    for (let y = ry; y < ry+rh; y++)
      for (let x = rx; x < rx+rw; x++) map[y][x] = '·';
  }
  for (let i = 0; i < 8; i++) {
    let x = Math.floor(Math.random()*W), y = Math.floor(Math.random()*H);
    for (let s = 0; s < 15; s++) {
      if (x>0&&x<W-1&&y>0&&y<H-1) map[y][x] = '·';
      const d = Math.floor(Math.random()*4);
      if (d===0) x++; else if (d===1) x--; else if (d===2) y++; else y--;
    }
  }
  do { player.x = Math.floor(Math.random()*W); player.y = Math.floor(Math.random()*H); }
  while (map[player.y][player.x] !== '·');
  for (let i = 0; i < 4 + level; i++) spawnMonster();
  for (let i = 0; i < 3; i++) spawnItem();
  if (level < 10) {
    let sx, sy;
    do { sx = Math.floor(Math.random()*W); sy = Math.floor(Math.random()*H); }
    while (map[sy][sx] !== '·');
    map[sy][sx] = '🔽';
  }
  if (level === 10) items.push({x:player.x+1, y:player.y, ch:'💎', name:'Amulet of Yendor', type:'amulet'});
  message(`Welcome to level ${level}.`);
  beep(300, 0.1);
  updateSeen();
}

function spawnMonster() {
  const m = MONSTERS[Math.min(MONSTERS.length-1, Math.floor(Math.random()*level))];
  let x,y;
  do { x = Math.floor(Math.random()*W); y = Math.floor(Math.random()*H); }
  while (map[y][x] !== '·' || (x===player.x && y===player.y));
  monsters.push({...m, x, y, hp:m.hp});
}

function spawnItem() {
  const types = [
    {ch:'🧪', name:'potion of healing', type:'potion'},
    {ch:'📜', name:'scroll of identify', type:'scroll'},
    {ch:'🗡️', name:'sword', type:'weapon', bonus:2},
    {ch:'🛡️', name:'armor', type:'armor', bonus:2},
    {ch:'💰', name:'gold', type:'gold', amount:10+Math.floor(Math.random()*20)}
  ];
  const it = types[Math.floor(Math.random()*types.length)];
  let x,y;
  do { x = Math.floor(Math.random()*W); y = Math.floor(Math.random()*H); }
  while (map[y][x] !== '·');
  items.push({...it, x, y});
}

function message(msg) {
  messages.push(msg);
  if (messages.length > 3) messages.shift();
}

function updateSeen() {
  for (let dy = -4; dy <= 4; dy++)
    for (let dx = -4; dx <= 4; dx++) {
      const x = player.x+dx, y = player.y+dy;
      if (x>=0&&x<W&&y>=0&&y<H) seen[y][x] = true;
    }
}

function move(dx, dy) {
  if (gameOver) return;
  const nx = player.x+dx, ny = player.y+dy;
  if (nx<0||nx>=W||ny<0||ny>=H) return;
  const mon = monsters.find(m => m.x===nx && m.y===ny);
  if (mon) { attack(mon); }
  else if (map[ny][nx] === '·' || map[ny][nx] === '🔽') {
    player.x = nx; player.y = ny;
    const it = items.find(i => i.x===nx && i.y===ny);
    if (it) {
      if (it.type==='gold') { player.gold += it.amount; message(`You pick up ${it.amount} gold.`); beep(600); }
      else if (it.type==='amulet') { message('You found the Amulet of Yendor! You win!'); gameOver=true; beep(800,0.5); }
      else { player.inv.push(it); message(`You pick up a ${it.name}.`); beep(500); }
      items = items.filter(i => i !== it);
    }
    if (map[ny][nx]==='🔽' && level<10) { level++; newLevel(); return; }
  }
  monstersAct();
  updateSeen();
  draw();
}

function attack(mon) {
  const dmg = 1 + Math.floor(Math.random()* (player.str/4 + (player.weapon?player.weapon.bonus:0)));
  mon.hp -= dmg;
  message(`You hit the ${mon.name} for ${dmg}.`);
  beep(420);
  if (mon.hp <= 0) {
    message(`You defeat the ${mon.name}!`);
    player.xp += mon.xp;
    monsters = monsters.filter(m => m !== mon);
    beep(650);
    if (player.xp >= player.level*10) { player.level++; player.maxHp+=3; player.hp=player.maxHp; player.str++; message('You feel stronger!'); beep(720); }
  }
}

function monstersAct() {
  monsters.forEach(m => {
    const dx = Math.sign(player.x - m.x), dy = Math.sign(player.y - m.y);
    if (Math.abs(player.x-m.x)+Math.abs(player.y-m.y) === 1) {
      const dmg = 1 + Math.floor(Math.random()*m.dmg);
      player.hp -= dmg;
      message(`The ${m.name} hits you for ${dmg}.`);
      beep(160,0.12,'sawtooth');
      if (player.hp <= 0) { message('You die...'); gameOver=true; beep(70,0.6,'sawtooth'); }
    } else if (Math.random()<0.6) {
      const nx = m.x+dx, ny = m.y+dy;
      if (nx>=0&&nx<W&&ny>=0&&ny<H && map[ny][nx]==='·' && !monsters.some(o=>o.x===nx&&o.y===ny) && !(nx===player.x&&ny===player.y)) {
        m.x=nx; m.y=ny;
      }
    }
  });
}

function draw() {
  let text = '';
  for (let y = 0; y < H; y++) {
    let line = '';
    for (let x = 0; x < W; x++) {
      if (!seen[y][x]) { line += ' '; continue; }
      let ch = map[y][x];
      const mon = monsters.find(m => m.x===x && m.y===y);
      const it = items.find(i => i.x===x && i.y===y);
      if (x===player.x && y===player.y) ch = '🧙';
      else if (mon) ch = mon.ch;
      else if (it) ch = it.ch;
      line += ch;
    }
    text += line + '\n';
  }
  text += messages.join(' | ');
  if (gameOver) text += '\nPress R to restart.';
  output.value = text;
  statusEl.textContent = `Level ${level}  HP ${player.hp}/${player.maxHp}  Str ${player.str}  Gold ${player.gold}  XP ${player.xp}`;
}

function showInv() {
  if (!player.inv.length) { message('You are empty-handed.'); }
  else message('Inventory: ' + player.inv.map((it,i)=>`${i}:${it.ch}${it.name}`).join(', '));
  draw();
}

document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k==='r' && gameOver) { init(); return; }
  if (gameOver) return;
  if (k==='arrowup'||k==='w') move(0,-1);
  else if (k==='arrowdown'||k==='s') move(0,1);
  else if (k==='arrowleft'||k==='a') move(-1,0);
  else if (k==='arrowright'||k==='d') move(1,0);
  else if (k==='i') showInv();
  else if (k==='q') {
    const p = player.inv.find(i=>i.type==='potion');
    if (p) { player.hp = Math.min(player.maxHp, player.hp+8); player.inv=player.inv.filter(i=>i!==p); message('You feel better.'); beep(560); }
    else message('No potions.');
    draw();
  }
  else if (k==='>') { if (map[player.y][player.x]==='🔽') { level++; newLevel(); } else message('No stairs here.'); draw(); }
  e.preventDefault();
});

init();

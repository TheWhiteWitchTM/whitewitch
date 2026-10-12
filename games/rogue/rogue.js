const output = document.getElementById('output');
const statusEl = document.getElementById('status');

const W = 70, H = 18;
let map, seen, player, monsters, items, level, messages, gameOver;
let audioCtx;

function beep(f = 440, d = 0.07, type = 'square', vol = 0.15) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + d);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + d);
  } catch (e) {}
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
  map = Array.from({length:H}, () => Array(W).fill('#'));
  seen = Array.from({length:H}, () => Array(W).fill(false));
  monsters = [];
  items = [];
  for (let i = 0; i < 5; i++) {
    const rw = 4 + Math.floor(Math.random()*5);
    const rh = 3 + Math.floor(Math.random()*3);
    const rx = 1 + Math.floor(Math.random()*(W-rw-2));
    const ry = 1 + Math.floor(Math.random()*(H-rh-2));
    for (let y = ry; y < ry+rh && y < H-1; y++)
      for (let x = rx; x < rx+rw && x < W-1; x++) map[y][x] = '.';
  }
  for (let i = 0; i < 6; i++) {
    let x = Math.floor(Math.random()*W), y = Math.floor(Math.random()*H);
    for (let s = 0; s < 12; s++) {
      if (x>0&&x<W-1&&y>0&&y<H-1) map[y][x] = '.';
      const d = Math.floor(Math.random()*4);
      if (d===0) x = Math.min(W-2, x+1);
      else if (d===1) x = Math.max(1, x-1);
      else if (d===2) y = Math.min(H-2, y+1);
      else y = Math.max(1, y-1);
    }
  }
  do { player.x = 1+Math.floor(Math.random()*(W-2)); player.y = 1+Math.floor(Math.random()*(H-2)); }
  while (map[player.y][player.x] !== '.');
  for (let i = 0; i < 3 + level; i++) spawnMonster();
  for (let i = 0; i < 2; i++) spawnItem();
  if (level < 10) {
    let sx, sy;
    do { sx = 1+Math.floor(Math.random()*(W-2)); sy = 1+Math.floor(Math.random()*(H-2)); }
    while (map[sy][sx] !== '.');
    map[sy][sx] = '>';
  }
  if (level === 10) items.push({x:player.x+1, y:player.y, ch:'*', name:'Amulet of Yendor', type:'amulet'});
  message(`Welcome to level ${level}.`);
  beep(360, 0.1, 'square', 0.18);
  updateSeen();
}

function spawnMonster() {
  const m = MONSTERS[Math.min(MONSTERS.length-1, Math.floor(Math.random()*level))];
  let x,y, tries=0;
  do { x = 1+Math.floor(Math.random()*(W-2)); y = 1+Math.floor(Math.random()*(H-2)); tries++; }
  while ((map[y][x] !== '.' || (x===player.x && y===player.y)) && tries < 50);
  if (tries < 50) monsters.push({...m, x, y, hp:m.hp});
}

function spawnItem() {
  const types = [
    {ch:'!', name:'potion of healing', type:'potion'},
    {ch:'?', name:'scroll', type:'scroll'},
    {ch:')', name:'sword', type:'weapon', bonus:2},
    {ch:'[', name:'armor', type:'armor', bonus:2},
    {ch:'*', name:'gold', type:'gold', amount:10+Math.floor(Math.random()*20)}
  ];
  const it = types[Math.floor(Math.random()*types.length)];
  let x,y, tries=0;
  do { x = 1+Math.floor(Math.random()*(W-2)); y = 1+Math.floor(Math.random()*(H-2)); tries++; }
  while (map[y][x] !== '.' && tries < 50);
  if (tries < 50) items.push({...it, x, y});
}

function message(msg) {
  messages.push(msg);
  if (messages.length > 2) messages.shift();
}

function updateSeen() {
  for (let dy = -3; dy <= 3; dy++)
    for (let dx = -3; dx <= 3; dx++) {
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
  else if (map[ny][nx] === '.' || map[ny][nx] === '>') {
    player.x = nx; player.y = ny;
    beep(240, 0.05, 'square', 0.12);
    const it = items.find(i => i.x===nx && i.y===ny);
    if (it) {
      if (it.type==='gold') { player.gold += it.amount; message(`Picked up ${it.amount} gold.`); beep(660, 0.1); }
      else if (it.type==='amulet') { message('Amulet of Yendor! You win!'); gameOver=true; beep(900, 0.5); }
      else { player.inv.push(it); message(`Picked up ${it.name}.`); beep(540, 0.1); }
      items = items.filter(i => i !== it);
    }
    if (map[ny][nx]==='>' && level<10) { level++; newLevel(); return; }
  } else {
    beep(90, 0.04, 'square', 0.08);
  }
  monstersAct();
  updateSeen();
  draw();
}

function attack(mon) {
  const dmg = 1 + Math.floor(Math.random()* (player.str/4 + (player.weapon?player.weapon.bonus:0)));
  mon.hp -= dmg;
  message(`You hit the ${mon.name} for ${dmg}.`);
  beep(500, 0.09, 'square', 0.16);
  if (mon.hp <= 0) {
    message(`Defeated the ${mon.name}!`);
    player.xp += mon.xp;
    monsters = monsters.filter(m => m !== mon);
    beep(720, 0.12);
    if (player.xp >= player.level*10) { player.level++; player.maxHp+=3; player.hp=player.maxHp; player.str++; message('Level up!'); beep(780, 0.18); }
  }
}

function monstersAct() {
  monsters.forEach(m => {
    const dx = Math.sign(player.x - m.x), dy = Math.sign(player.y - m.y);
    if (Math.abs(player.x-m.x)+Math.abs(player.y-m.y) === 1) {
      const dmg = 1 + Math.floor(Math.random()*m.dmg);
      player.hp -= dmg;
      message(`${mon.name} hits you for ${dmg}.`);
      beep(130, 0.12, 'sawtooth', 0.15);
      if (player.hp <= 0) { message('You die...'); gameOver=true; beep(50, 0.6, 'sawtooth', 0.2); }
    } else if (Math.random()<0.5) {
      const nx = m.x+dx, ny = m.y+dy;
      if (nx>0&&nx<W-1&&ny>0&&ny<H-1 && map[ny][nx]==='.' && !monsters.some(o=>o.x===nx&&o.y===ny) && !(nx===player.x&&ny===player.y)) {
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
      if (x===player.x && y===player.y) ch = '@';
      else if (mon) ch = mon.ch;
      else if (it) ch = it.ch;
      line += ch;
    }
    text += line + '\n';
  }
  text += '\n' + messages.join(' | ');
  if (gameOver) text += '\nPress R to restart.';
  output.value = text;
  statusEl.textContent = `Level ${level}  HP ${player.hp}/${player.maxHp}  Str ${player.str}  Gold ${player.gold}  XP ${player.xp}`;
}

function showInv() {
  if (!player.inv.length) message('Empty.');
  else message('Inv: ' + player.inv.map((it,i)=>`${i}${it.ch}`).join(' '));
  beep(280, 0.05);
  draw();
}

document.addEventListener('keydown', e => {
  const k = e.key.toLowerCase();
  if (k==='r') { init(); return; }
  if (gameOver) return;
  if (k==='arrowup'||k==='w') move(0,-1);
  else if (k==='arrowdown'||k==='s') move(0,1);
  else if (k==='arrowleft'||k==='a') move(-1,0);
  else if (k==='arrowright'||k==='d') move(1,0);
  else if (k==='i') showInv();
  else if (k==='q') {
    const p = player.inv.find(i=>i.type==='potion');
    if (p) { player.hp = Math.min(player.maxHp, player.hp+8); player.inv=player.inv.filter(i=>i!==p); message('Healed.'); beep(600, 0.12); }
    else message('No potions.');
    draw();
  }
  else if (k==='>') { if (map[player.y][player.x]==='>') { level++; newLevel(); } else message('No stairs.'); draw(); }
  e.preventDefault();
});

init();

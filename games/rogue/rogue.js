const output = document.getElementById('output');
const statusEl = document.getElementById('status');

const W = 60, H = 16;
let map, seen, player, monsters, items, level, messages, gameOver;
let audioCtx;

function beep(f=440, d=0.06, type='square', vol=0.14) {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = type; o.frequency.value = f;
    g.gain.setValueAtTime(vol, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + d);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + d);
  } catch(e) {}
}

const MONSTERS = [
  {ch:'👺', name:'kobold', hp:5, dmg:2, xp:1},
  {ch:'👹', name:'orc', hp:8, dmg:3, xp:2},
  {ch:'🧟', name:'zombie', hp:12, dmg:4, xp:3},
  {ch:'🧌', name:'troll', hp:18, dmg:5, xp:5},
  {ch:'🐉', name:'dragon', hp:30, dmg:8, xp:12}
];

function init() {
  level = 1; messages = []; gameOver = false;
  player = {x:2,y:2,hp:14,maxHp:14,str:16,gold:0,xp:0,level:1,inv:[]};
  newLevel();
  draw();
}

function newLevel() {
  map = Array.from({length:H}, () => Array(W).fill('⬛'));
  seen = Array.from({length:H}, () => Array(W).fill(false));
  monsters = []; items = [];

  // guaranteed main corridor spine
  for (let x = 2; x < W-2; x++) map[8][x] = '·';
  for (let y = 2; y < H-2; y++) map[y][30] = '·';

  // a few rooms attached to the spine
  const rooms = [
    [4,4,10,6], [20,3,12,5], [40,4,12,6],
    [8,10,10,4], [35,10,14,4]
  ];
  rooms.forEach(([rx,ry,rw,rh]) => {
    for (let y=ry; y<ry+rh && y<H-1; y++)
      for (let x=rx; x<rx+rw && x<W-1; x++) map[y][x] = '·';
  });

  player.x = 5; player.y = 8;

  for (let i=0; i<3+level; i++) spawn('monster');
  for (let i=0; i<3; i++) spawn('item');

  if (level < 8) {
    map[12][50] = '🔽';
  } else {
    items.push({x:55, y:8, ch:'💎', name:'Amulet', type:'amulet'});
  }

  message(`Level ${level}`);
  beep(350,0.1,'square',0.16);
  updateSeen();
}

function spawn(kind) {
  let x,y,tries=0;
  do {
    x = 2+Math.floor(Math.random()*(W-4));
    y = 2+Math.floor(Math.random()*(H-4));
    tries++;
  } while (map[y][x] !== '·' && tries<60);
  if (tries>=60) return;
  if (kind==='monster') {
    const m = MONSTERS[Math.min(4, Math.floor(level/2))];
    monsters.push({...m, x, y, hp:m.hp});
  } else {
    const list = [
      {ch:'🧪', name:'potion', type:'potion'},
      {ch:'🗡️', name:'sword', type:'weapon'},
      {ch:'💰', name:'gold', type:'gold', amount:15+Math.floor(Math.random()*25)}
    ];
    items.push({...list[Math.floor(Math.random()*list.length)], x, y});
  }
}

function message(m) {
  messages.push(m);
  if (messages.length>2) messages.shift();
}

function updateSeen() {
  for (let dy=-3; dy<=3; dy++)
    for (let dx=-4; dx<=4; dx++) {
      const x=player.x+dx, y=player.y+dy;
      if (x>=0&&x<W&&y>=0&&y<H) seen[y][x]=true;
    }
}

function move(dx,dy) {
  if (gameOver) return;
  const nx=player.x+dx, ny=player.y+dy;
  if (nx<0||nx>=W||ny<0||ny>=H) return;
  const mon = monsters.find(m=>m.x===nx&&m.y===ny);
  if (mon) {
    const dmg=2+Math.floor(Math.random()*4);
    mon.hp-=dmg;
    message(`Hit ${mon.name} ${dmg}`);
    beep(480,0.08,'square',0.15);
    if (mon.hp<=0) {
      monsters=monsters.filter(m=>m!==mon);
      player.xp+=mon.xp;
      message(`Killed ${mon.name}`);
      beep(700,0.1);
    }
  } else if (map[ny][nx]==='·' || map[ny][nx]==='🔽') {
    player.x=nx; player.y=ny;
    beep(220,0.04,'square',0.1);
    const it=items.find(i=>i.x===nx&&i.y===ny);
    if (it) {
      if (it.type==='gold') { player.gold+=it.amount; message(`+${it.amount}g`); }
      else if (it.type==='amulet') { message('You win!'); gameOver=true; }
      else player.inv.push(it);
      items=items.filter(i=>i!==it);
      beep(550,0.08);
    }
    if (map[ny][nx]==='🔽') { level++; newLevel(); return; }
  }
  // monsters move
  monsters.forEach(m=>{
    if (Math.abs(m.x-player.x)+Math.abs(m.y-player.y)===1) {
      player.hp-=1+Math.floor(Math.random()*m.dmg);
      message(`${m.name} hits`);
      beep(140,0.1,'sawtooth',0.13);
      if (player.hp<=0) { message('Died'); gameOver=true; beep(60,0.5,'sawtooth',0.18); }
    } else if (Math.random()<0.4) {
      const mx=m.x+Math.sign(player.x-m.x), my=m.y+Math.sign(player.y-m.y);
      if (map[my]&&map[my][mx]==='·') { m.x=mx; m.y=my; }
    }
  });
  updateSeen();
  draw();
}

function draw() {
  let t='';
  for (let y=0;y<H;y++) {
    let line='';
    for (let x=0;x<W;x++) {
      if (!seen[y][x]) { line+=' '; continue; }
      let c=map[y][x];
      const mon=monsters.find(m=>m.x===x&&m.y===y);
      const it=items.find(i=>i.x===x&&i.y===y);
      if (x===player.x&&y===player.y) c='🧙';
      else if (mon) c=mon.ch;
      else if (it) c=it.ch;
      line+=c;
    }
    t+=line+'\n';
  }
  t+='\n'+messages.join(' | ');
  if (gameOver) t+='\nR = restart';
  output.value=t;
  statusEl.textContent=`Level ${level}  HP ${player.hp}/${player.maxHp}  Gold ${player.gold}`;
}

document.addEventListener('keydown', e=>{
  const k=e.key.toLowerCase();
  if (k==='r') { init(); return; }
  if (gameOver) return;
  if (k==='arrowup'||k==='w') move(0,-1);
  else if (k==='arrowdown'||k==='s') move(0,1);
  else if (k==='arrowleft'||k==='a') move(-1,0);
  else if (k==='arrowright'||k==='d') move(1,0);
  else if (k==='q') {
    const p=player.inv.find(i=>i.type==='potion');
    if (p) { player.hp=Math.min(player.maxHp,player.hp+6); player.inv=player.inv.filter(i=>i!==p); message('Healed'); }
    draw();
  }
  e.preventDefault();
});

init();

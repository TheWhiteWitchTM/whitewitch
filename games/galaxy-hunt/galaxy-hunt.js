const output = document.getElementById('output');
const form = document.getElementById('command-form');
const input = document.getElementById('command');

let audioCtx;
function beep(freq = 440, duration = 0.1, type = 'square') {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function print(text) {
  output.value += text + '\n';
  output.scrollTop = output.scrollHeight;
}

function clear() { output.value = ''; }

const systems = {
  warp: 0, sensors: 0, beams: 0, missiles: 0, shields: 0, computer: 0
};

let energy, missiles, shields, quadX, quadY, secX, secY, date, timeLeft, docked, galaxy;

function resetGame() {
  energy = 3000;
  missiles = 10;
  shields = 0;
  quadX = 4; quadY = 4;
  secX = 4; secY = 4;
  date = 3500;
  timeLeft = 40;
  docked = false;
  Object.keys(systems).forEach(k => systems[k] = 0);
  galaxy = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => ({ raiders: 0, outpost: false, stars: 1 + Math.floor(Math.random() * 8) }))
  );
  initGalaxy();
  clear();
  print('🚀 Galaxy Hunt — extended');
  print('Destroy all raiders. Type help for commands.\n');
  status();
  print('');
  shortScan();
  input.disabled = false;
  input.focus();
}

function initGalaxy() {
  let raidersLeft = 12;
  let outpostsLeft = 3;
  while (raidersLeft > 0 || outpostsLeft > 0) {
    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);
    if (raidersLeft > 0 && galaxy[y][x].raiders === 0 && Math.random() > 0.6) {
      galaxy[y][x].raiders = 1 + Math.floor(Math.random() * 3);
      raidersLeft -= galaxy[y][x].raiders;
    } else if (outpostsLeft > 0 && !galaxy[y][x].outpost && Math.random() > 0.8) {
      galaxy[y][x].outpost = true;
      outpostsLeft--;
    }
  }
}

function totalRaiders() {
  return galaxy.flat().reduce((s, q) => s + q.raiders, 0);
}

function status() {
  print(`\n🚀 Starship Status  (Stardate ${date.toFixed(1)})`);
  print(`Energy: ${energy}   Missiles: ${missiles}   Shields: ${shields}`);
  print(`Quadrant ${quadX},${quadY}  Sector ${secX},${secY}`);
  print(`Raiders remaining: ${totalRaiders()}   Time left: ${timeLeft}`);
  print(`Docked: ${docked ? 'yes' : 'no'}`);
  const dmg = Object.entries(systems).filter(([, v]) => v > 0);
  if (dmg.length) print('Damaged: ' + dmg.map(([k, v]) => `${k}(${v})`).join(', '));
}

function longScan() {
  if (systems.sensors > 0) { print('Sensors damaged'); return; }
  print(`\n📡 Long-range scan:`);
  for (let dy = -1; dy <= 1; dy++) {
    let line = '';
    for (let dx = -1; dx <= 1; dx++) {
      const y = quadY - 1 + dy, x = quadX - 1 + dx;
      if (y < 0 || y > 7 || x < 0 || x > 7) line += '   ';
      else {
        const q = galaxy[y][x];
        line += `${q.raiders}${q.outpost ? 'O' : '·'}${q.stars} `;
      }
    }
    print(line);
  }
  beep(300, 0.08);
}

function shortScan() {
  if (systems.sensors > 0) { print('Sensors damaged'); return; }
  const q = galaxy[quadY - 1][quadX - 1];
  print(`\n🔍 Short-range scan of quadrant ${quadX},${quadY}`);
  print(`Raiders: ${q.raiders}  Outpost: ${q.outpost ? 'yes' : 'no'}  Stars: ${q.stars}`);
  print(`You are in sector ${secX},${secY}`);
  for (let y = 1; y <= 8; y++) {
    let line = '';
    for (let x = 1; x <= 8; x++) {
      if (x === secX && y === secY) line += '🚀';
      else if (q.raiders > 0 && Math.random() > 0.85) line += '👾';
      else if (q.outpost && Math.random() > 0.9) line += '🛡️';
      else if (Math.random() > 0.92) line += '⭐';
      else line += '· ';
    }
    print(line);
  }
  beep(320, 0.08);
}

function navigate(course, warp) {
  if (systems.warp > 0) { print('Warp engines damaged'); return; }
  if (docked) { print('You must leave the outpost first'); return; }
  if (warp < 0.1 || warp > 8) { print('Warp 0.1–8'); return; }
  const cost = Math.floor(warp * 8 + Math.random() * 5);
  if (energy < cost) { print('Insufficient energy'); return; }
  energy -= cost;
  const rad = (course - 1) * Math.PI / 4;
  secX += Math.round(Math.cos(rad) * warp * 2);
  secY += Math.round(Math.sin(rad) * warp * 2);
  while (secX < 1) { secX += 8; quadX = Math.max(1, quadX - 1); }
  while (secX > 8) { secX -= 8; quadX = Math.min(8, quadX + 1); }
  while (secY < 1) { secY += 8; quadY = Math.max(1, quadY - 1); }
  while (secY > 8) { secY -= 8; quadY = Math.min(8, quadY + 1); }
  date += warp * 0.1;
  timeLeft -= 1;
  docked = false;
  print(`Course ${course}, warp ${warp}… arrived at ${quadX},${quadY} / ${secX},${secY}`);
  beep(180, 0.15);
  const q = galaxy[quadY - 1][quadX - 1];
  if (q.raiders > 0) print(`👾 ${q.raiders} raider(s) in this quadrant!`);
  if (q.outpost) print('🛡️ Outpost in this quadrant. Dock to resupply.');
  if (Math.random() < 0.08) damageRandom();
}

function damageRandom() {
  const keys = Object.keys(systems);
  const sys = keys[Math.floor(Math.random() * keys.length)];
  systems[sys] += 1 + Math.floor(Math.random() * 3);
  print(`⚠️ ${sys} damaged!`);
  beep(120, 0.2, 'sawtooth');
}

function fireBeam(amount) {
  if (systems.beams > 0) { print('Beam weapons damaged'); return; }
  if (energy < amount) { print('Not enough energy'); return; }
  energy -= amount;
  const q = galaxy[quadY - 1][quadX - 1];
  print(`💥 Beams (${amount})`);
  beep(600, 0.1);
  if (q.raiders > 0 && Math.random() > 0.35) {
    q.raiders--;
    print('👾 Raider destroyed!');
    beep(800, 0.15);
    if (q.raiders === 0) print('Quadrant clear.');
  } else print('Miss or no effect.');
  raiderReturnFire();
}

function fireMissile() {
  if (systems.missiles > 0) { print('Missile systems damaged'); return; }
  if (missiles < 1) { print('No missiles'); return; }
  missiles--;
  const q = galaxy[quadY - 1][quadX - 1];
  print('🚀 Missile away');
  beep(400, 0.12);
  if (q.raiders > 0 && Math.random() > 0.25) {
    q.raiders--;
    print('💥 Hit! Raider destroyed!');
    beep(750, 0.18);
  } else print('Miss.');
  raiderReturnFire();
}

function raiderReturnFire() {
  const q = galaxy[quadY - 1][quadX - 1];
  if (q.raiders === 0 || docked) return;
  const hit = 50 + Math.floor(Math.random() * 150) * q.raiders;
  if (shields >= hit) {
    shields -= hit;
    print(`🛡️ Shields absorbed ${hit}`);
    beep(200, 0.08);
  } else {
    const overflow = hit - shields;
    shields = 0;
    energy = Math.max(0, energy - overflow);
    print(`💥 Hit! Shields down, ${overflow} energy lost`);
    beep(100, 0.25, 'sawtooth');
    if (Math.random() < 0.3) damageRandom();
  }
}

function setShields(pct) {
  if (systems.shields > 0) { print('Shields damaged'); return; }
  pct = Math.max(0, Math.min(100, pct));
 

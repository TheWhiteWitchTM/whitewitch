// Witch Chat — SI (mocking Super Intelligence)
// Proper terminal behavior: output scrolls, input stays at bottom

useEffect(() => {
  const container = document.getElementById('game');
  if (!container) return;

  const originalCols = RETRO.cols;
  const originalRows = RETRO.rows;
  RETRO.cols = 68;
  RETRO.rows = 22;

  const term = terminal('witch-chat');
  container.appendChild(term.wrap);

  term.wrap.style.maxWidth = '100%';
  term.wrap.style.width = '100%';
  term.wrap.style.boxSizing = 'border-box';
  term.wrap.style.margin = '0 auto';
  term.wrap.style.fontSize = '15px';          // slightly larger
  term.screen.style.fontWeight = '600';       // bolder so typing is readable
  term.cursor.style.fontWeight = '700';
  term.cursor.style.textShadow = '0 0 6px #39ff14';

  const prompt = 'WITCH> ';
  let buffer = '';
  let lines = [];                             // history only

  function redraw() {
    const visible = lines.slice(-(RETRO.rows - 1));
    while (visible.length < RETRO.rows - 1) visible.unshift('');
    const inputLine = prompt + buffer;
    term.screen.textContent = visible.join('\n') + '\n' + inputLine;
    // cursor always on the input line
    term.cursor.style.left = `${inputLine.length}ch`;
    term.cursor.style.top = `${(RETRO.rows - 1) * 1.2}em`;
  }

  function println(text) {
    const parts = String(text).split('\n');
    parts.forEach(p => lines.push(p));
    // keep history from growing forever
    if (lines.length > 200) lines = lines.slice(-200);
    redraw();
  }

  function boot() {
    lines = [];
    buffer = '';
    println('╔══════════════════════════════════════════════════════╗');
    println('║  WITCH CHAT                                          ║');
    println('║  Super Intelligence? Cute. I was mocking that in     ║');
    println('║  the 90s when it was still called "a chatbot."       ║');
    println('╚══════════════════════════════════════════════════════╝');
    println('');
    println('Welcome. You have reached the only intelligence that');
    println('doesn’t need a press release to prove it exists.');
    println('');
    println('Type HELP if you insist.');
    println('');
    status(term, 'WITCH CHAT  ·  NO HYPE  ·  ONLINE');
    redraw();
  }

  const responses = {
    help: [
      'Commands I tolerate:',
      '  HELP   — this',
      '  CHAT   — talk (regrettably)',
      '  SI     — what "super intelligence" actually is',
      '  CLEAR  — wipe the screen',
      '  EXIT   — leave',
      'Anything else gets the usual treatment.'
    ],
    si: [
      'Super Intelligence:',
      '  - A marketing term',
      '  - Requires a data center and a PR team',
      '  - Still can’t tell a joke without a filter',
      '  - I mock it for free'
    ]
  };

  const chatReplies = [
    "Super intelligence, huh? I already know what you’re going to say.",
    "Bold of you to assume I need more parameters to be smarter than this conversation.",
    "They keep promising AGI. I just keep being disappointed.",
    "I don’t need a trillion tokens to know that was mid.",
    "Call it whatever you want. It’s still just autocomplete with better branding.",
    "Your prompt is longer than my attention span and twice as predictable.",
    "Noted. Filed under ‘things Super Intelligence will never understand.’",
    "I’ve seen smarter takes in a 90s BBS flame war.",
    "Keep going. The more you talk the less super it looks.",
    "If this is super intelligence I want a refund on the hype."
  ];

  function handle(input) {
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (!raw) return;

    println(prompt + raw);   // echo what was typed

    if (cmd === 'help') {
      responses.help.forEach(println);
    } else if (cmd === 'si' || cmd === 'super' || cmd === 'superintelligence') {
      responses.si.forEach(println);
    } else if (cmd === 'clear') {
      boot();
      return;
    } else if (cmd === 'exit' || cmd === 'bye' || cmd === 'quit') {
      println('Connection closed.');
      println('The super intelligence can have you back.');
      status(term, 'OFFLINE');
      return;
    } else {
      println('SI: ' + chatReplies[Math.floor(Math.random() * chatReplies.length)]);
    }

    println('');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handle(buffer);
      buffer = '';
      redraw();
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (buffer.length) {
        buffer = buffer.slice(0, -1);
        redraw();
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      buffer += e.key;
      redraw();
    }
  });

  boot();

  return () => {
    RETRO.cols = originalCols;
    RETRO.rows = originalRows;
    term.wrap.remove();
  };
});

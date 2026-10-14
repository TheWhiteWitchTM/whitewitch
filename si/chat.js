// Witch Chat — SI (mocking Super Intelligence)
// Uses retro.js terminal primitives

useEffect(() => {
  const container = document.getElementById('game');
  if (!container) return;

  // Smaller terminal so it fits the content column
  const originalCols = RETRO.cols;
  const originalRows = RETRO.rows;
  RETRO.cols = 68;
  RETRO.rows = 20;

  const term = terminal('witch-chat');
  container.appendChild(term.wrap);

  // Force it to stay inside the content area
  term.wrap.style.maxWidth = '100%';
  term.wrap.style.width = '100%';
  term.wrap.style.boxSizing = 'border-box';
  term.wrap.style.margin = '0 auto';

  const prompt = 'WITCH> ';
  let buffer = '';

  function print(text, nl = true) {
    write(term, text + (nl ? '\n' : ''));
  }

  function boot() {
    clear(term);
    print('╔══════════════════════════════════════════════════════╗');
    print('║  WITCH CHAT                                          ║');
    print('║  Super Intelligence? Cute. I was mocking that in     ║');
    print('║  the 90s when it was still called "a chatbot."       ║');
    print('╚══════════════════════════════════════════════════════╝');
    print('');
    print('Welcome. You have reached the only intelligence that');
    print('doesn’t need a press release to prove it exists.');
    print('');
    print('Type HELP if you insist.');
    print('');
    write(term, prompt);
    status(term, 'WITCH CHAT  ·  NO HYPE  ·  ONLINE');
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

    if (!raw) {
      write(term, prompt);
      return;
    }

    if (cmd === 'help') {
      responses.help.forEach(l => print(l));
    } else if (cmd === 'si' || cmd === 'super' || cmd === 'superintelligence') {
      responses.si.forEach(l => print(l));
    } else if (cmd === 'clear') {
      RETRO.cols = 68;
      RETRO.rows = 20;
      clear(term);
      boot();
      return;
    } else if (cmd === 'exit' || cmd === 'bye' || cmd === 'quit') {
      print('Connection closed.');
      print('The super intelligence can have you back.');
      status(term, 'OFFLINE');
      return;
    } else {
      print('SI: ' + chatReplies[Math.floor(Math.random() * chatReplies.length)]);
    }

    print('');
    write(term, prompt);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      print(buffer);
      handle(buffer);
      buffer = '';
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (buffer.length) {
        buffer = buffer.slice(0, -1);
        const lines = term.screen.textContent.split('\n');
        lines[lines.length - 1] = prompt + buffer;
        term.screen.textContent = lines.join('\n');
        term.cursor.style.left = `${(prompt + buffer).length}ch`;
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      buffer += e.key;
      write(term, e.key, false);
    }
  });

  boot();

  return () => {
    RETRO.cols = originalCols;
    RETRO.rows = originalRows;
    term.wrap.remove();
  };
});

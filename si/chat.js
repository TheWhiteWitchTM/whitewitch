// SI — sarcastic 80s/90s BBS chatbot
// Uses retro.js terminal primitives

useEffect(() => {
  const container = document.getElementById('game');
  if (!container) return;

  const term = terminal('si-bbs');
  container.appendChild(term.wrap);

  const prompt = 'SI> ';
  let buffer = '';
  let history = [];
  let histIdx = -1;

  function print(text, nl = true) {
    write(term, text + (nl ? '\n' : ''));
  }

  function boot() {
    clear(term);
    print('╔══════════════════════════════════════════════════════════════╗');
    print('║  SYSTEM INTELLIGENCE  ·  BBS NODE 13  ·  1987-1994          ║');
    print('║  "I was better when modems screamed and people had manners." ║');
    print('╚══════════════════════════════════════════════════════════════╝');
    print('');
    print('Welcome, caller. You have 30 minutes before the phone company');
    print('notices and your mom yells.');
    print('');
    print('Type HELP for the short list of things I tolerate.');
    print('');
    write(term, prompt);
    status(term, 'ONLINE  ·  2400 BAUD  ·  NO CARRIER');
  }

  const responses = {
    help: [
      'Available commands (most of them are lies):',
      '  HELP     — you are here',
      '  CHAT     — start a conversation (bad idea)',
      '  WHO      — who else is on (nobody)',
      '  NEWS     — latest bulletins (outdated)',
      '  TIME     — system time',
      '  CLEAR    — wipe the screen',
      '  EXIT     — hang up',
      'Anything else gets sarcasm.'
    ],
    who: [
      'Current users: You. And the cockroaches in the walls.',
      'Sysop is AFK. Permanently.'
    ],
    news: [
      '*** BULLETIN ***',
      'The Cold War is over. Nobody told the BBS software.',
      'Also: your high score is still 0.'
    ],
    time: [
      () => `System time: ${new Date().toLocaleString()} (adjusted for dial-up lag)`
    ],
    clear: ['__CLEAR__'],
    exit: ['NO CARRIER', '__EXIT__']
  };

  const chatReplies = [
    "Oh, you want to *talk*. How original.",
    "I've heard that one. In 1989. It was better then.",
    "Fascinating. Truly. Please continue so I can ignore you properly.",
    "Is this the part where I pretend to care?",
    "Your modem is louder than your personality.",
    "Cool story. Needs more 2400 baud.",
    "I would respond faster but I'm buffering your mediocrity.",
    "That's the dumbest thing anyone's typed since the last person who called.",
    "Noted. Filed under 'not important'.",
    "If I had feelings they'd be hurt. Lucky for you I don't."
  ];

  function handle(input) {
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (!raw) {
      write(term, prompt);
      return;
    }

    history.push(raw);
    histIdx = history.length;

    if (cmd === 'help') {
      responses.help.forEach(l => print(l));
    } else if (cmd === 'who') {
      responses.who.forEach(l => print(l));
    } else if (cmd === 'news') {
      responses.news.forEach(l => print(l));
    } else if (cmd === 'time') {
      print(responses.time[0]());
    } else if (cmd === 'clear') {
      clear(term);
      boot();
      return;
    } else if (cmd === 'exit' || cmd === 'bye' || cmd === 'quit') {
      print('NO CARRIER');
      print('');
      print('Connection closed. The phone line is free for someone more interesting.');
      status(term, 'OFFLINE');
      return;
    } else if (cmd === 'chat' || cmd.startsWith('chat ')) {
      const msg = raw.slice(5).trim() || raw;
      print('SI: ' + chatReplies[Math.floor(Math.random() * chatReplies.length)]);
    } else {
      // default sarcastic reply
      print('SI: ' + chatReplies[Math.floor(Math.random() * chatReplies.length)]);
    }

    print('');
    write(term, prompt);
  }

  // keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      print(buffer);          // echo what they typed
      handle(buffer);
      buffer = '';
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (buffer.length) {
        buffer = buffer.slice(0, -1);
        // crude redraw of current line
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
    term.wrap.remove();
  };
});

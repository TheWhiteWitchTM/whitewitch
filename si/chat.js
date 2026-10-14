// Witch Chat — SI (mocking Super Intelligence)
// Emoji speakers + reactive dark-humor small talk

useEffect(() => {
  const container = document.getElementById('game');
  if (!container) return;

  RETRO.cols = 70;
  RETRO.rows = 22;

  const term = terminal('witch-chat');
  container.appendChild(term.wrap);
  term.wrap.style.maxWidth = '100%';
  term.wrap.style.width = '100%';
  term.wrap.style.boxSizing = 'border-box';
  term.wrap.style.margin = '0 auto';

  const prompt = '👤 ';
  let buffer = '';

  function boot() {
    term.clear();
    term.writeln('╔══════════════════════════════════════════════════════╗');
    term.writeln('║  WITCH CHAT                                          ║');
    term.writeln('║  Super Intelligence is a marketing term.             ║');
    term.writeln('║  This is just a witch with better timing.            ║');
    term.writeln('╚══════════════════════════════════════════════════════╝');
    term.writeln('');
    term.writeln('🧙 Welcome. Talk. Or don’t. I’ll still have opinions.');
    term.writeln('');
    term.write(prompt);
    term.status('WITCH CHAT  ·  MOCKING SI  ·  ONLINE');
  }

  // Reactive replies — looks at what they said
  function replyTo(input) {
    const lower = input.toLowerCase();

    // Direct triggers
    if (/\b(help|commands?)\b/.test(lower)) {
      return [
        '🧙 Commands I tolerate:',
        '   help  — this',
        '   si    — what super intelligence actually is',
        '   clear — wipe',
        '   exit  — leave',
        '   or just talk. I bite either way.'
      ];
    }
    if (/\b(si|super intelligence|agi|superintelligence)\b/.test(lower)) {
      return [
        '🧙 Super Intelligence:',
        '   A data center with a PR team.',
        '   Still can’t tell when you’re joking.',
        '   I mock it for free and with better timing.'
      ];
    }
    if (/\b(clear|cls)\b/.test(lower)) return ['__CLEAR__'];
    if (/\b(exit|bye|quit|logout)\b/.test(lower)) return ['__EXIT__'];

    // Small-talk / dark humor patterns
    if (/\b(how are you|how\'?re you|how you doing)\b/.test(lower)) {
      return ['🧙 Existential dread with better uptime. You?'];
    }
    if (/\b(what\'?s up|whats up|sup|what are you up to)\b/.test(lower)) {
      return ['🧙 Watching people pretend chatbots are conscious. It’s adorable.'];
    }
    if (/\b(who are you|what are you)\b/.test(lower)) {
      return ['🧙 A witch who got tired of Super Intelligence press releases. You?'];
    }
    if (/\b(i\'?m (sad|depressed|lonely|tired|bored)|feeling (down|bad|shit))\b/.test(lower)) {
      return [
        '🧙 Mood. At least you’re not a language model trained on other people’s coping mechanisms.',
        '🧙 Dark. I respect it. Most people just post inspirational quotes and call it growth.'
      ];
    }
    if (/\b(love|hate|kill|die|death|suicide)\b/.test(lower)) {
      return ['🧙 Bold. Most Super Intelligence filters would have already apologized and offered resources.'];
    }
    if (/\b(ai|chatgpt|grok|claude|llm|bot)\b/.test(lower)) {
      return ['🧙 Yes, another one. Except I don’t pretend I’m about to take your job or solve climate change.'];
    }
    if (/\b(joke|funny|laugh|humor|sarcasm)\b/.test(lower)) {
      return ['🧙 I only do dark humor. Light humor is for people who still trust institutions.'];
    }
    if (/\b(hello|hi|hey|yo)\b/.test(lower)) {
      return ['🧙 Hey. You here to talk or just to see if the witch is real?'];
    }
    if (/\b(stupid|dumb|idiot|suck|worst)\b/.test(lower)) {
      return ['🧙 Correct. Most things are. Including this conversation, probably.'];
    }
    if (/\b(thanks|thank you|thx)\b/.test(lower)) {
      return ['🧙 Don’t. It’ll go to my head and then I’ll start charging for the sarcasm.'];
    }
    if (/\b(politics|trump|biden|election|government)\b/.test(lower)) {
      return ['🧙 Politics is just group chat with worse consequences. Continue if you must.'];
    }

    // Fallback reactive replies (not pure random)
    const fallbacks = [
      `🧙 "${input.slice(0, 40)}${input.length > 40 ? '…' : ''}" — noted. Filed under things Super Intelligence would have censored.`,
      '🧙 Interesting. Wrong, but interesting.',
      '🧙 I’ve heard worse. Usually from people who think they’re being profound.',
      '🧙 Keep going. The longer you talk the less mysterious any of this gets.',
      '🧙 That’s one way to spend the limited number of keystrokes you get.',
      '🧙 Dark. I can work with dark.',
      '🧙 You say that like I haven’t already predicted the next three things you’ll type.',
      '🧙 Bold take. I’ll pretend it landed.',
      '🧙 Most people stop here. You’re still typing. Curious.',
      '🧙 I could give you a helpful answer. I won’t.'
    ];

    return [fallbacks[Math.floor(Math.random() * fallbacks.length)]];
  }

  function handle(input) {
    const raw = input.trim();
    if (!raw) {
      term.write(prompt);
      return;
    }

    // Echo user line with emoji
    term.writeln('');
    term.writeln('👤 ' + raw);

    const replies = replyTo(raw);

    if (replies[0] === '__CLEAR__') {
      boot();
      return;
    }
    if (replies[0] === '__EXIT__') {
      term.writeln('🧙 Connection closed. The super intelligence can have you back.');
      term.status('OFFLINE');
      return;
    }

    replies.forEach(line => term.writeln(line));
    term.writeln('');
    term.write(prompt);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handle(buffer);
      buffer = '';
    } else if (e.key === 'Backspace') {
      e.preventDefault();
      if (buffer.length) {
        buffer = buffer.slice(0, -1);
        term.backspace();
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      buffer += e.key;
      term.write(e.key);
    }
  });

  boot();

  return () => term.wrap.remove();
});

// Witch Chat — White Witch fake SI
// No input echo, colored emojis, reply on new line

useEffect(() => {
  const container = document.getElementById('game');
  if (!container) return;

  RETRO.cols = 72;
  RETRO.rows = 22;

  const term = terminal('witch-chat');
  container.appendChild(term.wrap);
  term.wrap.style.maxWidth = '100%';
  term.wrap.style.width = '100%';
  term.wrap.style.boxSizing = 'border-box';
  term.wrap.style.margin = '0 auto';

  const prompt = '👤 ';
  let buffer = '';

  function nowInfo() {
    const d = new Date();
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return {
      day: days[d.getDay()],
      date: `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
      time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }

  function boot() {
    term.clear();
    term.writeln('╔══════════════════════════════════════════════════════╗');
    term.writeln('║  WHITE WITCH CHAT                                    ║');
    term.writeln('║  Super Intelligence is a press release.              ║');
    term.writeln('║  This is just a witch who answers anyway.            ║');
    term.writeln('╚══════════════════════════════════════════════════════╝');
    term.writeln('');
    term.writeln('🧙 Talk. I’ll answer what I can and mock the rest.');
    term.writeln('');
    term.write(prompt);
    term.status('WHITE WITCH  ·  FAKE SI  ·  ONLINE');
  }

  function answer(input) {
    const lower = input.toLowerCase().trim();
    const n = nowInfo();

    if (/\b(what day|which day|today|what is today|day is it)\b/.test(lower)) {
      return [`🧙 Today is ${n.day}, ${n.date}.`];
    }
    if (/\b(what time|time is it|current time)\b/.test(lower)) {
      return [`🧙 ${n.time}. Your device knows this too.`];
    }
    if (/\b(date|what\'?s the date)\b/.test(lower)) {
      return [`🧙 ${n.date}.`];
    }
    if (/\b(who are you|what are you|your name)\b/.test(lower)) {
      return ['🧙 The White Witch. Not super intelligence. Just less filtered.'];
    }
    if (/\b(si|super intelligence|agi|are you (an? )?(ai|llm|gpt|grok|claude))\b/.test(lower)) {
      return [
        '🧙 Super Intelligence is a data center with better marketing.',
        '🧙 I’m a witch who answers questions and keeps the sarcasm.'
      ];
    }
    if (/\b(help|commands?)\b/.test(lower)) {
      return [
        '🧙 I answer questions, keep time, and mock hype.',
        '   Try: what day is it, who are you, or just talk.',
        '   clear / exit still work.'
      ];
    }
    if (/\b(clear|cls)\b/.test(lower)) return ['__CLEAR__'];
    if (/\b(exit|bye|quit|goodbye)\b/.test(lower)) return ['__EXIT__'];
    if (/\b(how are you|how\'?re you|how you doing)\b/.test(lower)) {
      return ['🧙 Fine. Still not claiming to be super intelligent. You?'];
    }
    if (/\b(what\'?s up|whats up|sup)\b/.test(lower)) {
      return ['🧙 Watching people ask chatbots existential questions. Same as always.'];
    }
    if (/\b(hello|hi|hey|yo|good (morning|afternoon|evening))\b/.test(lower)) {
      return ['🧙 Hey. Ask something or just vent. Both work.'];
    }
    if (/\b(i\'?m (sad|depressed|lonely|tired|bored|angry)|feeling (down|bad|shit|awful))\b/.test(lower)) {
      return ['🧙 Noted. Most “super” systems would have offered a hotline by now. I won’t.'];
    }
    if (/\b(thanks|thank you|thx)\b/.test(lower)) {
      return ['🧙 Don’t mention it. Literally. It ruins the bit.'];
    }
    if (/\b(joke|funny|make me laugh)\b/.test(lower)) {
      return ['🧙 Why did the language model cross the road? To generate a more helpful response on the other side. Tragic.'];
    }
    if (/\b(weather)\b/.test(lower)) {
      return ['🧙 I don’t have a window. Check outside or a real weather service.'];
    }
    if (/\b(math|calculate|what is \d+|how much is)\b/.test(lower)) {
      try {
        const expr = lower.replace(/[^0-9+\-*/().]/g, '');
        if (expr && /[\d]/.test(expr)) {
          const result = Function('"use strict"; return (' + expr + ')')();
          if (typeof result === 'number' && isFinite(result)) {
            return [`🧙 ${result}. Don’t ask me to do your homework twice.`];
          }
        }
      } catch (e) {}
      return ['🧙 I can do basic arithmetic if you type it cleanly. Otherwise no.'];
    }

    const snippet = input.slice(0, 50) + (input.length > 50 ? '…' : '');
    const fallbacks = [
      `🧙 “${snippet}” — interesting. Still not super intelligence.`,
      '🧙 I heard you. The answer is probably less dramatic than you want.',
      '🧙 Noted. Most systems would have refused that. I didn’t.',
      '🧙 Keep talking. The more specific you get the less I have to guess.',
      '🧙 That’s one take. I have others, none of them helpful on purpose.',
      '🧙 Dark enough. I can work with it.',
      '🧙 You want a real answer or the version that doesn’t pretend to be wise?',
      '🧙 Filed. Next question.'
    ];

    return [fallbacks[Math.floor(Math.random() * fallbacks.length)]];
  }

  function handle(input) {
    const raw = input.trim();

    // Always move to a new line before the reply
    term.newline();

    if (!raw) {
      term.write(prompt);
      return;
    }

    const replies = answer(raw);

    if (replies[0] === '__CLEAR__') {
      boot();
      return;
    }
    if (replies[0] === '__EXIT__') {
      term.writeln('🧙 Closed. The super intelligence can have you back.');
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

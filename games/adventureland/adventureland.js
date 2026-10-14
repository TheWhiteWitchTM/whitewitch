useEffect(() => {
  const container = document.getElementById('game');
  if (!container) return;

  const term = new Terminal({ border: '#39ff14' });
  container.appendChild(term.wrap);
  term.wrap.focus();

  // ---- Game data (same as before) ----
  const rooms = {
    forest: {
      name: "Forest",
      desc: "You are in a dark forest. Paths lead in several directions.",
      exits: { e: "meadow", n: "forest", s: "forest", w: "forest" },
      objects: []
    },
    meadow: {
      name: "Sunny Meadow",
      desc: "You are in a sunny meadow. A large sleeping dragon lies here.",
      exits: { e: "shore", w: "forest" },
      objects: ["dragon"]
    },
    shore: {
      name: "Lake Shore",
      desc: "You are on the shore of a large lake.",
      exits: { w: "meadow", n: "bog", s: "swamp" },
      objects: ["axe"]
    },
    bog: {
      name: "Quicksand Bog",
      desc: "You are in a quicksand bog. It is dangerous here.",
      exits: { s: "shore" },
      objects: ["ox"]
    },
    swamp: {
      name: "Dismal Swamp",
      desc: "You are in a dismal swamp.",
      exits: { n: "shore", w: "grove", e: "trees" },
      objects: []
    },
    grove: {
      name: "Hidden Grove",
      desc: "You are in a hidden grove.",
      exits: { e: "swamp" },
      objects: []
    },
    trees: {
      name: "Tall Trees",
      desc: "You are among tall trees. One looks climbable.",
      exits: { w: "swamp", u: "tree" },
      objects: ["mud"]
    },
    tree: {
      name: "Top of Tree",
      desc: "You are at the top of a large cypress tree. There is a spider web here.",
      exits: { d: "trees" },
      objects: ["keys"]
    },
    stump: {
      name: "Hollow Stump",
      desc: "You are inside a hollow stump. This is a good place to store treasures.",
      exits: { u: "trees", d: "root" },
      objects: ["lamp", "bottle"]
    },
    root: {
      name: "Root Chamber",
      desc: "You are in a root chamber under the stump.",
      exits: { u: "stump", d: "hole" },
      objects: ["rubies"]
    },
    hole: {
      name: "Bottomless Hole",
      desc: "You are at the edge of a bottomless hole.",
      exits: { u: "root", d: "hallway" },
      objects: ["flint"]
    },
    hallway: {
      name: "Hallway",
      desc: "You are in a hallway. A locked door is here.",
      exits: { u: "hole", d: "cavern" },
      objects: [],
      locked: true
    },
    cavern: {
      name: "Large Cavern",
      desc: "You are in a large cavern.",
      exits: { u: "hallway", n: "bees", s: "anteroom" },
      objects: []
    },
    bees: {
      name: "Beehive",
      desc: "You are in a beehive. Bees are buzzing around.",
      exits: { s: "cavern" },
      objects: ["honey", "bees"]
    },
    anteroom: {
      name: "Royal Anteroom",
      desc: "You are in a royal anteroom.",
      exits: { n: "cavern", u: "chamber" },
      objects: ["bladder"]
    },
    chamber: {
      name: "Royal Chamber",
      desc: "You are in the royal chamber. A bricked-up window is here.",
      exits: { d: "anteroom" },
      objects: []
    }
  };

  const objects = {
    axe:   { name: "axe",  desc: "a rusty axe", treasure: false },
    ox:    { name: "ox",   desc: "a large blue ox", treasure: true },
    lamp:  { name: "lamp", desc: "a brass lamp", treasure: false },
    keys:  { name: "keys", desc: "a set of keys", treasure: false },
    rubies:{ name: "rubies", desc: "a pot of rubies", treasure: true },
    bottle:{ name: "bottle", desc: "an empty bottle", treasure: false },
    mud:   { name: "mud",  desc: "some evil-smelling mud", treasure: false },
    flint: { name: "flint", desc: "flint and steel", treasure: false },
    honey: { name: "honey", desc: "royal honey", treasure: true },
    bees:  { name: "bees", desc: "a swarm of bees", treasure: false },
    bladder:{ name: "bladder", desc: "an empty wine bladder", treasure: false },
    dragon:{ name: "dragon", desc: "a sleeping dragon", treasure: false, static: true }
  };

  let current = "forest";
  let inventory = [];
  let score = 0;
  let treasures = 0;
  let inputBuffer = "";

  function print(text, color = 2) {
    term.setFg(color);
    term.writeln(text);
    term.resetAttr();
  }

  function look() {
    const room = rooms[current];
    term.clear();
    print(`=== ${room.name.toUpperCase()} ===`, 10);
    print(room.desc, 2);

    const here = room.objects.filter(id => objects[id] && !objects[id].static);
    if (here.length) {
      print("You see:", 7);
      here.forEach(id => {
        const obj = objects[id];
        print(`  ${obj.desc}${obj.treasure ? " *" : ""}`, obj.treasure ? 11 : 7);
      });
    }

    const exits = Object.keys(room.exits).map(d => d.toUpperCase()).join(", ");
    print(`Exits: ${exits}`, 6);
    print(`Score: ${score}/100   Treasures: ${treasures}/13`, 3);
    term.writeln("");
    term.write("> ");
    inputBuffer = "";
  }

  function get(id) {
    const room = rooms[current];
    const idx = room.objects.indexOf(id);
    if (idx === -1) return print("You don't see that here.");
    if (objects[id].static) return print("You can't take that.");
    room.objects.splice(idx, 1);
    inventory.push(id);
    if (objects[id].treasure) {
      score += 7;
      treasures++;
    }
    print(`You take the ${objects[id].name}.`);
  }

  function drop(id) {
    const idx = inventory.indexOf(id);
    if (idx === -1) return print("You aren't carrying that.");
    inventory.splice(idx, 1);
    rooms[current].objects.push(id);
    if (objects[id].treasure && current === "stump") score += 3;
    print(`You drop the ${objects[id].name}.`);
  }

  function handle(input) {
    const parts = input.trim().toLowerCase().split(/\s+/);
    const verb = parts[0];
    const noun = parts[1];

    if (!verb) return;

    if (verb === "look" || verb === "l") return look();
    if (verb === "inventory" || verb === "i") {
      if (!inventory.length) return print("You are carrying nothing.");
      print("You are carrying:");
      inventory.forEach(id => print(`  ${objects[id].desc}`));
      return;
    }
    if (verb === "score") return print(`Your score is ${score} out of 100.`);
    if (verb === "quit" || verb === "exit") {
      print("Thanks for playing Adventureland!");
      return;
    }

    if (verb === "go" || ["n","s","e","w","u","d"].includes(verb)) {
      const dir = verb === "go" ? noun : verb;
      const room = rooms[current];
      if (!room.exits[dir]) return print("You can't go that way.");
      if (room.locked && dir === "d") return print("The door is locked.");
      current = room.exits[dir];
      return look();
    }

    if (verb === "get" || verb === "take") {
      if (!noun) return print("Get what?");
      const id = Object.keys(objects).find(k => objects[k].name.includes(noun) || k === noun);
      if (!id) return print("I don't see that.");
      return get(id);
    }

    if (verb === "drop") {
      if (!noun) return print("Drop what?");
      const id = inventory.find(k => objects[k].name.includes(noun) || k === noun);
      if (!id) return print("You aren't carrying that.");
      return drop(id);
    }

    if (verb === "say" && noun === "bunyon") {
      if (inventory.includes("axe") && current === "bog") {
        print("A voice booms: 'BUNYON!' The ox and axe vanish!");
        rooms.grove.objects.push("ox", "axe");
        inventory = inventory.filter(i => i !== "axe");
        rooms.bog.objects = rooms.bog.objects.filter(i => i !== "ox");
      } else print("Nothing happens.");
      return;
    }

    if (verb === "rub" && noun === "lamp") {
      if (inventory.includes("lamp")) {
        print("A genie appears and drops a diamond ring!");
        rooms[current].objects.push("ring");
        objects.ring = { name: "ring", desc: "a diamond ring", treasure: true };
      } else print("You don't have the lamp.");
      return;
    }

    if (verb === "unlock" && noun === "door") {
      if (inventory.includes("keys") && current === "hallway") {
        rooms.hallway.locked = false;
        print("The door unlocks.");
      } else print("You can't do that.");
      return;
    }

    print("I don't understand.");
  }

  // Game owns the keyboard completely
  function onKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      term.writeln("");
      handle(inputBuffer);
      inputBuffer = "";
      term.write("> ");
    } else if (e.key === "Backspace") {
      e.preventDefault();
      if (inputBuffer.length) {
        inputBuffer = inputBuffer.slice(0, -1);
        term.write("\b");
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      inputBuffer += e.key;
      term.write(e.key);
    }
  }

  term.wrap.addEventListener("keydown", onKey);

  // Boot
  term.clear();
  print("WELCOME TO ADVENTURELAND", 10);
  print("A faithful clone of Scott Adams' classic (1978)", 2);
  print("Type commands like: GO EAST, GET AXE, LOOK, INVENTORY", 7);
  print("");
  look();

  return () => {
    term.wrap.removeEventListener("keydown", onKey);
    term.destroy();
  };
});

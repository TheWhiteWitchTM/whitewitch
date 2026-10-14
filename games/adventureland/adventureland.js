function showHelp() {
  print("Available commands:", 7);
  print("  LOOK / L          - describe the room", 2);
  print("  INVENTORY / I     - show what you're carrying", 2);
  print("  GO <dir>          - move (N S E W U D or just the letter)", 2);
  print("  GET / TAKE <item> - pick something up", 2);
  print("  DROP <item>       - drop something", 2);
  print("  SAY BUNYON        - magic word (when you have the axe)", 2);
  print("  RUB LAMP          - summon the genie", 2);
  print("  UNLOCK DOOR       - if you have the keys", 2);
  print("  SCORE             - current score", 2);
  print("  HELP              - this list", 2);
  print("  QUIT / EXIT       - leave the game", 2);
  print("");
  print("Directions can also be typed alone: N, S, E, W, U, D", 6);
}

function handle(input) {
  const parts = input.trim().toLowerCase().split(/\s+/);
  const verb = parts[0];
  const noun = parts[1];

  if (!verb) return;

  if (verb === "help" || verb === "?") return showHelp();
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

  print("I don't understand. Type HELP for commands.");
}

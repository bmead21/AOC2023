import { Console, clear, log } from "console";

class Module {
  constructor(name, type, outputs) {
    this.name = name;
    this.type = type;
    this.outputs = outputs;
    if (type == "%") {
      this.memory = "off";
    } else {
      this.memory = {};
    }
  }
  toString() {
    let outputsStr = this.outputs.join(",");
    return (
      this.name +
      "{type=" +
      this.type +
      ",outputs=" +
      outputsStr +
      ",memory=" +
      JSON.stringify(this.memory) +
      "}"
    );
  }
}

import fs from "fs";

let modules = {};
let broadcast_targets = [];

let input = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\r\n")
  .map((line) => {
    const [left, right] = line.split(" -> ");
    const outputs = right.split(", ");
    if (left == "broadcaster") {
      broadcast_targets = outputs;
    } else {
      const type = left[0];
      const name = left.slice(1);

      modules[name] = new Module(name, type, outputs);
    }
  });

// console.log(input);

// console.log(broadcast_targets);
// console.log(modules);

function partOne(modules, broadcast_targets) {
  console.log(modules);
  for (const [name, module] of Object.entries(modules)) {
    // console.log(name, module);
    for (const output of module.outputs) {
      // console.log(name, output);
      // console.log(modules[output]);
      if (modules[output] && modules[output].type == "&") {
        // console.log(modules[output].memory);
        modules[output].memory[name] = "lo";
      }
    }
  }

  console.log(modules);

  let lo = 0,
    hi = 0;
  // console.log(lo, hi);

  for (let i = 1; i <= 1000; i++) {
    lo++;
    let q = [];
    // console.log(broadcast_targets);
    for (const x of broadcast_targets) {
      q.push(["broadcaster", x, "lo"]);
    }
    // console.log(q);
    while (q.length > 0) {
      const [origin, target, pulse] = q.shift();
      // console.log("origin, target, pulse");
      // console.log(origin, target, pulse);
      pulse == "lo" ? lo++ : hi++;

      if (!(target in modules)) {
        // console.log("continuing");
        continue;
      }
      // console.log("not continuing");
      let module = modules[target];
      // console.log(module);
      if (module.type == "%" && pulse == "lo") {
        module.memory == "off"
          ? (module.memory = "on")
          : (module.memory = "off");
        const outgoing = module.memory == "on" ? "hi" : "lo";
        // console.log(module.outputs);
        module.outputs.forEach((x) => {
          // console.log("pushing to q");
          // console.log(module.outputs);
          // console.log(module.name, x, outgoing);
          q.push([module.name, x, outgoing]);
          // console.log(q);
        });
      }

      if (module.type == "&") {
        module.memory[origin] = pulse;
        const outgoing = Object.values(module.memory).every((x) => x == "hi")
          ? "lo"
          : "hi";
        module.outputs.forEach((x) => {
          q.push([module.name, x, outgoing]);
        });
      }
    }
  }
  // console.log(lo);
  // console.log(hi);
  return lo * hi;
}

function partTwo(modules, broadcast_targets) {
  // console.log(modules);
  for (const [name, module] of Object.entries(modules)) {
    // console.log(name, module);
    for (const output of module.outputs) {
      // console.log(name, output);
      // console.log(modules[output]);
      if (modules[output] && modules[output].type == "&") {
        // console.log(modules[output].memory);
        modules[output].memory[name] = "lo";
      }
    }
  }

  // console.log(modules);

  let lo = 0,
    hi = 0;
  // console.log(lo, hi);

  let feed;
  for (const [name, module] of Object.entries(modules)) {
    if (module.outputs.includes("rx")) {
      feed = name;
      break; // Assuming you only need the first match
    }
  }

  console.log(feed);

  let cycle_lengths = {};

  let seen = {};

  for (const [name, module] of Object.entries(modules)) {
    if (module.outputs.includes(feed)) {
      seen[name] = 0;
    }
  }
  console.log(seen);

  let presses = 0;

  while (true) {
    presses++;
    lo++;
    let q = [];
    // console.log(broadcast_targets);
    for (const x of broadcast_targets) {
      q.push(["broadcaster", x, "lo"]);
    }
    // console.log(q);
    while (q.length > 0) {
      const [origin, target, pulse] = q.shift();
      // console.log("origin, target, pulse");
      // console.log(origin, target, pulse);
      pulse == "lo" ? lo++ : hi++;

      if (!(target in modules)) {
        // console.log("continuing");
        continue;
      }

      // console.log("not continuing");
      let module = modules[target];

      if (module.name === feed && pulse === "hi") {
        seen[origin] = (seen[origin] || 0) + 1;

        if (!(origin in cycle_lengths)) {
          cycle_lengths[origin] = presses;
        } else {
          if (presses !== seen[origin] * cycle_lengths[origin]) {
            throw new Error("Assertion failed");
          }
        }

        if (Object.values(seen).every((val) => val)) {
          let x = 1;
          for (const cycle_length of Object.values(cycle_lengths)) {
            x = lcm(x, cycle_length);
          }
          return x;
          process.exit(0);
        }
      }

      function gcd(a, b) {
        while (b !== 0) {
          let t = b;
          b = a % b;
          a = t;
        }
        return a;
      }

      function lcm(a, b) {
        return (a * b) / gcd(a, b);
      }

      // console.log(module);
      if (module.type == "%" && pulse == "lo") {
        module.memory == "off"
          ? (module.memory = "on")
          : (module.memory = "off");
        const outgoing = module.memory == "on" ? "hi" : "lo";
        // console.log(module.outputs);
        module.outputs.forEach((x) => {
          // console.log("pushing to q");
          // console.log(module.outputs);
          // console.log(module.name, x, outgoing);
          q.push([module.name, x, outgoing]);
          // console.log(q);
        });
      }

      if (module.type == "&") {
        module.memory[origin] = pulse;
        const outgoing = Object.values(module.memory).every((x) => x == "hi")
          ? "lo"
          : "hi";
        module.outputs.forEach((x) => {
          q.push([module.name, x, outgoing]);
        });
      }
    }
  }
  // console.log(lo);
  // console.log(hi);
  return lo * hi;
}
console.log(`Part 1: ${partOne(modules, broadcast_targets)}`);

console.log(`Part 2: ${partTwo(modules, broadcast_targets)}`);

import { Console, clear, log } from "console";

import fs from "fs";

let input = fs.readFileSync("./input.txt", "utf-8").trim().split("\r\n\r\n");
let workflows = {};
input[0].split("\r\n").map((w) => {
  const [name, inst] = w.slice(0, -1).split("{");
  const rules = inst.split(",");

  workflows[name] = [[], rules.pop()];
  rules.forEach((rule) => {
    const [comparison, target] = rule.split(":");
    // console.log(comparison);
    // console.log(target);
    const key = comparison[0];
    const cmp = comparison[1];
    const n = parseInt(comparison.slice(2));
    // console.log(key);
    // console.log(cmp);
    // console.log(n);

    workflows[name][0].push([key, cmp, n, target]);
  });
});

let total = 0;

let parts = input[1].split("\r\n").map((part) => {
  const item = {};

  for (let seg of part.slice(1, -1).split(",")) {
    const [ch, n] = seg.split("=");
    item[ch] = parseInt(n);
  }
  // console.log(item);
  if (accept(item)) {
    // console.log(item);
    total += item.x + item.m + item.a + item.s;
  }
});

function accept(item, name = "in") {
  if (name == "R") {
    // console.log(`Returned R for ${item}`);
    return false;
  }
  if (name == "A") {
    // console.log(`Returned A for ${item}`);
    return true;
  }

  const [rules, fallback] = workflows[name];
  // console.log("rules");
  // console.log(rules);
  for (let [key, cmp, n, target] of rules) {
    // console.log(key, cmp, n, target);
    // console.log(
    //   `${`${item[key]} ${cmp} ${n}`} is ` +
    //     eval(`${item[key]} ${cmp} ${n}`) +
    //     ` Moving to ${target}`
    // );
    if (eval(`${item[key]}${cmp}${n}`)) {
      // console.log(`Eval true.  Moving to ${target}`);
      return accept(item, target);
    }
  }
  return accept(item, fallback);
}

console.log(total);

console.log(workflows["in"]);

function partOne() {}

function partTwo() {
  // function acceptUhOh(item, name = "in") {
  //   if (name == "R") {
  //     console.log(`Returned R for ${item}`);
  //     return false;
  //   }
  //   if (name == "A") {
  //     console.log(`Returned A for ${item}`);
  //     return true;
  //   }

  //   const [rules, fallback] = workflows[name];
  //   console.log("reules");
  //   console.log(rules);
  //   for (let [key, cmp, n, target] of rules) {
  //     console.log(key, cmp, n, target);
  //     console.log(item[key]);
  //     console.log(
  //       `${`${item[key]} ${cmp} ${n}`} is ` +
  //         eval(`${item[key]} ${cmp} ${n}`) +
  //         ` Moving to ${target}`
  //     );
  //     if (eval(`${item[key]}${cmp}${n}`)) {
  //       console.log(`Eval true.  Moving to ${target}`);
  //       return accept(item, target);
  //     }
  //   }
  //   return accept(item, fallback);
  // }
  // let count = 0;
  // for (let x = 1; x <= 4000; x++) {
  //   for (let m = 1; m <= 4000; m++) {
  //     for (let a = 1; a <= 4000; a++) {
  //       for (let s = 1; s <= 4000; s++) {
  //         let item = { x: x, m: m, a: a, s: s };
  //         if (acceptUhOh(item)) {
  //           count++;
  //         }
  //       }
  //     }
  //   }
  // }

  const result = [..."xmas"].reduce(
    (acc, key) => ({ ...acc, [key]: [1, 4000] }),
    {}
  );
  console.log(result);
  return count(result);

  // console.log("codes");
}

function count(ranges, name = "in") {
  if (name == "R") {
    return 0;
  }
  if (name == "A") {
    let product = 1;
    console.log(ranges);
    for (const [lo, hi] of Object.values(ranges)) {
      product *= hi - lo + 1;
    }
    return product;
  }
  const [rules, fallback] = workflows[name];

  let total = 0;
  let found = false;
  for (let [key, cmp, n, target] of rules) {
    let T, F;
    console.log(key, cmp, n, target);
    const [lo, hi] = ranges[key];
    if (cmp == "<") {
      console.log("***<****");
      T = [lo, n - 1];
      F = [n, hi];
      console.log(T);
      console.log(F);
    } else {
      console.log("***>=****");
      T = [n + 1, hi];
      F = [lo, n];
    }
    if (T[0] <= T[1]) {
      let copy = { ...ranges };
      copy[key] = T;
      total += count(copy, target);
    }
    if (F[0] <= F[1]) {
      ranges = { ...ranges };
      ranges[key] = F;
    } else {
      break;
    }
  }

  if (!found) {
    total += count(ranges, fallback);
  }
  return total;
}
console.log(`Part 1: ${partOne()}`);

console.log(`Part 2: ${partTwo()}`);

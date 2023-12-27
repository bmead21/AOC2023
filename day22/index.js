import { Console, clear, log } from "console";

import fs from "fs";
import { Heap } from "heap-js";

let bricks = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\r\n")
  .map((x) => x.replace("~", ","))
  .map((y) => y.split(","))
  .map((z) => z.map((v) => parseInt(v)));

bricks = bricks.sort((a, b) => {
  if (a[2] > b[2]) return 1;
  if (a[2] < b[2]) return -1;
  return 0;
});
console.log(bricks);

function overlaps(a, b) {
  return (
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) &&
    Math.max(a[1], b[1]) <= Math.min(a[4], b[4])
  );
}

function partOne() {
  for (let index = 0; index < bricks.length; index++) {
    let brick = bricks[index];
    let max_z = 1;

    for (let i = 0; i < index; i++) {
      let check = bricks[i];
      if (overlaps(brick, check)) {
        max_z = Math.max(max_z, check[5] + 1);
      }
    }

    brick[5] -= brick[2] - max_z;
    brick[2] = max_z;
  }

  bricks = bricks.sort((a, b) => {
    if (a[2] > b[2]) return 1;
    if (a[2] < b[2]) return -1;
    return 0;
  });
  console.log(bricks);

  // Assuming bricks is an array of objects or arrays and overlaps is a defined function
  let k_supports_v = {};
  let v_supports_k = {};

  for (let i = 0; i < bricks.length; i++) {
    k_supports_v[i] = new Set();
    v_supports_k[i] = new Set();
  }

  for (let j = 0; j < bricks.length; j++) {
    let upper = bricks[j];

    for (let i = 0; i < j; i++) {
      let lower = bricks[i];

      if (overlaps(lower, upper) && upper[2] === lower[5] + 1) {
        k_supports_v[i].add(j);
        v_supports_k[j].add(i);
      }
    }
  }

  let total = 0;

  for (let i = 0; i < bricks.length; i++) {
    if (Array.from(k_supports_v[i]).every((j) => v_supports_k[j].size >= 2)) {
      total += 1;
    }
  }

  // total now holds the final count
  return total;
}
function partTwo() {
  // return result;
}

console.log(`Part 1: ${partOne()}`);

console.log(`Part 2: ${partTwo()}`);

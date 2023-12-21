import { Console, clear, log } from "console";

import fs from "fs";
import { Heap } from "heap-js";

let grid = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\r\n")
  .map((x) => x.split(""));
let sr;
let sc;
for (let y = 0; y < grid.length - 1; y++) {
  for (let x = 0; x < grid[0].length - 1; x++) {
    if (grid[y][x] == "S") {
      sr = y;
      sc = x;
    }
  }
}

function fill(sr, sc, ss) {
  let ans = new Set();
  // ans.add(`${startY},${startX}`);
  let seen = new Set();
  seen.add(`${sr},${sc}`);
  const q = [];
  q.push([sr, sc, ss]);

  // console.log(ans);
  // console.log(seen);
  // console.log(q);
  // console.log(!q.isEmpty());
  while (q.length > 0) {
    // console.log("in while loop");
    const [r, c, s] = q.shift();
    // console.log(r, c, s);
    // console.log(s % 2 == 0);
    if (s % 2 == 0) {
      ans.add(`${r},${c}`);
    }
    if (s == 0) {
      continue;
    }
    for (const [nr, nc] of [
      [r + 1, c],
      [r - 1, c],
      [r, c + 1],
      [r, c - 1],
    ]) {
      // console.log(nr, nc);
      // console.log(seen);
      // console.log(seen.has(`${nr},${nc}`));
      // console.log(grid.length);
      // console.log(grid[0].length);
      if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[0].length) {
        // console.log("Out of Bounds");
        continue;
      }

      if (grid[nr][nc] == "#") {
        // console.log("Invalid space = #");
        continue;
      }

      if (seen.has(`${nr},${nc}`)) {
        // console.log("Already seen");
        continue;
      }
      // console.log(`${nr},${nc}`);
      seen.add(`${nr},${nc}`);
      q.push([nr, nc, s - 1]);
    }
  }

  return ans.size;
}

function partOne() {
  return fill(sr, sc, 64);
}
function partTwo() {
  const size = grid.length;

  const steps = 26501365;

  const grid_width = Math.floor(steps / size) - 1;

  const odd = (Math.floor(grid_width / 2) * 2 + 1) ** 2;

  const even = (Math.floor((grid_width + 1) / 2) * 2) ** 2;

  const odd_points = fill(sr, sc, size * 2 + 1);
  const even_points = fill(sr, sc, size * 2);

  console.log(odd, even);
  console.log(odd_points, even_points);

  const corner_t = fill(size - 1, sc, size - 1);
  const corner_r = fill(sr, 0, size - 1);
  const corner_b = fill(0, sc, size - 1);
  const corner_l = fill(sr, size - 1, size - 1);

  const small_tr = fill(size - 1, 0, Math.floor(size / 2) - 1);
  const small_tl = fill(size - 1, size - 1, Math.floor(size / 2) - 1);
  const small_br = fill(0, 0, Math.floor(size / 2) - 1);
  const small_bl = fill(0, size - 1, Math.floor(size / 2) - 1);

  const large_tr = fill(size - 1, 0, Math.floor((size * 3) / 2) - 1);
  const large_tl = fill(size - 1, size - 1, Math.floor((size * 3) / 2) - 1);
  const large_br = fill(0, 0, Math.floor((size * 3) / 2) - 1);
  const large_bl = fill(0, size - 1, Math.floor((size * 3) / 2) - 1);

  let result =
    odd * odd_points +
    even * even_points +
    corner_t +
    corner_r +
    corner_b +
    corner_l +
    (grid_width + 1) * (small_tr + small_tl + small_br + small_bl) +
    grid_width * (large_tr + large_tl + large_br + large_bl);

  return result;
}

console.log(`Part 1: ${partOne()}`);

console.log(`Part 2: ${partTwo()}`);

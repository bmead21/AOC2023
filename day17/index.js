import { Console, log } from "console";
import { Heap } from "heap-js";

import fs from "fs";

let grid = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((row) => [...row].map(Number));

grid.map((x) => console.log(x));

function partOne() {
  let seen = new Set();

  const DIR = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const pq = new Heap((a, b) => a[0] - b[0]);
  
  
  pq.init([[0, 0, 0, 0, 0, 0]]);

  while (!pq.isEmpty()) {
    const [hl, //heat loss
      r,  // row
      c,  // column
      dr, // row direction
      dc,  // column direction
      n]   // number of steps
      = pq.pop();
   

    if (r == grid.length - 1 && c == grid[0].length - 1 && n >=4) {
      // console.log(hl);
      // console.log(seen);
      // console.log(hl, r, c, dr, dc, n)
      // console.log(pq);
      return hl;
    }

    // console.log(r, c)
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
      // console.log("Out of Bounds") 
      // console.log(hl, r, c, dr, dc, n)
      continue;
    }

    if (seen.has(`${r},${c},${dr},${dc},${n}`)) {
      // console.log("Already in Seen")
      continue;
    }
    seen.add(`${r},${c},${dr},${dc},${n}`);

    // console.log(seen);

    if (n <10 && !(dr === 0 && dc === 0)) {
      // console.log("first push hit")
      // console.log(hl, r, c, dr, dc, n)
      let nr = r + dr;
      let nc = c + dc;

      if (0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0].length) {
        pq.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1]);
      }
    }
    if (n>=4 || (dr== 0  && dc == 0)) {
    for (const [ndr, ndc] of DIR) {
      // console.log("second push hit")
      // console.log(hl, r, c, dr, dc, n)
      if ((ndr != dr || ndc != dc) && (ndr != -dr || ndc != -dc)) {
         
        let nr = r + ndr;
        let nc = c + ndc;
        if (0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0].length) {
          pq.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1]);}
        }
      }
    }
  }
}

function partTwo() {}
console.log(`Part 1: ${partOne()}`);

console.log(`Part 2: ${partTwo()}`);

import { Heap } from "heap-js";
import fs from "fs";

const parse = (input) =>
  fs
    .readFileSync("./example.txt", "utf-8")
    .split("\n")
    .map((row) => [...row].map(Number));

// prettier-ignore
const DIR = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const [E, S] = [1, 2];

const BFS = (condition) => (grid) => {
  const visited = new Map();
  const [tx, ty] = [grid[0].length - 1, grid.length - 1];
  const queue = [
    [0, 0, [0, 0], E, 0],
    [0, 0, [0, 0], S, 0],
  ];
  while (queue.length) {
    const [, energy, [cx, cy], ch, cs] = queue.pop();
    if (cx === tx && cy === ty && condition(cs, cs)) {
      console.log(energy);
      return energy;
    }
    DIR.map((d, h) => [d, h, h === ch ? cs + 1 : 1])
      .map(([[dx, dy], ...rest]) => [[cx + dx, cy + dy], ...rest])
      .filter(([[x, y], h]) => grid[y]?.[x] && (h + 2) % 4 !== ch)
      .filter(([, , steps]) => condition(cs, steps))
      .map(([[x, y], h, steps]) => [energy + grid[y][x], [x, y], h, steps])
      .filter(
        ([e, [x, y], h, steps]) =>
          (visited.get((y << 16) | (x << 8) | (h << 4) | steps) ?? Infinity) >
            e && visited.set((y << 16) | (x << 8) | (h << 4) | steps, e)
      )
      .forEach(([e, p, h, steps]) =>
        queue.push([e + (tx - p[0]) + (ty - p[1]), e, p, h, steps])
      );
  }
  return -1;
};

// export const part1 = pipe(
//   parse,
//   BFS((_, steps) => steps < 4)
// );

// export const part2 = pipe(
//   parse,
//   BFS((prevSteps, steps) => (steps > prevSteps || prevSteps >= 4) && steps < 11)
// );

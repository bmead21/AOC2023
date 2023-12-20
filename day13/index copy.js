import { Console, log } from "console";
import fs from "fs";

function transpose(matrix) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function diff(a, b) {
  return a.filter((c, i) => c !== b[i]).length;
}
function partOne(file) {
  let patterns = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\r\n\r\n")
    .map((x) => x.split("\r\n").map((l) => l.split("")));

  let part = 0;
  let d, I, J, j;
  return patterns
    .map((grid) => [grid, transpose(grid)])
    .map((grids) => {
      console.log(grids);
      return grids.map((grid) => {
        (d = 0), (I = 0), (J = 0);
        for (let i = 0.5; i < grid.length; i++) {
          (j = 0.5), (d = 0);
          while (true) {
            if (i - j < 0 || i + j >= grid.length) break;
            d += diff(grid[i - j], grid[i + j]);
            if (d > part) break;
            j++;
          }
          if (j > 0.5 && (i - j === -1 || i + j === grid.length) && d === part)
            (I = i + 0.5), (J = j);
        }
        return I;
      });
    })
    .reduce((acc, cur) => acc + cur[0] * 100 + cur[1], 0);
}

function partTwo(file) {
  let lines = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\r\n")
    .map((x) => x.split(""));
  // console.log("Part 2 Start");
  // console.log(lines);
  // console.log(lines.length);
}

console.log(`Part 1: ${partOne("./example.txt")}`);
console.log(`Part 2: ${partTwo("./example.txt")}`);

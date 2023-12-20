import { Console, log } from "console";
import fs from "fs";

function transpose(matrix) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function partOne(file) {
  let lines = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\r\n")
    .map((x) => x.split(" "))
    .map((y) => {
      let l = y[0];
      let d = y[1].split(",");
      return [
        l,
        d.sort((a, b) => {
          return b - a;
        }),
      ];
    });

  lines.map((x) => console.log(x));
}

function partTwo(file) {
  let lines = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\r\n")
    .map((x) => x.split(" "));
}

function findExtras(x1, x2, arr) {
  let count = 0;
  let minNum = Math.min(x1, x2);
  let maxNum = Math.max(x1, x2);
  arr.map((x) => {
    if (minNum < x && x < maxNum) {
      count++;
    }
  });
  return count * 999999;
}

console.log(`Part 1: ${partOne("./example.txt")}`);
console.log(`Part 2: ${partTwo("./example.txt")}`);

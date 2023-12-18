import { Console, log } from "console";
import fs from "fs";
import utils from "utils"

function parseFile(file) {
  let lines = fs
  .readFileSync(file, "utf-8")
  .trim()
  .split("\n")
  .map((x) => x.split(" "));
}

function transpose(matrix) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function partOne(file) {
  let lines = parseFile("/.example.txt")
  console.log(lines);
  // console.log(lines.length);
 
}

function partTwo(file) {
  let lines = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\n")
    .map((x) => x.split(""));
  // console.log(lines);
  // console.log(lines.length);
 
}


console.log(`Part 1: ${partOne("./example.txt")}`);
console.log(`Part 2: ${partTwo("./example.txt")}`);

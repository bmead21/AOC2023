import { Console, log } from "console";

import fs from "fs";

let plan = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\r\n")
  .slice(0);
// .map((x) => x.split(""));

plan.map((x) => console.log(x));

function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

function rotate(matrix) {
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let row = matrix.map((e) => e[i]).reverse();
    result.push(row);
  }
  return result;
}

function calcHash(code) {
  let curTotal = 0;
  for (let i = 0; i < code.length; i++) {
    curTotal = ((curTotal + code.charCodeAt(i)) * 17) % 256;
  }
  // console.log(curTotal);
  return curTotal;
  // console.log(code);
}

function findNewPos(curPos, dir, steps) {
  let newPos;
  // console.log("findnewPos");
  switch (dir) {
    case "R":
      newPos = [curPos[0], curPos[1] + steps];
      break;
    case "L":
      newPos = [curPos[0], curPos[1] - steps];
      break;
    case "U":
      newPos = [curPos[0] - steps, curPos[1]];
      break;
    case "D":
      newPos = [curPos[0] + steps, curPos[1]];
      break;
  }

  // console.log(curPos, dir, steps, newPos);
  return newPos;
}

function trench(curPos, newPos) {
  let yStart = Math.min(curPos[0], newPos[0]);
  let yEnd = Math.max(curPos[0], newPos[0]);
  let xStart = Math.min(curPos[1], newPos[1]);
  let xEnd = Math.max(curPos[1], newPos[1]);
  // console.log("trench");
  // console.log(yStart, yEnd, xStart, xEnd);
  if (xStart == xEnd) {
    // console.log("digging on y");
    for (let y = yStart; y <= yEnd; y++) {
      dug.add(`${y},${xStart}`);
      digMap.set(`${y},${xStart}`, "#");
    }
  }
  if (yStart == yEnd) {
    // console.log("digging on x");
    for (let x = xStart; x <= xEnd; x++) {
      dug.add(`${yStart},${x}`);
      digMap.set(`${yStart},${x}`, "#");
    }
  }
}

const x = [];
const y = [];
let X = 0;
let Y = 0;
let len = 0;

function partOne() {
  plan = plan.map((item) => {
    let tempdir = item.split("#")[1].charAt(5);
    let steps = parseInt(item.split("#")[1].slice(0, 5), 16);
    let dir;
    switch (tempdir) {
      case "0":
        dir = "R";
        break;
      case "1":
        dir = "D";
        break;
      case "2":
        dir = "L";
        break;
      case "3":
        dir = "U";
        break;
    }
    return [dir, steps];
  });

  plan.forEach((inst) => {
    console.log(inst);
    const [dir, steps] = inst;

    const numSteps = parseInt(steps, 10);
    len += numSteps;

    for (let i = 0; i < numSteps; i++) {
      switch (dir) {
        case "U":
          Y--;
          break;
        case "R":
          X++;
          break;
        case "D":
          Y++;
          break;
        case "L":
          X--;
          break;
      }
    }
    x.push(X);
    y.push(Y);
  });

  let area = getArea(x, y);

  return len + (area + 1 - len / 2);
}

function getArea(x, y) {
  let area = 0;
  let sum = 0;
  for (let i = 0; i < x.length - 1; i++) {
    console.log(i);
    sum += x[i] * y[i + 1] - x[i + 1] * y[i];
  }
  area = sum / 2;
  return Math.abs(area);
}

// let curPos = [0, 0];
// dug.add(`${curPos[0]},${curPos[1]}`);
// // console.log(dug);
// for (let i = 0; i < plan.length; i++) {
//   let newPos = findNewPos(curPos, plan[i].dir, plan[i].dist);
//   console.log(curPos, newPos, i);
//   trench(curPos, newPos);

//   curPos = newPos;
// }
// // console.log(dug);
// trenchGrid();
// fillGrid();

// grid.map((x) => console.log(x.join().replaceAll(",", "")));

// let lava = 0;

// grid.map((y) => {
//   y.map((x) => {
//     if (x == "#") {
//       lava++;
//     }
//   });
// });
// return lava;

function isTrenched(pos) {
  console.log(pos);
  console.log(grid);
  let leftT = false;
  let rightT = false;
  for (let x = pos[1]; x >= 0; x--) {
    if (grid[pos[0]][x] == "#") {
      leftT = true;
    }
  }
  for (let x = pos[1]; x <= grid[pos[0]].length; x++) {
    if (grid[pos[0]][x] == "#") {
      rightT = true;
    }
  }
  return leftT && rightT;
}

function fillGrid() {
  for (let y = 0; y < grid.length - 1; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (isTrenched([y, x])) {
        grid[y][x] = "#";
      }
    }
  }
}

let xShift;
let yShift;

function trenchGrid() {
  console.log("start showGrid");
  let maxY = 0;
  let maxX = 0;
  let minY = 0;
  let minX = 0;
  let dugArr = Array.from(dug);
  // console.log(dugArr);
  dugArr.forEach((val) => {
    maxY =
      parseInt(val.split(",")[0]) > maxY ? parseInt(val.split(",")[0]) : maxY;
    maxX =
      parseInt(val.split(",")[1]) > maxX ? parseInt(val.split(",")[1]) : maxX;
    minY =
      parseInt(val.split(",")[0]) < minY ? parseInt(val.split(",")[0]) : minY;
    minX =
      parseInt(val.split(",")[1]) < minX ? parseInt(val.split(",")[1]) : minX;
  });
  console.log(minY, maxY, minX, minY);

  yShift = maxY - minY;
  xShift = maxX - minX;

  console.log(yShift, xShift);

  for (let y = minY; y <= maxY; y++) {
    grid.push(Array(xShift + 1).fill("."));
  }

  let gridCoord = dugArr.map((item) => [
    parseInt(item.split(",")[0]) + yShift,
    parseInt(item.split(",")[1]) + xShift,
  ]);

  console.log(gridCoord);
  // gridCoord.forEach((pos) => (grid[pos[0]][pos[1]] = "#"));
  // // console.log(grid);
  // grid.map((x) => console.log(x.join().replaceAll(",", "")));
}

function partTwo() {
  // console.log("codes");
}
console.log(`Part 1: ${partOne()}`);

console.log(`Part 2: ${partTwo()}`);

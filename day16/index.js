import { Console, log } from "console";

import fs from "fs";

let grid = fs.readFileSync("./example.txt", "utf-8").trim().split("\r\n");
grid = grid.map((g) => g.replaceAll("\\", "7").split(""));
// console.log(grid);
// .map((x) => x.split(""));

grid.map((x) => console.log(x));
// console.log(grid.length);
// console.log(grid[0].length);

let topBound = 0;
let leftBound = 0;
let bottomBound = grid.length - 1;
let rightBound = grid[0].length - 1;

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

function partOne() {
  function createNewBeam(y, x, d) {
    if (
      (y == topBound && d == "u") ||
      (y == bottomBound && d == "d") ||
      (x == leftBound && d == "l") ||
      (x == rightBound && d == "r")
    ) {
      console.log("Create Beam Skipped due to Boundary");
      return;
    }
    if (y >= 0 && x >= 0) {
      if (gridTrackArr.includes(`${y},${x},${d}`)) {
        console.log("Duplicate Found");
        return;
      }
      beams.push({ y: y, x: x, d: d });
      console.log(`new beam created at y: ${y} x: ${x} d: ${d}`);
    }
    console.log(beams);
  }
  function findNext(beam) {
    // if (beam.d === "u") beam.y--;
    // if (beam.d === "d") beam.y++;
    // if (beam.d === "l") beam.x--;
    // if (beam.d === "r") beam.x++;

    let nextPos;
    console.log(`findNext for ${JSON.stringify(beam)}`);
    // console.log(grid.length);
    if (
      (beam.y == 0 && beam.d == "u") ||
      (beam.y > grid.length - 2 && beam.d == "d") ||
      (beam.x == 0 && beam.d == "l") ||
      (beam.x > grid[0].length - 2 && beam.d == "r")
    ) {
      return { y: -1, x: -1, d: "x" };
    }
    switch (beam.d) {
      case "r":
        nextPos = grid[beam.y][beam.x + 1];
        if (nextPos == "." || nextPos == "-") {
          return { y: beam.y, x: beam.x + 1, d: beam.d };
        }
        if (nextPos == "/") {
          return { y: beam.y, x: beam.x + 1, d: "u" };
        }
        if (nextPos == "7") {
          return { y: beam.y, x: beam.x + 1, d: "d" };
        }
        if (nextPos == "|") {
          console.log("Splitting in 2");
          console.log(` y: ${beam.y} x: ${beam.x + 1}`);
          createNewBeam(beam.y, beam.x + 1, "u");
          return { y: beam.y, x: beam.x + 1, d: "d" };
        }
        break;
      case "l":
        nextPos = grid[beam.y][beam.x - 1];
        if (nextPos == "." || nextPos == "-") {
          return { y: beam.y, x: beam.x - 1, d: beam.d };
        }
        if (nextPos == "/") {
          return { y: beam.y, x: beam.x - 1, d: "d" };
        }
        if (nextPos == "7") {
          return { y: beam.y, x: beam.x - 1, d: "u" };
        }
        if (nextPos == "|") {
          console.log("Splitting in 2");
          console.log(` y: ${beam.y} x: ${beam.x - 1}`);
          createNewBeam(beam.y, beam.x - 1, "d");
          return { y: beam.y, x: beam.x - 1, d: "u" };
        }
        break;
      case "u":
        nextPos = grid[beam.y - 1][beam.x];

        if (nextPos == "." || nextPos == "|") {
          return { y: beam.y - 1, x: beam.x, d: beam.d };
        }
        if (nextPos == "/") {
          return { y: beam.y - 1, x: beam.x, d: "r" };
        }
        if (nextPos == "7") {
          return { y: beam.y - 1, x: beam.x, d: "l" };
        }
        if (nextPos == "-") {
          console.log("Splitting in 2");
          console.log(` y: ${beam.y - 1} x: ${beam.x}`);
          createNewBeam(beam.y - 1, beam.x, "r");
          return { y: beam.y - 1, x: beam.x, d: "l" };
        }
        break;
      case "d":
        nextPos = grid[beam.y + 1][beam.x];
        if (nextPos == "." || nextPos == "|") {
          return { y: beam.y + 1, x: beam.x, d: beam.d };
        }
        if (nextPos == "/") {
          return { y: beam.y + 1, x: beam.x, d: "l" };
        }
        if (nextPos == "7") {
          return { y: beam.y + 1, x: beam.x, d: "r" };
        }
        if (nextPos == "-") {
          console.log("Splitting in 2");
          console.log(` y: ${beam.y + 1} x: ${beam.x}`);
          createNewBeam(beam.y + 1, beam.x, "r");
          return { y: beam.y + 1, x: beam.x, d: "l" };
        }
        break;
    }
  }
  function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  }
  let gridTrackSet = new Set();
  let gridTrackArr = [];
  let beams = [{ y: 0, x: 0, d: "r" }];
  gridTrackSet.add(`${beams[0].y},${beams[0].x}`);
  gridTrackArr.push(`${beams[0].y},${beams[0].x},${beams[0].d}`);

  while (beams.length > 0) {
    console.log(" ");
    console.log(`New loop started for ${beams.length} beams`);

    for (let i = 0; i < beams.length; i++) {
      // console.log(grid);
      let curBeam = beams[i];
      console.log(curBeam);
      // console.log(findNextD(curBeam));
      // if (
      //   curBeam.y < topBound ||
      //   curBeam.y > bottomBound ||
      //   curBeam.x < leftBound ||
      //   curBeam.x > rightBound
      // )
      //   break;
      while (
        beams[i].y < bottomBound &&
        beams[i].y >= 0 &&
        beams[i].x >= 0 &&
        beams[i].x < rightBound
      ) {
        console.log(`${curBeam.y},${curBeam.x},${curBeam.d}`);

        let nextBeam = findNext(beams[i]);
        if (gridTrackArr.includes(`${nextBeam.y},${nextBeam.x},${nextBeam.d}`))
          break;

        if (
          nextBeam.y < topBound ||
          nextBeam.y > bottomBound ||
          nextBeam.x < leftBound ||
          nextBeam.x > rightBound
        )
          break;
        gridTrackSet.add(`${nextBeam.y},${nextBeam.x}`);
        gridTrackArr.push(`${nextBeam.y},${nextBeam.x},${nextBeam.d}`);

        console.log(
          `Moving from ${JSON.stringify(beams[i])} to ${JSON.stringify(
            nextBeam
          )}`
        );
        beams[i] = nextBeam;
        // console.log(beams[i]);
        console.log(beams);
        beams = beams.filter((item) => item.x >= 0 && item.y >= 0);
        console.log(beams);
        gridTrackArr = gridTrackArr.filter((item) => item[0] != "-");
        gridTrackSet.delete("-1,-1");
        console.log(gridTrackArr);
        console.log(
          !gridTrackArr.includes(`${nextBeam.y},${nextBeam.x},${nextBeam.d}`)
        );
        let newBeams = beams.map((item) =>
          console.log(`${item.y},${item.x},${item.d}`)
        );

        beams = newBeams;

        console.log(newBeams);
        // console.clear()
      }
    }

    // console.log(beams);

    // grid.map((x) => console.log(x));

    console.log(gridTrackSet);
    console.log(gridTrackArr);

    // beamsCreated.map((x) => console.log(x));
  }
  return gridTrackSet.size;
}

function partTwo() {
  // console.log("codes");
}
console.log(`Part 1: ${partOne()}`);

console.log(`Part 2: ${partTwo()}`);

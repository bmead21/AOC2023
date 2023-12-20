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
    .map((x) => x.split(""));
  // console.log(lines);
  // console.log(lines.length);

  let blankLines = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].every((x) => x == ".")) {
      blankLines.push(i);
      i++;
    }
  }

  // console.log(blankLines);

  let linesInserted = 0;

  blankLines.forEach((i) => {
    lines.splice(i + linesInserted, 0, lines[i + linesInserted]);
    linesInserted++;
  });

  // console.log(
  //   "************************************************************************************************************************"
  // );
  // console.log(lines.length);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].every((x) => x == ".")) {
      // console.log(`Blank line at ${i}`);
    }
  }

  // console.log(lines);
  let transpLines = transpose(lines);

  // console.log(transpLines);
  blankLines = [];

  for (let i = 0; i < transpLines.length; i++) {
    if (transpLines[i].every((x) => x == ".")) {
      // console.log(`Blank line at ${i}`);
      blankLines.push(i);
      i++;
    }
  }

  // console.log(blankLines);

  linesInserted = 0;

  blankLines.forEach((i) => {
    transpLines.splice(i + linesInserted, 0, transpLines[i + linesInserted]);
    linesInserted++;
  });

  // console.log(transpLines);
  for (let i = 0; i < transpLines.length; i++) {
    if (transpLines[i].every((x) => x == ".")) {
      // console.log(`Blank transposed line at ${i}`);
    }
  }
  // console.log("grid inc");
  let grid = transpose(transpLines);
  // grid.map((x) => console.log(x.join().replaceAll(",", "")));

  let glxCount = 0;
  let glxMap = [];

  let newGrid = grid.map((x, i) => {
    return x.map((v, ii) => {
      if (v == "#") {
        glxCount++;
        glxMap.push({ glxNum: glxCount, pos: [i, ii] });
        return glxCount;
      } else {
        return v;
      }
    });
  });

  // newGrid.map((x) => console.log(x.join().replaceAll(",", "")));

  // console.log(glxMap);

  let pairsCount = 0;
  let totDist = 0;
  for (let i = 0; i < glxMap.length - 1; i++) {
    for (let g = i; g < glxMap.length - 1; g++) {
      let dist =
        Math.abs(glxMap[g + 1].pos[0] - glxMap[i].pos[0]) +
        Math.abs(glxMap[g + 1].pos[1] - glxMap[i].pos[1]);
      totDist += dist;
    }
  }
  // console.log(totDist);
  // console.log(pairsCount);

  return totDist;
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

  let blankLines = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].every((x) => x == ".")) {
      blankLines.push(i);
      i++;
    }
  }

  // console.log(blankLines);

  // let linesInserted = 0;

  // blankLines.forEach((i) => {
  //   lines.splice(i + linesInserted, 0, lines[i + linesInserted]);
  //   linesInserted++;
  // });

  // console.log(
  //   "************************************************************************************************************************"
  // );

  // console.log(lines);
  let transpLines = transpose(lines);

  // console.log(transpLines);
  let blankCols = [];

  for (let i = 0; i < transpLines.length; i++) {
    if (transpLines[i].every((x) => x == ".")) {
      // console.log(`Blank col at ${i}`);
      blankCols.push(i);
      i++;
    }
  }

  let glxCount = 0;
  let glxMap = [];

  let newGrid = lines.map((x, i) => {
    return x.map((v, ii) => {
      if (v == "#") {
        glxCount++;
        glxMap.push({ glxNum: glxCount, pos: [i, ii] });
        return glxCount;
      } else {
        return v;
      }
    });
  });

  let pairsCount = 0;
  let totDist = 0;
  for (let i = 0; i < glxMap.length - 1; i++) {
    for (let g = i; g < glxMap.length - 1; g++) {
      let ydist = Math.abs(glxMap[g + 1].pos[0] - glxMap[i].pos[0]);
      let xdist = Math.abs(glxMap[g + 1].pos[1] - glxMap[i].pos[1]);

      // console.log(ydist);
      // console.log(xdist);

      let extraY = findExtras(
        glxMap[g + 1].pos[0],
        glxMap[i].pos[0],
        blankLines
      );
      let extraX = findExtras(
        glxMap[g + 1].pos[1],
        glxMap[i].pos[1],
        blankCols
      );

      // console.log(extraY);
      // console.log(extraX);

      let dist = ydist + xdist + extraX + extraY;
      // console.log(`${glxMap[i].glxNum} => ${glxMap[g + 1].glxNum} = ${dist}`);
      totDist += dist;
      pairsCount++;
    }
  }
  // console.log(totDist);
  // console.log(pairsCount);
  // console.log(blankLines);
  // console.log(blankCols);

  return totDist;
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

console.log(`Part 1: ${partOne("./input.txt")}`);
console.log(`Part 2: ${partTwo("./input.txt")}`);

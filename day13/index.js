import { Console, log } from "console";
import fs from "fs";

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

// function diffCount(a, b) {
//   let diff = 0;
//   for (row = 0; row < a.length; row++) {
//     for (col = 0; col < a[0].length; col++) {
//       if (a[row].charAt(col) != b[row].charAt(col)) {
//         diff++;
//       }
//     }
//   }
//   return diff;
// }

function findMirror(grid) {
  grid.map((x) => console.log(x.join("")));
  console.log(grid.length);
  let totDiffCount = 0;
  for (let r = 1; r < grid.length; r++) {
    console.log("******************* begin for loop");
    console.log(`R is ${r}`);
    let above = grid.slice(0, r).reverse();
    let below = grid.slice(r);

    // above.map((x) => console.log(x.join("")));
    // console.log("------------------------------------------------------------");
    // below.map((x) => console.log(x.join("")));
    // console.log(
    //   "**********************let's pop*****************************************"
    // );

    above.length > below.length
      ? (above = above.slice(0, below.length))
      : (below = below.slice(0, above.length));

    // above.map((x) => console.log(x.join("")));
    // console.log("------------------------------------------------------------");
    // below.map((x) => console.log(x.join("")));
    // console.log(
    //   "***************************************************************"
    // );
    // console.log(JSON.stringify(above) === JSON.stringify(below));
    let diffCount = 0;
    for (let r = 0; r < above.length; r++) {
      for (let c = 0; c < above[r].length; c++) {
        if (above[r][c] != below[r][c]) {
          diffCount++;
        }
      }
      totDiffCount += diffCount;
    }
    console.log(`Diffcount: ${diffCount}`);
    if (diffCount == 1) {
      console.log("it's a hit");
      console.log(r);
      return r;
    }
  }
  return 0;
}
function partOne(file) {
  let patterns = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\r\n\r\n")
    .map((x) => x.split("\r\n").map((y) => y.split("")));
  let total = 0;
  console.log("patterns");
  // console.log(patterns);

  patterns.forEach((patt) => {
    // console.log("patt");
    // console.log(patt);
    // // console.log(findMirror(patt));
    total += findMirror(patt) * 100;
    let pattT = transpose(patt);
    // console.log("pattT");
    // pattT.map((x) => console.log(x.join("")));
    // console.log(findMirror(pattT));
    total += findMirror(pattT);
  });
  return total;
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

console.log(`Part 1: ${partOne("./input.txt")}`);

// console.log(                 TEST WORKS
//   findMirror(
//     transpose(
//       ["AFFAE", "BGGBJ", "CHHCI", "DIIDE", "EJJEO"].map((x) => x.split(""))
//     )
//   )
// );

// rotate([
//   "#...###.#..#...",
//   "#....#...###..#",
//   "#.##.###..###..",
//   "#########.#.##.",
//   ".#..#.##.###...",
//   ".#..#.##.###...",
//   "#########.#.##.",
// ]).map((x) => console.log(x.join("")));

console.log(`Part 2: ${partTwo("./example.txt")}`);

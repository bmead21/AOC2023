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

function calcHash(code) {
  let curTotal = 0;
  for (let i = 0; i < code.length; i++) {
    curTotal = ((curTotal + code.charCodeAt(i)) * 17) % 256;
  }
  // console.log(curTotal);
  return curTotal;
  // console.log(code);
}

function partOne(file) {
  let codes = fs.readFileSync(file, "utf-8").trim().split(",");
  let total = 0;
  // console.log(codes);

  codes.map((code) => (total += calcHash(code)));

  return total;
}

function partTwo(file) {
  let codes = fs.readFileSync(file, "utf-8").trim().split(",");
  let total = 0;
  let boxArr = [];
  // console.log("codes");
  for (let i = 0; i < 256; i++) {
    boxArr.push([]);
  }
  // console.log(boxArr);
  // boxArr[0].content.push("rn 1");
  for (let i = 0; i < codes.length; i++) {
    let curCode = codes[i];
    // console.log(curCode);
    if (curCode.includes("-")) {
      let boxNum = calcHash(curCode.split("-")[0]);
      let lens = curCode.split("-")[0];
      // console.log("****------*******");
      // console.log(boxNum);
      // console.log(lens);

      let boxIndex = boxArr[boxNum].findIndex((el) => el[0] == lens);
      // console.log(boxIndex);
      if (boxIndex != -1) {
        // console.log(`Removing ${lens} from Box ${boxNum} at Index ${boxIndex}`);
        boxArr[boxNum] = boxArr[boxNum].filter((item) => item[0] != lens);
      }
    }

    if (curCode.includes("=")) {
      let boxNum = calcHash(curCode.split("=")[0]);
      let lens = curCode.split("=")[0];
      let focLen = parseInt(curCode.split("=")[1]);
      // console.log(boxNum);
      // console.log(lens);

      let boxIndex = boxArr[boxNum].findIndex((el) => el[0] == lens);

      if (boxIndex == -1) {
        boxArr[boxNum].push([lens, focLen]);
      } else {
        boxArr[boxNum][boxIndex] = [lens, focLen];
      }
    }
  }
  // console.log(boxArr.length);
  for (let b = 0; b < boxArr.length; b++) {
    for (let c = 0; c < boxArr[b].length; c++) {
      // console.log(boxArr[b][c][1]);
      total += (b + 1) * (c + 1) * boxArr[b][c][1];
    }
  }

  return total;
}
console.log(`Part 1: ${partOne("./input.txt")}`);

console.log(`Part 2: ${partTwo("./input.txt")}`);

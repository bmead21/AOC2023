import fs from "fs";

function allZero(arr) {
  return arr[arr.length - 1].every((item) => item == 0);
}
function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");
  let totsum = 0;
  lines.forEach((line) => {
    line = line.split(" ").map((x) => parseInt(x));

    let lineArr = [line];
    // console.log(allZero(lineArr));

    while (!allZero(lineArr)) {
      let nextLine = [];
      for (let i = 1; i < lineArr[lineArr.length - 1].length; i++) {
        nextLine.push(
          lineArr[lineArr.length - 1][i] - lineArr[lineArr.length - 1][i - 1]
        );
      }
      lineArr.push(nextLine);
    }

    lineArr[lineArr.length - 1].push(0);
    for (let i = lineArr.length - 2; i >= 0; i--) {
      lineArr[i].push(
        lineArr[i][lineArr[i].length - 1] +
          lineArr[i + 1][lineArr[i + 1].length - 1]
      );
    }

    totsum += lineArr[0][lineArr[0].length - 1];
  });
  return totsum;
}

function partTwo(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");
  let totsum = 0;
  lines.forEach((line) => {
    line = line.split(" ").map((x) => parseInt(x));

    let lineArr = [line];
    // console.log(allZero(lineArr));

    while (!allZero(lineArr)) {
      let nextLine = [];
      for (let i = 1; i < lineArr[lineArr.length - 1].length; i++) {
        nextLine.push(
          lineArr[lineArr.length - 1][i] - lineArr[lineArr.length - 1][i - 1]
        );
      }
      lineArr.push(nextLine);
    }

    lineArr[lineArr.length - 1].unshift(0);

    // console.log(lineArr);
    for (let i = lineArr.length - 2; i >= 0; i--) {
      lineArr[i].unshift(lineArr[i][0] - lineArr[i + 1][0]);
    }
    // console.log(lineArr);
    totsum += lineArr[0][0];
  });
  return totsum;
}

console.log(`Part 1: ${partOne("./input.txt")}`);
console.log(`Part 1: ${partTwo("./input.txt")}`);

// console.log(
//   allZero([
//     [0, 3, 6, 9, 12, 15],
//     [3, 3, 3, 3, 3, 3],
//     [0, 0, 0, 0],
//   ])
// );

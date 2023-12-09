import fs from "fs";

function getCharByMap(line, ch, arr) {
  return arr[line][ch];
}

function isNumeric(s) {
  return !isNaN(s - parseFloat(s));
}

// function isNumericAtPos(x, y) {
//     if (!((0 <= x < numLines) && (0 <= y < lineLength))) {
//         return false
//     }

//     return !isNaN(s - parseFloat(s));
// }

function partOne(file) {
  let total = 0;
  let totalGears = 0;

  const lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");

  console.log(lines);
  //   console.log(lines.length);

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    let numbers = [];
    let match;
    let pattern = /\d+/g;

    let gears = [];
    let gearsMatch;
    let gearPattern = /\*/g;

    while ((match = pattern.exec(lines[lineIndex])) !== null) {
      numbers.push({
        line: lineIndex,
        start: match.index,
        end: pattern.lastIndex,
        number: match[0],
      });
    }

    while ((gearsMatch = gearPattern.exec(lines[lineIndex])) !== null) {
      gears.push({
        gearline: lineIndex,
        pos: gearsMatch.index,
        ch: gearsMatch[0],
      });
    }
    console.log(gears);
    console.log(numbers);

    for (let number of numbers) {
      let partOfSum = false;

      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = number.start - 1; x <= number.end; x++) {
          if (
            y >= 0 &&
            y < lines.length &&
            x >= 0 &&
            lines[lineIndex].length > x
          ) {
            if (isNaN(parseInt(lines[y][x])) && lines[y][x] != ".") {
              partOfSum = true;
            }
          }
        }
      }
      if (partOfSum) {
        total += parseInt(number.number);
      }
    }
  }

  for (let gear of gears) {
    let countOfParts = 0;
    let partOfGears = true;

    for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
      for (let x = gear.start - 1; x <= gear.end; x++) {
        if (
          y >= 0 &&
          y < lines.length &&
          x >= 0 &&
          lines[lineIndex].length > x
        ) {
        }
      }
      if (partOfGears) {
        totalGears += parseInt(gears.gear);
      }
    }
  }
  console.log(total);
  console.log(totalGears);
  return total;
}

function partTwo(file) {
  let total = 0;

  const lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");

  console.log(lines);
  //   console.log(lines.length);
  let map = [];
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    let numbers = [];
    let match;
    let pattern = /\d+/g;

    while ((match = pattern.exec(lines[lineIndex])) !== null) {
      numbers.push({
        line: lineIndex,
        start: match.index,
        end: pattern.lastIndex - 1,
        number: match[0],
      });
    }

    for (let number of numbers) {
      let partOfSum = false;

      for (let y = lineIndex - 1; y <= lineIndex + 1; y++) {
        for (let x = number.start - 1; x <= number.end + 1; x++) {
          if (
            y >= 0 &&
            y < lines.length &&
            x >= 0 &&
            lines[lineIndex].length > x
          ) {
            if (lines[y][x] == "*") {
              map.push({ x, y, number: parseInt(number.number) });
            }
          }
        }
      }
    }
  }

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      let selected = map.filter((el) => el.x == x && el.y == y);
      if (selected.length == 2) {
        let nums = selected.map((el) => el.number);
        total += nums[0] * nums[1];
      }
    }
  }

  console.log(total);
  // console.log(totalGears);
  return total;
}

partTwo("./day3data.txt");

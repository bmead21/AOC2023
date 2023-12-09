import fs from "fs";
let answerB = -1;
try {
  const input = fs.readFileSync("./day5input.txt", "utf8") + "\r\n"; //hack to add new lines to end to trigger output cal at end of loop
  const lines = input.split("\r\n");
  const seeds = lines[0].match(/\d+/g);
  let maxSeed = 0;
  let seedRange = [];
  for (let a = 0; a < seeds.length; a += 2) {
    let seedStart = seeds[a] * 1;
    let seedSize = seeds[a + 1] * 1;
    let seedEnd = seedStart + seedSize - 1;
    seedRange.push({ start: seedStart, end: seedEnd });
    maxSeed = Math.max(maxSeed, seedEnd);
  }
  console.log({ seedRange, maxSeed });

  //now work from location 0 to something huge like maxSeed
  for (let i = 0; i <= maxSeed; i++) {
    if (i % 100000 == 0) console.log("Checking next range", i);
    //work backwards through the mapings
    let output = -1;
    let input = i;
    for (let row = lines.length - 1; row >= 1; row--) {
      const line = lines[row];
      if (line.trim() == "") {
        if (output == -1) output = input;
        //console.log(`${input} ==> ${output}`);
        input = output;
        output = -1;
      } else {
        if (line.indexOf(":") != -1) {
          //console.log(line);
        } else if (output == -1) {
          const bits = line.match(/\d+/g);
          if (input >= bits[0] * 1 && input < bits[0] * 1 + bits[2] * 1) {
            output = input + bits[1] * 1 - bits[0] * 1;
          }
        }
      }
    }
    //console.log({i,input});
    let found = false;
    seedRange.forEach((sr) => {
      if (input >= sr.start && input <= sr.end) {
        found = true;
      }
    });
    if (found) {
      answerB = i;
      break;
    }
  }
} catch (e) {
  console.error(e);
}

console.log("The answer to part 2 is:", answerB);

//11554135

import fs from "fs";

function mapXtoY(mapping, X) {
  let Y = -1;
  //   console.log(mapping);
  for (const row of mapping) {
    // console.log(row);
    let [dest, source, range] = row.split(" ").map(Number);
    // console.log(dest, source, range);
    if (X >= source && X <= source + range) {
      Y = dest - source + X;
      break;
    }
  }
  return Y == -1 ? X : Y;
}
function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n\r\n");
  //   console.log(lines);

  let seeds = lines[0]
    .split("seeds: ")
    .filter((x) => x)[0]
    .split(" ")
    .map((x) => parseInt(x.trim()));

  //   console.log(seeds);

  let [, ...seedToSoil] = lines[1].split("\r\n");
  let [, ...soilToFertilizer] = lines[2].split("\r\n");
  let [, ...fertilizerToWater] = lines[3].split("\r\n");
  let [, ...waterToLight] = lines[4].split("\r\n");
  let [, ...lightToTemp] = lines[5].split("\r\n");
  let [, ...tempToHumid] = lines[6].split("\r\n");
  let [, ...humidToLoc] = lines[7].split("\r\n");

  //   console.log(seedToSoil);

  let result = seeds
    .map((n) => mapXtoY(seedToSoil, n))
    .map((n) => mapXtoY(soilToFertilizer, n))
    .map((n) => mapXtoY(fertilizerToWater, n))
    .map((n) => mapXtoY(waterToLight, n))
    .map((n) => mapXtoY(lightToTemp, n))
    .map((n) => mapXtoY(tempToHumid, n))
    .map((n) => mapXtoY(humidToLoc, n));

  //   console.log(Math.min(...result));
}

function partTwo(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n\r\n");
  let lowest = 99999999999;
  //   console.log(lines);

  let seeds = lines[0]
    .split("seeds: ")
    .filter((x) => x)[0]
    .split(" ")
    .map((x) => parseInt(x.trim()));

  //   console.log(seeds);
  //   console.log(seeds[0]);

  let seedRangeCount = seeds.length;
  //   console.log(seedRangeCount);

  let newSeeds = [];
  let seedRanges = [];
  for (let seedIndex = 0; seedIndex < seedRangeCount; seedIndex += 2) {
    newSeeds.push([seeds[seedIndex], seeds[seedIndex + 1]]);
  }
  console.log(newSeeds);

  let [, ...seedToSoil] = lines[1].split("\r\n");
  let [, ...soilToFertilizer] = lines[2].split("\r\n");
  let [, ...fertilizerToWater] = lines[3].split("\r\n");
  let [, ...waterToLight] = lines[4].split("\r\n");
  let [, ...lightToTemp] = lines[5].split("\r\n");
  let [, ...tempToHumid] = lines[6].split("\r\n");
  let [, ...humidToLoc] = lines[7].split("\r\n");

  let lowestperbatch = [];

  for (let seedRngIndex = 0; seedRngIndex < newSeeds.length; seedRngIndex++) {
    console.log(newSeeds[seedRngIndex]);

    for (
      let rngIndex = newSeeds[seedRngIndex][0];
      rngIndex <= newSeeds[seedRngIndex][0] + newSeeds[seedRngIndex][1];
      rngIndex++
    ) {
      let curSeedbatch = [];
      curSeedbatch.push(rngIndex);
      //   console.log(curSeedbatch);
      //   console.log(curSeedbatch);
      let result = curSeedbatch
        .map((n) => mapXtoY(seedToSoil, n))
        .map((n) => mapXtoY(soilToFertilizer, n))
        .map((n) => mapXtoY(fertilizerToWater, n))
        .map((n) => mapXtoY(waterToLight, n))
        .map((n) => mapXtoY(lightToTemp, n))
        .map((n) => mapXtoY(tempToHumid, n))
        .map((n) => mapXtoY(humidToLoc, n));

      if (result < lowest) {
        lowest = result;
      }
    }
  }
  console.log(lowest);
  //   console.log(Math.min(...lowestperbatch));
}

// partOne("./day5input.txt");
partTwo("./day5input.txt");

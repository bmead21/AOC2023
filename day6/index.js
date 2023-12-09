import fs from "fs";

function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");
  console.log(lines);

  let timeArr = lines[0]
    .split(":")[1]
    .split(" ")
    .filter((el) => el != " ")
    .filter((el) => el != "");

  let distArr = lines[1]
    .split(":")[1]
    .split(" ")
    .filter((el) => el != " ")
    .filter((el) => el != "");

  console.log(timeArr);
  console.log(distArr);
  let currWins = [];

  for (let timeIndex = 0; timeIndex < timeArr.length; timeIndex++) {
    let currRec = distArr[timeIndex];

    let waystowin = 0;

    for (let sec = 0; sec < timeArr[timeIndex]; sec++) {
      let holdtime = sec;
      let speed = holdtime;

      let timetotravel = timeArr[timeIndex] - holdtime;

      let curDist = timetotravel * speed;

      if (curDist > currRec) {
        waystowin++;
      }
      //   console.log(holdtime);
      //   console.log(totravel);
      //   console.log(curDist);
    }
    currWins.push(waystowin);
  }
  console.log(currWins);

  let numofways = currWins.reduce((a, b) => a * b, 1);

  return numofways;
}

function partTwo(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");
  console.log(lines);

  let timeArr = lines[0]
    .split(":")[1]
    .split(" ")
    .filter((el) => el != " ")
    .filter((el) => el != "");

  let combtime = "";

  timeArr.forEach((x) => {
    combtime = combtime + x;
  });

  console.log(combtime);

  let distArr = lines[1]
    .split(":")[1]
    .split(" ")
    .filter((el) => el != " ")
    .filter((el) => el != "");

  let combdist = "";

  distArr.forEach((x) => {
    combdist = combdist + x;
  });

  console.log(combdist);

  console.log(timeArr);
  console.log(distArr);
  let currWins = [];

  //   for (let timeIndex = 0; timeIndex < timeArr.length; timeIndex++) {
  let currRec = combdist;

  let waystowin = 0;

  for (let sec = 0; sec < combtime; sec++) {
    let holdtime = sec;
    let speed = holdtime;

    let timetotravel = combtime - holdtime;

    let curDist = timetotravel * speed;

    if (curDist > currRec) {
      waystowin++;
    }
    //   console.log(holdtime);
    //   console.log(totravel);
    //   console.log(curDist);
  }
  currWins.push(waystowin);
  //   }
  console.log(currWins);

  let numofways = currWins.reduce((a, b) => a * b, 1);

  return numofways;
}

// console.log(partOne("./day6input.txt"));
console.log(partTwo("./day6input.txt"));

import { Console, log } from "console";
import fs from "fs";
import utils from "utils"

function transpose(matrix) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

function partOne(file) {
  let lines = transpose(fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\n")
    .map((x) => x.split("")));
  // console.log(lines);
  // console.log(lines.length);
  let topBeam = lines.length
  let load = 0
  lines.map(line=> {
    // let stops = line.filter(x=> {x=="#"})
    // console.log(line)
    let stops = line.map((x,i)=> {if (x=="#") {return i}}).filter(el=> el != null)
    // console.log(stops)

    
    let leftAvail = 0
    
    let curLoad = 0
    // console.log(topBeam)
    for (let i=0; i < line.length; i++) {
      if (line[i] == "O") {
        curLoad += topBeam - leftAvail
        // console.log(`Adding ${topBeam - leftAvail} to load `)
        leftAvail++
      }
      if (line[i] == "#") {
        leftAvail = i+1
      }
    }
    load += curLoad
    // console.log(`Left Avail: ${leftAvail}`)
    // console.log(curLoad)

  })

  return load
}

function partTwo(file) {
  let lines = fs
    .readFileSync(file, "utf-8")
    .trim()
    .split("\n")
    .map((x) => x.split(""));
  // console.log(lines);
  // console.log(lines.length);
  let topBeam = lines.length
  let load = 0

// lines.map(x=>console.log(x.join("")))
//   console.log("******************")

let loops = new Map

for (let r = 1; r <= 1000000000; r++) {
  runCycle()
  let hash = lines.map(l => l.join('')).join('\n')
  if (loops.has(hash)) {
      const extra = (1000000000 - r) % (r - loops.get(hash));
      for (let i = 0; i < extra; i++) {
          runCycle()
      }
      break
  }
  loops.set(hash, r)
}


console.log(loops)

  return (calcLoad(lines))

function runCycle() {

    for (let i = 0; i < 4; i++) {
      moveRocks(lines)
      lines = rotate(lines)
  }
}
}

function calcLoad(matrix) {
  let load = 0
  for (let x = 0; x < matrix[0].length; x++) {
      for (let y = 0; y < matrix.length; y++) {
          if (matrix[y][x] === 'O') {
              load += matrix.length - y
          }
      }
  }
  return load
}


function moveRocks(data) {
  for (let x = 0; x < data[0].length; x++) {
      let min = 0
      for (let y = 0; y < data.length; y++) {
          if (data[y][x] == "O") {
            data[y][x] = '.'
            data[min][x] = 'O'
            min++
          }
          if (data[y][x] == "#") {
            min = y+1
          }
      }
  }
  return data
}

const rotate = (array) => {
  let r = Array.from({ length: array.length }, () => [])
  for (let y = 0; y < array.length; y++) {
      for (let x = 0; x < array[0].length; x++) {
          r[y][x] = array[array[0].length - x - 1][y]
      }
  }
  return r
}


console.log(`Part 1: ${partOne("./input.txt")}`);
console.log(`Part 2: ${partTwo("./input.txt")}`);

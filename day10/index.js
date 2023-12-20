import { log } from "console";
import fs from "fs";

const D = {
  N: 0,
  S: 1,
  E: 2,
  W: 3,
};

const dir = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

const getLinks = (v) => {
  switch (v) {
    case "|":
      return [D.S, D.N]; // connects N and S
    case "-":
      return [D.W, D.E]; // connects W and E
    case "L":
      return [D.N, D.E]; // connects N and E
    case "J":
      return [D.N, D.W]; // connects N and W
    case "7":
      return [D.S, D.W]; // connects S and W
    case "F":
      return [D.S, D.E]; //connects S and E
  }
  return []; // return blank of not one of our directional characters
};

function partOne(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");
  console.log(lines);
  let s = {}; //starting point variable

  //loop through each line in lines, pass through index as y
  let grid = lines.map((line, y) =>
    line.split("").map((v, x) => {
      //split string into array, loop through each character, pass through index as X
      if (v == "S") s = { x: x, y: y }; // if start point "S" is found, pass back pos in 2d array
      return {
        v: v,
        links: getLinks(v),
      };
    })
  );

  grid.map((x) => console.log(x));
  console.log(s);
  // console.log(map[2][1]);
  // console.log(map[2][1].links);

  let allowed = [];
  if (s.x > 0 && grid[s.y][s.x - 1].links.includes(D.E)) allowed.push(D.W);
  if (s.x < grid[0].length - 1 && grid[s.y][s.x + 1].links.includes(D.W))
    allowed.push(D.E);
  if (s.y > 0 && grid[s.y - 1][s.x].links.includes(D.S)) allowed.push(D.N);
  if (s.y < grid.length - 1 && grid[s.y + 1][s.x].links.includes(D.N))
    allowed.push(D.S);
  grid[s.y][s.x].links = allowed;

  console.log(`Allowed: ${allowed}`);

  let stack = [];
  stack.push({ p: s, dist: 0 });

  console.log("stack start");
  console.log(stack);
  console.log(stack.length);

  while (stack.length) {
    let n = stack.shift();
    console.log("n is");
    console.log(n);
    if (
      grid[n.p.y][n.p.x].dist === undefined ||
      grid[n.p.y][n.p.x].dist > n.dist
    ) {
      grid[n.p.y][n.p.x].dist = n.dist;
      grid[n.p.y][n.p.x].links.forEach((d) => {
        stack.push({
          p: { x: n.p.x + dir[d].x, y: n.p.y + dir[d].y },
          dist: n.dist + 1,
        });
      });
    }
    console.log(n);
  }
  // console.log("stack after");
  // console.log(stack);
  console.log(...grid.flat().map((p) => (p.dist === undefined ? 0 : p.dist)));
  return Math.max(
    ...grid.flat().map((p) => (p.dist === undefined ? 0 : p.dist))
  );
}

function partTwo(file) {
  let lines = fs.readFileSync(file, "utf-8").trim().split("\r\n");
}

console.log(`Part 1: ${partOne("./example.txt")}`);
console.log(`Part 2: ${partTwo("./example.txt")}`);

// import fs from 'fs'



function partOne(file) {
    let lines = fs.readFileSync(file,"utf-8").trim().split('\n')
    // console.log(lines)

    let lrArr = lines[0].split("")
    let mapData = lines.slice(2)
console.log(lrArr)
 

   

    let mapObj = mapData.map(el => {
        
   
       let node = el.split(" ")[0]

       
       let l = String(el.slice(7).split(",")[0])
       let r = String(el.slice(0,-1).split(",")[1].slice(1))
       let newl = l.trim()
      
        return ({node: node, l: newl, r:r})
 
    })

    console.log(mapObj)

    let timesThrough = 0
    let numSteps = 0;
    
    let lrNums = lrArr.length
    let currentNode = "AAA"
    

    function findMap(nodeName) {
        return mapObj.filter(el=> el.node == nodeName)
    }

  

    for (let stepIndex=0; stepIndex < lrNums; stepIndex++){
        let nextStepDir = lrArr[stepIndex]
        
        console.log(nextStepDir)

        let nextMap = findMap(currentNode)

        

        // console.log(nextMap)
        

        currentNode= (nextStepDir =="L") ? findMap(currentNode)[0].l : findMap(currentNode)[0].r

        // console.log(currentNode)
        console.log(numSteps)
        numSteps++  


        if (currentNode == "ZZZ") { 
            break;}
        if (numSteps % lrNums == 0) { 
            timesThrough++
            stepIndex = -1}
    }
console.log(timesThrough)
console.log()




    console.log(numSteps)
 }




function partTwoOLD(file) {    let lines = fs.readFileSync(file,"utf-8").trim().split('\n')
// console.log(lines)

let lrArr = lines[0].split("")
let mapData = lines.slice(2)
console.log(`Left Right Steps: ${lrArr.length}`)


let mapObj = mapData.map(el => {
    

   let node = el.split(" ")[0]

   
   let l = String(el.slice(7).split(",")[0])
   let r = String(el.slice(0,-1).split(",")[1].slice(1))
   let newl = l.trim()
  
    return ({node: node, l: newl, r:r})

})
console.log(`Mapping Length: ${mapObj.length}`)
// console.log(`Mapping: ${mapObj}`)

let timesThrough = 0
let numSteps = 0;

let lrNums = lrArr.length

console.log(`Number of LR Instructions: ${lrNums}`)

let currNodeArray = mapObj.map((el=> {
     if ([...el.node][2] == 'A') { return el.node}
}))

currNodeArray = currNodeArray.filter(el => el)

console.log(`Starting Array: ${currNodeArray}`)

function findMap(nodeName) {
    return mapObj.filter(el=> el.node == nodeName)
}

function findNextMap(arr, dir) {
    let nxtArr = []

    arr.forEach(el => {

        nxtArr.push((dir =="L") ? findMap(el[0].node)[0].l : findMap(el[0].node)[0].r)
    })
    // console.log("nxtarr")
    // console.log(nxtArr)
    return nxtArr
}

function checkforZs(arr) {
    let allZs = true;
    // console.log("checkfunct")
    // console.log(arr)
    arr.forEach(el => {
        // console.log(el[0].node.split("")[2])
        if (el[0].node.split("")[2] != 'Z') { 
        allZs = false}
        // console.log()
        // console.log(el[0].node.split("")[2])
    })
    
    return allZs
}


for (let stepIndex=0; stepIndex < lrNums; stepIndex++){
    let nextStepDir = lrArr[stepIndex]
    
    console.log(`We're going to step: ${nextStepDir}`)

    let nextMapArr = []

console.log("currNode")
    console.log(currNodeArray)
    currNodeArray.forEach(element => {
        nextMapArr.push(findMap(element))
    });
console.log("nextmap")
console.log(nextMapArr)
console.log(`Are all Z's: ${checkforZs(nextMapArr)}`)
   if ((checkforZs(nextMapArr)) || (numSteps > 10)) 
        { console.log("hit all Zs")
        break} 
    else {
        currNodeArray = []

        currNodeArray = findNextMap(nextMapArr, nextStepDir)

   }
   console.log("newcurrNodeArr")
   console.log(currNodeArray)

    

    console.log(numSteps)
    numSteps++  

    if (numSteps % lrNums == 0) { 
        timesThrough++
        stepIndex = -1}
}


console.log(`Times through LR: ${timesThrough}`)
console.log(`Number of Steps: ${numSteps}`)


}

import { syncReadFile } from "../utils.js";

function partTwoNew() {


let lines = syncReadFile("./input.txt", "\n\n");
// sample.txt expects 6 as answer for part 1
// sample2.txt expects 2 as answer for part 2

// Parse the input
// console.log(lines)

let directions = lines[0].split("");
let nodes = lines[1].split("\n");
let graph = new Map();

// console.log(directions)
// console.log(nodes)


function createGraph(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    let nodeStr = nodes[i];
    // console.log(nodeStr)
    let node = nodeStr.split(" = ")[0];
    // console.log(node)
    let childrenStr = nodeStr.split(" = ")[1];
    // console.log(childrenStr)
    let children = childrenStr.slice(1, childrenStr.length - 1).split(", ");
    // console.log(children)
    graph.set(node, children);
    // console.log(graph)
  }
}

createGraph(nodes);

console.log(graph)

let start = "AAA";
let end = "ZZZ";
let stepsToReachEnd = 0;
let current = start;

// Part 1
while (current !== end) {
  // console.log(stepsToReachEnd)
  // console.log(directions.length)
  let index = stepsToReachEnd % directions.length;
  // console.log(index)
  let direction = directions[index];
  // console.log(current)
  current = direction === "L" ? graph.get(current)[0] : graph.get(current)[1];
  stepsToReachEnd++;
}

console.log("Part 1: ", stepsToReachEnd);

// part 2
let currentNodes = [...graph.keys()].filter((key) => key.endsWith("A"));
console.log(currentNodes);

let stepsArray = [];

for (let i = 0; i < currentNodes.length; i++) {  // loops through each starting node
  let stepToReachEnd = 0;
  let instructionIndex = 0;
  let current = currentNodes[i];

  while (!current.endsWith("Z")) {
    if (instructionIndex === directions.length) {
      instructionIndex = 0;
    }

    let direction = directions[instructionIndex];
    current = direction === "L" ? graph.get(current)[0] : graph.get(current)[1];
    stepToReachEnd++;
    instructionIndex++;
  }
  console.log(stepToReachEnd);
  stepsArray.push(stepToReachEnd);
}

const stepToReachEnd = stepsArray.reduce((acc, curr) => lcm(acc, curr), 1);

console.log("Part 2: ", stepToReachEnd);

//Helper functions
function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// function allNodesEndsWithZ(nodes) {
//   return nodes.every((node) => endsWith(node, "Z"));
// }
// function endsWith(string, substring) {
//   return string.indexOf(substring) === string.length - substring.length;
// }
}

// partOne("./input.txt")
partTwoNew("./input.txt")


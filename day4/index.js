import fs from 'fs'



function partOne(file) {
    let lines = fs.readFileSync(file,"utf-8").trim().split('\n')
let totScore = 0


let values = lines.map((card) => {
    let cardNum = card.split(":")[0].split(" ")[1]
    let winNums = card.split(":")[1].split("|")[0].trim().split(" ").filter(el => el != '')
    let allNums = card.split(":")[1].split("|")[1].trim().split(" ").filter(el => el != '')
    
    let numMatches = 0
    let curScore = 0

   
    winNums.forEach(x => {
        if (allNums.includes(x)) { 
            numMatches++
            
            curScore = (numMatches) ? (numMatches == 1) ? 1 : 2^(numMatches - 1) : 0
            }
    });

    if (numMatches !=0) {
    curScore = (numMatches == 1) ? 1 : Math.pow(2,(numMatches - 1))
    totScore = totScore + curScore
    return curScore
    }

})
console.log(lines)
console.log(values)
console.log(totScore)}

function partTwo(file) {
    let lines = fs.readFileSync(file,"utf-8").trim().split('\n')
let totScore = 0


let values = lines.map((card) => {
    // console.log(card.split(":")[0].split(" ").filter(el => el!= '')[1])
    let cardNum = card.split(":")[0].split(" ").filter(el => el!= '')[1]
    let winNums = card.split(":")[1].split("|")[0].trim().split(" ").filter(el => el != '')
    let allNums = card.split(":")[1].split("|")[1].trim().split(" ").filter(el => el != '')
    
    let numMatches = 0
    let curScore = 0

   
    winNums.forEach(x => {
        if (allNums.includes(x)) { 
            numMatches++
            
            curScore = (numMatches) ? (numMatches == 1) ? 1 : 2^(numMatches - 1) : 0
            }
    });

    if (numMatches !=0) {
    curScore = (numMatches == 1) ? 1 : Math.pow(2,(numMatches - 1))
    totScore = totScore + curScore}
    return {cardNum: cardNum, 
        numMatches, numMatches,
        curScore: curScore,
    copies: 1}
        
   

})

// console.log(values)
// console.log(totScore)
// console.log(values.length)
let totalCards = 0
for(let lineIndex = 0; lineIndex < (values.length); lineIndex++) {
    console.log(values[lineIndex])
    console.log(values[lineIndex].numMatches)
    for(let cardstocopy = 1; cardstocopy <= values[lineIndex].numMatches; cardstocopy++) {
        for(let numcopies = 1; numcopies <= values[lineIndex].copies; numcopies++) {
        values[(lineIndex+cardstocopy)].copies = values[(lineIndex+cardstocopy)].copies + 1
    }}
}

values.forEach((x) => {
    totalCards = totalCards + x.copies
})

console.log(values)
console.log(totalCards)

} // end function

partTwo("./day4input.txt")


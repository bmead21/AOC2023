import fs from 'fs'

function numberOfJokers(hand) {
    let numJokes = (Object.keys('1')) ? hand['1'] : 0
    return numJokes
}

function findHandType(curhand) {
    let numJokers = 0
    let uniq = new Set(curhand)
        console.log(uniq)

        const uniqCardCount = {};
 
        for (let el of curhand) {
            if (uniqCardCount[el]) {
                uniqCardCount[el] += 1;
            } else {
                uniqCardCount[el] = 1;
            }
        }

        if(uniq.has('1')) { 
            console.log("loop")
            numJokers = uniqCardCount['1']
        console.log(uniqCardCount)
        console.log(numJokers)
        }

        console.log(numJokers)
        if (uniq.size == 1) {
            return 7 // best hand 5 of a kind
        }

        if (uniq.size == 5) {
            return (numJokers == 1) ?  2 : 1
              // worst hand high card

        }

        if (uniq.size == 4) {

            switch (numJokers) {
                case 0:
                    return 2// one pair
                    break;
                case 1:
                    return 4 //three of a kind
                    break;
                case 2: 
                    return 4 //three of a kind
                    break;
            }
            
        }

        if (uniq.size == 2) {
            if (Object.values(uniqCardCount).includes(4)) { return (numJokers != 0) ? 7 : 6}
            if (Object.values(uniqCardCount).includes(2)) { return (numJokers !=0) ? 7: 5}
            
        }

        if (uniq.size == 3) {
            console.log(uniqCardCount)
            if (Object.values(uniqCardCount).includes(3)) { return (numJokers !=0) ? 6: 4}   //3kind
            if (Object.values(uniqCardCount).includes(2)) { 
                if (numJokers == 1) { return 5}
                if (numJokers == 2) { return 6}
                if (numJokers == 0) { return 3}
               
                
        }
    }
        
}

function partOne(file) {
    let lines = fs.readFileSync(file,"utf-8").trim().split('\n')
    console.log(lines)
    let hands = lines.map((line) => {
        let oldhand = line.split(" ")[0]
        let hand = oldhand.replaceAll("A","Z")
        hand = hand.replaceAll("K","Y")
        hand = hand.replaceAll("Q","X")
        hand = hand.replaceAll("J", "1")
        hand = hand.replaceAll("T", "V")
        let wager = Number(line.split(" ")[1])

        let handtype = findHandType(hand)

        

        return {hand: hand, oldhand: oldhand, wager: wager, handtype: handtype}
    })

    let rankedHands = hands.sort((a,b) => {
        if (a.handtype < b.handtype) return -1;
        if (a.handtype > b.handtype) return 1;

        if (a.hand < b.hand) return -1;
        if (a.hand > b.hand) return 1;

  // Both idential, return 0
  return 0;


    })
   

    let totWinnings = 0

    for (let index = 0; index<rankedHands.length; index++){
        totWinnings += (index+1) * rankedHands[index].wager
    }
    console.log(totWinnings)


    console.log(rankedHands.filter(el=> el.handtype==1
        ))
    console.log(totWinnings)
 }



function partTwo(file) {}


partOne("./day7input.txt")
partTwo("./example.txt")


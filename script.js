/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let diceValues 
let diceLocked 
let valueFreq //frequency of values 1-6
// let sum

let onesLock = false
let twosLock = false
let threesLock = false
let foursLock = false
let fivesLock = false
let sixesLock = false

// let bonusEarned = false
let yahtzeeBonusEarned = false
let lockedCombos = 0

let tripleLock = false
let quadLock = false
let fullHouseLock = false
let smallStraightLock = false
let largeStraightLock = false
let yahtzeeLock = false
let chanceLock = false

/*------------------------ Cached Element References ------------------------*/
const dice = document.querySelectorAll('.dice')
const roll = document.querySelector('#roll')
const reset = document.querySelector('#reset')
const scores = document.querySelectorAll('.scores')

const ones = document.querySelector('#ones')
const twos = document.querySelector('#twos')
const threes = document.querySelector('#threes')
const fours = document.querySelector('#fours')
const fives = document.querySelector('#fives')
const sixes = document.querySelector('#sixes')
const subTotal = document.querySelector('#subTotal')
const subBonus = document.querySelector('#subBonus')
const triple = document.querySelector('#triple')
const quad = document.querySelector('#quad')
const fullHouse = document.querySelector('#fullHouse')
const smallStraight = document.querySelector('#smallStraight')
const largeStraight = document.querySelector('#largeStraight')
const yahtzee = document.querySelector('#yahtzee')
const yahtzeeBonus = document.querySelector('#yahtzeeBonus')
const chance = document.querySelector('#chance')
const total = document.querySelector('#total')

/*-------------------------------- Functions --------------------------------*/

//initialize on load
function resetGame() {
    diceValues = [0, 0, 0, 0, 0] 
    diceLocked = [false, false, false, false, false]
    valueFreq = [0,0,0,0,0,0]
    // sum = 0
    // console.log( `board loaded`)

    scores.forEach((score) => {
        score.classList.remove('scoreLocked')
        score.innerText = 0
    })
    subBonus.classList.remove('bonus')
    subBonus.innerText = 0
    yahtzeeBonus.classList.remove('bonus')
    yahtzeeBonus.innerText = 0
    total.innerText = 0

    yahtzeeBonusEarned = false
    lockedCombos = 0

    onesLock = false
    twosLock = false
    threesLock = false
    foursLock = false
    fivesLock = false
    sixesLock = false

    tripleLock = false
    quadLock = false
    fullHouseLock = false
    smallStraightLock = false
    largeStraightLock = false
    yahtzeeLock = false
    chanceLock = false
    
}

// roll all unlocked dice by generating 1-6 random
function rollDice() {
    if (lockedCombos >= 13) {return}
    for (let die = 0; die <= 4; die++) {
        if (diceLocked[die] == false) {
            let value = Math.ceil(Math.random()*6)
            console.log(value)
            diceValues[die] = value
        }
    }
    // diceValues = [3,3,6,6,6] //manually change for testing 
    // diceValues = [1,2,4,3, 2] //manually change for testing 
    // diceValues = [5,2,4,3, 2] //manually change for testing 
    // diceValues = [6,6,4,3, 5] //manually change for testing 

    // diceValues = [1,2,4,3, 5] //manually change for testing 
    // diceValues = [6,5,4,3, 2] //manually change for testing 
    // diceValues = [2,2,2,2,2] //manually change for testing 
    console.log(`five values are ${diceValues}`)
    updateDisplay()
    updateValueFreq()
    displayOptions()
}

//function to animate dice rolling?

//update dice appearance based on array of number values
function updateDisplay() {
    dice.forEach((die) => {
        let index = parseInt(die.getAttribute('id'))
        die.innerText = diceValues[index]
        if (diceLocked[index] == true) {
            die.classList.add('dieLocked')
        } else {
            die.classList.remove('dieLocked')
        }
    })
}

function updateValueFreq() {
    valueFreq = [0,0,0,0,0,0]
    diceValues.forEach((die) => {
       if (die == 1) {
          valueFreq[0]++
        } else if (die == 2) {
          valueFreq[1]++;
        } else if (die == 3) {
          valueFreq[2]++;
        } else if (die == 4) {
          valueFreq[3]++;
        } else if (die == 5) {
          valueFreq[4]++;
        } else if (die == 6) {
          valueFreq[5]++;
        }  
    })
        console.log(`distribution of values is ${valueFreq}`)
    
}

// calculate potential scores for eligible patterns based on dice values
function displayOptions() {
    let sum = diceValues[0] + diceValues[1] + diceValues[2] + diceValues[3] + diceValues[4]

    if (onesLock == false) {ones.innerText = valueFreq[0]}
    if (twosLock == false) {twos.innerText = valueFreq[1] * 2}
    if (threesLock == false) {threes.innerText = valueFreq[2] * 3}
    if (foursLock == false) {fours.innerText = valueFreq[3] * 4}
    if (fivesLock == false) {fives.innerText = valueFreq[4] * 5}
    if (sixesLock == false) {sixes.innerText = valueFreq[5] * 6}
    
    if (tripleLock == false && (valueFreq.includes(3) || valueFreq.includes(4) || valueFreq.includes(5))) {triple.innerText = sum}
    if (quadLock == false && (valueFreq.includes(4) || valueFreq.includes(5))) {quad.innerText = sum}
    if (yahtzeeLock == false && valueFreq.includes(5)) {yahtzee.innerText = 50}
    if (fullHouseLock == false && valueFreq.includes(2) && valueFreq.includes(3)) {fullHouse.innerText = 25}
    if (chanceLock == false) {chance.innerText = sum}

    //small straight
    if (valueFreq[0] >= 1 && valueFreq[1] >= 1 && valueFreq[2] >= 1 && valueFreq[3] >= 1 || valueFreq[1] >= 1 && valueFreq[2] >= 1 && valueFreq[3] >= 1 && valueFreq[4] >= 1 || valueFreq[2] >= 1 && valueFreq[3] >= 1 && valueFreq[4] >= 1 && valueFreq[5] >= 1) {
        if (smallStraightLock == false) {smallStraight.innerText = 30}
    }
    
    //large straight
    if (valueFreq[0] >= 1 && valueFreq[1] >= 1 && valueFreq[2] >= 1 && valueFreq[3] >= 1 && valueFreq[4] >= 1 || valueFreq[1] >= 1 && valueFreq[2] >= 1 && valueFreq[3] >= 1 && valueFreq[4] >= 1 && valueFreq[5] >= 1) {
        if (smallStraightLock == false) {smallStraight.innerText = 30}
        if (largeStraightLock == false) {largeStraight.innerText = 40}
    }

}

// lock or unlock an individual die
function lockDie(die) {
    let index = parseInt(die.getAttribute('id'))
    diceLocked[index] == true ? diceLocked[index] = false : diceLocked[index] = true
    updateDisplay()
    // console.log('Clicked die ID:', diceLocked);
}


// select single combo and update score
function lockScore() {
    // when you click an unlocked score, it locks it and resets unlocked scores

    if (event.target.classList.contains('scoreLocked')) {return}
    
    // console.log(event.target.id)
    event.target.classList.add("scoreLocked")
    lockedCombos++

    switch (event.target.id) {
        case 'ones':
        onesLock = true
        break
        case 'twos':
        twosLock = true
        break
        case 'threes':
        threesLock = true
        break
        case 'fours':
        foursLock = true
        break
        case 'fives':
        fivesLock = true
        break
        case 'sixes':
        sixesLock = true
        break
        case 'triple':
        tripleLock = true
        break
        case 'quad':
        quadLock = true
        break
        case 'fullHouse':
        fullHouseLock = true
        break
        case 'smallStraight':
        smallStraightLock = true
        break
        case 'largeStraight':
        largeStraightLock = true
        break
        case 'yahtzee':
        yahtzeeLock = true
        break
        case 'chance':
        chanceLock = true
        break
    }
    
    //reset the rest that are not locked 
    if (onesLock == false) {ones.innerText = 0}
    if (twosLock == false) {twos.innerText = 0}
    if (threesLock == false) {threes.innerText = 0}
    if (foursLock == false) {fours.innerText = 0}
    if (fivesLock == false) {fives.innerText = 0}
    if (sixesLock == false) {sixes.innerText = 0}
    
    if (tripleLock == false) {triple.innerText = 0}
    if (quadLock == false) {quad.innerText = 0}
    if (fullHouseLock == false) {fullHouse.innerText = 0}
    if (smallStraightLock == false) {smallStraight.innerText = 0}
    if (largeStraightLock == false) {largeStraight.innerText = 0}
    if (yahtzeeLock == false) {yahtzee.innerText = 0}
    if (chanceLock == false) {chance.innerText = 0}

    updateBonuses()
    updateTotal()
    checkGameOver()
    resetDice()
}

function updateBonuses() {
    // fives.innerText = 60
    // yahtzee.innerText = 50

    // if subtotal exceeds 63 or more, add 35 for subtotal bonus
    // console.log(parseInt(ones.innerText)+parseInt(twos.innerText)+parseInt(threes.innerText)+parseInt(fours.innerText)+parseInt(fives.innerText)+parseInt(sixes.innerText))
    if (parseInt(ones.innerText)+parseInt(twos.innerText)+parseInt(threes.innerText)+parseInt(fours.innerText)+parseInt(fives.innerText)+parseInt(sixes.innerText) >= 63) {
        subBonus.innerText = 35
        subBonus.classList.add('bonus')
    }
    
    // also if yahtzee has value of 50 already
    // and if currently valueFreq contains 5
    // update yahtzee 100
    // console.log(valueFreq)
    if (parseInt(yahtzee.innerText) == 50 && yahtzee.classList.contains('scoreLocked') && valueFreq.includes(5)) {
        if (yahtzeeBonusEarned == false) {
            yahtzeeBonusEarned = true 
        } else {
            yahtzeeBonus.innerText = parseInt(yahtzeeBonus.innerText) + 100
            yahtzeeBonus.classList.add('bonus')
        }
        
    }
}

function updateTotal(){
    let sum = 0
    scores.forEach((score) => {
        sum += parseInt(score.innerText)
    })
    sum += parseInt(subBonus.innerText)
    sum += parseInt(yahtzeeBonus.innerText)
    total.innerText = sum
    
}

// reset dice when select a combo
function resetDice() {
    diceValues = [0, 0, 0, 0, 0,]
    diceLocked = [false, false, false, false, false]
    updateDisplay()
}

// game ends after all 13 patterns have been selected
function checkGameOver() {
    if (lockedCombos >= 13) {
        window.alert("Game Over! Your score is something");
    }
}

// if yahtzee is rolled after false yahtzee is selected, alert taunting them








/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('body').addEventListener("load", resetGame());

roll.addEventListener('click', rollDice)

reset.addEventListener('click', resetGame)

dice.forEach(function(die) {
    die.addEventListener('click', function() {    
        lockDie(die)  
    });
});

scores.forEach(function(score) {
    score.addEventListener("click", function() {
        lockScore()
    });
});
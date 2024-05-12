/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let diceValues 
let diceLocked 
let valueFreq //frequency of values 1-6
let rolls

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
const scoresRow = document.querySelectorAll('.scoreRowClickable')

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

const onesRow = document.querySelector('#onesRow')
const twosRow = document.querySelector('#twosRow')
const threesRow = document.querySelector('#threesRow')
const foursRow = document.querySelector('#foursRow')
const fivesRow = document.querySelector('#fivesRow')
const sixesRow = document.querySelector('#sixesRow')
const subTotalRow = document.querySelector('#subTotalRow')
const subBonusRow = document.querySelector('#subBonusRow')
const tripleRow = document.querySelector('#tripleRow')
const quadRow = document.querySelector('#quadRow')
const fullHouseRow = document.querySelector('#fullHouseRow')
const smallStraightRow = document.querySelector('#smallStraightRow')
const largeStraightRow = document.querySelector('#largeStraightRow')
const yahtzeeRow = document.querySelector('#yahtzeeRow')
const yahtzeeBonusRow = document.querySelector('#yahtzeeBonusRow')
const chanceRow = document.querySelector('#chanceRow')
const totalRow = document.querySelector('#totalRow')



/*-------------------------------- Functions --------------------------------*/

//initialize on load
function resetGame() {
    resetDice()
    valueFreq = [0,0,0,0,0,0]
    // sum = 0
    // console.log( `board loaded`)

    scores.forEach((score) => {
        // score.classList.remove('scoreLocked')
        score.innerText = 0
    })
    scoresRow.forEach((scoreRow) => {
        scoreRow.classList.remove('scoreLocked')
        // scoreRow.innerText = 0
    })
    subBonusRow.classList.remove('bonus')
    subBonus.innerText = 0
    yahtzeeBonusRow.classList.remove('bonus')
    yahtzeeBonus.innerText = 0
    total.innerText = 0

    rolls = 0
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
    if (lockedCombos >= 13 || rolls >=3) {return}
    rolls++
    roll.innerText = `${3-rolls} rolls left`

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
    // console.log(`five values are ${diceValues}`)
    spinUnlockedDice()
    updateDisplay()
    updateValueFreq()
    displayOptions()

}

//function to animate dice rolling?

//update dice appearance based on array of number values
function updateDisplay() {
    dice.forEach((die) => {
        let index = parseInt(die.getAttribute('id'))
        // die.innerText = diceValues[index]
        if (diceValues[index] == 0) {
            die.style.backgroundImage = ''
        } else {
        die.style.backgroundImage = "url(6dice.png)";
        die.style.backgroundSize = "300px"
        offset = (7 - diceValues[index]) % 6 * 51
        die.style.backgroundPosition = offset + "px"
        }
        
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
    spin(die)
    updateDisplay()
    // console.log('Clicked die ID:', diceLocked);
}

function spinUnlockedDice() {
    dice.forEach((die) => {
        if (!die.classList.contains('dieLocked')) {
            die.classList.add('spin-animation');
            //stop animation 
            setTimeout(() => {
                die.classList.remove('spin-animation');
            }, 1000);
        }
    })
}
function spin(die) {
    //add spinning animation
    die.classList.add('spin-animation');
    //stop animation 
    setTimeout(() => {
        die.classList.remove('spin-animation');
    }, 1000);
}

// select single combo and update score
function lockScore(combo) {
    // when you click an unlocked score, it locks it and resets unlocked scores
    // console.log()
    if (combo.classList.contains('scoreLocked')) {return}
    
    // console.log(event.target.id)
    combo.classList.add("scoreLocked")
    lockedCombos++
    rolls = 0
    roll.innerText = `${3-rolls} rolls left`

    switch (combo.getAttribute('id')) {
        case 'onesRow':
        onesLock = true
        break
        case 'twosRow':
        twosLock = true
        break
        case 'threesRow':
        threesLock = true
        break
        case 'foursRow':
        foursLock = true
        break
        case 'fivesRow':
        fivesLock = true
        break
        case 'sixesRow':
        sixesLock = true
        break
        case 'tripleRow':
        tripleLock = true
        break
        case 'quadRow':
        quadLock = true
        break
        case 'fullHouseRow':
        fullHouseLock = true
        break
        case 'smallStraightRow':
        smallStraightLock = true
        break
        case 'largeStraightRow':
        largeStraightLock = true
        break
        case 'yahtzeeRow':
        yahtzeeLock = true
        break
        case 'chanceRow':
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
        subBonusRow.classList.add('bonus')
    }
    
    // also if yahtzee has value of 50 already
    // and if currently valueFreq contains 5
    // update yahtzee 100
    // console.log(valueFreq)
    if (parseInt(yahtzee.innerText) == 50 && yahtzeeRow.classList.contains('scoreLocked') && valueFreq.includes(5)) {
        if (yahtzeeBonusEarned == false) {
            yahtzeeBonusEarned = true 
        } else {
            yahtzeeBonus.innerText = parseInt(yahtzeeBonus.innerText) + 100
            yahtzeeBonusRow.classList.add('bonus')
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
    diceValues = [0,0,0,0,0]
    diceLocked = [false, false, false, false, false]
    updateDisplay()
}

// game ends after all 13 patterns have been selected
function checkGameOver() {
    if (lockedCombos >= 13) {
        window.alert("Game Over!");
        reset.classList.add('pulse')
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

scoresRow.forEach(function(scoreRow) {
    scoreRow.addEventListener("click", function() {
        lockScore(scoreRow)
    });
});
/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/
let diceValues 
let diceLocked 
let valueFreq //frequency of values 1-6
let rolls
let lockedCombos = 0
let yahtzeeBonusEarned = false

let onesLock = false
let twosLock = false
let threesLock = false
let foursLock = false
let fivesLock = false
let sixesLock = false
let tripleLock = false
let quadLock = false
let fullHouseLock = false
let smallStraightLock = false
let largeStraightLock = false
let yahtzeeLock = false
let chanceLock = false
let diceSound = new Audio('diceRoll.mp3') //Sound from Zapsplat.com
let diceStyles = [
    "styles/standard.png",
    "styles/black.png",
    "styles/green.png",
    "styles/red.png",
    "styles/royal.png",
    "styles/alien.png",
    "styles/rainbow.png",
    "styles/rainbowNum.png",
    "styles/gradient.png"
  ];
  let diceColor
  

/*------------------------ Cached Element References ------------------------*/
const banner = document.querySelector('#banner')
const message = document.querySelector('#message')
const dice = document.querySelectorAll('.dice')
const roll = document.querySelector('#roll')
const reset = document.querySelector('#reset')
const switchColor = document.querySelector('#switchColor')
const scores = document.querySelectorAll('.scores')
const subScores = document.querySelectorAll('.subScores')
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
function init() {
    diceColor = diceStyles[0]
    resetGame()
}

//reset game and numbers and scores
function resetGame() {
    resetDice()
    updateDisplay()

    scores.forEach((score) => {
        score.innerText = ''
    })

    scoresRow.forEach((scoreRow) => {
        scoreRow.classList.remove('scoreLocked')
    })

    subTotal.innerText = 0
    subBonusRow.classList.remove('bonus')
    subBonus.innerText = ''
    yahtzeeBonusRow.classList.remove('bonus')
    yahtzeeBonus.innerText = ''
    yahtzeeBonusEarned = false
    total.innerText = 0

    rolls = 0
    roll.innerHTML = `${3-rolls} <br> rolls left`
    lockedCombos = 0
    banner.className = ''
    message.innerHTML = ''
    reset.classList.remove('pulse')
    dice.forEach((cube) => {
        index = cube.getAttribute("id")
        cube.classList.remove(`flying${index}`)    })

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
    roll.innerHTML = `${3-rolls} <br> rolls left`

    for (let die = 0; die <= 4; die++) {
        if (diceLocked[die] == false) {
            let value = Math.ceil(Math.random()*6)
            diceValues[die] = value
        }
    }
    // diceValues = [6,6,6,6,6] //FOR DEMO PURPOSES ONLY
    // diceValues = [5,4,2,1,3] //FOR DEMO PURPOSES ONLY
    // diceValues = [5,4,5,4,4] //FOR DEMO PURPOSES ONLY
    spinUnlockedDice()
    updateDisplay()
    updateValueFreq()
    setTimeout(() => {
        displayOptions()
        yahtzeeBanner()
    }, 1000);
}

//update dice appearance based on array of number values
function updateDisplay() {
    dice.forEach((die) => {
        let index = parseInt(die.getAttribute('id'))
        die.style.backgroundImage = `url('${diceColor}')`;
        die.style.backgroundSize = "350px"
        offset = diceValues[index] * 50
        die.style.backgroundPosition = 350 - offset + "px"
        
        if (diceLocked[index] == true) {
            die.classList.add('dieLocked')
        } else {
            die.classList.remove('dieLocked')
        }
    })
}

//calculates how often each value was rolled
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
}

// calculate potential scores for eligible combos based on dice values
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

    scores.forEach((score) => {
        if (score.innerText == 0) {
            score.innerText = ''
        }
    })

}

// lock or unlock an individual die
function lockDie(die) {
    let index = parseInt(die.getAttribute('id'))
    if (diceValues[index] == 0) {return}
    diceLocked[index] == true ? diceLocked[index] = false : diceLocked[index] = true
    updateDisplay()
}

//start and stop spinning and number flashing
function spinUnlockedDice() {
    diceSound.play()
    dice.forEach((die) => {
        if (!die.classList.contains('dieLocked')) {

            //start animations
            die.classList.add('rolling');

            //stop animations 
            setTimeout(() => {
                die.classList.remove('rolling');
            }, 1000);

        }
    })
}


// select single combo and update score
function lockScore(combo) {
    if (combo.classList.contains('scoreLocked')) {return}
    
    combo.classList.add("scoreLocked")
    lockedCombos++
    rolls = 0
    roll.innerHTML = `${3-rolls} <br> rolls left`

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
    if (onesLock == false) {ones.innerText = ''}
    if (twosLock == false) {twos.innerText = ''}
    if (threesLock == false) {threes.innerText = ''}
    if (foursLock == false) {fours.innerText = ''}
    if (fivesLock == false) {fives.innerText = ''}
    if (sixesLock == false) {sixes.innerText = ''}
    
    if (tripleLock == false) {triple.innerText = ''}
    if (quadLock == false) {quad.innerText = ''}
    if (fullHouseLock == false) {fullHouse.innerText = ''}
    if (smallStraightLock == false) {smallStraight.innerText = ''}
    if (largeStraightLock == false) {largeStraight.innerText = ''}
    if (yahtzeeLock == false) {yahtzee.innerText = ''}
    if (chanceLock == false) {chance.innerText = ''}

    updateBonuses()
    updateTotal()
    if (lockedCombos < 13) {
        resetDice()
    }
    banner.className = ''
    message.innerHTML = ''
    checkGameOver()
}

function updateBonuses() {

    // if subtotal exceeds 63 or more, add 35 for subtotal bonus
    let sum = 0
    subScores.forEach((score) => {
    if (score.innerText != '' ) {
        sum += parseInt(score.innerText)
        } 
    })
    subTotal.innerText = sum
    
    if (sum >= 63) {
        subBonus.innerText = 35
        subBonusRow.classList.add('bonus')
    }
    
    //add 100 pts for bonus Yahtzees
    if (yahtzee.innerText == '50' && yahtzeeRow.classList.contains('scoreLocked') && valueFreq.includes(5)) {
        if (yahtzeeBonusEarned == false) {
            yahtzeeBonusEarned = true 

        } else {
            if (yahtzeeBonus.innerText == "") {
                yahtzeeBonus.innerText = 100
                yahtzeeBonusRow.classList.add('bonus')

            } else {
                yahtzeeBonus.innerText = parseInt(yahtzeeBonus.innerText) + 100

            }
        }
        
    }
}

//display messages for yahtzees
function yahtzeeBanner() {
    if (yahtzee.innerText === '' && yahtzeeRow.classList.contains('scoreLocked') && valueFreq.includes(5)) {
        banner.classList.add('yahtzeeNull')
        message.innerHTML = 'You rolled a Yahtzee but <BR> sadly cannot claim any points'
    } else if (!yahtzeeRow.classList.contains('scoreLocked') && valueFreq.includes(5)) {
        banner.classList.add('yahtzee')
        message.innerHTML = 'CONGRATS! <BR> YOU ROLLED A <BR> YAHTZEE FOR <BR> 50 POINTS!'
    } else if (yahtzee.innerText === '50' && yahtzeeRow.classList.contains('scoreLocked') && valueFreq.includes(5)) {
        banner.classList.add('yahtzee')
        message.innerHTML = 'CONGRATS! <BR> YOU ROLLED <BR> ANOTHER <BR> YAHTZEE FOR <BR> 100 POINTS <BR> BONUS!'
    }

}

//update total value at bottom
function updateTotal(){
    let sum = 0
    scores.forEach((score) => {
        if (score.innerText != '' ) {
            sum += parseInt(score.innerText)
        } 
    })
    if (subBonus.innerText != "") {sum += parseInt(subBonus.innerText)}
    if (yahtzeeBonus.innerText != "") {sum += parseInt(yahtzeeBonus.innerText)}
    total.innerText = sum
}

// reset dice 
function resetDice() {
    diceValues = [0,0,0,0,0]
    diceLocked = [false, false, false, false, false]
    valueFreq = [0,0,0,0,0,0]
    updateDisplay()
}

// game ends after all 13 combos have been selected
function checkGameOver() {
    if (lockedCombos >= 13) {
        banner.classList.remove('yahtzee','yahtzeeNull')
        banner.classList.add('gameOver')
        message.innerHTML = `GAME OVER! <BR> SCORE IS ${total.innerText}`
        reset.classList.add('pulse')
        dice.forEach((cube) => {
            index = cube.getAttribute("id")
            cube.classList.add(`flying${index}`)
        })
    }
}

function changeDiceColor() {
    if (diceColor == diceStyles[diceStyles.length-1]) {
        diceColor = diceStyles[0]
    } else {
        for (let index = 0; index < diceStyles.length; index++) {
            if (diceColor == diceStyles[index]) {
                diceColor = diceStyles[++index]
            }
            
        }
    }
    updateDisplay()
}

/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('body').addEventListener("load", init());

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

switchColor.addEventListener('click', changeDiceColor)
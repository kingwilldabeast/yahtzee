/*-------------------------------- Constants --------------------------------*/
/*---------------------------- Variables (state) ----------------------------*/
let diceValues 
let diceLocked 
let valueFreq //frequency of values 1-6

/*------------------------ Cached Element References ------------------------*/
const dice = document.querySelectorAll('.dice')
const roll = document.querySelector('#roll')
const ones = document.querySelector('#ones')
const twos = document.querySelector('#twos')
const threes = document.querySelector('#threes')
const fours = document.querySelector('#fours')
const fives = document.querySelector('#fives')
const sixes = document.querySelector('#sixes')
const subTotal = document.querySelector('#subTotal')
const bonus = document.querySelector('#bonus')
const triple = document.querySelector('#triple')
const quad = document.querySelector('#quad')
const fullHouse = document.querySelector('#fullHouse')
const smallStraight = document.querySelector('#smallStraight')
const largeStraight = document.querySelector('#largeStraight')
const yahtzee = document.querySelector('#yahtzee')
const yahtzeeBonus = document.querySelector('#yahtzeeBonus')
const total = document.querySelector('#total')

/*-------------------------------- Functions --------------------------------*/

//initialize on load
function init() {
    diceValues = [0, 0, 0, 0, 0,]
    diceLocked = [false, false, false, false, false]
    valueFreq = [0,0,0,0,0,0]
    console.log( `board loaded`)
}

// roll all unlocked dice by generating 1-6 random
function rollDice() {
    dice.forEach((die) => {
        let index = parseInt(die.getAttribute('id'))
        if (diceLocked[index] == false) {
            let value = Math.ceil(Math.random()*6)
            // console.log(value)
            diceValues[index] = value
            die.innerText = value
        }
    })
    console.log(`five values are ${diceValues}`)
    updateValueFreq()
}
//function to animate dice rolling?

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
    
}

// lock or unlock an individual die
function lockDie(die) {

        let index = parseInt(die.getAttribute('id'))
        diceLocked[index] == true ? diceLocked[index] = false : diceLocked[index] = true

        // console.log('Clicked die ID:', diceLocked);
}

function updateDice() {
    //update dice appearance based on array of number values??
}




// select single pattern and update score
function updateScores() {

}

// reset potential scores of unselected patterns

// calculate and log bonus of 35, if subtotal >= 63

// reset dice at beginning of new turn
function resetDice() {
    diceValues = [0, 0, 0, 0, 0,]
    diceLocked = [false, false, false, false, false]
}

// game ends after all 13 patterns have been selected

// if yahtzee is rolled after false yahtzee is selected, no bonus 

// if yahtzee is rolled after true yahtzee is selected, give bonus of 100 

// reset all scores and dice at end of game 





/*----------------------------- Event Listeners -----------------------------*/

document.querySelector('body').addEventListener("load", init());

roll.addEventListener('click', rollDice)

dice.forEach(function(die) {
    die.addEventListener('click', function() {    lockDie(die)  }  );
});
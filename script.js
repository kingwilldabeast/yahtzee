/*-------------------------------- Constants --------------------------------*/
let diceValues 
let diceLocked 
/*---------------------------- Variables (state) ----------------------------*/


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

}

// roll all unlocked dice by generating 1-6 random
function rollDice() {
    dice.forEach((die) => {
        let index = parseInt(die.getAttribute('id'))
        if (diceLocked[index] == false) {
            let value = Math.ceil(Math.random()*6)
            console.log(value)
            diceValues[die] = value
            die.innerText = value
        }
    })
    
}
//function to animate dice rolling?

// calculate potential scores for eligible patterns based on dice values

// lock or unlock an individual die
function lockDie(die) {

        let index = parseInt(die.getAttribute('id'))
        diceLocked[index] == true ? diceLocked[index] = false : diceLocked[index] = true

        console.log('Clicked die ID:', diceLocked);
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

roll.addEventListener('click', rollDice)
dice.forEach(function(die) {
    die.addEventListener('click', function() {    lockDie(die)  }  );
});
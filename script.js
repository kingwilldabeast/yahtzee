/*-------------------------------- Constants --------------------------------*/
const diceValues = [0, 0, 0, 0, 0,]
/*---------------------------- Variables (state) ----------------------------*/


/*------------------------ Cached Element References ------------------------*/
const dice = document.querySelectorAll('.dice')
const roll = document.querySelector('#roll')

/*-------------------------------- Functions --------------------------------*/


// roll all unlocked dice by generating 1-6 random
function rollDice() {
    dice.forEach((die) => {
        let value = Math.ceil(Math.random()*6)
        console.log(value)
        diceValues[die] = value
        die.innerText = value
    })
    
}
//function to animate dice rolling?

// calculate potential scores for eligible patterns based on dice values

// lock or unlock an individual die

// select single pattern and update score

// reset potential scores of unselected patterns

// reset dice at beginning of new turn

// game ends after all 13 patterns have been selected

// if yahtzee is rolled after false yahtzee is selected, no bonus 

// if yahtzee is rolled after true yahtzee is selected, give bonus of 100 

// reset all scores and dice at end of game 





/*----------------------------- Event Listeners -----------------------------*/

roll.addEventListener('click', rollDice)
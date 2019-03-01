/*
 YOUR 3 CHALLENGES
 Change the game to follow these rules:
 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
 2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
 */
var scores, activePlayer, activeScore, isWinnerExist, gamePlaying, countRoll, diceValues, finalScore;

// Define dice element to a constant
const btnDom = document.querySelector('.dice');


//Initialize application for first loading the app
init();

// New Game
document.querySelector('.btn-new').addEventListener('click', init);


// Roll the dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    //0. Check if winner exists
    if (isWinnerExist) {
        return false;
    }
    countRoll += 1;
    // 1. Generate dice number
    var dice = Math.floor(Math.random() * 6) + 1;
    btnDom.src = './images/dice-' + dice + '.png';
    // Store the two consecutive dice values
    if (countRoll % 2 === 1) {
        diceValues[0] = dice;
    } else {
        diceValues[1] = dice;
    }
    // check if two consecutive 6 rolls
    if (diceValues[0] === 6 && diceValues[1] === 6) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // next player
        nextPlayer();
    }
    // 2. Add to current score if dice value is NOT 1
    else if (dice !== 1) {
        activeScore += dice;
        // 3. Place the score to activePlayer current score
        document.getElementById('current-' + activePlayer).textContent = activeScore;
        // 4. Show the dice
        btnDom.style.display = 'block';
    } else {
        // next player
        nextPlayer();
    }
});

// Hold the score
document.querySelector('.btn-hold').addEventListener('click', function () {

    //0. Check if winner exists
    if (isWinnerExist) {
        return false;
    }
    // 1. Add the score to GLOBAL score
    scores[activePlayer] += Number(document.getElementById('current-' + activePlayer).textContent);
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won
    if (winner() === false) {
        // next player
        nextPlayer();
    }

});

// Change Final Score
document.querySelector('.final_score').addEventListener('change', function () {
    var player_0_score = document.getElementById('score-0').textContent;
    var player_1_score = document.getElementById('score-1').textContent;
    if(player_0_score > 0 || player_1_score > 0 || Number(this.value) <= 0) {
        this.value = 100;
    } else {
        finalScore = this.value;
    }
});

// Initialize application
function init() {
    scores = [0, 0];
    activeScore = 0;
    activePlayer = 0;
    countRoll = 0;
    diceValues = [0, 0]
    isWinnerExist = false;
    finalScore = 100;

// Initialize all scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

// Hide the dice first
    btnDom.style.display = 'none';

    // Set the Final Value in DOM
    document.querySelector('.final_score').value = 100;
}

// Winner Function
function winner() {
    var currentPlayerGlobalScore = document.getElementById('score-' + activePlayer).textContent;
    if (Number(currentPlayerGlobalScore)>= Number(finalScore)) {
        isWinnerExist = true;
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        return true;
    } else {
        return false;
    }
}

// Set to Next Player
function nextPlayer() {
    countRoll = 0;
    diceValues = [0, 0];
    // 1. Place the score to the previous Player 0
    document.getElementById('current-' + activePlayer).textContent = '0';
    // 2. change the player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // 3. Set the active score to 0
    activeScore = 0;
    // 4. hide the dice if 1
    btnDom.style.display = 'none';
    // 5. Change the active panel
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


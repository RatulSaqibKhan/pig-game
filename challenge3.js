/*
 YOUR 3rd CHALLENGE
 Change the game to follow these rules:
 3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
 */
var scores, activePlayer, activeScore, isWinnerExist, countRoll, diceValues, finalScore;

// Define dice element to a constant
const btn1Dom = document.querySelector('.dice1');
const btn2Dom = document.querySelector('.dice2');


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
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    btn1Dom.src = './images/dice-' + dice1 + '.png';
    btn2Dom.src = './images/dice-' + dice2 + '.png';
    // check if two dices are 6
    if (dice1 === 6 && dice2 === 6) {
        scores[activePlayer] = 0;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        // next player
        nextPlayer();
    }
    // 2. Add to current score if dice value is NOT 1
    else if (dice1 !== 1 && dice2 !== 1) {
        activeScore += dice1 + dice2;
        // 3. Place the score to activePlayer current score
        document.getElementById('current-' + activePlayer).textContent = activeScore;
        // 4. Show the dice
        btn1Dom.style.display = 'block';
        btn2Dom.style.display = 'block';
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
    btn1Dom.style.display = 'none';
    btn2Dom.style.display = 'none';

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
    btn1Dom.style.display = 'none';
    btn2Dom.style.display = 'none';
    // 5. Change the active panel
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


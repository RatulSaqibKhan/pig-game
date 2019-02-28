/*
 GAME RULES:
 - The game has 2 players, playing in rounds
 - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
 - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
 - The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
 - The first player to reach 100 points on GLOBAL score wins the game
 */
var scores, activePlayer, activeScore, isWinnerExist;

// Define dice element to a constant
const btnDom = document.querySelector('.dice');

//Initialize application for first loading the app
init();

// New Game
document.querySelector('.btn-new').addEventListener('click', init);


// Roll the dice
document.querySelector('.btn-roll').addEventListener('click', function () {
    //0. Check if winner exists
    if(isWinnerExist) {
        return false;
    }
    // 1. Generate dice number
    var dice = Math.floor(Math.random() * 6) + 1;
    btnDom.src = './images/dice-' + dice + '.png';
    // 2. Add to current score if dice value is NOT 1
    if (dice !== 1) {
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
    if(isWinnerExist) {
        return false;
    }
    // 1. Add the score to GLOBAL score
    scores[activePlayer] += Number(document.getElementById('current-' + activePlayer).textContent);
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

    // Check if the player won
    if(winner() == false) {
        // next player
        nextPlayer();
    }

});

// Initialize application
function init() {
    scores = [0, 0];
    activeScore = 0;
    activePlayer = 0;
    isWinnerExist = false;

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
}

// Winner Function
function winner() {
    var cuurentPlayerGlobalScore = document.getElementById('score-' + activePlayer).textContent;

    if (cuurentPlayerGlobalScore >= 100) {
        isWinnerExist = true;
        document.getElementById('name-' + activePlayer).textContent = 'Winner';
        document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
        document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
        return true;
    } else {
        return false;
    }
}

// Set to Next Player
function nextPlayer() {
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


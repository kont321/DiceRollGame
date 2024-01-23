'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnMinus = document.querySelector('.btn--minus');

//Function Switching Players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
let scores, currentScore, activePlayer, playing;
// Starting Conditions

const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// Dice Roll
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate Random Dice Roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //3. Check for 1: if true, switch to Next Player.
    if (dice !== 1) {
      //add doce tp current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next Player
      switchPlayer();
    }
  }
});

//Hold Button.
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      //Finish game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //Switch to next player
    switchPlayer();
  }
});
// Minus Button.
btnMinus.addEventListener('click', function () {
  if (playing) {
    if (activePlayer === 0) {
      scores[1] -= currentScore;
      document.getElementById(`score--1`).textContent = scores[1];
      switchPlayer();
    } else {
      scores[0] -= currentScore;
      document.getElementById(`score--0`).textContent = scores[0];
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

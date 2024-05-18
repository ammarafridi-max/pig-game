'use strict';

// Select elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions

score0El.innerText = 0;
score1El.innerText = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

btnRoll.addEventListener('click', function () {
  // Generate a random dice
  const dice = Math.trunc(Math.random() * 6) + 1;

  // Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // Check for rolled 1: If true, switch to player 2
  if (dice !== 1) {
    currentScore += dice;
    document.querySelector(`#current--${activePlayer}`).innerText =
      currentScore;
  } else {
    document.querySelector(`#current--${activePlayer}`).innerText = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});

btnHold.addEventListener('click', function () {
  // Add current score to current player's score
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).innerText =
    scores[activePlayer];

  // Check if score is above 100
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
  } else {
    // Toggle focus
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }

  // Reset current score to 0
  currentScore = 0;
});

btnNew.addEventListener('click', function () {
  // Reset all scores
  currentScore = 0;
  activePlayer = 0;
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;

  // Remove winner class and focus on player 1
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // Show btns
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
});

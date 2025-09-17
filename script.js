"use strict";

//Selecting Elements
const score0El = document.querySelector("#score--0");

//Another Way to Select Element By ID
const score1El = document.getElementById("score--1"); //Don't need to add "#" before id
const score2El = document.getElementById("score--2"); // for player 3

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const player2El = document.querySelector(".player--2"); // for player 3

const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const current2El = document.getElementById("current--2"); // for player 3

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//We need to convert any Number from String before using it as Browser returns the value of number as String
//Convert into Number using Number()
//The Browser automatically converts number into String before Displaying

let scores, currentScore, activePlayer, playing;

//Starting Conditions
const init = function () {
  scores = [0, 0, 0]; // 3 players
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  score2El.textContent = 0;

  current0El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;

  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player2El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player2El.classList.remove("player--active");

  diceEl.classList.add("hidden");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = (activePlayer + 1) % 3; // cycle through 0 → 1 → 2 → 0
  player0El.classList.toggle("player--active", activePlayer === 0);
  player1El.classList.toggle("player--active", activePlayer === 1);
  player2El.classList.toggle("player--active", activePlayer === 2);
};

//Rolling Dice Functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //Generating a Random Number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    //Checking for Dice Roll 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //If true Switch Player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. Add Current Score to Active Player's Score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score is <=100
    if (scores[activePlayer] >= 100) {
      //Finish the Game
      playing = false;

      //Removing Dice
      diceEl.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to Next Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);

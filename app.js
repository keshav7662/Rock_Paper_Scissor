const ruleModal = document.querySelector(".rule-modal");
const closeBtn = document.querySelector(".close-btn");
const contest = document.querySelector(".contest");
const game = document.querySelector(".hand-choice");
const userChoice = document.getElementById("userChoice");
const pcChoice = document.getElementById("pcChoice");
const newGame = document.querySelector(".newgame");
const win = document.getElementById("win");
const tie = document.getElementById("tie");
const winRing = document.querySelectorAll(".win-ring");
const lostRing = document.querySelectorAll(".lost-ring");
const nextBtn = document.querySelector("#next-btn");
const heroSection = document.getElementById("wrapper");
const wonGame = document.getElementById("won-game");
const compScore = document.getElementById("comp-score");
const playerScore = document.getElementById("user-score");
const userRing = document.getElementById("user-ring");
const pcRing = document.getElementById("pc-ring");

let randomNumber;

playerScore.textContent = localStorage.getItem('userScore') || '0';
compScore.textContent = localStorage.getItem('pcScore') || '0';

const updateUserScore = () => {
  const currentScore = parseInt(localStorage.getItem('userScore')) || 0;
  playerScore.textContent = currentScore + 1;
  localStorage.setItem('userScore', currentScore + 1);
};

const updateCompScore = () => {
  const currentScore = parseInt(localStorage.getItem('pcScore')) || 0;
  compScore.textContent = currentScore + 1;
  localStorage.setItem('pcScore', currentScore + 1);
};

newGame.addEventListener("click", () => {
  game.classList.remove("hidden");
  contest.classList.add("hidden");
});

const pcPick = () => {
  randomNumber = Math.floor(Math.random() * 3) + 1;
  const choices = ["rock", "scissor", "paper"];
  pcChoice.src = `./assets/${choices[randomNumber - 1]}.svg`;
  pcRing.classList.remove("rock-btn", "scissor-btn", "paper-btn");
  pcRing.classList.add(`${choices[randomNumber - 1]}-btn`);
};

const userPick = (hand) => {
  pcPick();
  userChoice.src = `./assets/${hand}.svg`;
  userRing.classList.remove("rock-btn", "scissor-btn", "paper-btn");
  userRing.classList.add(`${hand}-btn`);
  game.classList.add("hidden");
  contest.classList.remove("hidden");
  result(hand, randomNumber);
};

const result = (hand, randomNumber) => {
  const choices = ["rock", "scissor", "paper"];
  const pcHand = choices[randomNumber - 1];

  if (hand === pcHand) {
    win.innerText = "TIE UP";
    newGame.innerText = "REPLAY";
    tie.classList.add("hidden");
    winRing.forEach(e => e.classList.add("winning-ring"));
    lostRing.forEach(e => e.classList.add("winning-ring"));
  } else if (
    (hand === "rock" && pcHand === "paper") ||
    (hand === "scissor" && pcHand === "rock") ||
    (hand === "paper" && pcHand === "scissor")
  ) {
    tie.classList.remove("hidden");
    win.innerText = "YOU LOST";
    newGame.innerText = "PLAY AGAIN";
    winRing.forEach(e => e.classList.add("winning-ring"));
    lostRing.forEach(e => e.classList.remove("winning-ring"));
    updateCompScore();
  } else {
    tie.classList.remove("hidden");
    win.innerText = "YOU WIN";
    newGame.innerText = "PLAY AGAIN";
    nextBtn.classList.remove("hidden");
    winRing.forEach(e => e.classList.remove("winning-ring"));
    lostRing.forEach(e => e.classList.add("winning-ring"));
    updateUserScore();
  }
};

function winPage() {
  heroSection.classList.add("hidden");
  wonGame.classList.remove("hidden");
}

function playAgain() {
  game.classList.remove("hidden");
  contest.classList.add("hidden");
  heroSection.classList.remove("hidden");
  wonGame.classList.add("hidden");
  nextBtn.classList.add("hidden");
}

function restart() {
  nextBtn.classList.add("hidden");
}

function closeRule() {
  ruleModal.classList.add("hidden");
}

function showRules() {
  ruleModal.classList.toggle("hidden");
}

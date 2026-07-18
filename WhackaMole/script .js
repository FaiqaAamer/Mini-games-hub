let holes = document.querySelectorAll(".hole");
let scoreDisplay = document.getElementById("score");
let scoreBox = document.getElementById("scoreBox");
let messageDisplay = document.getElementById("message");
let startBtn = document.getElementById("start");

let score = 0;
let gameInterval;
let gameTimer;

function randomHole() {
  let index = Math.floor(Math.random() * holes.length);
  return holes[index];
}

function showMole() {
  const hole = randomHole();
  let mole = document.createElement("div");
  mole.classList.add("mole");
  hole.appendChild(mole);

  mole.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = score;
    mole.remove();
  });

  setTimeout(() => {
    if (mole.parentNode) mole.remove();
  }, 1000);
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  messageDisplay.textContent = "";
  scoreBox.style.display = "block"; // show score while playing
  clearInterval(gameInterval);
  clearTimeout(gameTimer);

  gameInterval = setInterval(showMole, 1000);

  gameTimer = setTimeout(() => {
    clearInterval(gameInterval);
    messageDisplay.textContent = `Game Over!! Final Score: ${score}`;
    scoreBox.style.display = "none"; // hide score after game ends
  }, 20000);
}

startBtn.addEventListener("click", startGame);

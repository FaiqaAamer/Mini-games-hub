const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverOverlay = document.getElementById("gameOverOverlay");

const box = 23;
let snake, direction, food, score, game;

function initGame() {
  snake = [{x: 9 * box, y: 10 * box}];
  direction = "RIGHT";
  score = 0;
  food = {
    x: Math.floor(Math.random() * 23) * box,
    y: Math.floor(Math.random() * 23) * box
  };
  scoreDisplay.textContent = "Score: " + score;
  gameOverOverlay.style.display = "none";
}

document.addEventListener("keydown", changeDirection);

function changeDirection(event){
  if(event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if(event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if(event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if(event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw grid
  ctx.strokeStyle = "#ddd";
  for(let i=0; i<canvas.width; i+=box){
    ctx.beginPath();
    ctx.moveTo(i,0);
    ctx.lineTo(i,canvas.height);
    ctx.stroke();
  }
  for(let j=0; j<canvas.height; j+=box){
    ctx.beginPath();
    ctx.moveTo(0,j);
    ctx.lineTo(canvas.width,j);
    ctx.stroke();
  }

  // draw snake
  for(let i=0; i<snake.length; i++){
    ctx.fillStyle = i === 0 ? "green" : "lightgreen";
    ctx.beginPath();
    ctx.arc(snake[i].x + box/2, snake[i].y + box/2, box/2, 0, Math.PI*2);
    ctx.fill();
  }

  // draw apple
  ctx.beginPath();
  ctx.arc(food.x + box/2, food.y + box/2, box/2, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.fillStyle = "brown";
  ctx.fillRect(food.x + box/2 - 2, food.y + 2, 4, 6);
  ctx.beginPath();
  ctx.arc(food.x + box/2 + 6, food.y + 6, 4, 0, Math.PI*2);
  ctx.fillStyle = "green";
  ctx.fill();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * 23) * box,
      y: Math.floor(Math.random() * 23) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    gameOverOverlay.style.display = "block";
    return;
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

startBtn.addEventListener("click", () => {
  initGame();
  clearInterval(game);
  game = setInterval(draw, 100);
});

restartBtn.addEventListener("click", () => {
  initGame();
  clearInterval(game);
  game = setInterval(draw, 100);
});

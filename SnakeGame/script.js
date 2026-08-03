const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const gameOverOverlay = document.getElementById("gameOverOverlay");

const box = 23;
let snake, direction, food, score, game;
let directions = []; // track direction of each segment

function initGame() {
  snake = [{x: 9 * box, y: 10 * box}];
  directions = ["RIGHT"];
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

function changeDirection(event) {
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw grid
  ctx.strokeStyle = "#99C2A2";
  for (let i = 0; i < canvas.width; i += box) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }
  for (let j = 0; j < canvas.height; j += box) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
  }

  // draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#007090" : "#01A7C2";
    const segDir = directions[i];

    if (i === 0) {
      // Head
      if (score === 0) {
        ctx.beginPath();
        ctx.arc(snake[i].x + box/2, snake[i].y + box/2, box/2, 0, Math.PI*2);
        ctx.fill();
      } else {
        drawHybridSegment(snake[i].x, snake[i].y, segDir, true);
      }
    } else if (i === snake.length - 1) {
      // Tail
      drawHybridSegment(snake[i].x, snake[i].y, segDir, false);
    } else {
      // Body
      ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
  }

  // draw apple
  drawApple(food.x, food.y);

  // move snake
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
    directions.pop();
  }

  let newHead = {x: snakeX, y: snakeY};
  snake.unshift(newHead);
  directions.unshift(direction);

  if (
    snakeX < 0 || snakeY < 0 ||
    snakeX >= canvas.width || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    document.getElementById("finalScore").textContent = "Score : " + score;
    gameOverOverlay.style.display = "block";
    return;
  }
}

function drawHybridSegment(x, y, dir, isHead) {
  if (dir === "LEFT") {
    if (isHead) {
      ctx.fillRect(x + box/2, y, box/2, box);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, Math.PI/2, Math.PI*1.5);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, box/2, box);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, -Math.PI/2, Math.PI/2);
      ctx.fill();
    }
  } else if (dir === "RIGHT") {
    if (isHead) {
      ctx.fillRect(x, y, box/2, box);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, -Math.PI/2, Math.PI/2);
      ctx.fill();
    } else {
      ctx.fillRect(x + box/2, y, box/2, box);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, Math.PI/2, Math.PI*1.5);
      ctx.fill();
    }
  } else if (dir === "UP") {
    if (isHead) {
      ctx.fillRect(x, y + box/2, box, box/2);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, Math.PI, 0);
      ctx.fill();
    } else {
      ctx.fillRect(x, y, box, box/2);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, 0, Math.PI);
      ctx.fill();
    }
  } else if (dir === "DOWN") {
    if (isHead) {
      ctx.fillRect(x, y, box, box/2);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, 0, Math.PI);
      ctx.fill();
    } else {
      ctx.fillRect(x, y + box/2, box, box/2);
      ctx.beginPath();
      ctx.arc(x + box/2, y + box/2, box/2, Math.PI, 0);
      ctx.fill();
    }
  }
}

function drawApple(x, y) {
  ctx.beginPath();
  ctx.arc(x + box/2, y + box/2, box/2, 0, Math.PI*2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.fillStyle = "brown";
  ctx.fillRect(x + box/2 - 2, y + 2, 4, 6);
  ctx.beginPath();
  ctx.arc(x + box/2 + 6, y + 6, 4, 0, Math.PI*2);
  ctx.fillStyle = "green";
  ctx.fill();
}

function collision(head, array) {
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  return false;
}

startBtn.addEventListener("click", () => {
  initGame();
  clearInterval(game);
  game = setInterval(draw, 125);
});

restartBtn.addEventListener("click", () => {
  initGame();
  clearInterval(game);
  game = setInterval(draw, 125);
});

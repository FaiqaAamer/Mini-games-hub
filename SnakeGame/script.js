const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 23;
let snake = [{x : 9 * box , y : 10 * box}];
let direction = "RIGHT";
let score = 0;

let food = {
    x : Math.floor(Math.random() * 19 + 1) * box,
    y : Math.floor(Math.random() * 19 + 1) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event){
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if(event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if(event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    else if(event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function draw() {
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    for(let i=0; i<snake.length; i++){
        ctx.fillStyle = i === 0 ? "green" : "lightgreen";
        ctx.beginPath();
        ctx.arc(snake[i].x + box/2, snake[i].y + box/2, box/2, 0, Math.PI*2);
        ctx.fill();
    }

    // Draw apple body (red circle)
    ctx.beginPath();
    ctx.arc(food.x + box/2, food.y + box/2, box/2, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    // Draw apple stem (small brown rectangle)
    ctx.fillStyle = "brown";
    ctx.fillRect(food.x + box/2 - 2, food.y + 2, 4, 6);

    // Draw apple leaf (small green circle)
    ctx.beginPath();
    ctx.arc(food.x + box/2 + 6, food.y + 6, 4, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
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
        ctx.fillStyle = "black";
        ctx.font = "40px Arial";
        ctx.fillText("Game Over!", canvas.width/2 - 100, canvas.height/2);
        return;
    }

    snake.unshift(newHead);

    // draw score
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) return true;
    }
    return false;
}

let game = setInterval(draw, 100);
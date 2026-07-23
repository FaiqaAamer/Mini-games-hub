const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20
let snake = [{x : 9 * box , y : 10 * box}]

let direction = "RIGHT"
let food = {
    x : Math.floor(Math.random() * 19 + 1) * box,
    y : Math.floor(Math.random() * 19 + 1) * box
}

document.addEventListener("keydown", changeDirection)

function changeDirection(event){
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction === "LEFT"
    else if(event.key === "ArrowUp" && direction !== "DOWN") direction === "UP"
    else if(event.key === "ArrowRight" && direction !== "LEFT") direction === "RIGHT"
    else if(event.key === "ArrowDown" && direction !== "UP") direction === "DOWN"
}
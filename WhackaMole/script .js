let holes = document.querySelectorAll(".hole")
let scoreDisplay = document.getElementById("score")
let startBtn = document.getElementById("start")

let score = 0
let gameInterval

function randomHole(){
    let index = Math.floor(Math.random() * holes.length)
    return holes[index]
}

function showMole(){
    const hole = randomHole()
    let mole = document.createElement('div')
    mole.classList.add("mole")
    hole.appendChild(mole)

    mole.addEventListener("click", () => {
        score++
        scoreDisplay.textContent = score
        mole.remove()
    })

    setTimeout(() => {
        mole.remove()
    }, 1000);
}

function startGame() {
    score = 0
    scoreDisplay.textContent = score
    clearInterval(gameInterval)
    gameInterval = setInterval(showMole, 1000)
    
    setInterval(() => {
        clearInterval(gameInterval)
        alert("Game Over!! Score : " + score)
    }, 20000);
}

startBtn.addEventListener("click", startGame)
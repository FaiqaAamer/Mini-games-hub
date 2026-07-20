//for random words
// async function getRandomWord() {
//   const response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
//   const data = await response.json();
//   return data[0].toLowerCase();
// }
let words = ["elephant",
  "giraffe", "kangaroo", "penguin", "dolphin", "crocodile", "lion", "tiger", "zebra", "cheetah", "hippopotamus", 
  "rhinoceros", "bear", "wolf", "fox", "rabbit", "monkey", "camel", "parrot", "owl"]

let selectedWord = words[Math.floor(Math.random() * words.length)] 
let correctLetters = []
let wrongGuess = 0

const wordDisplay = document.getElementById("wordDisplay")
const message = document.getElementById("message")
const keyboard = document.getElementById("keyboard")
const canvas = document.getElementById("hangmanCanvas")
const ctx = canvas.getContext('2d')

// Draw base gallows
function drawBase() {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(10, 240); ctx.lineTo(190, 240); // ground
  ctx.moveTo(50, 240); ctx.lineTo(50, 20);   // pole
  ctx.lineTo(120, 20);                       // top beam
  ctx.lineTo(120, 50);                       // rope
  ctx.stroke();
}

// Draw hangman parts
function drawHangman(step) {
  switch(step) {
    case 1: // head
      ctx.beginPath();
      ctx.arc(120, 70, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 2: // body
      ctx.beginPath();
      ctx.moveTo(120, 90); ctx.lineTo(120, 150);
      ctx.stroke();
      break;
    case 3: // left arm
      ctx.beginPath();
      ctx.moveTo(120, 100); ctx.lineTo(90, 130);
      ctx.stroke();
      break;
    case 4: // right arm
      ctx.beginPath();
      ctx.moveTo(120, 100); ctx.lineTo(150, 130);
      ctx.stroke();
      break;
    case 5: // left leg
      ctx.beginPath();
      ctx.moveTo(120, 150); ctx.lineTo(90, 190);
      ctx.stroke();
      break;
    case 6: // right leg
      ctx.beginPath();
      ctx.moveTo(120, 150); ctx.lineTo(150, 190);
      ctx.stroke();
      break;
  }
}

function displayWord(){
    wordDisplay.textContent = selectedWord.split("")
                              .map(letter => ( correctLetters.includes(letter) ? letter : "_" ))
                              .join(" ")
}

function createKeyboard() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("")
  letters.forEach(letter => {
    const btn = document.createElement("button")
    btn.textContent = letter
    btn.addEventListener("click", () => handleGuess(letter, btn))
    keyboard.appendChild(btn)
  })
}

function handleGuess(letter, btn) {
  btn.disabled = true;

  if (selectedWord.includes(letter)) {
    correctLetters.push(letter);    
  } else {
    wrongGuess++;
    drawHangman(wrongGuess);
  }

  displayWord();

  if (!wordDisplay.textContent.includes("_")) {
    message.textContent = "You won!";
    disableKeyboard();
  } else if (wrongGuess >= 6) {
    message.textContent = "Game Over! Word was " + selectedWord;
    disableKeyboard();
  }
}

function disableKeyboard() {
  document.querySelectorAll("#keyboard button").forEach(btn => btn.disabled = true);
}

async function startGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  correctLetters = [];
  wrongGuess = 0;
  message.textContent = "";
  drawBase();
  selectedWord
  createKeyboard();
  displayWord();
}

startGame();
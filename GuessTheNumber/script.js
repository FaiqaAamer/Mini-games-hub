let answer = Math.floor(Math.random() * 100 + 1);
let attempts = 0;

const number = document.getElementById("number");
const button = document.getElementById("check-btn");
const result = document.getElementById("result");
const attemptsDisplay = document.getElementById("attempts");

button.addEventListener("click", () => {
  let guess = parseInt(number.value);
  attempts++;

  if (guess < answer) {
    result.innerText = `${guess} is too low! Try again.`;
    result.style.color = "rgb(19, 24, 162)";
  } else if (guess > answer) {
    result.innerText = `${guess} is too high! Try again.`;
    result.style.color = "rgb(189, 39, 39)";
  } else {
    result.innerText = `Correct! The number was ${answer}.`;
    result.style.color = "rgb(24, 120, 61)";
  }

  attemptsDisplay.innerText = `Attempts: ${attempts}`;
});

let playerScore = 0;
    let computerScore = 0;

    function play(playerChoice) {
      const choices = ["Rock", "Paper", "Scissors"];
      const computerChoice = choices[Math.floor(Math.random() * 3)];

      let result = "";
      let resultColor = "";

if (playerChoice === computerChoice) {
  result = `It's a draw!<br>You both chose ${playerChoice}.`;
} else if (
  (playerChoice === "Rock" && computerChoice === "Scissors") ||
  (playerChoice === "Paper" && computerChoice === "Rock") ||
  (playerChoice === "Scissors" && computerChoice === "Paper")
) {
  result = `You win!<br>${playerChoice} beats ${computerChoice}.`;
  resultColor = "Green"
  playerScore++;
} else {
  result = `Computer wins!<br>${computerChoice} beats ${playerChoice}.`;
  resultColor = "#AE1515"
  computerScore++;
}

      let output = document.getElementById("result")
      output.innerHTML = result;
      output.style.fontFamily = "Times New Roman"
      output.style.fontSize = "25px"
      output.style.color = resultColor
      document.getElementById("score").innerHTML = 
        `\n\nPlayer: ${playerScore} &nbsp;&nbsp;&nbsp; Computer: ${computerScore}`;
    }
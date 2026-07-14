let currentPlayer = "X"; // start with X
  const cells = document.querySelectorAll(".cell");
  const status = document.querySelector(".status");
  const resetBtn = document.querySelector(".reset");

  let gameOver = false;

  // Handle clicks
  function handleClick(e) {
    const cell = e.target;
    if (cell.textContent !== "" || gameOver) return; // don't overwrite or play after game ends

    // Place current player's mark
    cell.textContent = currentPlayer;

    // Check winner
    if (checkWinner(currentPlayer)) {
      status.textContent = `Player ${currentPlayer} wins!`;
      status.style.color = "#8e44ad";
      gameOver = true;
      return;
    }

    // Check draw
    if (isDraw()) {
      status.textContent = "It's a draw!";
      status.style.color = "#4169e1";
      gameOver = true;
      return;
    }

    // Switch turn
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `Player ${currentPlayer}'s turn`;
  }

  // Attach event listeners
  cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
  });


  function checkWinner(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (
      cells[a].textContent === player &&
      cells[b].textContent === player &&
      cells[c].textContent === player
    ) {
      drawWinningLine(pattern);
      return true;
    }
  }
  return false;
}

function drawWinningLine(pattern) {
  const line = document.querySelector(".line");
  line.style.width = "0";
  line.style.transform = "none";
  line.style.height = "4px"; // always thin bar

  switch (pattern.toString()) {
    case "0,1,2": // top row
      line.style.top = "50px";
      line.style.left = "0";
      line.style.width = "310px";
      break;
    case "3,4,5": // middle row
      line.style.top = "155px";
      line.style.left = "0";
      line.style.width = "310px";
      break;
    case "6,7,8": // bottom row
      line.style.top = "260px";
      line.style.left = "0";
      line.style.width = "310px";
      break;
    case "0,3,6": // left column
      line.style.top = "0";
      line.style.left = "50px";
      line.style.width = "310px";
      line.style.transform = "rotate(90deg)";
      line.style.transformOrigin = "top left";
      break;
    case "1,4,7": // middle column
      line.style.top = "0";
      line.style.left = "155px";
      line.style.width = "310px";
      line.style.transform = "rotate(90deg)";
      line.style.transformOrigin = "top left";
      break;
    case "2,5,8": // right column
      line.style.top = "0";
      line.style.left = "260px";
      line.style.width = "310px";
      line.style.transform = "rotate(90deg)";
      line.style.transformOrigin = "top left";
      break;
    case "0,4,8": // diagonal ↘
      line.style.top = "0";
      line.style.left = "0";
      line.style.width = "430px";
      line.style.transform = "rotate(45deg)";
      line.style.transformOrigin = "left top";
      break;
    case "2,4,6": // diagonal ↙
      line.style.top = "0";
      line.style.right = "0";
      line.style.left = "auto";
      line.style.width = "430px";
      line.style.transform = "rotate(-45deg)";
      line.style.transformOrigin = "right top";
      break;
  }
}

  // Draw check
  function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
  }

// Reset game
function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win"); // remove highlight
  });
  currentPlayer = "X";
  status.textContent = "Player X's turn";
  status.style.color = "black";
  document.querySelector(".line").style.width = "0";
  document.querySelector(".line").style.top = "0";
  document.querySelector(".line").style.left = "0";
  gameOver = false;
}

  // Attach reset button
  resetBtn.addEventListener("click", resetGame);
const cards = document.querySelectorAll('.card');
const gameBoard = document.querySelector('.game-board');
let flippedCards = [];
let moves = 0;
const movesDisplay = document.querySelector('p');

(function shuffleCards() {
  const cardsArray = Array.from(cards);
  cardsArray.sort(() => Math.random() - 0.5);
  cardsArray.forEach(card => gameBoard.appendChild(card));
})();

cards.forEach(card => {
  card.addEventListener('click', () => {
    if (!card.classList.contains('flipped') && flippedCards.length < 2) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        updateMoves();
        checkMatch();
      }
    }
  });
});

function checkMatch() {
  const [card1, card2] = flippedCards;
  const img1 = card1.querySelector('.card-back img').src;
  const img2 = card2.querySelector('.card-back img').src;

  if (img1 === img2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    flippedCards = [];
    checkWin();
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

function checkWin() {
  const allMatched = [...cards].every(card => card.classList.contains('matched'));
  if (allMatched) {
    setTimeout(() => {
      movesDisplay.textContent = `You win in ${moves} moves`;
      movesDisplay.style.color = "green"
      movesDisplay.style.fontSize = "20px"
      movesDisplay.style.fontWeight = "bold"
    }, 500);
  }
}

function updateMoves() {
  moves++;
  movesDisplay.textContent = `Moves : ${moves}`;
}

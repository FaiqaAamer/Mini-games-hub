// Get all boxes
const box1 = document.querySelector('.box1');
const box2 = document.querySelector('.box2');
const box3 = document.querySelector('.box3');
const box4 = document.querySelector('.box4');

// Get all cells inside each box
const cellsBox1 = box1.querySelectorAll('div');
const cellsBox2 = box2.querySelectorAll('div');
const cellsBox3 = box3.querySelectorAll('div');
const cellsBox4 = box4.querySelectorAll('div');

// Get all cells
const allCells = document.querySelectorAll('.box1 div, .box2 div, .box3 div, .box4 div');

// Example starting puzzle (4x4 Sudoku)
const puzzle = [
  1, '', 3, '',
  '', 4, '', 2,
  2, '', 4, '',
  '', 3, '', 1
];

// Fill the cells with starting numbers
allCells.forEach((cell, index) => {
  cell.textContent = puzzle[index];
});

// Get heading and container
const title = document.querySelector('h2');
const gameContainer = document.getElementById('game');



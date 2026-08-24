(() => {
  const gridEl = document.getElementById('grid');
  const messageEl = document.getElementById('message');
  const diffLabelEl = document.getElementById('diffLabel');
  let selectedIndex = null, puzzle = [], solution = [], given = [], difficulty = 'hard';

  const BOARDS = {
    hard: {
      solution: [1,2,3,4, 3,4,1,2, 2,1,4,3, 4,3,2,1]
    },
    easy: {
      solution: [4,1,2,3, 2,3,4,1, 1,4,3,2, 3,2,1,4]
    }
  };

  function randomMask(size, count) {
    const mask = Array(size).fill(0);
    let chosen = 0;
    while (chosen < count) {
      const idx = Math.floor(Math.random() * size);
      if (mask[idx] === 0) {
        mask[idx] = 1;
        chosen++;
      }
    }
    return mask;
  }

  function loadBoard() {
  const board = BOARDS[difficulty];
  solution = [...board.solution];

  const clueCount = difficulty === 'hard' ? 4 : 6;
  const givenMask = randomMask(solution.length, clueCount);

  given = givenMask.map(v => v === 1);
  puzzle = solution.map((num,i)=> given[i] ? num : '');
}

  function render() {
    gridEl.innerHTML = '';
    selectedIndex = null;
    messageEl.textContent = '';
    puzzle.forEach((num,i) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.textContent = num || '';
      if (given[i]) cell.classList.add('given');
      if (num && !given[i]) cell.classList.add('user-input');
      cell.onclick = () => selectCell(i);
      gridEl.appendChild(cell);
    });
  }

  function selectCell(i) {
    if (selectedIndex !== null) gridEl.children[selectedIndex].classList.remove('selected');
    selectedIndex = i;
    gridEl.children[i].classList.add('selected');
  }

  function setMessage(text, cls='') {
    messageEl.textContent = text;
    messageEl.className = cls;
  }

  function placeNumber(num) {
    if (selectedIndex === null) return setMessage('Select a cell first');
    const i = selectedIndex, cell = gridEl.children[i];
    puzzle[i] = num;
    cell.textContent = num;
    cell.classList.remove('wrong','selected');
    cell.classList.add('user-input');
    selectedIndex = null;

    if (num !== solution[i]) {
      cell.classList.add('wrong');
      setMessage('Wrong number','bad');
    } else {
      const remaining = puzzle.filter((v,j)=>!given[j] && v==='').length;
      setMessage(remaining? `Correct, ${remaining} to go` : 'Solved!','ok');
    }
  }

  function eraseCell() {
    if (selectedIndex===null) return;
    puzzle[selectedIndex] = '';
    const cell = gridEl.children[selectedIndex];
    cell.textContent = '';
    cell.classList.remove('wrong','user-input','selected');
    setMessage('');
    selectedIndex = null;
  }

  document.getElementById('numberControls').onclick = e => {
    const btn = e.target.closest('.num-btn');
    if (btn) placeNumber(+btn.dataset.num);
  };
  document.getElementById('restartBtn').onclick = () => { loadBoard(); render(); setMessage('Board reset'); };
  document.getElementById('diffToggle').onclick = e => {
    const btn = e.target.closest('.diff-btn'); if (!btn) return;
    difficulty = btn.dataset.diff;
    document.querySelectorAll('.diff-btn').forEach(b=> b.classList.toggle('active', b.dataset.diff===difficulty));
    diffLabelEl.textContent = difficulty==='hard' ? 'Hard' : 'Easy';
    loadBoard(); render();
  };

  window.onkeydown = e => {
    if (['1','2','3','4'].includes(e.key)) placeNumber(+e.key);
    if (['Backspace','Delete'].includes(e.key)) eraseCell();
  };

  document.querySelector(`.diff-btn[data-diff="${difficulty}"]`).classList.add('active');
  loadBoard(); render();
})();
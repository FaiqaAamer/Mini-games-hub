(() => {
  const gridEl = document.getElementById('grid');
  const messageEl = document.getElementById('message');
  const diffLabelEl = document.getElementById('diffLabel');
  let selectedIndex = null, puzzle = [], solution = [], given = [], difficulty = 'hard';

  const BOARDS = {
    easy: {
      solution: [
        5,3,4,6,7,8,9,1,2,
        6,7,2,1,9,5,3,4,8,
        1,9,8,3,4,2,5,6,7,
        8,5,9,7,6,1,4,2,3,
        4,2,6,8,5,3,7,9,1,
        7,1,3,9,2,4,8,5,6,
        9,6,1,5,3,7,2,8,4,
        2,8,7,4,1,9,6,3,5,
        3,4,5,2,8,6,1,7,9
      ]
    },
    medium: {
      solution: [
        8,2,7,1,5,4,3,9,6,
        9,6,5,3,2,7,1,4,8,
        3,4,1,6,8,9,7,5,2,
        5,9,3,4,6,8,2,7,1,
        4,7,2,5,1,3,6,8,9,
        6,1,8,9,7,2,5,3,4,
        7,8,6,2,3,5,9,1,4,
        1,5,4,7,9,6,8,2,3,
        2,3,9,8,4,1,5,6,7
      ]
    },
    hard: {
      solution: [
        4,3,5,2,6,9,7,8,1,
        6,8,2,5,7,1,4,9,3,
        1,9,7,8,3,4,5,6,2,
        8,2,6,1,9,5,3,4,7,
        3,7,4,6,8,2,9,1,5,
        9,5,1,7,4,3,6,2,8,
        5,1,9,3,2,6,8,7,4,
        2,4,8,9,5,7,1,3,6,
        7,6,3,4,1,8,2,5,9
      ]
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

    let clueCount;
    if (difficulty === 'easy') clueCount = 36;
    else if (difficulty === 'medium') clueCount = 30;
    else clueCount = 24;

    const givenMask = randomMask(solution.length, clueCount);
    given = givenMask.map(v => v === 1);
    puzzle = solution.map((num, i) => (given[i] ? num : ''));
  }

  function render() {
    gridEl.innerHTML = '';
    selectedIndex = null;
    messageEl.textContent = '';
    puzzle.forEach((num, i) => {
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

  function setMessage(text, cls = '') {
    messageEl.textContent = text;
    messageEl.className = cls;
  }

  function placeNumber(num) {
    if (selectedIndex === null) return setMessage('Select a cell first');
    const i = selectedIndex, cell = gridEl.children[i];
    puzzle[i] = num;
    cell.textContent = num;
    cell.classList.remove('wrong', 'selected');
    cell.classList.add('user-input');
    selectedIndex = null;

    if (num !== solution[i]) {
      cell.classList.add('wrong');
      setMessage('Wrong number', 'bad');
    } else {
      const remaining = puzzle.filter((v, j) => !given[j] && v === '').length;
      if (remaining) {
        setMessage(`Correct, ${remaining} to go`, 'ok');
        } else {
        setMessage('Puzzle Completed!', 'win');
        Array.from(gridEl.children).forEach(c => c.classList.add('solved'));
        }
    }
  }

  function eraseCell() {
    if (selectedIndex === null) return;
    puzzle[selectedIndex] = '';
    const cell = gridEl.children[selectedIndex];
    cell.textContent = '';
    cell.classList.remove('wrong', 'user-input', 'selected');
    setMessage('');
    selectedIndex = null;
  }

  document.getElementById('numberControls').onclick = e => {
    const btn = e.target.closest('.num-btn');
    if (btn) placeNumber(+btn.dataset.num);
  };

  document.getElementById('restartBtn').onclick = () => {
    loadBoard();
    render();
    setMessage('Board reset');
  };

  document.getElementById('diffToggle').onclick = e => {
    const btn = e.target.closest('.diff-btn');
    if (!btn) return;
    difficulty = btn.dataset.diff;
    document.querySelectorAll('.diff-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.diff === difficulty)
    );
    diffLabelEl.textContent =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    loadBoard();
    render();
  };

  window.onkeydown = e => {
    if (['1','2','3','4','5','6','7','8','9'].includes(e.key)) placeNumber(+e.key);
    if (['Backspace','Delete'].includes(e.key)) eraseCell();
  };

  document.querySelector(`.diff-btn[data-diff="${difficulty}"]`).classList.add('active');
  loadBoard();
  render();
})();

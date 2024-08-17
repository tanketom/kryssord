const crossword = document.getElementById('crossword');
const startTime = new Date();

const getWeekNumber = d => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
};

const currentWeek = getWeekNumber(new Date());
const currentYear = new Date().getFullYear();
const jsonFileName = `JSON/W${currentWeek}-${currentYear}.json`;

fetch(jsonFileName)
    .then(response => response.json())
    .then(data => {
        createCrossword(data.solution);
        displayClues(data.clues);
    });

const createCrossword = solution => {
    let clueNumber = 1;
    solution.forEach((row, i) => {
        const tr = document.createElement('tr');
        row.forEach((cell, j) => {
            const td = document.createElement('td');
            if (cell === '#') {
                td.classList.add('black');
            } else {
                const input = document.createElement('input');
                input.maxLength = 1;
                input.addEventListener('input', moveToNext);
                td.appendChild(input);
                if (shouldNumberCell(solution, i, j)) {
                    const number = document.createElement('span');
                    number.classList.add('number');
                    number.innerText = clueNumber++;
                    td.appendChild(number);
                }
            }
            tr.appendChild(td);
        });
        crossword.appendChild(tr);
    });
};

const shouldNumberCell = (solution, row, col) => (
    row === 0 || col === 0 || solution[row - 1][col] === '#' || solution[row][col - 1] === '#'
);

const displayClues = clues => {
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    clues.across.forEach(clue => {
        const li = document.createElement('li');
        li.innerText = clue;
        acrossClues.appendChild(li);
    });
    clues.down.forEach(clue => {
        const li = document.createElement('li');
        li.innerText = clue;
        downClues.appendChild(li);
    });
};

const moveToNext = event => {
    const input = event.target;
    const nextCell = input.parentElement.nextElementSibling;
    if (nextCell && nextCell.firstChild) nextCell.firstChild.focus();
};

const checkSolution = () => {
    const solution = crossword.querySelectorAll('input');
    let correct = true;
    solution.forEach((input, index) => {
        const row = Math.floor(index / 7);
        const col = index % 7;
        if (input.value.toUpperCase() !== solution[row][col]) correct = false;
    });

    const timeTaken = Math.floor((new Date() - startTime) / 1000);
    document.getElementById('message').innerText = correct
        ? `Congratulations! You solved the puzzle in ${timeTaken} seconds.`
        : 'Some answers are incorrect. Keep trying!';
};
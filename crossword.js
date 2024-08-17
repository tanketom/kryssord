let solution = [];
let clues = { across: [], down: [] };
const crossword = document.getElementById('crossword');
const startTime = new Date();

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return weekNo;
}

const currentWeek = getWeekNumber(new Date());
const currentYear = new Date().getFullYear();
const jsonFileName = `JSON/W${currentWeek}-${currentYear}.json`;

fetch(jsonFileName)
    .then(response => response.json())
    .then(data => {
        solution = data.solution;
        clues = data.clues;
        createCrossword();
        displayClues();
    });

function createCrossword() {
    let clueNumber = 1;
    for (let i = 0; i < 7; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (solution[i][j] === '#') {
                cell.classList.add('black');
            } else {
                const input = document.createElement('input');
                input.setAttribute('maxlength', '1');
                input.addEventListener('input', moveToNext);
                cell.appendChild(input);

                // Add clue number
                if (shouldNumberCell(i, j)) {
                    const number = document.createElement('span');
                    number.classList.add('number');
                    number.innerText = clueNumber++;
                    cell.appendChild(number);
                }
            }
            row.appendChild(cell);
        }
        crossword.appendChild(row);
    }
}

function shouldNumberCell(row, col) {
    // Check if the cell should be numbered
    if (row === 0 || col === 0 || solution[row - 1][col] === '#' || solution[row][col - 1] === '#') {
        return true;
    }
    return false;
}

function displayClues() {
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
}

function moveToNext(event) {
    const input = event.target;
    const cell = input.parentElement;
    const nextCell = cell.nextElementSibling;

    if (nextCell && nextCell.firstChild) {
        nextCell.firstChild.focus();
    }
}

function checkSolution() {
    let correct = true;
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
            if (solution[i][j] !== '#') {
                const input = crossword.rows[i].cells[j].firstChild;
                if (input.value.toUpperCase() !== solution[i][j]) {
                    correct = false;
                    break;
                }
            }
        }
    }

    const endTime = new Date();
    const timeTaken = Math.floor((endTime - startTime) / 1000);

    if (correct) {
        document.getElementById('message').innerText = `Congratulations! You solved the puzzle in ${timeTaken} seconds.`;
    } else {
        document.getElementById('message').innerText = 'Some answers are incorrect. Keep trying!';
    }
}

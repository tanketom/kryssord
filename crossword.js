let solution = [];
let clues = { across: [], down: [] };
const crossword = document.getElementById('crossword');
const startTime = new Date();
const weekSelect = document.getElementById('week-select');

// Get the current week number
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

const currentWeek = getWeekNumber(new Date());
const currentYear = new Date().getFullYear();

// Populate the week dropdown with the last 5 weeks
for (let i = 0; i < 5; i++) {
    const week = currentWeek - i;
    const option = document.createElement('option');
    option.value = `W${week}-${currentYear}`;
    option.text = `Week ${week}, ${currentYear}`;
    weekSelect.appendChild(option);
}

// Load the selected week's crossword
weekSelect.addEventListener('change', () => {
    const selectedWeek = weekSelect.value;
    loadCrossword(selectedWeek);
});

// Load the crossword for the current week by default
loadCrossword(`W${currentWeek}-${currentYear}`);

function loadCrossword(jsonFileName) {
    fetch(`JSON/${jsonFileName}.json`)
        .then(response => response.json())
        .then(data => {
            solution = data.solution;
            clues = data.clues;
            createCrossword();
            displayClues();
        });
}

// Create the crossword grid
function createCrossword() {
    crossword.innerHTML = ''; // Clear previous crossword
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

                // Add clue number if needed
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

// Determine if a cell should be numbered
function shouldNumberCell(row, col) {
    return row === 0 || col === 0 || solution[row - 1][col] === '#' || solution[row][col - 1] === '#';
}

// Display the clues
function displayClues() {
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    acrossClues.innerHTML = ''; // Clear previous clues
    downClues.innerHTML = ''; // Clear previous clues

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

// Move to the next cell on input
function moveToNext(event) {
    const input = event.target;
    const nextCell = input.parentElement.nextElementSibling;
    if (nextCell && nextCell.firstChild) {
        nextCell.firstChild.focus();
    }
}

// Check the solution
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

    const timeTaken = Math.floor((new Date() - startTime) / 1000);
    const message = document.getElementById('message');
    message.innerText = correct 
        ? `Congratulations! You solved the puzzle in ${timeTaken} seconds.` 
        : 'Some answers are incorrect. Keep trying!';
}
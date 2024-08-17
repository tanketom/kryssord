// Get the crossword table element and record the start time
const crossword = document.getElementById('crossword');
const startTime = new Date();

// Function to get the current week number of the year
const getWeekNumber = d => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7)); // Adjust to the nearest Thursday
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1)); // Start of the year
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7); // Calculate week number
};

// Get the current week and year
const currentWeek = getWeekNumber(new Date());
const currentYear = new Date().getFullYear();
// Construct the JSON file name based on the current week and year
const jsonFileName = `JSON/W${currentWeek}-${currentYear}.json`;

// Fetch the crossword data from the JSON file
fetch(jsonFileName)
    .then(response => response.json())
    .then(data => {
        createCrossword(data.solution); // Create the crossword grid
        displayClues(data.clues); // Display the clues
    });

// Function to create the crossword grid
const createCrossword = solution => {
    let clueNumber = 1; // Initialize clue number
    solution.forEach((row, i) => {
        const tr = document.createElement('tr'); // Create a table row
        row.forEach((cell, j) => {
            const td = document.createElement('td'); // Create a table cell
            if (cell === '#') {
                td.classList.add('black'); // Add black class for black squares
            } else {
                const input = document.createElement('input');
                input.maxLength = 1; // Limit input to one character
                input.addEventListener('input', moveToNext); // Move to next cell on input
                td.appendChild(input);
                if (shouldNumberCell(solution, i, j)) {
                    const number = document.createElement('span');
                    number.classList.add('number');
                    number.innerText = clueNumber++; // Add clue number
                    td.appendChild(number);
                }
            }
            tr.appendChild(td);
        });
        crossword.appendChild(tr);
    });
};

// Function to determine if a cell should be numbered
const shouldNumberCell = (solution, row, col) => (
    row === 0 || col === 0 || solution[row - 1][col] === '#' || solution[row][col - 1] === '#'
);

// Function to display the clues
const displayClues = clues => {
    const acrossClues = document.getElementById('across-clues');
    const downClues = document.getElementById('down-clues');
    clues.across.forEach(clue => {
        const li = document.createElement('li');
        li.innerText = clue; // Add across clue
        acrossClues.appendChild(li);
    });
    clues.down.forEach(clue => {
        const li = document.createElement('li');
        li.innerText = clue; // Add down clue
        downClues.appendChild(li);
    });
};

// Function to move to the next cell on input
const moveToNext = event => {
    const input = event.target;
    const nextCell = input.parentElement.nextElementSibling;
    if (nextCell && nextCell.firstChild) nextCell.firstChild.focus();
};

// Function to check the solution
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
